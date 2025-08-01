// ===== CONTENIDO DINÁMICO CON SOPORTE MULTIIDIOMA =====
// Manejo de servicios, portafolio, blog y FAQ con traducciones

// ===== SERVICIOS =====
function getServicesData() {
    if (!window.i18n) {
        return [];
    }
    
    const t = window.t;
    
    return [
        {
            icon: "fas fa-laptop-code",
            title: t('service_web_dev'),
            description: t('service_web_desc'),
            features: ["UX/UI Design", "Frontend Development", "Backend API", "SEO Optimization"]
        },
        {
            icon: "fas fa-mobile-alt",
            title: t('service_mobile'),
            description: t('service_mobile_desc'),
            features: ["iOS & Android", "React Native", "Flutter", "PWA"]
        },
        {
            icon: "fas fa-cogs",
            title: t('service_software'),
            description: t('service_software_desc'),
            features: ["Requirements Analysis", "Scalable Architecture", "Comprehensive Testing", "Documentation"]
        },
        {
            icon: "fas fa-cloud",
            title: t('service_cloud'),
            description: t('service_cloud_desc'),
            features: ["AWS/Azure/GCP", "DevOps", "CI/CD", "Monitoring"]
        },
        {
            icon: "fas fa-robot",
            title: t('service_automation'),
            description: t('service_automation_desc'),
            features: ["RPA", "Workflows", "Integration", "Analytics"]
        },
        {
            icon: "fas fa-shield-alt",
            title: t('service_security'),
            description: t('service_security_desc'),
            features: ["Audits", "Penetration Testing", "Compliance", "Incident Response"]
        }
    ];
}

// ===== PORTAFOLIO =====
function getPortfolioData() {
    if (!window.i18n) {
        return [];
    }
    
    const t = window.t;
    
    return [
        {
            id: 1,
            title: t('project_ecommerce_title'),
            description: t('project_ecommerce_desc'),
            image: "https://via.placeholder.com/400x300/4A90E2/FFFFFF",
            icon: "fas fa-shopping-cart",
            category: "web",
            tags: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        {
            id: 2,
            title: t('project_mobile_app_title'),
            description: t('project_mobile_app_desc'),
            image: "https://via.placeholder.com/400x300/50C878/FFFFFF",
            icon: "fas fa-mobile-alt",
            category: "mobile",
            tags: ["Flutter", "Firebase", "Google Maps", "PayPal"]
        },
        {
            id: 3,
            title: t('project_crm_title'),
            description: t('project_crm_desc'),
            image: "https://via.placeholder.com/400x300/FF6B35/FFFFFF",
            icon: "fas fa-users",
            category: "software",
            tags: ["Vue.js", "Laravel", "MySQL", "Redis"]
        },
        {
            id: 4,
            title: t('project_dashboard_title'),
            description: t('project_dashboard_desc'),
            image: "https://via.placeholder.com/400x300/9B59B6/FFFFFF",
            icon: "fas fa-chart-line",
            category: "web",
            tags: ["React", "D3.js", "Express", "PostgreSQL"]
        },
        {
            id: 5,
            title: t('project_automation_title'),
            description: t('project_automation_desc'),
            image: "https://via.placeholder.com/400x300/34495E/FFFFFF",
            icon: "fas fa-robot",
            category: "software",
            tags: ["Python", "IoT", "Machine Learning", "AWS"]
        },
        {
            id: 6,
            title: t('project_security_title'),
            description: t('project_security_desc'),
            image: "https://via.placeholder.com/400x300/E74C3C/FFFFFF",
            icon: "fas fa-shield-alt",
            category: "software",
            tags: ["Cybersecurity", "Penetration Testing", "Compliance", "Incident Response"]
        }
    ];
}

// ===== BLOG =====
function getBlogData() {
    if (!window.i18n) {
        return [];
    }
    
    const t = window.t;
    
    return [
        {
            id: 1,
            title: t('blog_ai_trends_title'),
            description: t('blog_ai_trends_desc'),
            image: "https://via.placeholder.com/400x250/FF6B6B/FFFFFF?text=AI+Trends+2024",
            date: "2024-01-15",
            category: "Tecnología",
            readTime: "5 min"
        },
        {
            id: 2,
            title: t('blog_web_dev_title'),
            description: t('blog_web_dev_desc'),
            image: "https://via.placeholder.com/400x250/4ECDC4/FFFFFF?text=Web+Development",
            date: "2024-01-10",
            category: "Desarrollo",
            readTime: "8 min"
        },
        {
            id: 3,
            title: t('blog_mobile_tips_title'),
            description: t('blog_mobile_tips_desc'),
            image: "https://via.placeholder.com/400x250/45B7D1/FFFFFF?text=Mobile+Tips",
            date: "2024-01-05",
            category: "Móvil",
            readTime: "6 min"
        },
        {
            id: 4,
            title: t('blog_cloud_migration_title'),
            description: t('blog_cloud_migration_desc'),
            image: "https://via.placeholder.com/400x250/96CEB4/FFFFFF?text=Cloud+Migration",
            date: "2024-01-01",
            category: "Cloud",
            readTime: "10 min"
        },
        {
            id: 5,
            title: t('blog_cybersecurity_title'),
            description: t('blog_cybersecurity_desc'),
            image: "https://via.placeholder.com/400x250/F7DC6F/FFFFFF?text=Cybersecurity+2024",
            date: "2023-12-28",
            category: "Seguridad",
            readTime: "7 min"
        }
    ];
}

// ===== FAQ =====
function getFAQData() {
    if (!window.i18n) {
        return [];
    }
    
    const t = window.t;
    
    return [
        {
            question: t('faq_1_question'),
            answer: t('faq_1_answer')
        },
        {
            question: t('faq_2_question'),
            answer: t('faq_2_answer')
        },
        {
            question: t('faq_3_question'),
            answer: t('faq_3_answer')
        },
        {
            question: t('faq_4_question'),
            answer: t('faq_4_answer')
        }
    ];
}

// ===== FUNCIONES DE CARGA DINÁMICA =====
function loadDynamicServices() {
    const servicesContainer = document.getElementById('services-container');
    if (!servicesContainer) return;
    
    const services = getServicesData();
    if (services.length === 0) return;
    
    servicesContainer.innerHTML = services.map(service => `
        <div class="service-card" data-aos="fade-up">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <ul class="service-features">
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function loadDynamicPortfolio() {
    const portfolioContainer = document.getElementById('portfolio-container');
    if (!portfolioContainer) return;
    
    const projects = getPortfolioData();
    if (projects.length === 0) return;
    
    portfolioContainer.innerHTML = projects.map(project => `
        <div class="portfolio-item" data-category="${project.category}" data-aos="fade-up">
            <div class="portfolio-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="portfolio-image-overlay">
                    <div class="portfolio-icon">
                        <i class="${project.icon}"></i>
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="portfolio-content-tags">
                    ${project.tags.map(tag => `<span class="portfolio-content-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="portfolio-overlay">
                <div class="portfolio-info">
                    <div class="portfolio-info-icon">
                        <i class="${project.icon}"></i>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="portfolio-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function loadDynamicBlog() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;
    
    const articles = getBlogData();
    if (articles.length === 0) return;
    
    blogContainer.innerHTML = articles.map(article => `
        <div class="blog-card" data-aos="fade-up">
            <div class="blog-image">
                <img src="${article.image}" alt="${article.title}">
                <div class="blog-category">${article.category}</div>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">${new Date(article.date).toLocaleDateString()}</span>
                    <span class="blog-read-time">${article.readTime}</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="#" class="read-more">Leer más</a>
            </div>
        </div>
    `).join('');
}

function loadFAQ() {
    const faqContainer = document.getElementById('faq-container');
    if (!faqContainer) return;
    
    const faqs = getFAQData();
    if (faqs.length === 0) return;
    
    faqContainer.innerHTML = faqs.map((faq, index) => `
        <div class="faq-item" data-aos="fade-up">
            <div class="faq-question" onclick="toggleFAQ(${index})">
                <h3>${faq.question}</h3>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p>${faq.answer}</p>
            </div>
        </div>
    `).join('');
    
    addFAQEventListeners();
}

function addFAQEventListeners() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle answer visibility
            answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
            
            // Toggle icon rotation
            icon.style.transform = icon.style.transform === 'rotate(180deg)' ? '' : 'rotate(180deg)';
        });
    });
}

// ===== FUNCIONES DE RECARGA =====
function reloadDynamicContent() {
    loadDynamicServices();
    loadDynamicPortfolio();
    loadDynamicBlog();
    loadFAQ();
}

function forceReloadContent() {
    // Forzar recarga cuando cambia el idioma
    setTimeout(() => {
        reloadDynamicContent();
    }, 100);
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que el sistema de traducciones esté listo
    const waitForI18n = () => {
        if (window.i18n && window.t && window.getCurrentLanguage) {
            reloadDynamicContent();
            
            // Escuchar cambios de idioma
            if (window.i18n) {
                window.i18n.onLanguageChange = forceReloadContent;
            }
        } else {
            setTimeout(waitForI18n, 100);
        }
    };
    
    waitForI18n();
});

// ===== FUNCIONES GLOBALES =====
window.toggleFAQ = function(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const targetItem = faqItems[index];
    const question = targetItem.querySelector('.faq-question');
    const answer = targetItem.querySelector('.faq-answer');
    const icon = question.querySelector('i');
    
    // Cerrar otros FAQs
    faqItems.forEach(item => {
        if (item !== targetItem) {
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-question i');
            otherAnswer.style.maxHeight = null;
            otherIcon.style.transform = '';
        }
    });
    
    // Toggle FAQ actual
    answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
    icon.style.transform = icon.style.transform === 'rotate(180deg)' ? '' : 'rotate(180deg)';
};

// Función de debug para verificar traducciones
window.debugTranslations = function() {
    if (window.t) {
        console.log('🌐 Traducciones funcionando correctamente');
        console.log('- service_web_dev:', window.t('service_web_dev'));
        console.log('- project_ecommerce_title:', window.t('project_ecommerce_title'));
    }
    
    if (typeof reloadDynamicContent === 'function') {
        reloadDynamicContent();
    }
}; 