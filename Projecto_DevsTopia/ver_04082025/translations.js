// Sistema de traducciones para DevsTopia - Versión Tabnine
const translations = {
    es: {
        // Navegación
        nav: {
            inicio: "Inicio",
            servicios: "Servicios",
            portafolio: "Portafolio",
            contacto: "Contacto",
            demo: "Obtener Demo"
        },
        
        // Hero Section - Inspirado en Tabnine
        hero: {
            badge: "Privado. Personalizado. Protegido.",
            mainTitle: "Cualquier desarrollador puede escribir código.",
            highlightTitle: "El nuestro gana tu confianza.",
            description: "DevsTopia es la plataforma de desarrollo de software más consciente del contexto del mundo, ayudando a equipos de ingeniería maduros a acelerar y simplificar todo su proceso de desarrollo.",
            btnDemo: "Obtener Demo en Vivo",
            btnExpert: "Hablar con un Experto",
            demoTitle: "Ver DevsTopia en acción"
        },
        
        // Features Section
        features: {
            title: "Construye mejores aplicaciones más rápido con agentes de IA para todo el SDLC",
            description: "Desde la creación de código y explicaciones, hasta la generación de pruebas y documentación, el desarrollo de aplicaciones más rápido ha entrado al chat.",
            learnMore: "Aprender Más"
        },
        
        // Personalization Section
        personalization: {
            title: "IA altamente personalizada que se adapta a tu forma de trabajar",
            feature1: "Sugerencias conscientes del contexto basadas en tu código y patrones",
            feature2: "Soporte para los lenguajes, librerías e IDEs más populares",
            feature3: "Capacidad de crear modelos personalizados entrenados en tu base de código",
            learnMore: "Aprender Más"
        },
        
        // Privacy Section
        privacy: {
            title: "Privacidad completa del código con cero retención de datos",
            feature1: "Despliega DevsTopia a tu manera: on-premises, VPC o SaaS seguro",
            feature2: "Nuestros modelos propietarios nunca se entrenan con tu código",
            feature3: "Tu código nunca se almacena o comparte sin tu permiso explícito",
            learnMore: "Aprender Más"
        },
        
        // Testimonials Section
        testimonials: {
            title: "DevsTopia es el asistente de código IA original de confianza para millones de desarrolladores"
        },
        
        // Secciones
        sections: {
            servicios: "Delega tareas a los agentes de IA de DevsTopia para ahorrar tiempo y esfuerzo",
            portafolio: "Portafolio",
            contacto: "Contacto"
        },
        
        // Portfolio
        portfolio: {
            description: "Descubre algunos de nuestros proyectos más destacados"
        },
        
        // Contact
        contact: {
            description: "¿Listo para transformar tu idea en realidad? Hablemos."
        },
        
        // Portafolio
        portafolio: {
            ecommerce: {
                titulo: "Plataforma E-commerce",
                descripcion: "Plataforma de comercio electrónico completa con gestión de inventario y pagos."
            },
            delivery: {
                titulo: "App de Delivery",
                descripcion: "Aplicación móvil para entrega de alimentos con geolocalización."
            },
            erp: {
                titulo: "Sistema de Gestión ERP",
                descripcion: "Software empresarial para gestión integral de recursos."
            },
            dashboard: {
                titulo: "Dashboard Analytics",
                descripcion: "Panel de control con análisis de datos en tiempo real."
            },
            fitness: {
                titulo: "App de Fitness",
                descripcion: "Aplicación para seguimiento de rutinas y nutrición."
            },
            facturacion: {
                titulo: "Sistema de Facturación",
                descripcion: "Software para gestión de facturas y contabilidad."
            }
        },
        
        // Servicios - Nuevos agentes inspirados en Tabnine
        servicios: {
            codeReview: {
                nombre: "Agente de Revisión de Código",
                descripcion: "Revisa código en pull requests y en el IDE, proporciona correcciones basadas en los estándares únicos de tu empresa.",
                detalles: [
                    "Revisión automática de PRs",
                    "Cumplimiento de estándares",
                    "Sugerencias de mejora",
                    "Integración con IDEs"
                ]
            },
            jiraAgent: {
                nombre: "Agentes de Implementación y Validación Jira",
                descripcion: "Genera código de forma autónoma a partir de requisitos capturados en issues de Jira y valida que el código cumpla con ellos.",
                detalles: [
                    "Generación automática desde Jira",
                    "Validación de requisitos",
                    "Trazabilidad completa",
                    "Sincronización bidireccional"
                ]
            },
            codeExplain: {
                nombre: "Agente de Explicación y Onboarding",
                descripcion: "Incorporación rápida a proyectos desconocidos con explicaciones en lenguaje natural del proyecto, comportamientos, dependencias y más.",
                detalles: [
                    "Explicación de arquitectura",
                    "Documentación automática",
                    "Onboarding acelerado",
                    "Mapeo de dependencias"
                ]
            },
            testingAgent: {
                nombre: "Agente de Testing",
                descripcion: "Genera planes de prueba integrales con casos de prueba detallados para funciones y métodos, basándose en otras pruebas de tu base de código.",
                detalles: [
                    "Generación de casos de prueba",
                    "Cobertura automática",
                    "Pruebas unitarias e integración",
                    "Análisis de calidad"
                ]
            },
            codeFixAgent: {
                nombre: "Agente de Corrección de Código",
                descripcion: "Selecciona código con error y genera correcciones de forma autónoma con sugerencias entregadas en una vista de diferencias.",
                detalles: [
                    "Detección automática de bugs",
                    "Correcciones sugeridas",
                    "Vista de diferencias",
                    "Análisis de impacto"
                ]
            },
            documentationAgent: {
                nombre: "Agente de Documentación",
                descripción: "Crea documentación para cualquier código seleccionado, incluyendo documentación formal de clases y funciones para guías API, comentarios y documentación inline.",
                detalles: [
                    "Documentación automática",
                    "Guías API",
                    "Comentarios inline",
                    "Documentación técnica"
                ]
            },
            cloudDevops: {
                nombre: "Servicios en la Nube & DevOps",
                descripcion: "Escalabilidad, seguridad y rendimiento garantizado.",
                detalles: [
                    "Migración a la nube",
                    "CI/CD",
                    "Docker y Kubernetes",
                    "Monitoreo y alertas"
                ]
            },
            ciberseguridad: {
                nombre: "Ciberseguridad y Protección de Datos",
                descripcion: "Asegura el software y los datos del cliente.",
                detalles: [
                    "Auditorías de seguridad",
                    "Cifrado de datos",
                    "Cumplimiento normativo",
                    "Análisis de vulnerabilidades"
                ]
            },
            analisisDatos: {
                nombre: "Análisis de Datos e Inteligencia Artificial",
                descripcion: "Toma de decisiones con base en datos.",
                detalles: [
                    "Dashboards interactivos",
                    "Modelos predictivos",
                    "Análisis de comportamiento",
                    "Machine Learning"
                ]
            },
            consultoria: {
                nombre: "Consultoría y Transformación Digital",
                descripcion: "Para empresas que no saben por dónde empezar.",
                detalles: [
                    "Roadmap digital",
                    "Capacitación técnica",
                    "Selección tecnológica",
                    "Estrategia de implementación"
                ]
            }
        },
        
        // Contacto
        contacto: {
            email: "Email",
            telefono: "Teléfono",
            ubicacion: "Ubicación",
            nombre: "Nombre",
            asunto: "Asunto",
            mensaje: "Mensaje",
            enviar: "Enviar Mensaje"
        },
        
        // Modal
        modal: {
            cotizacion: "Obtener Demo en Vivo",
            nombre: "Nombre",
            empresa: "Empresa",
            servicio: "Servicio de Interés",
            descripcion: "Descripción del proyecto",
            seleccionarServicio: "Selecciona un servicio",
            desarrolloWeb: "Desarrollo Web",
            appMovil: "Aplicación Móvil",
            softwareMedida: "Software a Medida",
            consultoria: "Consultoría",
            otros: "Otros",
            programarDemo: "Programar Demo"
        },
        
        // Chat
        chat: {
            titulo: "Chat con DevsTopia",
            placeholder: "Escribe tu mensaje...",
            mensajeInicial: "¡Hola! Soy el asistente de DevsTopia. ¿En qué puedo ayudarte hoy?"
        },
        
        // Footer
        footer: {
            descripcion: "DevsTopia es el asistente de código IA que acelera y simplifica el desarrollo de software manteniendo tu código privado, seguro y conforme.",
            producto: "Producto",
            precios: "Planes y Precios",
            ides: "IDEs Soportados",
            documentacion: "Documentación",
            recursos: "Recursos",
            privacidad: "Privacidad del Código",
            politicas: "Política de Privacidad",
            terminos: "Términos de Uso",
            seguridad: "Centro de Confianza",
            conocimiento: "Centro de Conocimiento",
            generacionCodigo: "Generación de Código IA",
            refactoring: "Refactorización de Código",
            debugging: "Debugging de Código",
            documentacionCodigo: "Documentación de Código",
            testing: "Pruebas Unitarias",
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
            contacto: "Contact",
            demo: "Get Demo"
        },
        
        // Hero Section - Tabnine inspired
        hero: {
            badge: "Private. Personalized. Protected.",
            mainTitle: "Any agent can write code.",
            highlightTitle: "Ours earn your devs' trust.",
            description: "DevsTopia is the world's most contextually aware AI software development platform, helping mature engineering teams speed up and simplify their entire development process.",
            btnDemo: "Get a Live Demo",
            btnExpert: "Talk to an Expert",
            demoTitle: "See DevsTopia in action"
        },
        
        // Features Section
        features: {
            title: "Build better apps faster with AI agents for the entire SDLC",
            description: "From code creation and explanations, to test and doc generation and bug fixes, faster app development has entered the chat.",
            learnMore: "Learn More"
        },
        
        // Personalization Section
        personalization: {
            title: "Highly personalized AI that fits how you work",
            feature1: "Context-aware suggestions based on your code and patterns",
            feature2: "Supports the most popular languages, libraries, and IDEs you use",
            feature3: "Ability to create bespoke models trained on your codebase",
            learnMore: "Learn More"
        },
        
        // Privacy Section
        privacy: {
            title: "Complete code privacy with zero data retention",
            feature1: "Deploy DevsTopia your way: on-premises, on VPC, or as secure SaaS",
            feature2: "DevsTopia's proprietary models are never trained on your code",
            feature3: "Your code is never stored or shared without your explicit permission",
            learnMore: "Learn More"
        },
        
        // Testimonials Section
        testimonials: {
            title: "DevsTopia is the original AI code assistant trusted by millions of developers"
        },
        
        // Sections
        sections: {
            servicios: "Delegate tasks to DevsTopia's AI agents to save time and effort",
            portafolio: "Portfolio",
            contacto: "Contact"
        },
        
        // Portfolio
        portfolio: {
            description: "Discover some of our most outstanding projects"
        },
        
        // Contact
        contact: {
            description: "Ready to transform your idea into reality? Let's talk."
        },
        
        // Portfolio
        portafolio: {
            ecommerce: {
                titulo: "E-commerce Platform",
                descripcion: "Complete e-commerce platform with inventory and payment management."
            },
            delivery: {
                titulo: "Delivery App",
                descripcion: "Mobile application for food delivery with geolocation."
            },
            erp: {
                titulo: "ERP Management System",
                descripcion: "Enterprise software for comprehensive resource management."
            },
            dashboard: {
                titulo: "Dashboard Analytics",
                descripcion: "Control panel with real-time data analysis."
            },
            fitness: {
                titulo: "Fitness App",
                descripcion: "Application for routine and nutrition tracking."
            },
            facturacion: {
                titulo: "Billing System",
                descripcion: "Software for invoice and accounting management."
            }
        },
        
        // Services - New agents inspired by Tabnine
        servicios: {
            codeReview: {
                nombre: "Code Review Agent",
                descripcion: "Review code at the pull request and in the IDE and get fixes based on your company's unique standards.",
                detalles: [
                    "Automatic PR reviews",
                    "Standards compliance",
                    "Improvement suggestions",
                    "IDE integration"
                ]
            },
            jiraAgent: {
                nombre: "Jira Implementation and Validation Agents",
                descripcion: "Generate code autonomously from requirements captured in Jira issues and validates AI- or human-generated code to verify that it meets them.",
                detalles: [
                    "Automatic generation from Jira",
                    "Requirements validation",
                    "Complete traceability",
                    "Bidirectional sync"
                ]
            },
            codeExplain: {
                nombre: "Code Explain and Onboarding Agent",
                descripcion: "Onboard quickly to unfamiliar projects with plain language explanation of the project, behaviors, dependencies, and more.",
                detalles: [
                    "Architecture explanation",
                    "Automatic documentation",
                    "Accelerated onboarding",
                    "Dependency mapping"
                ]
            },
            testingAgent: {
                nombre: "Testing Agent",
                descripcion: "Generate comprehensive test plans with detailed test cases for functions and methods, based on other tests in your codebase.",
                detalles: [
                    "Test case generation",
                    "Automatic coverage",
                    "Unit and integration tests",
                    "Quality analysis"
                ]
            },
            codeFixAgent: {
                nombre: "Code Fix Agent",
                descripcion: "Select code with an error and autonomously generate fixes with suggestions delivered in a simple diff view.",
                detalles: [
                    "Automatic bug detection",
                    "Suggested fixes",
                    "Diff view",
                    "Impact analysis"
                ]
            },
            documentationAgent: {
                nombre: "Documentation Agent",
                descripcion: "Create documentation for any selected code, including formal documentation of classes and functions for API guides, comments, and inline docs.",
                detalles: [
                    "Automatic documentation",
                    "API guides",
                    "Inline comments",
                    "Technical documentation"
                ]
            },
            cloudDevops: {
                nombre: "Cloud Services & DevOps",
                descripcion: "Guaranteed scalability, security and performance.",
                detalles: [
                    "Cloud migration",
                    "CI/CD pipelines",
                    "Docker & Kubernetes",
                    "Monitoring & alerts"
                ]
            },
            ciberseguridad: {
                nombre: "Cybersecurity & Data Protection",
                descripcion: "Secures client software and data.",
                detalles: [
                    "Security audits",
                    "Data encryption",
                    "Regulatory compliance",
                    "Vulnerability analysis"
                ]
            },
            analisisDatos: {
                nombre: "Data Analysis & Artificial Intelligence",
                descripcion: "Data-driven decision making.",
                detalles: [
                    "Interactive dashboards",
                    "Predictive models",
                    "Behavior analysis",
                    "Machine Learning"
                ]
            },
            consultoria: {
                nombre: "Consulting & Digital Transformation",
                descripcion: "For companies that don't know where to start.",
                detalles: [
                    "Digital roadmap",
                    "Technical training",
                    "Technology selection",
                    "Implementation strategy"
                ]
            }
        },
        
        // Contact
        contacto: {
            email: "Email",
            telefono: "Phone",
            ubicacion: "Location",
            nombre: "Name",
            asunto: "Subject",
            mensaje: "Message",
            enviar: "Send Message"
        },
        
        // Modal
        modal: {
            cotizacion: "Get Live Demo",
            nombre: "Name",
            empresa: "Company",
            servicio: "Service of Interest",
            descripcion: "Project description",
            seleccionarServicio: "Select a service",
            desarrolloWeb: "Web Development",
            appMovil: "Mobile App",
            softwareMedida: "Custom Software",
            consultoria: "Consulting",
            otros: "Others",
            programarDemo: "Schedule Demo"
        },
        
        // Chat
        chat: {
            titulo: "Chat with DevsTopia",
            placeholder: "Write your message...",
            mensajeInicial: "Hello! I'm the DevsTopia assistant. How can I help you today?"
        },
        
        // Footer
        footer: {
            descripcion: "DevsTopia is the AI code assistant that accelerates and simplifies software development while keeping your code private, secure, and compliant.",
            producto: "Product",
            precios: "Plans & Pricing",
            ides: "Supported IDEs",
            documentacion: "Documentation",
            recursos: "Resources",
            privacidad: "Code Privacy",
            politicas: "Privacy Policy",
            terminos: "Terms of Use",
            seguridad: "Trust Center",
            conocimiento: "Knowledge Center",
            generacionCodigo: "AI Code Generation",
            refactoring: "Code Refactoring",
            debugging: "Code Debugging",
            documentacionCodigo: "Code Documentation",
            testing: "Unit Testing",
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
    
    console.log('Cambiando idioma a:', currentLang);
    console.log('Datos de idioma:', langData);
    
    // Actualizar navegación
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        let value = langData;
        
        console.log('Procesando elemento:', element, 'con clave:', key);
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            element.textContent = value;
            console.log('Traducido:', key, '->', value);
        } else {
            console.warn('No se encontró traducción para:', key);
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
    
    // Recargar contenido dinámico
    setTimeout(() => {
        if (typeof loadServices === 'function') {
            console.log('Recargando servicios...');
            loadServices();
        }
        if (typeof loadPortfolio === 'function') {
            console.log('Recargando portafolio...');
            loadPortfolio();
        }
        if (typeof loadTestimonials === 'function') {
            console.log('Recargando testimonios...');
            loadTestimonials();
        }
        
        // Forzar actualización de elementos estáticos
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
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
    }, 50);
    
    console.log('Idioma cambiado exitosamente a:', currentLang);
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
    console.log('Inicializando sistema de traducciones...');
    
    const currentLang = getCurrentLanguage();
    console.log('Idioma actual:', currentLang);
    
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            debugTranslationElements();
            debugTranslations();
            changeLanguage(currentLang);
        });
    } else {
        debugTranslationElements();
        debugTranslations();
        changeLanguage(currentLang);
    }
    
    // Configurar evento del botón de idioma
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = getCurrentLanguage();
            const newLang = currentLang === 'es' ? 'en' : 'es';
            console.log('Cambiando de', currentLang, 'a', newLang);
            changeLanguage(newLang);
        });
    }
    
    console.log('Sistema de traducciones inicializado');
}

// Función de debug para verificar elementos traducibles
function debugTranslationElements() {
    console.log('=== DEBUG: Elementos con data-translate ===');
    const elements = document.querySelectorAll('[data-translate]');
    console.log('Total de elementos encontrados:', elements.length);
    
    elements.forEach((element, index) => {
        const key = element.getAttribute('data-translate');
        console.log(`${index + 1}. Elemento:`, element.tagName, 'Clave:', key, 'Texto actual:', element.textContent);
    });
    
    console.log('=== FIN DEBUG ===');
}

// Función de debug para verificar traducciones disponibles
function debugTranslations() {
    const currentLang = getCurrentLanguage();
    const langData = window.translations ? window.translations[currentLang] : null;
    
    console.log('=== DEBUG: Traducciones Disponibles ===');
    console.log('Idioma actual:', currentLang);
    console.log('Datos de idioma:', langData);
    
    if (langData && langData.servicios) {
        console.log('Servicios disponibles:', Object.keys(langData.servicios));
    }
    
    if (langData && langData.portafolio) {
        console.log('Portafolio disponible:', Object.keys(langData.portafolio));
    }
    
    console.log('=== FIN DEBUG ===');
}

// Exportar funciones
window.changeLanguage = changeLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.initializeLanguage = initializeLanguage;
window.debugTranslationElements = debugTranslationElements;
window.debugTranslations = debugTranslations;
window.translations = translations;