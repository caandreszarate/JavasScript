// Dashboard de Analytics con IA para DevsTopia
// Análisis de patrones de conversación y métricas de rendimiento

class ChatAnalytics {
    constructor() {
        this.metrics = {
            totalMessages: 0,
            userMessages: 0,
            assistantMessages: 0,
            averageResponseTime: 0,
            sentimentDistribution: {
                positive: 0,
                negative: 0,
                neutral: 0,
                urgent: 0
            },
            topKeywords: {},
            escalationRate: 0,
            userSatisfaction: 0,
            popularServices: {},
            conversationLengths: []
        };
        
        this.realTimeData = {
            activeUsers: 0,
            currentConversations: 0,
            averageSentiment: 'neutral'
        };
    }
    
    // Analizar mensaje individual
    analyzeMessage(messageData) {
        this.metrics.totalMessages++;
        
        if (messageData.type === 'user') {
            this.metrics.userMessages++;
            this.analyzeUserMessage(messageData);
        } else if (messageData.type === 'assistant') {
            this.metrics.assistantMessages++;
            this.analyzeAssistantMessage(messageData);
        }
        
        this.updateRealTimeMetrics();
    }
    
    // Analizar mensaje del usuario
    analyzeUserMessage(messageData) {
        const message = messageData.message.toLowerCase();
        
        // Análisis de palabras clave
        const keywords = this.extractKeywords(message);
        keywords.forEach(keyword => {
            this.metrics.topKeywords[keyword] = (this.metrics.topKeywords[keyword] || 0) + 1;
        });
        
        // Análisis de sentimiento
        const sentiment = analyzeSentiment(message);
        this.metrics.sentimentDistribution[sentiment.sentiment]++;
        
        // Detectar servicios mencionados
        this.detectServices(message);
    }
    
    // Analizar mensaje del asistente
    analyzeAssistantMessage(messageData) {
        if (messageData.shouldEscalate) {
            this.metrics.escalationRate++;
        }
        
        // Analizar recomendaciones
        if (messageData.recommendations && messageData.recommendations.length > 0) {
            messageData.recommendations.forEach(rec => {
                this.metrics.popularServices[rec.keyword] = (this.metrics.popularServices[rec.keyword] || 0) + 1;
            });
        }
    }
    
    // Extraer palabras clave
    extractKeywords(message) {
        const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'del', 'los', 'las', 'una', 'como', 'pero', 'sus', 'me', 'hasta', 'hay', 'donde', 'han', 'quien', 'están', 'estado', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros'];
        
        const words = message.split(/\s+/).filter(word => 
            word.length > 2 && !stopWords.includes(word.toLowerCase())
        );
        
        return words.slice(0, 5); // Top 5 keywords
    }
    
    // Detectar servicios mencionados
    detectServices(message) {
        const services = [
            'web', 'móvil', 'app', 'software', 'desarrollo', 'ecommerce', 
            'dashboard', 'automation', 'security', 'cloud', 'ai', 'data'
        ];
        
        services.forEach(service => {
            if (message.includes(service)) {
                this.metrics.popularServices[service] = (this.metrics.popularServices[service] || 0) + 1;
            }
        });
    }
    
    // Actualizar métricas en tiempo real
    updateRealTimeMetrics() {
        const totalSentiments = Object.values(this.metrics.sentimentDistribution).reduce((a, b) => a + b, 0);
        
        if (totalSentiments > 0) {
            const positiveRate = this.metrics.sentimentDistribution.positive / totalSentiments;
            const negativeRate = this.metrics.sentimentDistribution.negative / totalSentiments;
            
            if (positiveRate > negativeRate) {
                this.realTimeData.averageSentiment = 'positive';
            } else if (negativeRate > positiveRate) {
                this.realTimeData.averageSentiment = 'negative';
            } else {
                this.realTimeData.averageSentiment = 'neutral';
            }
        }
    }
    
    // Generar insights con IA
    generateInsights() {
        const insights = [];
        
        // Análisis de sentimiento
        const totalSentiments = Object.values(this.metrics.sentimentDistribution).reduce((a, b) => a + b, 0);
        if (totalSentiments > 0) {
            const positiveRate = (this.metrics.sentimentDistribution.positive / totalSentiments * 100).toFixed(1);
            const urgentRate = (this.metrics.sentimentDistribution.urgent / totalSentiments * 100).toFixed(1);
            
            insights.push({
                type: 'sentiment',
                title: 'Análisis de Sentimiento',
                description: `${positiveRate}% de conversaciones positivas`,
                urgency: urgentRate > 10 ? 'high' : 'normal',
                recommendation: urgentRate > 10 ? 'Considerar más personal humano' : 'Sistema funcionando bien'
            });
        }
        
        // Análisis de servicios populares
        const topServices = Object.entries(this.metrics.popularServices)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3);
        
        if (topServices.length > 0) {
            insights.push({
                type: 'services',
                title: 'Servicios Más Consultados',
                description: topServices.map(([service, count]) => `${service}: ${count}`).join(', '),
                recommendation: 'Fortalecer contenido sobre estos servicios'
            });
        }
        
        // Análisis de escalamiento
        if (this.metrics.totalMessages > 0) {
            const escalationRate = (this.metrics.escalationRate / this.metrics.totalMessages * 100).toFixed(1);
            insights.push({
                type: 'escalation',
                title: 'Tasa de Escalamiento',
                description: `${escalationRate}% de conversaciones escaladas`,
                urgency: escalationRate > 15 ? 'high' : 'normal',
                recommendation: escalationRate > 15 ? 'Revisar respuestas automáticas' : 'Nivel de escalamiento normal'
            });
        }
        
        return insights;
    }
    
    // Generar reporte completo
    generateReport() {
        const insights = this.generateInsights();
        
        return {
            summary: {
                totalMessages: this.metrics.totalMessages,
                userMessages: this.metrics.userMessages,
                assistantMessages: this.metrics.assistantMessages,
                averageResponseTime: this.metrics.averageResponseTime,
                escalationRate: this.metrics.escalationRate
            },
            sentiment: this.metrics.sentimentDistribution,
            topKeywords: Object.entries(this.metrics.topKeywords)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10),
            popularServices: Object.entries(this.metrics.popularServices)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5),
            insights: insights,
            realTime: this.realTimeData
        };
    }
    
    // Mostrar dashboard en la consola (para desarrollo)
    logDashboard() {
        const report = this.generateReport();
        
        console.log('📊 === DASHBOARD DE ANALYTICS ===');
        console.log(`📈 Total mensajes: ${report.summary.totalMessages}`);
        console.log(`👤 Mensajes usuario: ${report.summary.userMessages}`);
        console.log(`🤖 Mensajes asistente: ${report.summary.assistantMessages}`);
        console.log(`🚨 Tasa escalamiento: ${report.summary.escalationRate}%`);
        console.log(`😊 Sentimiento promedio: ${report.realTime.averageSentiment}`);
        
        console.log('\n🎯 TOP KEYWORDS:');
        report.topKeywords.forEach(([keyword, count]) => {
            console.log(`  ${keyword}: ${count}`);
        });
        
        console.log('\n💼 SERVICIOS POPULARES:');
        report.popularServices.forEach(([service, count]) => {
            console.log(`  ${service}: ${count}`);
        });
        
        console.log('\n💡 INSIGHTS:');
        report.insights.forEach(insight => {
            console.log(`  ${insight.title}: ${insight.description}`);
            console.log(`  Recomendación: ${insight.recommendation}`);
        });
        
        console.log('================================\n');
    }
    
    // ===== DASHBOARD VISUAL =====
    
    // Crear dashboard visual en la página
    createVisualDashboard() {
        // Crear contenedor del dashboard
        const dashboardContainer = document.createElement('div');
        dashboardContainer.id = 'analytics-dashboard';
        dashboardContainer.className = 'analytics-dashboard';
        dashboardContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 350px;
            max-height: 600px;
            background: white;
            border: 2px solid #3B71FF;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: 'Inter', sans-serif;
            overflow-y: auto;
            display: none;
        `;
        
        // Crear header del dashboard
        const header = document.createElement('div');
        header.style.cssText = `
            background: #3B71FF;
            color: white;
            padding: 15px;
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        header.innerHTML = `
            <h3 style="margin: 0; font-size: 16px;">📊 Analytics Dashboard</h3>
            <button onclick="toggleAnalyticsDashboard()" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">×</button>
        `;
        
        // Crear contenido del dashboard
        const content = document.createElement('div');
        content.style.cssText = `
            padding: 15px;
            font-size: 12px;
        `;
        
        dashboardContainer.appendChild(header);
        dashboardContainer.appendChild(content);
        
        // Agregar al body
        document.body.appendChild(dashboardContainer);
        
        // Guardar referencia al contenido
        this.dashboardContent = content;
        
        return dashboardContainer;
    }
    
    // Actualizar dashboard visual
    updateVisualDashboard() {
        if (!this.dashboardContent) {
            this.createVisualDashboard();
        }
        
        const report = this.generateReport();
        
        this.dashboardContent.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h4 style="color: #3B71FF; margin: 0 0 10px 0;">📈 Métricas Generales</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 5px; text-align: center;">
                        <div style="font-weight: bold; color: #3B71FF;">${report.summary.totalMessages}</div>
                        <div style="font-size: 10px; color: #666;">Total Msgs</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 5px; text-align: center;">
                        <div style="font-weight: bold; color: #28a745;">${report.summary.userMessages}</div>
                        <div style="font-size: 10px; color: #666;">Usuario</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 5px; text-align: center;">
                        <div style="font-weight: bold; color: #ffc107;">${report.summary.assistantMessages}</div>
                        <div style="font-size: 10px; color: #666;">Asistente</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 5px; text-align: center;">
                        <div style="font-weight: bold; color: #dc3545;">${report.summary.escalationRate}%</div>
                        <div style="font-size: 10px; color: #666;">Escalamiento</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #3B71FF; margin: 0 0 10px 0;">😊 Sentimiento</h4>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
                    <div style="margin-bottom: 5px;">
                        <span style="color: #28a745;">😊 Positivo:</span> ${report.sentiment.positive}
                    </div>
                    <div style="margin-bottom: 5px;">
                        <span style="color: #dc3545;">😔 Negativo:</span> ${report.sentiment.negative}
                    </div>
                    <div style="margin-bottom: 5px;">
                        <span style="color: #6c757d;">😐 Neutral:</span> ${report.sentiment.neutral}
                    </div>
                    <div>
                        <span style="color: #fd7e14;">🚨 Urgente:</span> ${report.sentiment.urgent}
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #3B71FF; margin: 0 0 10px 0;">🎯 Top Keywords</h4>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
                    ${report.topKeywords.slice(0, 5).map(([keyword, count]) => 
                        `<div style="margin-bottom: 3px;">
                            <span style="font-weight: bold;">${keyword}:</span> ${count}
                        </div>`
                    ).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #3B71FF; margin: 0 0 10px 0;">💼 Servicios Populares</h4>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
                    ${report.popularServices.slice(0, 3).map(([service, count]) => 
                        `<div style="margin-bottom: 3px;">
                            <span style="font-weight: bold;">${service}:</span> ${count}
                        </div>`
                    ).join('')}
                </div>
            </div>
            
            <div>
                <h4 style="color: #3B71FF; margin: 0 0 10px 0;">💡 Insights</h4>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
                    ${report.insights.map(insight => 
                        `<div style="margin-bottom: 8px; padding: 5px; background: white; border-radius: 3px;">
                            <div style="font-weight: bold; color: #3B71FF;">${insight.title}</div>
                            <div style="font-size: 11px; color: #666;">${insight.description}</div>
                            <div style="font-size: 10px; color: #28a745; margin-top: 3px;">💡 ${insight.recommendation}</div>
                        </div>`
                    ).join('')}
                </div>
            </div>
        `;
    }
}

// ===== INTEGRACIÓN CON EL CHAT =====
const chatAnalytics = new ChatAnalytics();

// Función para integrar analytics con el chat
function integrateAnalytics(messageData) {
    chatAnalytics.analyzeMessage(messageData);
    
    // Log dashboard cada 10 mensajes
    if (chatAnalytics.metrics.totalMessages % 10 === 0) {
        chatAnalytics.logDashboard();
        chatAnalytics.updateVisualDashboard();
    }
}

// ===== FUNCIONES DE CONTROL DEL DASHBOARD =====

// Mostrar/ocultar dashboard visual
function toggleAnalyticsDashboard() {
    const dashboard = document.getElementById('analytics-dashboard');
    if (dashboard) {
        if (dashboard.style.display === 'none' || dashboard.style.display === '') {
            dashboard.style.display = 'block';
            chatAnalytics.updateVisualDashboard();
        } else {
            dashboard.style.display = 'none';
        }
    }
}

// Actualizar botón del footer según estado de autenticación
function updateFooterAdminButton() {
    const adminBtn = document.getElementById('admin-access-btn');
    if (!adminBtn) return;
    
    if (adminAuth.checkAdminAccess()) {
        adminBtn.innerHTML = '<i class="fas fa-user-shield"></i><span>Admin ✓</span>';
        adminBtn.className = 'admin-btn authenticated';
        adminBtn.onclick = () => adminAuth.showAdminPanel();
        adminBtn.title = 'Panel de Administrador';
    } else {
        adminBtn.innerHTML = '<i class="fas fa-user-shield"></i><span>Admin</span>';
        adminBtn.className = 'admin-btn';
        adminBtn.onclick = () => adminAuth.showLoginModal();
        adminBtn.title = 'Acceso Administrador';
    }
}

// Función para inicializar el botón del footer
function initializeFooterAdminButton() {
    // Esperar a que el DOM esté listo
    setTimeout(() => {
        updateFooterAdminButton();
        
        // Actualizar cada 5 segundos
        setInterval(updateFooterAdminButton, 5000);
    }, 1000);
}

// ===== EXPORTAR FUNCIONES =====
window.chatAnalytics = chatAnalytics;
window.integrateAnalytics = integrateAnalytics;
window.toggleAnalyticsDashboard = toggleAnalyticsDashboard;
window.updateFooterAdminButton = updateFooterAdminButton;
window.initializeFooterAdminButton = initializeFooterAdminButton;

// Inicializar botón del footer cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeFooterAdminButton();
}); 