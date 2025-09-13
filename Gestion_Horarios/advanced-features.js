// Funcionalidades Avanzadas para el Sistema de Gestión de Turnos
// Calendario Interactivo, Drag & Drop, Plantillas y Auto-Asignación

class AdvancedShiftManager extends ShiftManagementSystem {
    constructor() {
        super();
        this.shiftConfig = JSON.parse(localStorage.getItem('shiftManager_config')) || {
            morningStart: '08:00',
            morningEnd: '15:00',
            afternoonStart: '15:00',
            afternoonEnd: '23:30'
        };
        this.templates = JSON.parse(localStorage.getItem('shiftManager_templates')) || [];
        this.currentView = 'month';
        this.draggedEngineer = null;
        this.currentWeekStart = this.getWeekStart(new Date());
        
        // Esperar a que el DOM esté completamente cargado antes de inicializar funcionalidades avanzadas
        setTimeout(() => {
            this.initAdvancedFeatures();
        }, 100);
    }
    
    initAdvancedFeatures() {
        this.loadShiftConfig();
        this.bindAdvancedEvents();
        this.renderInteractiveCalendar();
        this.renderEngineersPool();
        this.loadTemplates();
        this.setupDragAndDrop();
    }
    
    bindAdvancedEvents() {
        // Configuración de turnos
        const saveConfigBtn = document.getElementById('saveConfigBtn');
        const autoAssignBtn = document.getElementById('autoAssignBtn');
        
        if (saveConfigBtn) saveConfigBtn.addEventListener('click', () => this.saveShiftConfig());
        if (autoAssignBtn) autoAssignBtn.addEventListener('click', () => this.autoAssignShifts());
        
        // Plantillas
        const saveTemplateBtn = document.getElementById('saveTemplateBtn');
        const applyTemplateBtn = document.getElementById('applyTemplateBtn');
        const deleteTemplateBtn = document.getElementById('deleteTemplateBtn');
        const templateSelect = document.getElementById('templateSelect');
        
        if (saveTemplateBtn) saveTemplateBtn.addEventListener('click', () => this.saveTemplate());
        if (applyTemplateBtn) applyTemplateBtn.addEventListener('click', () => this.applyTemplate());
        if (deleteTemplateBtn) deleteTemplateBtn.addEventListener('click', () => this.deleteTemplate());
        if (templateSelect) templateSelect.addEventListener('change', () => this.onTemplateSelect());
        
        // Vistas de calendario
        const monthView = document.getElementById('monthView');
        const weekView = document.getElementById('weekView');
        
        if (monthView) monthView.addEventListener('click', () => this.switchView('month'));
        if (weekView) weekView.addEventListener('click', () => this.switchView('week'));
        
        // Actualizar configuración en tiempo real
        ['morningStart', 'morningEnd', 'afternoonStart', 'afternoonEnd'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => this.updateShiftConfig());
            }
        });
    }
    
    // === CONFIGURACIÓN DE TURNOS ===
    
    loadShiftConfig() {
        const morningStart = document.getElementById('morningStart');
        const morningEnd = document.getElementById('morningEnd');
        const afternoonStart = document.getElementById('afternoonStart');
        const afternoonEnd = document.getElementById('afternoonEnd');
        
        if (morningStart) morningStart.value = this.shiftConfig.morningStart;
        if (morningEnd) morningEnd.value = this.shiftConfig.morningEnd;
        if (afternoonStart) afternoonStart.value = this.shiftConfig.afternoonStart;
        if (afternoonEnd) afternoonEnd.value = this.shiftConfig.afternoonEnd;
    }
    
    updateShiftConfig() {
        this.shiftConfig = {
            morningStart: document.getElementById('morningStart').value,
            morningEnd: document.getElementById('morningEnd').value,
            afternoonStart: document.getElementById('afternoonStart').value,
            afternoonEnd: document.getElementById('afternoonEnd').value
        };
        this.renderInteractiveCalendar();
    }
    
    saveShiftConfig() {
        this.updateShiftConfig();
        localStorage.setItem('shiftManager_config', JSON.stringify(this.shiftConfig));
        this.showNotification(t('config-saved'), 'success');
        
        // Actualizar opciones de turno en el formulario original
        this.updateShiftTimeOptions();
    }
    
    updateShiftTimeOptions() {
        const shiftTimeSelect = document.getElementById('shiftTime');
        shiftTimeSelect.innerHTML = `
            <option value="" data-translate="select-option">${t('select-option')}</option>
            <option value="${this.shiftConfig.morningStart}">${this.shiftConfig.morningStart} - ${this.shiftConfig.morningEnd} (${t('morning-shift')})</option>
            <option value="${this.shiftConfig.afternoonStart}">${this.shiftConfig.afternoonStart} - ${this.shiftConfig.afternoonEnd} (${t('afternoon-shift')})</option>
        `;
    }
    
    // === CALENDARIO INTERACTIVO ===
    
    renderInteractiveCalendar() {
        if (this.currentView === 'month') {
            this.renderMonthView();
        } else {
            this.renderWeekView();
        }
    }
    
    renderMonthView() {
        const calendarGrid = document.getElementById('calendarGrid');
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        // Limpiar calendario
        calendarGrid.innerHTML = '';
        
        // Agregar encabezados de días
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        dayNames.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });
        
        // Generar días del calendario
        const currentDate = new Date(startDate);
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const dayElement = this.createDayElement(currentDate);
                calendarGrid.appendChild(dayElement);
                currentDate.setDate(currentDate.getDate() + 1);
                
                if (currentDate > lastDay && day === 6) {
                    return; // Terminar si ya pasamos el último día del mes
                }
            }
        }
    }
    
    createDayElement(date) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.dataset.date = date.toISOString().split('T')[0];
        
        // Clases de estado
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        if (date.getMonth() !== this.currentMonth) {
            dayElement.classList.add('other-month');
        }
        
        // Número del día
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayElement.appendChild(dayNumber);
        
        // Slots de turnos
        const dayShifts = document.createElement('div');
        dayShifts.className = 'day-shifts';
        
        // Turno mañana
        const morningSlot = this.createShiftSlot(date, 'morning');
        dayShifts.appendChild(morningSlot);
        
        // Turno tarde
        const afternoonSlot = this.createShiftSlot(date, 'afternoon');
        dayShifts.appendChild(afternoonSlot);
        
        dayElement.appendChild(dayShifts);
        
        // Configurar drag & drop
        this.setupDayDropZone(dayElement);
        
        return dayElement;
    }
    
    createShiftSlot(date, shiftType) {
        const dateStr = date.toISOString().split('T')[0];
        const shiftTime = shiftType === 'morning' ? this.shiftConfig.morningStart : this.shiftConfig.afternoonStart;
        
        // Buscar turno existente
        const existingShift = this.shifts.find(shift => 
            shift.date === dateStr && shift.time === shiftTime
        );
        
        const slot = document.createElement('div');
        slot.className = `shift-slot ${shiftType}`;
        slot.dataset.date = dateStr;
        slot.dataset.shiftType = shiftType;
        slot.dataset.time = shiftTime;
        
        if (existingShift) {
            const engineer = this.engineers.find(eng => eng.id === existingShift.engineerId);
            slot.classList.add('occupied');
            if (existingShift.flightType === 'ram') {
                slot.classList.add('ram');
            }
            
            slot.innerHTML = `
                <span>${engineer ? engineer.name.split(' ')[0] : 'N/A'}</span>
                <div class="shift-actions">
                    <button class="shift-action-btn edit" onclick="shiftManager.editShift('${existingShift.id}')" title="${t('edit')}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="shift-action-btn delete" onclick="shiftManager.deleteShift('${existingShift.id}')" title="${t('delete')}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        } else {
            slot.innerHTML = `<span>${shiftType === 'morning' ? t('morning-shift') : t('afternoon-shift')}</span>`;
        }
        
        return slot;
    }
    
    renderWeekView() {
        // Implementación de vista semanal
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '<div class="week-view-placeholder">Vista semanal en desarrollo</div>';
    }
    
    switchView(view) {
        this.currentView = view;
        
        // Actualizar botones
        document.querySelectorAll('.view-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(view + 'View').classList.add('active');
        
        this.renderInteractiveCalendar();
    }
    
    // === DRAG & DROP ===
    
    setupDragAndDrop() {
        // Los eventos se configuran dinámicamente en renderEngineersPool y setupDayDropZone
    }
    
    renderEngineersPool() {
        const engineersPool = document.getElementById('engineersPool');
        
        if (this.engineers.length === 0) {
            engineersPool.innerHTML = `<p style="color: var(--text-secondary);">${t('no-engineers')}</p>`;
            return;
        }
        
        engineersPool.innerHTML = this.engineers.map(engineer => `
            <div class="engineer-card" draggable="true" data-engineer-id="${engineer.id}">
                <div class="engineer-icon">${engineer.name.charAt(0).toUpperCase()}</div>
                <span>${engineer.name}</span>
                <div class="status-indicator available"></div>
            </div>
        `).join('');
        
        // Configurar eventos de drag
        engineersPool.querySelectorAll('.engineer-card').forEach(card => {
            card.addEventListener('dragstart', (e) => this.handleDragStart(e));
            card.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });
    }
    
    setupDayDropZone(dayElement) {
        dayElement.addEventListener('dragover', (e) => this.handleDragOver(e));
        dayElement.addEventListener('drop', (e) => this.handleDrop(e));
        dayElement.addEventListener('dragleave', (e) => this.handleDragLeave(e));
    }
    
    handleDragStart(e) {
        this.draggedEngineer = {
            id: e.target.dataset.engineerId,
            element: e.target
        };
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedEngineer = null;
        
        // Limpiar estados de drop zones
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('drag-over', 'drag-invalid');
        });
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const dayElement = e.currentTarget;
        const isValid = this.validateDrop(dayElement);
        
        dayElement.classList.add(isValid ? 'drag-over' : 'drag-invalid');
    }
    
    handleDragLeave(e) {
        const dayElement = e.currentTarget;
        dayElement.classList.remove('drag-over', 'drag-invalid');
    }
    
    handleDrop(e) {
        e.preventDefault();
        const dayElement = e.currentTarget;
        dayElement.classList.remove('drag-over', 'drag-invalid');
        
        if (!this.draggedEngineer || !this.validateDrop(dayElement)) {
            return;
        }
        
        // Mostrar modal de asignación rápida
        this.showQuickAssignModal(dayElement.dataset.date, this.draggedEngineer.id);
    }
    
    validateDrop(dayElement) {
        if (!this.draggedEngineer) return false;
        
        const date = dayElement.dataset.date;
        const engineerId = this.draggedEngineer.id;
        
        // Validar que no sea una fecha pasada
        const dropDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (dropDate < today) return false;
        
        // Validar conflictos existentes
        const hasConflict = this.shifts.some(shift => 
            shift.date === date && shift.engineerId === engineerId
        );
        
        return !hasConflict;
    }
    
    showQuickAssignModal(date, engineerId) {
        const engineer = this.engineers.find(eng => eng.id === engineerId);
        if (!engineer) return;
        
        // Crear modal dinámico
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${t('quick-assign')} - ${engineer.name}</h3>
                <p><strong>${t('date')}:</strong> ${this.formatDate(date)}</p>
                <div class="quick-assign-options">
                    <div class="form-group">
                        <label>${t('area')}:</label>
                        <select id="quickArea">
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="A3">A3</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>${t('time')}:</label>
                        <select id="quickTime">
                            <option value="${this.shiftConfig.morningStart}">${this.shiftConfig.morningStart} - ${this.shiftConfig.morningEnd} (${t('morning-shift')})</option>
                            <option value="${this.shiftConfig.afternoonStart}">${this.shiftConfig.afternoonStart} - ${this.shiftConfig.afternoonEnd} (${t('afternoon-shift')})</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>${t('flight-type')}:</label>
                        <select id="quickFlightType">
                            <option value="regular">${t('regular-flight')}</option>
                            <option value="ram">${t('ram-flight')}</option>
                        </select>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="shiftManager.confirmQuickAssign('${date}', '${engineerId}')">
                        ${t('assign')}
                    </button>
                    <button class="btn btn-secondary" onclick="shiftManager.closeQuickAssignModal()">
                        ${t('cancel')}
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.currentQuickAssignModal = modal;
    }
    
    confirmQuickAssign(date, engineerId) {
        const area = document.getElementById('quickArea').value;
        const time = document.getElementById('quickTime').value;
        const flightType = document.getElementById('quickFlightType').value;
        
        const shiftData = {
            engineerId,
            area,
            date,
            time,
            flightType,
            flightNumber: '',
            notes: 'Asignado mediante drag & drop'
        };
        
        // Validar conflictos
        const conflict = this.checkShiftConflict(shiftData);
        if (conflict) {
            this.showNotification(t('shift-conflict'), 'error');
            return;
        }
        
        // Validar regla RAM
        if (flightType === 'ram') {
            const ramConflict = this.checkRAMConflict(shiftData);
            if (ramConflict) {
                this.showNotification(t('ram-conflict'), 'error');
                return;
            }
        }
        
        // Crear turno
        this.createShift(shiftData);
        this.closeQuickAssignModal();
        this.renderInteractiveCalendar();
    }
    
    closeQuickAssignModal() {
        if (this.currentQuickAssignModal) {
            this.currentQuickAssignModal.remove();
            this.currentQuickAssignModal = null;
        }
    }
    
    // === PLANTILLAS ===
    
    saveTemplate() {
        const templateName = document.getElementById('templateName').value.trim();
        const templateWeek = document.getElementById('templateWeek').value;
        
        if (!templateName) {
            this.showNotification(t('template-name-required'), 'error');
            return;
        }
        
        // Obtener turnos de la semana seleccionada
        const weekStart = templateWeek === 'current' ? 
            this.getWeekStart(new Date()) : 
            this.getWeekStart(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        
        const weekShifts = this.getWeekShifts(weekStart);
        
        const template = {
            id: this.generateId(),
            name: templateName,
            shifts: weekShifts.map(shift => ({
                dayOfWeek: new Date(shift.date).getDay(),
                area: shift.area,
                time: shift.time,
                flightType: shift.flightType,
                flightNumber: shift.flightNumber,
                notes: shift.notes,
                engineerName: this.engineers.find(eng => eng.id === shift.engineerId)?.name || ''
            })),
            createdAt: new Date().toISOString()
        };
        
        this.templates.push(template);
        this.saveTemplates();
        this.loadTemplates();
        
        document.getElementById('templateName').value = '';
        this.showNotification(t('template-saved'), 'success');
    }
    
    applyTemplate() {
        const templateId = document.getElementById('templateSelect').value;
        if (!templateId) return;
        
        const template = this.templates.find(t => t.id === templateId);
        if (!template) return;
        
        const weekStart = this.getWeekStart(new Date());
        let appliedCount = 0;
        let conflictCount = 0;
        
        template.shifts.forEach(templateShift => {
            const shiftDate = new Date(weekStart);
            shiftDate.setDate(shiftDate.getDate() + templateShift.dayOfWeek);
            const dateStr = shiftDate.toISOString().split('T')[0];
            
            // Buscar ingeniero por nombre
            const engineer = this.engineers.find(eng => 
                eng.name.toLowerCase().includes(templateShift.engineerName.toLowerCase())
            );
            
            if (!engineer) return;
            
            const shiftData = {
                engineerId: engineer.id,
                area: templateShift.area,
                date: dateStr,
                time: templateShift.time,
                flightType: templateShift.flightType,
                flightNumber: templateShift.flightNumber || '',
                notes: templateShift.notes || 'Aplicado desde plantilla'
            };
            
            // Verificar conflictos
            const hasConflict = this.checkShiftConflict(shiftData) || 
                (shiftData.flightType === 'ram' && this.checkRAMConflict(shiftData));
            
            if (!hasConflict) {
                this.createShift(shiftData);
                appliedCount++;
            } else {
                conflictCount++;
            }
        });
        
        this.renderInteractiveCalendar();
        
        if (appliedCount > 0) {
            const message = conflictCount > 0 ? 
                `${t('template-applied')} (${appliedCount} turnos, ${conflictCount} conflictos)` :
                `${t('template-applied')} (${appliedCount} turnos)`;
            this.showNotification(message, 'success');
        } else {
            this.showNotification(t('assignment-conflicts'), 'error');
        }
    }
    
    deleteTemplate() {
        const templateId = document.getElementById('templateSelect').value;
        if (!templateId) return;
        
        this.showConfirmModal(
            '¿Está seguro de que desea eliminar esta plantilla?',
            () => {
                this.templates = this.templates.filter(t => t.id !== templateId);
                this.saveTemplates();
                this.loadTemplates();
                this.showNotification(t('template-deleted'), 'success');
            }
        );
    }
    
    loadTemplates() {
        const templateSelect = document.getElementById('templateSelect');
        templateSelect.innerHTML = `<option value="" data-translate="select-template">${t('select-template')}</option>`;
        
        this.templates.forEach(template => {
            const option = document.createElement('option');
            option.value = template.id;
            option.textContent = `${template.name} (${template.shifts.length} turnos)`;
            templateSelect.appendChild(option);
        });
    }
    
    onTemplateSelect() {
        const templateId = document.getElementById('templateSelect').value;
        const deleteBtn = document.getElementById('deleteTemplateBtn');
        const applyBtn = document.getElementById('applyTemplateBtn');
        
        deleteBtn.disabled = !templateId;
        applyBtn.disabled = !templateId;
    }
    
    // === AUTO-ASIGNACIÓN INTELIGENTE ===
    
    autoAssignShifts() {
        if (this.engineers.length === 0) {
            this.showNotification(t('no-engineers-available'), 'error');
            return;
        }
        
        // Obtener fechas de la próxima semana
        const nextWeekStart = new Date();
        nextWeekStart.setDate(nextWeekStart.getDate() + 7);
        const weekStart = this.getWeekStart(nextWeekStart);
        
        const assignments = this.generateSmartAssignments(weekStart);
        let assignedCount = 0;
        
        assignments.forEach(assignment => {
            if (!this.checkShiftConflict(assignment) && 
                !(assignment.flightType === 'ram' && this.checkRAMConflict(assignment))) {
                this.createShift(assignment);
                assignedCount++;
            }
        });
        
        this.renderInteractiveCalendar();
        
        if (assignedCount > 0) {
            this.showNotification(`${t('auto-assignment-complete')} (${assignedCount} turnos)`, 'success');
        } else {
            this.showNotification(t('assignment-conflicts'), 'warning');
        }
    }
    
    generateSmartAssignments(weekStart) {
        const assignments = [];
        const areas = ['A1', 'A2', 'A3'];
        const shifts = [
            { time: this.shiftConfig.morningStart, type: 'morning' },
            { time: this.shiftConfig.afternoonStart, type: 'afternoon' }
        ];
        
        // Calcular carga de trabajo actual de cada ingeniero
        const engineerWorkload = this.calculateEngineerWorkload();
        
        // Generar asignaciones para cada día de la semana
        for (let day = 0; day < 7; day++) {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + day);
            const dateStr = date.toISOString().split('T')[0];
            
            // Saltar fines de semana si es necesario
            if (date.getDay() === 0 || date.getDay() === 6) continue;
            
            areas.forEach(area => {
                shifts.forEach(shift => {
                    // Seleccionar ingeniero con menor carga de trabajo
                    const availableEngineers = this.engineers.filter(engineer => 
                        !this.hasConflictForDate(engineer.id, dateStr, shift.time)
                    );
                    
                    if (availableEngineers.length === 0) return;
                    
                    // Ordenar por carga de trabajo
                    availableEngineers.sort((a, b) => 
                        engineerWorkload[a.id] - engineerWorkload[b.id]
                    );
                    
                    const selectedEngineer = availableEngineers[0];
                    
                    assignments.push({
                        engineerId: selectedEngineer.id,
                        area,
                        date: dateStr,
                        time: shift.time,
                        flightType: Math.random() > 0.8 ? 'ram' : 'regular', // 20% probabilidad RAM
                        flightNumber: '',
                        notes: 'Auto-asignado inteligentemente'
                    });
                    
                    // Actualizar carga de trabajo
                    engineerWorkload[selectedEngineer.id]++;
                });
            });
        }
        
        return assignments;
    }
    
    calculateEngineerWorkload() {
        const workload = {};
        this.engineers.forEach(engineer => {
            workload[engineer.id] = this.shifts.filter(shift => 
                shift.engineerId === engineer.id
            ).length;
        });
        return workload;
    }
    
    hasConflictForDate(engineerId, date, time) {
        return this.shifts.some(shift => 
            shift.engineerId === engineerId && 
            shift.date === date && 
            shift.time === time
        );
    }
    
    // === UTILIDADES ===
    
    getWeekStart(date) {
        const weekStart = new Date(date);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        weekStart.setHours(0, 0, 0, 0);
        return weekStart;
    }
    
    getWeekShifts(weekStart) {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        return this.shifts.filter(shift => {
            const shiftDate = new Date(shift.date);
            return shiftDate >= weekStart && shiftDate <= weekEnd;
        });
    }
    
    saveTemplates() {
        localStorage.setItem('shiftManager_templates', JSON.stringify(this.templates));
    }
    
    // Sobrescribir método de renderizado para incluir nuevas funcionalidades
    renderShiftsTable() {
        super.renderShiftsTable();
        this.renderInteractiveCalendar();
    }
    
    // Sobrescribir método de actualización de ingenieros
    renderEngineersTable() {
        super.renderEngineersTable();
        this.renderEngineersPool();
    }
}

// Extender la inicialización existente con funcionalidades avanzadas
document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar si no existe ya una instancia
    if (!window.shiftManager) {
        window.shiftManager = new AdvancedShiftManager();
    } else {
        // Si ya existe, convertirla a la versión avanzada
        const existingData = {
            engineers: window.shiftManager.engineers,
            shifts: window.shiftManager.shifts,
            currentMonth: window.shiftManager.currentMonth,
            currentYear: window.shiftManager.currentYear
        };
        window.shiftManager = new AdvancedShiftManager();
        Object.assign(window.shiftManager, existingData);
        window.shiftManager.updateStats();
        window.shiftManager.renderEngineersTable();
        window.shiftManager.renderShiftsTable();
        window.shiftManager.updateEngineerSelect();
    }
});
