// Sistema de Gestión de Turnos - Aeropuerto Malabo
// Aplicación principal con funcionalidad CRUD completa

class ShiftManagementSystem {
    constructor() {
        this.engineers = JSON.parse(localStorage.getItem('shiftManager_engineers')) || [];
        this.shifts = JSON.parse(localStorage.getItem('shiftManager_shifts')) || [];
        this.currentEditingEngineer = null;
        this.currentEditingShift = null;
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateStats();
        this.renderEngineersTable();
        this.renderShiftsTable();
        this.updateEngineerSelect();
        this.updateCurrentMonth();
        
        // Escuchar cambios de idioma
        document.addEventListener('languageChanged', () => {
            this.renderEngineersTable();
            this.renderShiftsTable();
            this.updateCurrentMonth();
        });
    }
    
    bindEvents() {
        // Formulario de ingenieros
        const engineerForm = document.getElementById('engineerForm');
        engineerForm.addEventListener('submit', (e) => this.handleEngineerSubmit(e));
        
        // Formulario de turnos
        const shiftForm = document.getElementById('shiftForm');
        shiftForm.addEventListener('submit', (e) => this.handleShiftSubmit(e));
        
        // Botones de cancelar
        document.getElementById('cancelEngineerBtn').addEventListener('click', () => this.cancelEngineerEdit());
        document.getElementById('cancelShiftBtn').addEventListener('click', () => this.cancelShiftEdit());
        
        // Selector de tipo de vuelo
        document.getElementById('flightType').addEventListener('change', (e) => this.handleFlightTypeChange(e));
        
        // Controles de calendario
        document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));
        
        // Modal de confirmación
        document.getElementById('confirmYes').addEventListener('click', () => this.confirmAction());
        document.getElementById('confirmNo').addEventListener('click', () => this.closeModal());
        
        // Botón de imprimir reporte
        document.getElementById('printReportBtn').addEventListener('click', () => this.printReport());
        
        // Cerrar modal al hacer clic fuera
        document.getElementById('confirmModal').addEventListener('click', (e) => {
            if (e.target.id === 'confirmModal') {
                this.closeModal();
            }
        });
    }
    
    // === GESTIÓN DE INGENIEROS ===
    
    handleEngineerSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const engineerData = {
            name: formData.get('engineerName').trim(),
            email: formData.get('engineerEmail').trim(),
            phone: formData.get('engineerPhone').trim()
        };
        
        // Validación
        if (!engineerData.name || !engineerData.email) {
            this.showNotification(t('form-validation-error'), 'error');
            return;
        }
        
        // Verificar email único
        const existingEngineer = this.engineers.find(eng => 
            eng.email === engineerData.email && 
            (!this.currentEditingEngineer || eng.id !== this.currentEditingEngineer.id)
        );
        
        if (existingEngineer) {
            this.showNotification('El email ya está registrado', 'error');
            return;
        }
        
        if (this.currentEditingEngineer) {
            // Actualizar ingeniero existente
            this.updateEngineer(this.currentEditingEngineer.id, engineerData);
        } else {
            // Crear nuevo ingeniero
            this.createEngineer(engineerData);
        }
    }
    
    createEngineer(engineerData) {
        const engineer = {
            id: this.generateId(),
            ...engineerData,
            createdAt: new Date().toISOString()
        };
        
        this.engineers.push(engineer);
        this.saveEngineers();
        this.renderEngineersTable();
        this.updateEngineerSelect();
        this.updateStats();
        
        document.getElementById('engineerForm').reset();
        this.showNotification(t('engineer-added'), 'success');
    }
    
    updateEngineer(id, engineerData) {
        const index = this.engineers.findIndex(eng => eng.id === id);
        if (index !== -1) {
            this.engineers[index] = {
                ...this.engineers[index],
                ...engineerData,
                updatedAt: new Date().toISOString()
            };
            
            this.saveEngineers();
            this.renderEngineersTable();
            this.updateEngineerSelect();
            this.renderShiftsTable(); // Actualizar tabla de turnos para mostrar nombres actualizados
            
            this.cancelEngineerEdit();
            this.showNotification(t('engineer-updated'), 'success');
        }
    }
    
    editEngineer(id) {
        const engineer = this.engineers.find(eng => eng.id === id);
        if (engineer) {
            this.currentEditingEngineer = engineer;
            
            // Llenar formulario
            document.getElementById('engineerName').value = engineer.name;
            document.getElementById('engineerEmail').value = engineer.email;
            document.getElementById('engineerPhone').value = engineer.phone || '';
            
            // Cambiar botón y mostrar cancelar
            const submitBtn = document.querySelector('#engineerForm button[type="submit"] span');
            submitBtn.textContent = t('update-engineer');
            document.getElementById('cancelEngineerBtn').style.display = 'inline-flex';
            
            // Scroll al formulario
            document.getElementById('engineerForm').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    deleteEngineer(id) {
        const engineer = this.engineers.find(eng => eng.id === id);
        if (!engineer) return;
        
        // Verificar si tiene turnos asignados
        const hasShifts = this.shifts.some(shift => shift.engineerId === id);
        if (hasShifts) {
            this.showNotification(t('engineer-has-shifts'), 'error');
            return;
        }
        
        this.showConfirmModal(
            t('confirm-delete-engineer'),
            () => {
                this.engineers = this.engineers.filter(eng => eng.id !== id);
                this.saveEngineers();
                this.renderEngineersTable();
                this.updateEngineerSelect();
                this.updateStats();
                this.showNotification(t('engineer-deleted'), 'success');
            }
        );
    }
    
    cancelEngineerEdit() {
        this.currentEditingEngineer = null;
        document.getElementById('engineerForm').reset();
        
        const submitBtn = document.querySelector('#engineerForm button[type="submit"] span');
        submitBtn.textContent = t('add-engineer');
        document.getElementById('cancelEngineerBtn').style.display = 'none';
    }
    
    // === GESTIÓN DE TURNOS ===
    
    handleShiftSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const shiftData = {
            engineerId: formData.get('shiftEngineer'),
            area: formData.get('shiftArea'),
            date: formData.get('shiftDate'),
            time: formData.get('shiftTime'),
            flightType: formData.get('flightType'),
            flightNumber: formData.get('flightNumber').trim(),
            notes: formData.get('shiftNotes').trim()
        };
        
        // Validación
        if (!shiftData.engineerId || !shiftData.area || !shiftData.date || 
            !shiftData.time || !shiftData.flightType) {
            this.showNotification(t('form-validation-error'), 'error');
            return;
        }
        
        // Verificar conflictos de horario
        const conflict = this.checkShiftConflict(shiftData);
        if (conflict) {
            this.showNotification(t('shift-conflict'), 'error');
            return;
        }
        
        // Verificar regla RAM
        if (shiftData.flightType === 'ram') {
            const ramConflict = this.checkRAMConflict(shiftData);
            if (ramConflict) {
                this.showNotification(t('ram-conflict'), 'error');
                return;
            }
        }
        
        if (this.currentEditingShift) {
            // Actualizar turno existente
            this.updateShift(this.currentEditingShift.id, shiftData);
        } else {
            // Crear nuevo turno
            this.createShift(shiftData);
        }
    }
    
    createShift(shiftData) {
        const shift = {
            id: this.generateId(),
            ...shiftData,
            createdAt: new Date().toISOString()
        };
        
        this.shifts.push(shift);
        this.saveShifts();
        this.renderShiftsTable();
        this.updateStats();
        
        document.getElementById('shiftForm').reset();
        document.getElementById('ramWarning').style.display = 'none';
        this.showNotification(t('shift-added'), 'success');
    }
    
    updateShift(id, shiftData) {
        const index = this.shifts.findIndex(shift => shift.id === id);
        if (index !== -1) {
            this.shifts[index] = {
                ...this.shifts[index],
                ...shiftData,
                updatedAt: new Date().toISOString()
            };
            
            this.saveShifts();
            this.renderShiftsTable();
            this.updateStats();
            
            this.cancelShiftEdit();
            this.showNotification(t('shift-updated'), 'success');
        }
    }
    
    editShift(id) {
        const shift = this.shifts.find(s => s.id === id);
        if (shift) {
            this.currentEditingShift = shift;
            
            // Llenar formulario
            document.getElementById('shiftEngineer').value = shift.engineerId;
            document.getElementById('shiftArea').value = shift.area;
            document.getElementById('shiftDate').value = shift.date;
            document.getElementById('shiftTime').value = shift.time;
            document.getElementById('flightType').value = shift.flightType;
            document.getElementById('flightNumber').value = shift.flightNumber || '';
            document.getElementById('shiftNotes').value = shift.notes || '';
            
            // Mostrar advertencia RAM si aplica
            if (shift.flightType === 'ram') {
                document.getElementById('ramWarning').style.display = 'block';
            }
            
            // Cambiar botón y mostrar cancelar
            const submitBtn = document.querySelector('#shiftForm button[type="submit"] span');
            submitBtn.textContent = t('update-shift');
            document.getElementById('cancelShiftBtn').style.display = 'inline-flex';
            
            // Scroll al formulario
            document.getElementById('shiftForm').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    deleteShift(id) {
        this.showConfirmModal(
            t('confirm-delete-shift'),
            () => {
                this.shifts = this.shifts.filter(shift => shift.id !== id);
                this.saveShifts();
                this.renderShiftsTable();
                this.updateStats();
                this.showNotification(t('shift-deleted'), 'success');
            }
        );
    }
    
    cancelShiftEdit() {
        this.currentEditingShift = null;
        document.getElementById('shiftForm').reset();
        document.getElementById('ramWarning').style.display = 'none';
        
        const submitBtn = document.querySelector('#shiftForm button[type="submit"] span');
        submitBtn.textContent = t('add-shift');
        document.getElementById('cancelShiftBtn').style.display = 'none';
    }
    
    // === VALIDACIONES Y LÓGICA DE NEGOCIO ===
    
    checkShiftConflict(shiftData) {
        return this.shifts.some(shift => 
            shift.engineerId === shiftData.engineerId &&
            shift.date === shiftData.date &&
            shift.time === shiftData.time &&
            (!this.currentEditingShift || shift.id !== this.currentEditingShift.id)
        );
    }
    
    checkRAMConflict(shiftData) {
        const shiftDate = new Date(shiftData.date);
        const previousDay = new Date(shiftDate);
        previousDay.setDate(previousDay.getDate() - 1);
        const previousDayStr = previousDay.toISOString().split('T')[0];
        
        // Verificar si el ingeniero tiene algún turno el día anterior
        return this.shifts.some(shift => 
            shift.engineerId === shiftData.engineerId &&
            shift.date === previousDayStr &&
            (!this.currentEditingShift || shift.id !== this.currentEditingShift.id)
        );
    }
    
    handleFlightTypeChange(e) {
        const ramWarning = document.getElementById('ramWarning');
        if (e.target.value === 'ram') {
            ramWarning.style.display = 'block';
        } else {
            ramWarning.style.display = 'none';
        }
    }
    
    // === RENDERIZADO ===
    
    renderEngineersTable() {
        const tbody = document.getElementById('engineersTableBody');
        
        if (this.engineers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; color: var(--text-secondary);">
                        ${t('no-engineers')}
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = this.engineers.map(engineer => `
            <tr>
                <td>${this.escapeHtml(engineer.name)}</td>
                <td>${this.escapeHtml(engineer.email)}</td>
                <td>${this.escapeHtml(engineer.phone || '-')}</td>
                <td>
                    <button class="btn btn-warning btn-small" onclick="shiftManager.editEngineer('${engineer.id}')">
                        <i class="fas fa-edit"></i>
                        ${t('edit')}
                    </button>
                    <button class="btn btn-danger btn-small" onclick="shiftManager.deleteEngineer('${engineer.id}')">
                        <i class="fas fa-trash"></i>
                        ${t('delete')}
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    renderShiftsTable() {
        const tbody = document.getElementById('shiftsTableBody');
        
        // Filtrar turnos del mes actual
        const monthShifts = this.shifts.filter(shift => {
            const shiftDate = new Date(shift.date);
            return shiftDate.getMonth() === this.currentMonth && 
                   shiftDate.getFullYear() === this.currentYear;
        });
        
        // Ordenar por fecha y hora
        monthShifts.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });
        
        if (monthShifts.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; color: var(--text-secondary);">
                        ${t('no-shifts')}
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = monthShifts.map(shift => {
            const engineer = this.engineers.find(eng => eng.id === shift.engineerId);
            const engineerName = engineer ? engineer.name : 'Ingeniero no encontrado';
            const flightTypeBadge = shift.flightType === 'ram' ? 'badge-ram' : 'badge-regular';
            const flightTypeText = shift.flightType === 'ram' ? 'RAM' : t('regular-flight');
            
            return `
                <tr>
                    <td>${this.formatDate(shift.date)}</td>
                    <td>${this.escapeHtml(engineerName)}</td>
                    <td><strong>${shift.area}</strong></td>
                    <td>${shift.time}</td>
                    <td>
                        <span class="badge ${flightTypeBadge}">
                            ${flightTypeText}
                        </span>
                    </td>
                    <td>${this.escapeHtml(shift.flightNumber || '-')}</td>
                    <td>
                        <button class="btn btn-warning btn-small" onclick="shiftManager.editShift('${shift.id}')">
                            <i class="fas fa-edit"></i>
                            ${t('edit')}
                        </button>
                        <button class="btn btn-danger btn-small" onclick="shiftManager.deleteShift('${shift.id}')">
                            <i class="fas fa-trash"></i>
                            ${t('delete')}
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    updateEngineerSelect() {
        const select = document.getElementById('shiftEngineer');
        const currentValue = select.value;
        
        select.innerHTML = `<option value="" data-translate="select-option">${t('select-option')}</option>`;
        
        this.engineers.forEach(engineer => {
            const option = document.createElement('option');
            option.value = engineer.id;
            option.textContent = engineer.name;
            select.appendChild(option);
        });
        
        // Restaurar valor seleccionado si existe
        if (currentValue) {
            select.value = currentValue;
        }
    }
    
    updateStats() {
        document.getElementById('totalEngineers').textContent = this.engineers.length;
        document.getElementById('totalShifts').textContent = this.shifts.length;
        document.getElementById('ramFlights').textContent = 
            this.shifts.filter(shift => shift.flightType === 'ram').length;
    }
    
    // === NAVEGACIÓN DE CALENDARIO ===
    
    changeMonth(direction) {
        this.currentMonth += direction;
        
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        
        this.updateCurrentMonth();
        this.renderShiftsTable();
    }
    
    updateCurrentMonth() {
        const monthName = translationManager.getMonthName(this.currentMonth);
        document.getElementById('currentMonth').textContent = `${monthName} ${this.currentYear}`;
    }
    
    // === REPORTE IMPRIMIBLE ===
    
    printReport() {
        const printContent = document.getElementById('printContent');
        const printDate = document.querySelector('.print-date');
        
        // Configurar fecha del reporte
        printDate.textContent = `${t('generated-on')}: ${translationManager.formatDate(new Date())}`;
        
        // Generar contenido del reporte
        let reportHTML = `
            <div class="report-section">
                <h2>${t('summary')}</h2>
                <div class="summary-stats">
                    <p><strong>${t('total-engineers')}:</strong> ${this.engineers.length}</p>
                    <p><strong>${t('total-shifts')}:</strong> ${this.shifts.length}</p>
                    <p><strong>${t('ram-flights')}:</strong> ${this.shifts.filter(s => s.flightType === 'ram').length}</p>
                </div>
            </div>
            
            <div class="report-section">
                <h2>${t('engineers-report')}</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>${t('name')}</th>
                            <th>${t('email')}</th>
                            <th>${t('phone')}</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        if (this.engineers.length === 0) {
            reportHTML += `<tr><td colspan="3">${t('no-engineers')}</td></tr>`;
        } else {
            this.engineers.forEach(engineer => {
                reportHTML += `
                    <tr>
                        <td>${this.escapeHtml(engineer.name)}</td>
                        <td>${this.escapeHtml(engineer.email)}</td>
                        <td>${this.escapeHtml(engineer.phone || '-')}</td>
                    </tr>
                `;
            });
        }
        
        reportHTML += `
                    </tbody>
                </table>
            </div>
            
            <div class="report-section">
                <h2>${t('shifts-report')} - ${translationManager.getMonthName(this.currentMonth)} ${this.currentYear}</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>${t('date')}</th>
                            <th>${t('engineer')}</th>
                            <th>${t('area')}</th>
                            <th>${t('time')}</th>
                            <th>${t('flight-type')}</th>
                            <th>${t('flight-number')}</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // Filtrar y ordenar turnos del mes actual
        const monthShifts = this.shifts.filter(shift => {
            const shiftDate = new Date(shift.date);
            return shiftDate.getMonth() === this.currentMonth && 
                   shiftDate.getFullYear() === this.currentYear;
        }).sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });
        
        if (monthShifts.length === 0) {
            reportHTML += `<tr><td colspan="6">${t('no-shifts')}</td></tr>`;
        } else {
            monthShifts.forEach(shift => {
                const engineer = this.engineers.find(eng => eng.id === shift.engineerId);
                const engineerName = engineer ? engineer.name : 'Ingeniero no encontrado';
                const flightTypeText = shift.flightType === 'ram' ? 'RAM' : t('regular-flight');
                
                reportHTML += `
                    <tr>
                        <td>${this.formatDate(shift.date)}</td>
                        <td>${this.escapeHtml(engineerName)}</td>
                        <td>${shift.area}</td>
                        <td>${shift.time}</td>
                        <td>
                            <span class="badge ${shift.flightType === 'ram' ? 'badge-ram' : 'badge-regular'}">
                                ${flightTypeText}
                            </span>
                        </td>
                        <td>${this.escapeHtml(shift.flightNumber || '-')}</td>
                    </tr>
                `;
            });
        }
        
        reportHTML += `
                    </tbody>
                </table>
            </div>
        `;
        
        printContent.innerHTML = reportHTML;
        
        // Imprimir
        window.print();
    }
    
    // === UTILIDADES ===
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return translationManager.formatDate(date, { 
            weekday: 'short',
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    saveEngineers() {
        localStorage.setItem('shiftManager_engineers', JSON.stringify(this.engineers));
    }
    
    saveShifts() {
        localStorage.setItem('shiftManager_shifts', JSON.stringify(this.shifts));
    }
    
    // === MODAL Y NOTIFICACIONES ===
    
    showConfirmModal(message, onConfirm) {
        const modal = document.getElementById('confirmModal');
        const messageEl = document.getElementById('confirmMessage');
        
        messageEl.textContent = message;
        modal.classList.add('show');
        
        this.pendingConfirmAction = onConfirm;
    }
    
    confirmAction() {
        if (this.pendingConfirmAction) {
            this.pendingConfirmAction();
            this.pendingConfirmAction = null;
        }
        this.closeModal();
    }
    
    closeModal() {
        const modal = document.getElementById('confirmModal');
        modal.classList.remove('show');
        this.pendingConfirmAction = null;
    }
    
    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Agregar estilos si no existen
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: var(--border-radius);
                    color: white;
                    font-weight: 500;
                    z-index: 1001;
                    animation: slideInRight 0.3s ease-out;
                    max-width: 400px;
                    box-shadow: var(--shadow-lg);
                }
                .notification-success { background: var(--success-color); }
                .notification-error { background: var(--danger-color); }
                .notification-info { background: var(--primary-color); }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.shiftManager = new ShiftManagementSystem();
});

