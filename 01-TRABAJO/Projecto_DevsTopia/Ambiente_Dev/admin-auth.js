// Sistema de Autenticación para Administradores
// Control de acceso al dashboard de analytics

class AdminAuth {
    constructor() {
        this.adminCredentials = {
            username: 'admin',
            password: 'devstopia2024',
            sessionTimeout: 30 * 60 * 1000 // 30 minutos
        };
        
        this.isAuthenticated = false;
        this.sessionStart = null;
        this.adminPanel = null;
    }
    
    // Verificar si el usuario es administrador
    checkAdminAccess() {
        // Verificar si hay sesión activa
        const sessionData = localStorage.getItem('adminSession');
        if (sessionData) {
            const session = JSON.parse(sessionData);
            const now = Date.now();
            
            if (now - session.timestamp < this.adminCredentials.sessionTimeout) {
                this.isAuthenticated = true;
                this.sessionStart = session.timestamp;
                return true;
            } else {
                // Sesión expirada
                this.logout();
                return false;
            }
        }
        return false;
    }
    
    // Mostrar modal de login
    showLoginModal() {
        const modal = document.createElement('div');
        modal.id = 'admin-login-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            font-family: 'Inter', sans-serif;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 10px;
                width: 350px;
                max-width: 90%;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h3 style="color: #3B71FF; margin: 0;">🔐 <span data-i18n="admin_login">Acceso Administrador</span></h3>
                    <p style="color: #666; font-size: 14px; margin: 10px 0;" data-i18n="admin_login_desc">Ingresa las credenciales para acceder al dashboard</p>
                </div>
                
                <form id="admin-login-form">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;" data-i18n="admin_username">Usuario:</label>
                        <input type="text" id="admin-username" style="
                            width: 100%;
                            padding: 10px;
                            border: 2px solid #e0e0e0;
                            border-radius: 5px;
                            font-size: 14px;
                            box-sizing: border-box;
                        " data-i18n-placeholder="admin_username_placeholder" placeholder="Ingresa tu usuario">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;" data-i18n="admin_password">Contraseña:</label>
                        <input type="password" id="admin-password" style="
                            width: 100%;
                            padding: 10px;
                            border: 2px solid #e0e0e0;
                            border-radius: 5px;
                            font-size: 14px;
                            box-sizing: border-box;
                        " data-i18n-placeholder="admin_password_placeholder" placeholder="Ingresa tu contraseña">
                    </div>
                    
                    <div style="display: flex; gap: 10px;">
                        <button type="submit" style="
                            flex: 1;
                            padding: 12px;
                            background: #3B71FF;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-weight: 500;
                        " data-i18n="admin_login_btn">Ingresar</button>
                        <button type="button" onclick="adminAuth.closeLoginModal()" style="
                            flex: 1;
                            padding: 12px;
                            background: #6c757d;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-weight: 500;
                        " data-i18n="btn_close">Cancelar</button>
                    </div>
                </form>
                
                <div id="login-error" style="
                    color: #dc3545;
                    font-size: 12px;
                    margin-top: 10px;
                    text-align: center;
                    display: none;
                "></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Manejar envío del formulario
        document.getElementById('admin-login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLoginModal();
            }
        });
    }
    
    // Manejar login
    handleLogin() {
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        const errorDiv = document.getElementById('login-error');
        
        if (username === this.adminCredentials.username && 
            password === this.adminCredentials.password) {
            
            // Login exitoso
            this.isAuthenticated = true;
            this.sessionStart = Date.now();
            
            // Guardar sesión
            localStorage.setItem('adminSession', JSON.stringify({
                timestamp: this.sessionStart,
                username: username
            }));
            
            // Cerrar modal y mostrar dashboard
            this.closeLoginModal();
            this.showAdminPanel();
            
            // Mostrar notificación
            showNotification('🔐 Acceso administrador concedido', 'success');
            
        } else {
            // Login fallido
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Credenciales incorrectas. Intenta de nuevo.';
            
            // Limpiar campos
            document.getElementById('admin-username').value = '';
            document.getElementById('admin-password').value = '';
        }
    }
    
    // Cerrar modal de login
    closeLoginModal() {
        const modal = document.getElementById('admin-login-modal');
        if (modal) {
            modal.remove();
        }
    }
    
    // Mostrar panel de administrador
    showAdminPanel() {
        if (!this.checkAdminAccess()) {
            this.showLoginModal();
            return;
        }
        
        // Crear panel de administrador
        this.adminPanel = document.createElement('div');
        this.adminPanel.id = 'admin-panel';
        this.adminPanel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 400px;
            max-height: 80vh;
            background: white;
            border: 2px solid #3B71FF;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: 'Inter', sans-serif;
            overflow-y: auto;
            display: none;
        `;
        
        // Header del panel
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #3B71FF, #1e40af);
            color: white;
            padding: 15px;
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        header.innerHTML = `
            <div>
                <h3 style="margin: 0; font-size: 16px;">👨‍💼 Panel Administrador</h3>
                <small style="opacity: 0.8;">Sesión activa</small>
            </div>
            <button onclick="adminAuth.closeAdminPanel()" style="
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 18px;
            ">×</button>
        `;
        
        // Contenido del panel
        const content = document.createElement('div');
        content.style.cssText = `
            padding: 15px;
            font-size: 12px;
        `;
        
        this.adminPanel.appendChild(header);
        this.adminPanel.appendChild(content);
        
        // Agregar al body
        document.body.appendChild(this.adminPanel);
        
        // Actualizar contenido
        this.updateAdminPanel();
        
        // Mostrar panel
        this.adminPanel.style.display = 'block';
    }
    
    // Actualizar contenido del panel
    updateAdminPanel() {
        if (!this.adminPanel) return;
        
        const content = this.adminPanel.querySelector('div:last-child');
        const report = chatAnalytics.generateReport();
        
        content.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h4 style="color: #3B71FF; margin: 0 0 10px 0;">📊 Métricas Generales</h4>
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
                <h4 style="color: #3B71FF; margin: 0 0 10px 0;">😊 Análisis de Sentimiento</h4>
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
            
            <div style="margin-bottom: 15px;">
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
            
            <div style="border-top: 1px solid #e0e0e0; padding-top: 10px;">
                <button onclick="adminAuth.logout()" style="
                    width: 100%;
                    padding: 8px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 12px;
                ">🚪 Cerrar Sesión</button>
            </div>
        `;
    }
    
    // Cerrar panel de administrador
    closeAdminPanel() {
        if (this.adminPanel) {
            this.adminPanel.style.display = 'none';
        }
    }
    
    // Cerrar sesión
    logout() {
        this.isAuthenticated = false;
        this.sessionStart = null;
        localStorage.removeItem('adminSession');
        
        if (this.adminPanel) {
            this.adminPanel.remove();
            this.adminPanel = null;
        }
        
        showNotification('🚪 Sesión de administrador cerrada', 'info');
    }
    
    // Verificar sesión periódicamente
    checkSession() {
        if (this.isAuthenticated && this.sessionStart) {
            const now = Date.now();
            if (now - this.sessionStart > this.adminCredentials.sessionTimeout) {
                this.logout();
                showNotification('⏰ Sesión expirada. Ingresa nuevamente.', 'warning');
            }
        }
    }
}

// ===== INSTANCIA GLOBAL =====
const adminAuth = new AdminAuth();

// ===== FUNCIONES GLOBALES =====
window.adminAuth = adminAuth;

// Verificar sesión cada minuto
setInterval(() => {
    adminAuth.checkSession();
}, 60000);

// Función para mostrar panel de administrador
function showAdminPanel() {
    adminAuth.showAdminPanel();
}

// Función para cerrar panel de administrador
function closeAdminPanel() {
    adminAuth.closeAdminPanel();
}

// Exportar funciones
window.showAdminPanel = showAdminPanel;
window.closeAdminPanel = closeAdminPanel; 