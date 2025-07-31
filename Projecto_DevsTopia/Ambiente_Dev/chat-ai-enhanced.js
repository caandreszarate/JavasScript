// Sistema de IA Avanzado para DevsTopia Chat
// Análisis de Sentimiento + Recomendaciones Inteligentes

// ===== ANÁLISIS DE SENTIMIENTO =====
function analyzeSentiment(message) {
    const urgentKeywords = ['urgente', 'emergencia', 'problema', 'error', 'crítico', 'falla', 'no funciona'];
    const positiveKeywords = ['gracias', 'excelente', 'perfecto', 'genial', 'me gusta', 'bueno', 'satisfecho'];
    const negativeKeywords = ['molesto', 'enojado', 'frustrado', 'malo', 'pésimo', 'decepcionado', 'insatisfecho'];
    const neutralKeywords = ['información', 'consulta', 'pregunta', 'duda', 'ayuda'];
    
    const text = message.toLowerCase();
    let score = 0;
    let sentiment = 'neutral';
    
    // Análisis de palabras clave
    urgentKeywords.forEach(keyword => {
        if (text.includes(keyword)) score += 3;
    });
    
    positiveKeywords.forEach(keyword => {
        if (text.includes(keyword)) score += 1;
    });
    
    negativeKeywords.forEach(keyword => {
        if (text.includes(keyword)) score -= 2;
    });
    
    // Determinar sentimiento
    if (score >= 3) {
        sentiment = 'urgent';
    } else if (score >= 1) {
        sentiment = 'positive';
    } else if (score <= -2) {
        sentiment = 'negative';
    } else {
        sentiment = 'neutral';
    }
    
    return {
        sentiment: sentiment,
        score: score,
        confidence: Math.abs(score) / 3
    };
}

function getResponseBySentiment(sentiment, baseResponse) {
    const sentimentEmojis = {
        urgent: '🚨',
        positive: '😊',
        negative: '😔',
        neutral: '💬'
    };
    
    const sentimentPrefixes = {
        urgent: 'Entiendo la urgencia. ',
        positive: '¡Me alegra saberlo! ',
        negative: 'Entiendo tu frustración. ',
        neutral: ''
    };
    
    const sentimentSuffixes = {
        urgent: '\n\n🚨 **Te conectaré inmediatamente con un especialista.**',
        positive: '\n\n¿Hay algo más en lo que pueda ayudarte?',
        negative: '\n\n¿Te gustaría hablar con un representante para resolver tu situación?',
        neutral: ''
    };
    
    return `${sentimentEmojis[sentiment]} ${sentimentPrefixes[sentiment]}${baseResponse}${sentimentSuffixes[sentiment]}`;
}

// ===== SISTEMA DE RECOMENDACIONES INTELIGENTES =====
const SERVICE_RECOMMENDATIONS = {
    'ecommerce': {
        services: ['Desarrollo Web', 'Integración de Pagos', 'SEO', 'Marketing Digital'],
        priority: 'high',
        estimatedCost: '$3000-8000 USD',
        timeline: '2-4 meses',
        description: 'Plataforma completa de comercio electrónico'
    },
    'dashboard': {
        services: ['Desarrollo Web', 'Análisis de Datos', 'Cloud Services', 'API Integration'],
        priority: 'medium',
        estimatedCost: '$2000-5000 USD',
        timeline: '1-3 meses',
        description: 'Panel de control con visualización de datos'
    },
    'mobile': {
        services: ['Desarrollo Móvil', 'Backend API', 'Testing', 'App Store Deployment'],
        priority: 'high',
        estimatedCost: '$4000-12000 USD',
        timeline: '3-6 meses',
        description: 'Aplicación móvil nativa o híbrida'
    },
    'web': {
        services: ['Desarrollo Web', 'Responsive Design', 'SEO', 'Hosting'],
        priority: 'medium',
        estimatedCost: '$1500-5000 USD',
        timeline: '1-3 meses',
        description: 'Sitio web corporativo o aplicación web'
    },
    'automation': {
        services: ['Automatización de Procesos', 'RPA', 'API Integration', 'Workflow Design'],
        priority: 'medium',
        estimatedCost: '$2500-7000 USD',
        timeline: '2-4 meses',
        description: 'Automatización de tareas empresariales'
    },
    'security': {
        services: ['Auditoría de Seguridad', 'Penetration Testing', 'Security Implementation'],
        priority: 'high',
        estimatedCost: '$2000-8000 USD',
        timeline: '1-2 meses',
        description: 'Servicios de ciberseguridad'
    }
};

function getRecommendations(userMessage) {
    const message = userMessage.toLowerCase();
    const recommendations = [];
    
    for (const [keyword, data] of Object.entries(SERVICE_RECOMMENDATIONS)) {
        if (message.includes(keyword)) {
            recommendations.push({
                keyword: keyword,
                services: data.services,
                priority: data.priority,
                estimatedCost: data.estimatedCost,
                timeline: data.timeline,
                description: data.description
            });
        }
    }
    
    return recommendations;
}

function formatRecommendations(recommendations) {
    if (recommendations.length === 0) return '';
    
    let response = '🎯 **Recomendaciones personalizadas:**\n\n';
    
    recommendations.forEach((rec, index) => {
        response += `**${index + 1}. ${rec.description}**\n`;
        response += `📋 Servicios: ${rec.services.join(', ')}\n`;
        response += `💰 Costo estimado: ${rec.estimatedCost}\n`;
        response += `⏱️ Timeline: ${rec.timeline}\n`;
        response += `🎯 Prioridad: ${rec.priority === 'high' ? 'Alta' : 'Media'}\n\n`;
    });
    
    response += '¿Te interesa alguna de estas opciones?';
    
    return response;
}

// ===== MEMORIA DE CONVERSACIÓN =====
class ConversationMemory {
    constructor() {
        this.conversations = new Map();
        this.userPreferences = new Map();
    }
    
    addMessage(userId, message, response, sentiment) {
        if (!this.conversations.has(userId)) {
            this.conversations.set(userId, []);
        }
        
        this.conversations.get(userId).push({
            timestamp: Date.now(),
            userMessage: message,
            assistantResponse: response,
            sentiment: sentiment
        });
        
        // Actualizar preferencias del usuario
        this.updateUserPreferences(userId, message);
    }
    
    getContext(userId, maxMessages = 5) {
        const conversation = this.conversations.get(userId) || [];
        return conversation.slice(-maxMessages);
    }
    
    updateUserPreferences(userId, message) {
        if (!this.userPreferences.has(userId)) {
            this.userPreferences.set(userId, {
                preferredServices: [],
                budget: null,
                timeline: null,
                urgency: 'normal',
                interests: []
            });
        }
        
        const preferences = this.userPreferences.get(userId);
        const text = message.toLowerCase();
        
        // Detectar servicios de interés
        Object.keys(SERVICE_RECOMMENDATIONS).forEach(service => {
            if (text.includes(service) && !preferences.interests.includes(service)) {
                preferences.interests.push(service);
            }
        });
        
        // Detectar presupuesto
        const budgetMatch = text.match(/(\d+)\s*(?:mil|k|usd|dólares?)/i);
        if (budgetMatch) {
            preferences.budget = budgetMatch[1];
        }
        
        // Detectar timeline
        if (text.includes('urgente') || text.includes('rápido')) {
            preferences.urgency = 'high';
        }
        
        this.userPreferences.set(userId, preferences);
    }
    
    getUserPreferences(userId) {
        return this.userPreferences.get(userId) || {
            preferredServices: [],
            budget: null,
            timeline: null,
            urgency: 'normal',
            interests: []
        };
    }
    
    getPersonalizedGreeting(userId) {
        const preferences = this.getUserPreferences(userId);
        const context = this.getContext(userId, 3);
        
        if (context.length === 0) {
            return '¡Hola! 👋 Soy el asistente virtual de DevsTopia. ¿En qué puedo ayudarte hoy?';
        }
        
        if (preferences.interests.length > 0) {
            return `¡Hola de nuevo! 👋 Veo que te interesan nuestros servicios de ${preferences.interests.join(', ')}. ¿En qué más puedo ayudarte?`;
        }
        
        return '¡Hola de nuevo! 👋 ¿En qué puedo ayudarte hoy?';
    }
}

// ===== SISTEMA DE ESCALAMIENTO INTELIGENTE =====
function shouldEscalateToHuman(sentiment, message, conversationHistory) {
    const urgentKeywords = ['urgente', 'emergencia', 'problema crítico', 'no funciona'];
    const complaintKeywords = ['queja', 'reclamo', 'insatisfecho', 'molesto'];
    
    const text = message.toLowerCase();
    
    // Condiciones para escalamiento
    if (sentiment === 'urgent') return true;
    if (complaintKeywords.some(keyword => text.includes(keyword))) return true;
    if (conversationHistory.length > 10) return true; // Conversación muy larga
    
    return false;
}

function getEscalationMessage() {
    return `🚨 **Detecté que necesitas atención especializada.**\n\n` +
           `Te conectaré inmediatamente con un especialista de DevsTopia.\n\n` +
           `📧 Email: info@devstopia.com\n` +
           `📱 WhatsApp: +57 300 123 4567\n\n` +
           `Un representante se pondrá en contacto contigo en menos de 30 minutos.`;
}

// ===== FUNCIONES PRINCIPALES =====
const conversationMemory = new ConversationMemory();

function processEnhancedResponse(userMessage, userId) {
    // Análisis de sentimiento
    const sentimentAnalysis = analyzeSentiment(userMessage);
    
    // Obtener contexto de conversación
    const context = conversationMemory.getContext(userId);
    
    // Verificar si debe escalar a humano
    if (shouldEscalateToHuman(sentimentAnalysis.sentiment, userMessage, context)) {
        return {
            response: getEscalationMessage(),
            sentiment: sentimentAnalysis.sentiment,
            shouldEscalate: true,
            recommendations: []
        };
    }
    
    // Obtener recomendaciones
    const recommendations = getRecommendations(userMessage);
    
    // Procesar respuesta base (usar el sistema existente)
    const baseResponse = processAutoResponse(userMessage);
    
    // Aplicar sentimiento a la respuesta
    const enhancedResponse = getResponseBySentiment(sentimentAnalysis.sentiment, baseResponse);
    
    // Agregar recomendaciones si existen
    let finalResponse = enhancedResponse;
    if (recommendations.length > 0) {
        finalResponse += '\n\n' + formatRecommendations(recommendations);
    }
    
    // Guardar en memoria
    conversationMemory.addMessage(userId, userMessage, finalResponse, sentimentAnalysis.sentiment);
    
    return {
        response: finalResponse,
        sentiment: sentimentAnalysis.sentiment,
        shouldEscalate: false,
        recommendations: recommendations
    };
}

// ===== EXPORTAR FUNCIONES =====
window.processEnhancedResponse = processEnhancedResponse;
window.analyzeSentiment = analyzeSentiment;
window.getRecommendations = getRecommendations;
window.conversationMemory = conversationMemory; 