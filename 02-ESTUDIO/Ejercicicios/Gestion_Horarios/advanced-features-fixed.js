// Funcionalidades Avanzadas para el Sistema de Gestión de Turnos
// Versión corregida que no interfiere con el CRUD básico

// Esperar a que el sistema básico esté completamente inicializado
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco más para asegurar que todo esté listo
    setTimeout(() => {
        if (window.shiftManager) {
            initAdvancedFeatures();
        }
    }, 500);
});

function initAdvancedFeatures() {
    // Configuración de turnos
    const shiftConfig = JSON.parse(localStorage.getItem('shiftManager_config')) || {
        morningStart: '08:00',
        morningEnd: '15:00',
        afternoonStart: '15:30',
        afternoonEnd: '23:30'
    };
    
    const templates = JSON.parse(localStorage.getItem('shiftManager_templates')) || [];
    
    // Cargar configuración inicial
    loadShiftConfig(shiftConfig);
    loadTemplates(templates);
    renderInteractiveCalendar();
    renderEngineersPool();
    
    // Bind eventos avanzados
    bindAdvancedEvents(shiftConfig, templates);
}

function bindAdvancedEvents(shiftConfig, templates) {
    // Configuración de turnos
    const saveConfigBtn = document.getElementById('saveConfigBtn');
    const autoAssignBtn = document.getElementById('autoAssignBtn');
    
    if (saveConfigBtn) {
        saveConfigBtn.addEventListener('click', () => saveShiftConfig(shiftConfig));
    }
    if (autoAssignBtn) {
        autoAssignBtn.addEventListener('click', () => autoAssignShifts());
    }
    
    // Plantillas
    const saveTemplateBtn = document.getElementById('saveTemplateBtn');
    const applyTemplateBtn = document.getElementById('applyTemplateBtn');
    const deleteTemplateBtn = document.getElementById('deleteTemplateBtn');
    const templateSelect = document.getElementById('templateSelect');
    
    if (saveTemplateBtn) {
        saveTemplateBtn.addEventListener('click', () => saveTemplate(templates));
    }
    if (applyTemplateBtn) {
        applyTemplateBtn.addEventListener('click', () => applyTemplate(templates));
    }
    if (deleteTemplateBtn) {
        deleteTemplateBtn.addEventListener('click', () => deleteTemplate(templates));
    }
    if (templateSelect) {
        templateSelect.addEventListener('change', () => onTemplateSelect());
    }
    
    // Vistas de calendario
    const monthView = document.getElementById('monthView');
    const weekView = document.getElementById('weekView');
    
    if (monthView) monthView.addEventListener('click', () => switchView('month'));
    if (weekView) weekView.addEventListener('click', () => switchView('week'));
    
    // Actualizar configuración en tiempo real
    ['morningStart', 'morningEnd', 'afternoonStart', 'afternoonEnd'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', () => updateShiftConfig(shiftConfig));
        }
    });
}

// === CONFIGURACIÓN DE TURNOS ===

function loadShiftConfig(shiftConfig) {
    const morningStart = document.getElementById('morningStart');
    const morningEnd = document.getElementById('morningEnd');
    const afternoonStart = document.getElementById('afternoonStart');
    const afternoonEnd = document.getElementById('afternoonEnd');
    
    if (morningStart) morningStart.value = shiftConfig.morningStart;
    if (morningEnd) morningEnd.value = shiftConfig.morningEnd;
    if (afternoonStart) afternoonStart.value = shiftConfig.afternoonStart;
    if (afternoonEnd) afternoonEnd.value = shiftConfig.afternoonEnd;
}

function updateShiftConfig(shiftConfig) {
    const morningStart = document.getElementById('morningStart');
    const morningEnd = document.getElementById('morningEnd');
    const afternoonStart = document.getElementById('afternoonStart');
    const afternoonEnd = document.getElementById('afternoonEnd');
    
    if (morningStart) shiftConfig.morningStart = morningStart.value;
    if (morningEnd) shiftConfig.morningEnd = morningEnd.value;
    if (afternoonStart) shiftConfig.afternoonStart = afternoonStart.value;
    if (afternoonEnd) shiftConfig.afternoonEnd = afternoonEnd.value;
    
    renderInteractiveCalendar();
}

function saveShiftConfig(shiftConfig) {
    updateShiftConfig(shiftConfig);
    localStorage.setItem('shiftManager_config', JSON.stringify(shiftConfig));
    
    if (window.shiftManager && window.shiftManager.showNotification) {
        window.shiftManager.showNotification('Configuración guardada exitosamente', 'success');
    }
    
    updateShiftTimeOptions(shiftConfig);
}

function updateShiftTimeOptions(shiftConfig) {
    const shiftTimeSelect = document.getElementById('shiftTime');
    if (shiftTimeSelect) {
        shiftTimeSelect.innerHTML = `
            <option value="">-- Seleccionar --</option>
            <option value="${shiftConfig.morningStart}">${shiftConfig.morningStart} - ${shiftConfig.morningEnd} (Turno Mañana)</option>
            <option value="${shiftConfig.afternoonStart}">${shiftConfig.afternoonStart} - ${shiftConfig.afternoonEnd} (Turno Tarde)</option>
        `;
    }
}

// === CALENDARIO INTERACTIVO ===

function renderInteractiveCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid || !window.shiftManager) return;
    
    const currentMonth = window.shiftManager.currentMonth;
    const currentYear = window.shiftManager.currentYear;
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
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
            const dayElement = createDayElement(currentDate, currentMonth);
            calendarGrid.appendChild(dayElement);
            currentDate.setDate(currentDate.getDate() + 1);
            
            if (currentDate > lastDay && day === 6) {
                return;
            }
        }
    }
}

function createDayElement(date, currentMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.dataset.date = date.toISOString().split('T')[0];
    
    // Clases de estado
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
        dayElement.classList.add('today');
    }
    if (date.getMonth() !== currentMonth) {
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
    
    // Turno mañana - 6 slots
    const morningContainer = document.createElement('div');
    morningContainer.className = 'shift-container morning-container';
    morningContainer.innerHTML = '<div class="shift-label">Mañana (08:00-15:00)</div>';
    
    const morningSlotsGrid = document.createElement('div');
    morningSlotsGrid.className = 'shift-slots-grid';
    
    for (let i = 0; i < 6; i++) {
        const morningSlot = createShiftSlot(date, 'morning', i);
        setupSlotDropZone(morningSlot);
        morningSlotsGrid.appendChild(morningSlot);
    }
    
    morningContainer.appendChild(morningSlotsGrid);
    dayShifts.appendChild(morningContainer);
    
    // Turno tarde - 6 slots
    const afternoonContainer = document.createElement('div');
    afternoonContainer.className = 'shift-container afternoon-container';
    afternoonContainer.innerHTML = '<div class="shift-label">Tarde (15:30-23:30)</div>';
    
    const afternoonSlotsGrid = document.createElement('div');
    afternoonSlotsGrid.className = 'shift-slots-grid';
    
    for (let i = 0; i < 6; i++) {
        const afternoonSlot = createShiftSlot(date, 'afternoon', i);
        setupSlotDropZone(afternoonSlot);
        afternoonSlotsGrid.appendChild(afternoonSlot);
    }
    
    afternoonContainer.appendChild(afternoonSlotsGrid);
    dayShifts.appendChild(afternoonContainer);
    
    dayElement.appendChild(dayShifts);
    
    return dayElement;
}

function createShiftSlot(date, shiftType, slotIndex = 0) {
    const dateStr = date.toISOString().split('T')[0];
    const shiftConfig = JSON.parse(localStorage.getItem('shiftManager_config')) || {
        morningStart: '08:00',
        afternoonStart: '15:30'
    };
    const shiftTime = shiftType === 'morning' ? shiftConfig.morningStart : shiftConfig.afternoonStart;
    
    // Buscar turnos existentes para este día y turno
    const existingShifts = window.shiftManager.shifts.filter(shift => 
        shift.date === dateStr && shift.time === shiftTime
    );
    
    // Obtener el turno específico para este slot (por índice)
    const existingShift = existingShifts[slotIndex];
    
    const slot = document.createElement('div');
    slot.className = `shift-slot ${shiftType}`;
    slot.dataset.date = dateStr;
    slot.dataset.shiftType = shiftType;
    slot.dataset.time = shiftTime;
    slot.dataset.slotIndex = slotIndex;
    
    if (existingShift) {
        const engineer = window.shiftManager.engineers.find(eng => eng.id === existingShift.engineerId);
        slot.classList.add('occupied');
        if (existingShift.flightType === 'ram') {
            slot.classList.add('ram');
        }
        
        const engineerName = engineer ? engineer.name.split(' ')[0] : 'N/A';
        const area = existingShift.area || '';
        
        slot.innerHTML = `
            <div class="slot-content">
                <div class="engineer-name">${engineerName}</div>
                <div class="engineer-area">${area}</div>
                ${existingShift.flightType === 'ram' ? '<div class="ram-indicator">RAM</div>' : ''}
            </div>
            <div class="shift-actions">
                <button class="shift-action-btn edit" onclick="window.shiftManager.editShift('${existingShift.id}')" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="shift-action-btn delete" onclick="window.shiftManager.deleteShift('${existingShift.id}')" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    } else {
        slot.innerHTML = `
            <div class="slot-content empty">
                <i class="fas fa-plus"></i>
                <span>Disponible</span>
            </div>
        `;
    }
    
    return slot;
}

// === PANEL DE INGENIEROS ===

function renderEngineersPool() {
    const engineersPool = document.getElementById('engineersPool');
    if (!engineersPool || !window.shiftManager) return;
    
    const engineers = window.shiftManager.engineers;
    
    if (engineers.length === 0) {
        engineersPool.innerHTML = '<p style="color: var(--text-secondary);">No hay ingenieros registrados</p>';
        return;
    }
    
    engineersPool.innerHTML = engineers.map(engineer => `
        <div class="engineer-card" draggable="true" data-engineer-id="${engineer.id}">
            <div class="engineer-icon">${engineer.name.charAt(0).toUpperCase()}</div>
            <span>${engineer.name}</span>
            <div class="status-indicator available"></div>
        </div>
    `).join('');
    
    // Configurar eventos de drag
    engineersPool.querySelectorAll('.engineer-card').forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
}

// === PLANTILLAS ===

function loadTemplates(templates) {
    const templateSelect = document.getElementById('templateSelect');
    if (!templateSelect) return;
    
    templateSelect.innerHTML = '<option value="">-- Seleccionar Plantilla --</option>';
    
    templates.forEach(template => {
        const option = document.createElement('option');
        option.value = template.id;
        option.textContent = `${template.name} (${template.shifts.length} turnos)`;
        templateSelect.appendChild(option);
    });
}

function saveTemplate(templates) {
    const templateName = document.getElementById('templateName');
    if (!templateName || !templateName.value.trim()) {
        if (window.shiftManager && window.shiftManager.showNotification) {
            window.shiftManager.showNotification('El nombre de la plantilla es requerido', 'error');
        }
        return;
    }
    
    // Implementación simplificada
    const template = {
        id: Date.now().toString(),
        name: templateName.value.trim(),
        shifts: [],
        createdAt: new Date().toISOString()
    };
    
    templates.push(template);
    localStorage.setItem('shiftManager_templates', JSON.stringify(templates));
    loadTemplates(templates);
    
    templateName.value = '';
    if (window.shiftManager && window.shiftManager.showNotification) {
        window.shiftManager.showNotification('Plantilla guardada exitosamente', 'success');
    }
}

function applyTemplate(templates) {
    const templateSelect = document.getElementById('templateSelect');
    if (!templateSelect || !templateSelect.value) return;
    
    if (window.shiftManager && window.shiftManager.showNotification) {
        window.shiftManager.showNotification('Funcionalidad en desarrollo', 'info');
    }
}

function deleteTemplate(templates) {
    const templateSelect = document.getElementById('templateSelect');
    if (!templateSelect || !templateSelect.value) return;
    
    const templateId = templateSelect.value;
    const templateIndex = templates.findIndex(t => t.id === templateId);
    
    if (templateIndex !== -1) {
        templates.splice(templateIndex, 1);
        localStorage.setItem('shiftManager_templates', JSON.stringify(templates));
        loadTemplates(templates);
        
        if (window.shiftManager && window.shiftManager.showNotification) {
            window.shiftManager.showNotification('Plantilla eliminada exitosamente', 'success');
        }
    }
}

function onTemplateSelect() {
    const templateSelect = document.getElementById('templateSelect');
    const deleteBtn = document.getElementById('deleteTemplateBtn');
    const applyBtn = document.getElementById('applyTemplateBtn');
    
    if (deleteBtn) deleteBtn.disabled = !templateSelect.value;
    if (applyBtn) applyBtn.disabled = !templateSelect.value;
}

// === AUTO-ASIGNACIÓN ===

function autoAssignShifts() {
    if (!window.shiftManager) return;
    
    if (window.shiftManager.engineers.length === 0) {
        window.shiftManager.showNotification('No hay ingenieros disponibles para asignar', 'error');
        return;
    }
    
    // Implementación simplificada
    window.shiftManager.showNotification('Auto-asignación en desarrollo', 'info');
}

// === VISTAS ===

function switchView(view) {
    const monthView = document.getElementById('monthView');
    const weekView = document.getElementById('weekView');
    
    if (monthView && weekView) {
        monthView.classList.toggle('active', view === 'month');
        weekView.classList.toggle('active', view === 'week');
    }
    
    renderInteractiveCalendar();
}

// === DRAG & DROP FUNCTIONALITY ===

let draggedEngineer = null;

function handleDragStart(e) {
    draggedEngineer = {
        id: e.target.dataset.engineerId,
        element: e.target,
        name: e.target.querySelector('span').textContent
    };
    
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedEngineer.id);
    
    // Mostrar indicadores visuales en slots disponibles
    document.querySelectorAll('.shift-slot:not(.occupied)').forEach(slot => {
        if (validateDropTarget(slot)) {
            slot.classList.add('drop-available');
        } else {
            slot.classList.add('drop-invalid');
        }
    });
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedEngineer = null;
    
    // Limpiar indicadores visuales
    document.querySelectorAll('.shift-slot').forEach(slot => {
        slot.classList.remove('drag-over', 'drop-available', 'drop-invalid');
    });
}

function setupSlotDropZone(slot) {
    // Solo configurar drop zone si el slot no está ocupado
    if (!slot.classList.contains('occupied')) {
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('dragenter', handleDragEnter);
        slot.addEventListener('dragleave', handleDragLeave);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    if (validateDropTarget(e.target)) {
        e.target.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    if (!draggedEngineer || !validateDropTarget(e.target)) {
        return;
    }
    
    const slot = e.target.closest('.shift-slot');
    if (!slot) return;
    
    const date = slot.dataset.date;
    const shiftType = slot.dataset.shiftType;
    const time = slot.dataset.time;
    
    // Mostrar modal de asignación rápida
    showQuickAssignModal(date, time, shiftType, draggedEngineer);
}

function validateDropTarget(target) {
    if (!draggedEngineer || !window.shiftManager) return false;
    
    const slot = target.closest('.shift-slot');
    if (!slot || slot.classList.contains('occupied')) return false;
    
    const date = slot.dataset.date;
    const time = slot.dataset.time;
    const engineerId = draggedEngineer.id;
    
    // Validar que no sea una fecha pasada
    const dropDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dropDate < today) return false;
    
    // Validar que el ingeniero no tenga ya un turno en esta fecha y hora
    const hasConflict = window.shiftManager.shifts.some(shift => 
        shift.date === date && 
        shift.time === time &&
        shift.engineerId === engineerId
    );
    
    return !hasConflict;
}

function showQuickAssignModal(date, time, shiftType, engineer) {
    // Crear modal dinámico
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.id = 'quickAssignModal';
    
    const shiftTypeText = shiftType === 'morning' ? 'Turno Mañana' : 'Turno Tarde';
    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Asignación Rápida</h3>
            <div class="quick-assign-info">
                <p><strong>Ingeniero:</strong> ${engineer.name}</p>
                <p><strong>Fecha:</strong> ${formattedDate}</p>
                <p><strong>Turno:</strong> ${shiftTypeText} (${time})</p>
            </div>
            <div class="quick-assign-options">
                <div class="form-group">
                    <label for="quickArea">Área:</label>
                    <select id="quickArea" required>
                        <option value="">-- Seleccionar --</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="A3">A3</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="quickFlightType">Tipo de Vuelo:</label>
                    <select id="quickFlightType" required>
                        <option value="regular">Vuelo Regular</option>
                        <option value="ram">Vuelo RAM (Royal Air Maroc)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="quickFlightNumber">Número de Vuelo:</label>
                    <input type="text" id="quickFlightNumber" placeholder="Opcional">
                </div>
                <div class="form-group">
                    <label for="quickNotes">Notas:</label>
                    <textarea id="quickNotes" rows="2" placeholder="Notas adicionales (opcional)"></textarea>
                </div>
            </div>
            <div id="quickRamWarning" class="warning-message" style="display: none;">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Atención: Para vuelos RAM, el ingeniero debe descansar el día anterior.</span>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="confirmQuickAssign('${date}', '${time}', '${engineer.id}')">
                    <i class="fas fa-check"></i>
                    Asignar Turno
                </button>
                <button class="btn btn-secondary" onclick="closeQuickAssignModal()">
                    <i class="fas fa-times"></i>
                    Cancelar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Configurar eventos
    const flightTypeSelect = document.getElementById('quickFlightType');
    const ramWarning = document.getElementById('quickRamWarning');
    
    flightTypeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'ram') {
            ramWarning.style.display = 'block';
        } else {
            ramWarning.style.display = 'none';
        }
    });
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeQuickAssignModal();
        }
    });
}

function confirmQuickAssign(date, time, engineerId) {
    const area = document.getElementById('quickArea').value;
    const flightType = document.getElementById('quickFlightType').value;
    const flightNumber = document.getElementById('quickFlightNumber').value;
    const notes = document.getElementById('quickNotes').value;
    
    if (!area) {
        if (window.shiftManager && window.shiftManager.showNotification) {
            window.shiftManager.showNotification('Por favor selecciona un área', 'error');
        }
        return;
    }
    
    const shiftData = {
        engineerId,
        area,
        date,
        time,
        flightType,
        flightNumber: flightNumber.trim(),
        notes: notes.trim() || 'Asignado mediante drag & drop'
    };
    
    // Validar conflictos
    if (window.shiftManager) {
        const conflict = window.shiftManager.checkShiftConflict ? 
            window.shiftManager.checkShiftConflict(shiftData) : false;
        
        if (conflict) {
            window.shiftManager.showNotification('Ya existe un turno para este ingeniero en esta fecha y hora', 'error');
            return;
        }
        
        // Validar regla RAM
        if (flightType === 'ram') {
            const ramConflict = window.shiftManager.checkRAMConflict ? 
                window.shiftManager.checkRAMConflict(shiftData) : false;
            
            if (ramConflict) {
                window.shiftManager.showNotification('Conflicto: El ingeniero tiene un turno el día anterior al vuelo RAM', 'error');
                return;
            }
        }
        
        // Crear turno
        window.shiftManager.createShift(shiftData);
        window.shiftManager.showNotification('Turno asignado exitosamente', 'success');
    }
    
    closeQuickAssignModal();
    
    // Actualizar calendario
    setTimeout(() => {
        renderInteractiveCalendar();
    }, 100);
}

function closeQuickAssignModal() {
    const modal = document.getElementById('quickAssignModal');
    if (modal) {
        modal.remove();
    }
}

// Extender el sistema existente cuando se actualicen los datos
if (window.shiftManager) {
    const originalRenderShiftsTable = window.shiftManager.renderShiftsTable;
    const originalRenderEngineersTable = window.shiftManager.renderEngineersTable;
    
    window.shiftManager.renderShiftsTable = function() {
        originalRenderShiftsTable.call(this);
        setTimeout(() => renderInteractiveCalendar(), 100);
    };
    
    window.shiftManager.renderEngineersTable = function() {
        originalRenderEngineersTable.call(this);
        setTimeout(() => renderEngineersPool(), 100);
    };
}
