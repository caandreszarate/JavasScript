// Authentication JavaScript
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.token = localStorage.getItem('auth_token');
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupAuthListeners();
        this.updateUI();
    }

    // Check if user is authenticated
    checkAuthStatus() {
        if (this.token) {
            this.validateToken();
        }
    }

    // Validate token with backend
    async validateToken() {
        try {
            const response = await fetch('/backend/api/auth/validate.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.isAuthenticated = true;
                this.currentUser = data.user;
                this.updateUI();
            } else {
                this.logout();
            }
        } catch (error) {
            console.error('Error validating token:', error);
            this.logout();
        }
    }

    // Login user
    async login(email, password) {
        try {
            showLoadingSpinner();
            
            const response = await fetch('/backend/api/auth/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                this.isAuthenticated = true;
                
                localStorage.setItem('auth_token', this.token);
                localStorage.setItem('user_data', JSON.stringify(data.user));
                
                this.updateUI();
                showToast('Inicio de sesión exitoso', 'success');
                
                // Redirect based on user type
                setTimeout(() => {
                    this.redirectToDashboard();
                }, 1000);
                
            } else {
                showToast(data.message || 'Error en el inicio de sesión', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showToast('Error de conexión', 'error');
        } finally {
            hideLoadingSpinner();
        }
    }

    // Register user
    async register(userData) {
        try {
            showLoadingSpinner();
            
            const response = await fetch('/backend/api/auth/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                showToast('Registro exitoso. Por favor, inicia sesión.', 'success');
                closeModal('register');
                openModal('login');
            } else {
                showToast(data.message || 'Error en el registro', 'error');
            }
        } catch (error) {
            console.error('Register error:', error);
            showToast('Error de conexión', 'error');
        } finally {
            hideLoadingSpinner();
        }
    }

    // Logout user
    logout() {
        this.token = null;
        this.currentUser = null;
        this.isAuthenticated = false;
        
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        
        this.updateUI();
        showToast('Sesión cerrada', 'info');
        
        // Redirect to home
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    }

    // Update UI based on auth status
    updateUI() {
        const authButtons = document.querySelector('.nav-buttons');
        const userMenu = document.querySelector('.user-menu');
        
        if (this.isAuthenticated && this.currentUser) {
            // Show user menu
            if (authButtons) {
                authButtons.innerHTML = `
                    <div class="user-menu">
                        <button class="btn btn-secondary user-toggle" onclick="toggleUserMenu()">
                            <i class="fas fa-user"></i>
                            ${this.currentUser.name}
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="user-dropdown" id="userDropdown">
                            <a href="/dashboard/user/" class="dropdown-item">
                                <i class="fas fa-tachometer-alt"></i> Mi Dashboard
                            </a>
                            <a href="/dashboard/user/profile.php" class="dropdown-item">
                                <i class="fas fa-user-edit"></i> Mi Perfil
                            </a>
                            <a href="/dashboard/user/applications.php" class="dropdown-item">
                                <i class="fas fa-file-alt"></i> Mis Postulaciones
                            </a>
                            <div class="dropdown-divider"></div>
                            <button onclick="authManager.logout()" class="dropdown-item">
                                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                            </button>
                        </div>
                    </div>
                `;
            }
        } else {
            // Show auth buttons
            if (authButtons) {
                authButtons.innerHTML = `
                    <button class="btn btn-secondary" onclick="openModal('login')">
                        <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                    </button>
                    <button class="btn btn-primary" onclick="openModal('register')">
                        <i class="fas fa-user-plus"></i> Registrarse
                    </button>
                `;
            }
        }
    }

    // Redirect to appropriate dashboard
    redirectToDashboard() {
        if (this.currentUser) {
            switch (this.currentUser.type) {
                case 'professional':
                    window.location.href = '/dashboard/user/';
                    break;
                case 'company':
                    window.location.href = '/dashboard/company/';
                    break;
                case 'admin':
                    window.location.href = '/dashboard/admin/';
                    break;
                default:
                    window.location.href = '/dashboard/user/';
            }
        }
    }

    // Setup auth form listeners
    setupAuthListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                await this.login(email, password);
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(registerForm);
                const userData = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    type: formData.get('type'),
                    password: formData.get('password')
                };
                
                await this.register(userData);
            });
        }
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user has specific role
    hasRole(role) {
        return this.currentUser && this.currentUser.type === role;
    }

    // Check if user has permission
    hasPermission(permission) {
        if (!this.currentUser) return false;
        
        const permissions = {
            'professional': ['view_profile', 'edit_profile', 'apply_jobs'],
            'company': ['view_profile', 'edit_profile', 'post_jobs', 'view_applications'],
            'admin': ['view_profile', 'edit_profile', 'manage_users', 'manage_jobs', 'view_analytics']
        };
        
        return permissions[this.currentUser.type]?.includes(permission) || false;
    }
}

// User menu functionality
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close user menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
});

// Loading spinner functions
function showLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'flex';
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Export for global access
window.authManager = authManager;
window.toggleUserMenu = toggleUserMenu;

// Add CSS for user menu
const userMenuStyles = `
    .user-menu {
        position: relative;
    }
    
    .user-toggle {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }
    
    .user-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        min-width: 200px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: var(--transition);
    }
    
    .user-dropdown.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .dropdown-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md);
        color: var(--text-primary);
        text-decoration: none;
        transition: var(--transition);
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        font-family: var(--font-family);
        font-size: var(--font-size-base);
    }
    
    .dropdown-item:hover {
        background: var(--bg-secondary);
        color: var(--primary-color);
    }
    
    .dropdown-divider {
        height: 1px;
        background: var(--border-color);
        margin: var(--spacing-xs) 0;
    }
`;

// Inject styles
const style = document.createElement('style');
style.textContent = userMenuStyles;
document.head.appendChild(style); 