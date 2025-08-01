// Sistema de traducciones para DevsTopia
const translations = {
    es: {
        // Navegación
        nav: {
            inicio: "Inicio",
            servicios: "Servicios",
            portafolio: "Portafolio",
            contacto: "Contacto"
        },
        
        // Hero Section
        hero: {
            title: "Desarrollo de Software",
            subtitle: "Transformamos ideas en soluciones digitales",
            btnServicios: "Servicios",
            btnCotizar: "Cotizar"
        },
        
        // Secciones
        sections: {
            servicios: "Servicios",
            portafolio: "Portafolio",
            contacto: "Contacto"
        },
        
        // Servicios
        servicios: {
            desarrolloSoftware: {
                nombre: "Desarrollo de Software a Medida",
                descripcion: "Soluciones personalizadas según las necesidades del cliente."
            },
            desarrolloWeb: {
                nombre: "Diseño y Desarrollo Web",
                descripcion: "Para empresas que necesitan presencia digital profesional."
            },
            aplicacionesMoviles: {
                nombre: "Aplicaciones Móviles",
                descripcion: "Desarrollo de apps eficientes, modernas y con enfoque en experiencia de usuario."
            },
            automatizacion: {
                nombre: "Automatización y Procesos Inteligentes",
                descripcion: "Aumentar eficiencia y reducir tareas manuales."
            },
            cloudDevops: {
                nombre: "Servicios en la Nube & DevOps",
                descripcion: "Escalabilidad, seguridad y rendimiento garantizado."
            },
            ciberseguridad: {
                nombre: "Ciberseguridad y Protección de Datos",
                descripcion: "Asegura el software y los datos del cliente."
            },
            analisisDatos: {
                nombre: "Análisis de Datos e Inteligencia Artificial",
                descripcion: "Toma de decisiones con base en datos."
            },
            qaTesting: {
                nombre: "QA y Testing",
                descripcion: "Asegura la calidad de cada entrega."
            },
            soporte: {
                nombre: "Soporte Técnico y Mantenimiento",
                descripcion: "Para que el cliente esté tranquilo después de la entrega."
            },
            consultoria: {
                nombre: "Consultoría y Transformación Digital",
                descripcion: "Para empresas que no saben por dónde empezar."
            }
        },
        
        // Contacto
        contacto: {
            email: "Email",
            telefono: "Teléfono",
            ubicacion: "Ubicación",
            nombre: "Nombre",
            mensaje: "Mensaje",
            enviar: "Enviar"
        },
        
        // Modal
        modal: {
            cotizacion: "Cotización",
            nombre: "Nombre",
            servicio: "Servicio",
            descripcion: "Descripción del proyecto",
            seleccionarServicio: "Selecciona un servicio",
            desarrolloWeb: "Desarrollo Web",
            appMovil: "Aplicación Móvil",
            softwareMedida: "Software a Medida",
            consultoria: "Consultoría",
            otros: "Otros"
        },
        
        // Chat
        chat: {
            titulo: "Chat",
            placeholder: "Escribe tu mensaje...",
            mensajeInicial: "¿En qué podemos ayudarte?"
        },
        
        // Footer
        footer: {
            descripcion: "Transformamos ideas en soluciones digitales.",
            servicios: "Servicios",
            desarrolloWeb: "Desarrollo Web",
            appsMoviles: "Apps Móviles",
            softwareMedida: "Software a Medida",
            consultoria: "Consultoría",
            contacto: "Contacto",
            derechos: "Todos los derechos reservados."
        }
    },
    
    en: {
        // Navigation
        nav: {
            inicio: "Home",
            servicios: "Services",
            portafolio: "Portfolio",
            contacto: "Contact"
        },
        
        // Hero Section
        hero: {
            title: "Software Development",
            subtitle: "We transform ideas into digital solutions",
            btnServicios: "Services",
            btnCotizar: "Quote"
        },
        
        // Sections
        sections: {
            servicios: "Services",
            portafolio: "Portfolio",
            contacto: "Contact"
        },
        
        // Services
        servicios: {
            desarrolloSoftware: {
                nombre: "Custom Software Development",
                descripcion: "Personalized solutions according to client needs."
            },
            desarrolloWeb: {
                nombre: "Web Design & Development",
                descripcion: "For companies that need professional digital presence."
            },
            aplicacionesMoviles: {
                nombre: "Mobile Applications",
                descripcion: "Development of efficient, modern apps with focus on user experience."
            },
            automatizacion: {
                nombre: "Automation & Intelligent Processes",
                descripcion: "Increase efficiency and reduce manual tasks."
            },
            cloudDevops: {
                nombre: "Cloud Services & DevOps",
                descripcion: "Guaranteed scalability, security and performance."
            },
            ciberseguridad: {
                nombre: "Cybersecurity & Data Protection",
                descripcion: "Secures client software and data."
            },
            analisisDatos: {
                nombre: "Data Analysis & Artificial Intelligence",
                descripcion: "Data-driven decision making."
            },
            qaTesting: {
                nombre: "QA & Testing",
                descripcion: "Ensures quality in every delivery."
            },
            soporte: {
                nombre: "Technical Support & Maintenance",
                descripcion: "So the client can be at peace after delivery."
            },
            consultoria: {
                nombre: "Consulting & Digital Transformation",
                descripcion: "For companies that don't know where to start."
            }
        },
        
        // Contact
        contacto: {
            email: "Email",
            telefono: "Phone",
            ubicacion: "Location",
            nombre: "Name",
            mensaje: "Message",
            enviar: "Send"
        },
        
        // Modal
        modal: {
            cotizacion: "Quote",
            nombre: "Name",
            servicio: "Service",
            descripcion: "Project description",
            seleccionarServicio: "Select a service",
            desarrolloWeb: "Web Development",
            appMovil: "Mobile App",
            softwareMedida: "Custom Software",
            consultoria: "Consulting",
            otros: "Others"
        },
        
        // Chat
        chat: {
            titulo: "Chat",
            placeholder: "Write your message...",
            mensajeInicial: "How can we help you?"
        },
        
        // Footer
        footer: {
            descripcion: "We transform ideas into digital solutions.",
            servicios: "Services",
            desarrolloWeb: "Web Development",
            appsMoviles: "Mobile Apps",
            softwareMedida: "Custom Software",
            consultoria: "Consulting",
            contacto: "Contact",
            derechos: "All rights reserved."
        }
    }
};

// Función para cambiar idioma
function changeLanguage(lang) {
    const currentLang = lang || 'es';
    const langData = translations[currentLang];
    
    // Actualizar navegación
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        let value = langData;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            element.textContent = value;
        }
    });
    
    // Actualizar placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const keys = key.split('.');
        let value = langData;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            element.placeholder = value;
        }
    });
    
    // Actualizar opciones de select
    document.querySelectorAll('option[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        let value = langData;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            element.textContent = value;
        }
    });
    
    // Actualizar botón de idioma
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.querySelector('.lang-text').textContent = currentLang.toUpperCase();
    }
    
    // Guardar preferencia
    localStorage.setItem('devstopia-language', currentLang);
    
    // Actualizar chat
    updateChatLanguage(currentLang);
}

// Función para actualizar idioma del chat
function updateChatLanguage(lang) {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        const initialMessage = chatMessages.querySelector('.message.bot p');
        if (initialMessage) {
            initialMessage.textContent = translations[lang].chat.mensajeInicial;
        }
    }
    
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.placeholder = translations[lang].chat.placeholder;
    }
}

// Función para obtener idioma actual
function getCurrentLanguage() {
    return localStorage.getItem('devstopia-language') || 'es';
}

// Función para inicializar idioma
function initializeLanguage() {
    const currentLang = getCurrentLanguage();
    changeLanguage(currentLang);
    
    // Configurar evento del botón de idioma
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = getCurrentLanguage();
            const newLang = currentLang === 'es' ? 'en' : 'es';
            changeLanguage(newLang);
        });
    }
}

// Exportar funciones
window.changeLanguage = changeLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.initializeLanguage = initializeLanguage;
window.translations = translations; 