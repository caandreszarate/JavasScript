// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    initSidebar();
    initNotifications();
    initJobApplications();
    initCharts();
    initRealTimeUpdates();
}

// Sidebar functionality
function initSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        });
    }
}

// Notifications functionality
function initNotifications() {
    const notificationsToggle = document.querySelector('.notifications-toggle');
    const notificationsMenu = document.getElementById('notificationsMenu');
    
    if (notificationsToggle && notificationsMenu) {
        notificationsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationsMenu.classList.toggle('show');
        });
        
        // Close notifications when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationsMenu.contains(e.target) && !notificationsToggle.contains(e.target)) {
                notificationsMenu.classList.remove('show');
            }
        });
    }
}

// Global functions for dashboard
window.toggleSidebar = function() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
};

window.toggleNotifications = function() {
    const notificationsMenu = document.getElementById('notificationsMenu');
    if (notificationsMenu) {
        notificationsMenu.classList.toggle('show');
    }
};

window.markAllAsRead = function() {
    // Mark all notifications as read
    fetch('/backend/api/notifications/mark-all-read.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Remove notification badges
            const badges = document.querySelectorAll('.notification-badge');
            badges.forEach(badge => badge.remove());
            
            // Hide notifications menu
            const notificationsMenu = document.getElementById('notificationsMenu');
            if (notificationsMenu) {
                notificationsMenu.classList.remove('show');
            }
            
            showToast('Notificaciones marcadas como leídas', 'success');
        }
    })
    .catch(error => {
        console.error('Error marking notifications as read:', error);
        showToast('Error al marcar notificaciones', 'error');
    });
};

// Job application functionality
function initJobApplications() {
    // Add event listeners for job application buttons
    const applyButtons = document.querySelectorAll('[onclick^="applyToJob"]');
    applyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const jobId = button.getAttribute('data-job-id') || 
                         button.onclick.toString().match(/applyToJob\((\d+)\)/)?.[1];
            if (jobId) {
                applyToJob(jobId);
            }
        });
    });
}

window.applyToJob = function(jobId) {
    // Check if user has completed profile
    const profileCompleted = document.querySelector('.welcome-content p')?.textContent.includes('completo');
    
    if (!profileCompleted) {
        showToast('Completa tu perfil antes de postularte', 'warning');
        setTimeout(() => {
            window.location.href = 'profile.php';
        }, 2000);
        return;
    }
    
    // Show application modal
    showApplicationModal(jobId);
};

function showApplicationModal(jobId) {
    // Create modal for job application
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeApplicationModal()">&times;</span>
            <h2>Postularse al Trabajo</h2>
            <form id="applicationForm" class="application-form">
                <div class="form-group">
                    <label for="coverLetter">Carta de Presentación</label>
                    <textarea id="coverLetter" name="cover_letter" rows="6" 
                              placeholder="Explica por qué eres el candidato ideal para este puesto..."
                              required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="resumeFile">CV/Resumen (opcional)</label>
                    <input type="file" id="resumeFile" name="resume_file" 
                           accept=".pdf,.doc,.docx">
                    <small>Formatos permitidos: PDF, DOC, DOCX (máx. 5MB)</small>
                </div>
                
                <div class="form-group">
                    <label for="additionalFiles">Archivos Adicionales (opcional)</label>
                    <input type="file" id="additionalFiles" name="additional_files[]" 
                           accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple>
                    <small>Puedes subir múltiples archivos</small>
                </div>
                
                <div class="form-actions">
                    <button type="button" onclick="closeApplicationModal()" class="btn btn-secondary">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i> Enviar Postulación
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Handle form submission
    const form = document.getElementById('applicationForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitApplication(jobId, form);
    });
}

window.closeApplicationModal = function() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
};

function submitApplication(jobId, form) {
    const formData = new FormData(form);
    formData.append('job_id', jobId);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    fetch('/backend/api/applications/create.php', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('Postulación enviada exitosamente', 'success');
            closeApplicationModal();
            
            // Refresh the page to update stats
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            showToast(data.message || 'Error al enviar postulación', 'error');
        }
    })
    .catch(error => {
        console.error('Error submitting application:', error);
        showToast('Error de conexión', 'error');
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Charts functionality (if using charts)
function initCharts() {
    // Initialize charts if needed
    // This could include application statistics, profile completion, etc.
}

// Real-time updates
function initRealTimeUpdates() {
    // Check for new notifications every 30 seconds
    setInterval(checkNewNotifications, 30000);
    
    // Update application statuses
    setInterval(updateApplicationStatuses, 60000);
}

function checkNewNotifications() {
    fetch('/backend/api/notifications/check-new.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.new_count > 0) {
            updateNotificationBadge(data.new_count);
            showToast(`Tienes ${data.new_count} nueva(s) notificación(es)`, 'info');
        }
    })
    .catch(error => {
        console.error('Error checking notifications:', error);
    });
}

function updateNotificationBadge(count) {
    let badge = document.querySelector('.notification-badge');
    if (!badge) {
        const toggle = document.querySelector('.notifications-toggle');
        if (toggle) {
            badge = document.createElement('span');
            badge.className = 'notification-badge';
            toggle.appendChild(badge);
        }
    }
    
    if (badge) {
        badge.textContent = count;
    }
}

function updateApplicationStatuses() {
    // Update application statuses without refreshing the page
    fetch('/backend/api/applications/get-recent.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.applications) {
            updateApplicationCards(data.applications);
        }
    })
    .catch(error => {
        console.error('Error updating applications:', error);
    });
}

function updateApplicationCards(applications) {
    applications.forEach(app => {
        const card = document.querySelector(`[data-application-id="${app.id}"]`);
        if (card) {
            const statusBadge = card.querySelector('.status-badge');
            if (statusBadge && statusBadge.textContent !== app.status) {
                statusBadge.textContent = app.status;
                statusBadge.className = `status-badge status-${app.status}`;
                
                // Show notification for status change
                showToast(`Tu postulación para "${app.job_title}" ha sido ${app.status}`, 'info');
            }
        }
    });
}

// Logout functionality
window.logout = function() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Clear local storage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        
        // Show logout message
        showToast('Sesión cerrada exitosamente', 'info');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    }
};

// Utility functions
function showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
    
    // Manual close
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to search jobs
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.location.href = 'jobs.php';
    }
    
    // Ctrl/Cmd + N to open notifications
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        toggleNotifications();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.remove();
            }
        });
        
        const notificationsMenu = document.getElementById('notificationsMenu');
        if (notificationsMenu && notificationsMenu.classList.contains('show')) {
            notificationsMenu.classList.remove('show');
        }
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle scroll events
const throttledScroll = debounce(() => {
    // Handle scroll events for performance
}, 16);

window.addEventListener('scroll', throttledScroll);

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.showToast = showToast;
window.applyToJob = applyToJob;
window.closeApplicationModal = closeApplicationModal;
window.toggleSidebar = toggleSidebar;
window.toggleNotifications = toggleNotifications;
window.markAllAsRead = markAllAsRead;
window.logout = logout; 