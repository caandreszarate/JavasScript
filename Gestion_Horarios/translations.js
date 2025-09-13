// Sistema de Traducciones para la Aplicación de Gestión de Turnos
const translations = {
    es: {
        // Header
        'app-title': 'Sistema de Gestión de Turnos',
        'print-report': 'Imprimir Reporte',
        
        // Control Panel
        'control-panel': 'Panel de Control',
        'total-engineers': 'Total Ingenieros',
        'total-shifts': 'Total Turnos',
        'ram-flights': 'Vuelos RAM',
        
        // Engineer Management
        'engineer-management': 'Gestión de Ingenieros',
        'engineer-name': 'Nombre del Ingeniero',
        'engineer-email': 'Email',
        'engineer-phone': 'Teléfono',
        'add-engineer': 'Agregar Ingeniero',
        'update-engineer': 'Actualizar Ingeniero',
        'engineers-list': 'Lista de Ingenieros',
        
        // Shift Management
        'shift-management': 'Gestión de Turnos',
        'select-engineer': 'Seleccionar Ingeniero',
        'area': 'Área',
        'date': 'Fecha',
        'time': 'Hora',
        'flight-type': 'Tipo de Vuelo',
        'flight-number': 'Número de Vuelo',
        'notes': 'Notas',
        'add-shift': 'Agregar Turno',
        'update-shift': 'Actualizar Turno',
        'shifts-calendar': 'Calendario de Turnos',
        
        // Flight Types
        'regular-flight': 'Vuelo Regular',
        'ram-flight': 'Vuelo RAM (Royal Air Maroc)',
        
        // Table Headers
        'name': 'Nombre',
        'email': 'Email',
        'phone': 'Teléfono',
        'engineer': 'Ingeniero',
        'actions': 'Acciones',
        
        // Actions
        'edit': 'Editar',
        'delete': 'Eliminar',
        'cancel': 'Cancelar',
        'save': 'Guardar',
        'yes': 'Sí',
        'no': 'No',
        
        // Options
        'select-option': '-- Seleccionar --',
        
        // Messages
        'ram-warning': 'Atención: Para vuelos RAM, el ingeniero debe descansar el día anterior. Verificar disponibilidad.',
        'confirm-action': 'Confirmar Acción',
        'confirm-delete-engineer': '¿Está seguro de que desea eliminar este ingeniero?',
        'confirm-delete-shift': '¿Está seguro de que desea eliminar este turno?',
        'engineer-added': 'Ingeniero agregado exitosamente',
        'engineer-updated': 'Ingeniero actualizado exitosamente',
        'engineer-deleted': 'Ingeniero eliminado exitosamente',
        'shift-added': 'Turno agregado exitosamente',
        'shift-updated': 'Turno actualizado exitosamente',
        'shift-deleted': 'Turno eliminado exitosamente',
        'engineer-has-shifts': 'No se puede eliminar el ingeniero porque tiene turnos asignados',
        'ram-conflict': 'Conflicto: El ingeniero tiene un turno el día anterior al vuelo RAM',
        'shift-conflict': 'Ya existe un turno para este ingeniero en esta fecha y hora',
        'no-engineers': 'No hay ingenieros registrados',
        'no-shifts': 'No hay turnos programados',
        'form-validation-error': 'Por favor, complete todos los campos requeridos',
        
        // Months
        'january': 'Enero',
        'february': 'Febrero',
        'march': 'Marzo',
        'april': 'Abril',
        'may': 'Mayo',
        'june': 'Junio',
        'july': 'Julio',
        'august': 'Agosto',
        'september': 'Septiembre',
        'october': 'Octubre',
        'november': 'Noviembre',
        'december': 'Diciembre',
        
        // Print Report
        'print-title': 'Reporte de Turnos - Aeropuerto Malabo',
        'generated-on': 'Generado el',
        'engineers-report': 'Reporte de Ingenieros',
        'shifts-report': 'Reporte de Turnos',
        'summary': 'Resumen',
        'total': 'Total',
        
        // Shift Configuration
        'shift-configuration': 'Configuración de Turnos',
        'morning-start': 'Turno Mañana - Inicio',
        'morning-end': 'Turno Mañana - Fin',
        'afternoon-start': 'Turno Tarde - Inicio',
        'afternoon-end': 'Turno Tarde - Fin',
        'save-config': 'Guardar Configuración',
        'auto-assign': 'Auto-Asignación Inteligente',
        'config-saved': 'Configuración guardada exitosamente',
        
        // Templates
        'shift-templates': 'Plantillas de Turnos',
        'template-name': 'Nombre de la plantilla',
        'current-week': 'Semana Actual',
        'next-week': 'Próxima Semana',
        'save-template': 'Guardar Plantilla',
        'select-template': '-- Seleccionar Plantilla --',
        'apply-template': 'Aplicar Plantilla',
        'delete-template': 'Eliminar',
        'template-saved': 'Plantilla guardada exitosamente',
        'template-applied': 'Plantilla aplicada exitosamente',
        'template-deleted': 'Plantilla eliminada exitosamente',
        'template-name-required': 'El nombre de la plantilla es requerido',
        
        // Interactive Calendar
        'interactive-calendar': 'Calendario Interactivo',
        'month-view': 'Vista Mes',
        'week-view': 'Vista Semana',
        'available-engineers': 'Ingenieros Disponibles',
        'shifts-list': 'Lista de Turnos',
        'drag-engineer': 'Arrastra un ingeniero aquí',
        'drop-to-assign': 'Suelta para asignar turno',
        'morning-shift': 'Turno Mañana',
        'afternoon-shift': 'Turno Tarde',
        
        // Auto Assignment
        'auto-assignment-complete': 'Auto-asignación completada',
        'auto-assignment-partial': 'Auto-asignación parcial completada',
        'no-engineers-available': 'No hay ingenieros disponibles para asignar',
        'assignment-conflicts': 'Se encontraron conflictos en la asignación',
        
        // Quick Assignment
        'quick-assign': 'Asignación Rápida',
        'assign': 'Asignar'
    },
    
    en: {
        // Header
        'app-title': 'Shift Management System',
        'print-report': 'Print Report',
        
        // Control Panel
        'control-panel': 'Control Panel',
        'total-engineers': 'Total Engineers',
        'total-shifts': 'Total Shifts',
        'ram-flights': 'RAM Flights',
        
        // Engineer Management
        'engineer-management': 'Engineer Management',
        'engineer-name': 'Engineer Name',
        'engineer-email': 'Email',
        'engineer-phone': 'Phone',
        'add-engineer': 'Add Engineer',
        'update-engineer': 'Update Engineer',
        'engineers-list': 'Engineers List',
        
        // Shift Management
        'shift-management': 'Shift Management',
        'select-engineer': 'Select Engineer',
        'area': 'Area',
        'date': 'Date',
        'time': 'Time',
        'flight-type': 'Flight Type',
        'flight-number': 'Flight Number',
        'notes': 'Notes',
        'add-shift': 'Add Shift',
        'update-shift': 'Update Shift',
        'shifts-calendar': 'Shifts Calendar',
        
        // Flight Types
        'regular-flight': 'Regular Flight',
        'ram-flight': 'RAM Flight (Royal Air Maroc)',
        
        // Table Headers
        'name': 'Name',
        'email': 'Email',
        'phone': 'Phone',
        'engineer': 'Engineer',
        'actions': 'Actions',
        
        // Actions
        'edit': 'Edit',
        'delete': 'Delete',
        'cancel': 'Cancel',
        'save': 'Save',
        'yes': 'Yes',
        'no': 'No',
        
        // Options
        'select-option': '-- Select --',
        
        // Messages
        'ram-warning': 'Warning: For RAM flights, the engineer must rest the previous day. Check availability.',
        'confirm-action': 'Confirm Action',
        'confirm-delete-engineer': 'Are you sure you want to delete this engineer?',
        'confirm-delete-shift': 'Are you sure you want to delete this shift?',
        'engineer-added': 'Engineer added successfully',
        'engineer-updated': 'Engineer updated successfully',
        'engineer-deleted': 'Engineer deleted successfully',
        'shift-added': 'Shift added successfully',
        'shift-updated': 'Shift updated successfully',
        'shift-deleted': 'Shift deleted successfully',
        'engineer-has-shifts': 'Cannot delete engineer because they have assigned shifts',
        'ram-conflict': 'Conflict: Engineer has a shift the day before the RAM flight',
        'shift-conflict': 'A shift already exists for this engineer on this date and time',
        'no-engineers': 'No engineers registered',
        'no-shifts': 'No shifts scheduled',
        'form-validation-error': 'Please fill in all required fields',
        
        // Months
        'january': 'January',
        'february': 'February',
        'march': 'March',
        'april': 'April',
        'may': 'May',
        'june': 'June',
        'july': 'July',
        'august': 'August',
        'september': 'September',
        'october': 'October',
        'november': 'November',
        'december': 'December',
        
        // Print Report
        'print-title': 'Shift Report - Malabo Airport',
        'generated-on': 'Generated on',
        'engineers-report': 'Engineers Report',
        'shifts-report': 'Shifts Report',
        'summary': 'Summary',
        'total': 'Total',
        
        // Shift Configuration
        'shift-configuration': 'Shift Configuration',
        'morning-start': 'Morning Shift - Start',
        'morning-end': 'Morning Shift - End',
        'afternoon-start': 'Afternoon Shift - Start',
        'afternoon-end': 'Afternoon Shift - End',
        'save-config': 'Save Configuration',
        'auto-assign': 'Smart Auto-Assignment',
        'config-saved': 'Configuration saved successfully',
        
        // Templates
        'shift-templates': 'Shift Templates',
        'template-name': 'Template name',
        'current-week': 'Current Week',
        'next-week': 'Next Week',
        'save-template': 'Save Template',
        'select-template': '-- Select Template --',
        'apply-template': 'Apply Template',
        'delete-template': 'Delete',
        'template-saved': 'Template saved successfully',
        'template-applied': 'Template applied successfully',
        'template-deleted': 'Template deleted successfully',
        'template-name-required': 'Template name is required',
        
        // Interactive Calendar
        'interactive-calendar': 'Interactive Calendar',
        'month-view': 'Month View',
        'week-view': 'Week View',
        'available-engineers': 'Available Engineers',
        'shifts-list': 'Shifts List',
        'drag-engineer': 'Drag an engineer here',
        'drop-to-assign': 'Drop to assign shift',
        'morning-shift': 'Morning Shift',
        'afternoon-shift': 'Afternoon Shift',
        
        // Auto Assignment
        'auto-assignment-complete': 'Auto-assignment completed',
        'auto-assignment-partial': 'Partial auto-assignment completed',
        'no-engineers-available': 'No engineers available for assignment',
        'assignment-conflicts': 'Assignment conflicts found',
        
        // Quick Assignment
        'quick-assign': 'Quick Assignment',
        'assign': 'Assign'
    }
};

// Clase para manejar las traducciones
class TranslationManager {
    constructor() {
        this.currentLanguage = 'es';
        this.init();
    }
    
    init() {
        // Cargar idioma guardado del localStorage
        const savedLanguage = localStorage.getItem('shiftManager_language');
        if (savedLanguage && translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        }
        
        // Configurar selector de idioma
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = this.currentLanguage;
            languageSelector.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
        
        // Aplicar traducciones iniciales
        this.applyTranslations();
    }
    
    setLanguage(language) {
        if (translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('shiftManager_language', language);
            this.applyTranslations();
            
            // Actualizar el HTML lang attribute
            document.documentElement.lang = language;
            
            // Disparar evento personalizado para notificar el cambio de idioma
            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: language }
            }));
        }
    }
    
    applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translate(key);
            
            if (translation) {
                // Preservar el contenido HTML si existe
                if (element.innerHTML.includes('<')) {
                    // Si el elemento tiene HTML, solo actualizar el texto
                    const textNodes = this.getTextNodes(element);
                    if (textNodes.length === 1) {
                        textNodes[0].textContent = translation;
                    }
                } else {
                    element.textContent = translation;
                }
                
                // Actualizar placeholders si existen
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                }
            }
        });
        
        // Actualizar opciones de select dinámicamente creadas
        this.updateDynamicSelects();
    }
    
    translate(key) {
        return translations[this.currentLanguage][key] || translations['es'][key] || key;
    }
    
    getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim()) {
                textNodes.push(node);
            }
        }
        
        return textNodes;
    }
    
    updateDynamicSelects() {
        // Actualizar opciones de select que se crean dinámicamente
        const selectOptions = document.querySelectorAll('option[data-translate]');
        selectOptions.forEach(option => {
            const key = option.getAttribute('data-translate');
            const translation = this.translate(key);
            if (translation) {
                option.textContent = translation;
            }
        });
    }
    
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        const formatOptions = { ...defaultOptions, ...options };
        
        return new Intl.DateTimeFormat(this.currentLanguage === 'es' ? 'es-ES' : 'en-US', formatOptions)
            .format(date);
    }
    
    formatTime(time) {
        return new Intl.DateTimeFormat(this.currentLanguage === 'es' ? 'es-ES' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(new Date(`2000-01-01T${time}`));
    }
    
    getMonthName(monthIndex) {
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        
        return this.translate(months[monthIndex]);
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Crear instancia global del gestor de traducciones
window.translationManager = new TranslationManager();

// Función de utilidad para obtener traducciones
window.t = function(key) {
    return window.translationManager.translate(key);
};
