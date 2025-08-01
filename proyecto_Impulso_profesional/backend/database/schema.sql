-- Esquema de Base de Datos para Impulso Profesional
-- Hostinger MySQL Database

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS impulso_profesional
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE impulso_profesional;

-- Tabla de usuarios
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    type ENUM('professional', 'company', 'admin') NOT NULL DEFAULT 'professional',
    status ENUM('active', 'inactive', 'pending') NOT NULL DEFAULT 'pending',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    profile_completed BOOLEAN DEFAULT FALSE,
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_type (type),
    INDEX idx_status (status)
);

-- Tabla de perfiles profesionales
CREATE TABLE professional_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    birth_date DATE,
    gender ENUM('male', 'female', 'other'),
    nationality VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Guinea Ecuatorial',
    education_level ENUM('primary', 'secondary', 'bachelor', 'master', 'phd', 'other'),
    field_of_study VARCHAR(255),
    institution VARCHAR(255),
    graduation_year YEAR,
    experience_years INT DEFAULT 0,
    skills TEXT,
    languages TEXT,
    certifications TEXT,
    bio TEXT,
    resume_file VARCHAR(255),
    cover_letter TEXT,
    availability ENUM('immediate', '2_weeks', '1_month', '3_months', 'flexible'),
    salary_expectation DECIMAL(10,2),
    preferred_location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_education_level (education_level),
    INDEX idx_experience_years (experience_years)
);

-- Tabla de perfiles de empresas
CREATE TABLE company_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    company_size ENUM('1-10', '11-50', '51-200', '201-500', '500+'),
    founded_year YEAR,
    website VARCHAR(255),
    description TEXT,
    logo VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Guinea Ecuatorial',
    contact_person VARCHAR(255),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_industry (industry),
    INDEX idx_verified (verified)
);

-- Tabla de ofertas de trabajo
CREATE TABLE job_postings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    responsibilities TEXT,
    benefits TEXT,
    job_type ENUM('full_time', 'part_time', 'contract', 'internship', 'temporary') NOT NULL,
    experience_level ENUM('entry', 'junior', 'mid', 'senior', 'executive') NOT NULL,
    education_level ENUM('primary', 'secondary', 'bachelor', 'master', 'phd', 'any') NOT NULL,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    salary_currency VARCHAR(3) DEFAULT 'XAF',
    location VARCHAR(255),
    remote_work BOOLEAN DEFAULT FALSE,
    vacancies INT DEFAULT 1,
    status ENUM('active', 'inactive', 'closed', 'draft') DEFAULT 'active',
    application_deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company_profiles(id) ON DELETE CASCADE,
    INDEX idx_company_id (company_id),
    INDEX idx_status (status),
    INDEX idx_job_type (job_type),
    INDEX idx_experience_level (experience_level),
    INDEX idx_location (location)
);

-- Tabla de postulaciones
CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    user_id INT NOT NULL,
    status ENUM('pending', 'reviewed', 'shortlisted', 'interviewed', 'accepted', 'rejected') DEFAULT 'pending',
    cover_letter TEXT,
    resume_file VARCHAR(255),
    additional_files TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by INT NULL,
    notes TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    FOREIGN KEY (job_id) REFERENCES job_postings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_application (job_id, user_id),
    INDEX idx_job_id (job_id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_applied_at (applied_at)
);

-- Tabla de categorías de trabajo
CREATE TABLE job_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_active (active)
);

-- Tabla de relación entre trabajos y categorías
CREATE TABLE job_category_relations (
    job_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (job_id, category_id),
    FOREIGN KEY (job_id) REFERENCES job_postings(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES job_categories(id) ON DELETE CASCADE
);

-- Tabla de habilidades
CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_skill (name),
    INDEX idx_category (category),
    INDEX idx_active (active)
);

-- Tabla de relación entre usuarios y habilidades
CREATE TABLE user_skills (
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    proficiency ENUM('beginner', 'intermediate', 'advanced', 'expert') DEFAULT 'intermediate',
    years_experience INT DEFAULT 0,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- Tabla de notificaciones
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_read_at (read_at),
    INDEX idx_created_at (created_at)
);

-- Tabla de mensajes
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_sender_id (sender_id),
    INDEX idx_receiver_id (receiver_id),
    INDEX idx_read_at (read_at),
    INDEX idx_created_at (created_at)
);

-- Tabla de sesiones
CREATE TABLE sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);

-- Tabla de logs de actividad
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    action VARCHAR(255) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- Tabla de configuraciones del sistema
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    type ENUM('string', 'integer', 'boolean', 'json') DEFAULT 'string',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos iniciales

-- Categorías de trabajo
INSERT INTO job_categories (name, description, icon, color) VALUES
('Cocina', 'Ofertas de trabajo en cocina y gastronomía', 'fas fa-utensils', '#FF6B6B'),
('Tecnología', 'Trabajos en tecnología y telecomunicaciones', 'fas fa-wifi', '#4ECDC4'),
('Hospitalidad', 'Recepcionistas y atención al cliente', 'fas fa-concierge-bell', '#45B7D1'),
('Servicios', 'Camareros y servicios de eventos', 'fas fa-glass-cheers', '#96CEB4'),
('Recursos Humanos', 'Gestión de RRHH y administración', 'fas fa-users', '#FFEAA7'),
('Análisis de Datos', 'Analistas comerciales y estadísticos', 'fas fa-chart-line', '#DDA0DD'),
('Finanzas', 'Trabajos en banca y finanzas', 'fas fa-university', '#98D8C8'),
('Agricultura', 'Desarrollo agrícola y agroindustria', 'fas fa-seedling', '#F7DC6F');

-- Habilidades comunes
INSERT INTO skills (name, category, description) VALUES
('Cocina Internacional', 'Cocina', 'Preparación de platos de diferentes culturas'),
('Gestión de Inventarios', 'Cocina', 'Control de stock y pedidos'),
('Atención al Cliente', 'Servicios', 'Servicio al cliente y comunicación'),
('Gestión de Equipos', 'RRHH', 'Liderazgo y gestión de personal'),
('Análisis de Datos', 'Tecnología', 'Análisis estadístico y reportes'),
('Comunicación', 'General', 'Comunicación efectiva oral y escrita'),
('Trabajo en Equipo', 'General', 'Colaboración y trabajo grupal'),
('Resolución de Problemas', 'General', 'Análisis y solución de problemas'),
('Microsoft Office', 'Administración', 'Word, Excel, PowerPoint'),
('Gestión de Proyectos', 'Administración', 'Planificación y seguimiento'),
('Ventas', 'Comercial', 'Técnicas de venta y negociación'),
('Marketing Digital', 'Comercial', 'Estrategias de marketing online');

-- Configuraciones del sistema
INSERT INTO settings (key_name, value, description, type) VALUES
('site_name', 'Impulso Profesional', 'Nombre del sitio web', 'string'),
('site_description', 'Conectando talento con oportunidades en Guinea Ecuatorial', 'Descripción del sitio', 'string'),
('contact_email', 'info@impulsoprofesionalge.org', 'Email de contacto', 'string'),
('contact_phone', '(+240) 555 1212', 'Teléfono de contacto', 'string'),
('max_file_size', '5242880', 'Tamaño máximo de archivos en bytes', 'integer'),
('allowed_file_types', '["jpg","jpeg","png","pdf","doc","docx"]', 'Tipos de archivo permitidos', 'json'),
('maintenance_mode', 'false', 'Modo mantenimiento', 'boolean'),
('registration_enabled', 'true', 'Registro de usuarios habilitado', 'boolean'),
('email_verification_required', 'true', 'Verificación de email requerida', 'boolean'),
('max_applications_per_job', '5', 'Máximo de postulaciones por trabajo', 'integer'),
('job_posting_fee', '0', 'Costo por publicación de trabajo', 'integer'),
('application_notification', 'true', 'Notificaciones de postulaciones', 'boolean');

-- Crear usuario administrador por defecto
-- Password: admin123 (cambiar en producción)
INSERT INTO users (name, email, password, type, status, email_verified, profile_completed) VALUES
('Administrador', 'admin@impulsoprofesionalge.org', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'active', TRUE, TRUE);

-- Crear índices adicionales para optimización
CREATE INDEX idx_jobs_status_location ON job_postings(status, location);
CREATE INDEX idx_applications_status_date ON applications(status, applied_at);
CREATE INDEX idx_users_type_status ON users(type, status);
CREATE INDEX idx_notifications_unread ON notifications(user_id, read_at) WHERE read_at IS NULL;

-- Crear vistas útiles
CREATE VIEW active_jobs AS
SELECT j.*, c.company_name, c.industry
FROM job_postings j
JOIN company_profiles c ON j.company_id = c.id
WHERE j.status = 'active' AND c.verified = TRUE;

CREATE VIEW job_applications_summary AS
SELECT 
    j.id as job_id,
    j.title,
    c.company_name,
    COUNT(a.id) as total_applications,
    COUNT(CASE WHEN a.status = 'pending' THEN 1 END) as pending_applications,
    COUNT(CASE WHEN a.status = 'reviewed' THEN 1 END) as reviewed_applications,
    COUNT(CASE WHEN a.status = 'accepted' THEN 1 END) as accepted_applications
FROM job_postings j
JOIN company_profiles c ON j.company_id = c.id
LEFT JOIN applications a ON j.id = a.job_id
GROUP BY j.id;

-- Crear procedimientos almacenados
DELIMITER //

CREATE PROCEDURE GetUserDashboard(IN user_id INT)
BEGIN
    SELECT 
        u.id,
        u.name,
        u.email,
        u.type,
        u.status,
        u.profile_completed,
        CASE 
            WHEN u.type = 'professional' THEN pp.bio
            WHEN u.type = 'company' THEN cp.description
            ELSE NULL
        END as profile_info
    FROM users u
    LEFT JOIN professional_profiles pp ON u.id = pp.user_id
    LEFT JOIN company_profiles cp ON u.id = cp.user_id
    WHERE u.id = user_id;
END //

CREATE PROCEDURE GetJobRecommendations(IN user_id INT, IN limit_count INT)
BEGIN
    SELECT DISTINCT j.*, c.company_name, c.industry
    FROM job_postings j
    JOIN company_profiles c ON j.company_id = c.id
    JOIN user_skills us ON us.user_id = user_id
    JOIN skills s ON us.skill_id = s.id
    WHERE j.status = 'active' 
    AND j.description LIKE CONCAT('%', s.name, '%')
    ORDER BY j.created_at DESC
    LIMIT limit_count;
END //

DELIMITER ;

-- Crear triggers para mantener integridad
DELIMITER //

CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;

CREATE TRIGGER update_job_updated_at
BEFORE UPDATE ON job_postings
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;

CREATE TRIGGER log_user_activity
AFTER INSERT ON users
FOR EACH ROW
INSERT INTO activity_logs (user_id, action, description)
VALUES (NEW.id, 'user_registered', CONCAT('Usuario registrado: ', NEW.email));

DELIMITER ;

-- Comentarios sobre la estructura
/*
Esta base de datos está diseñada para:

1. Gestión de usuarios (profesionales, empresas, administradores)
2. Perfiles detallados para cada tipo de usuario
3. Publicación y gestión de ofertas de trabajo
4. Sistema de postulaciones con seguimiento
5. Categorización de trabajos y habilidades
6. Sistema de notificaciones y mensajería
7. Logs de actividad para auditoría
8. Configuraciones flexibles del sistema

Características de seguridad:
- Contraseñas hasheadas con bcrypt
- Tokens JWT para autenticación
- Logs de actividad
- Validación de datos
- Índices optimizados para consultas frecuentes

Para producción:
1. Cambiar las contraseñas por defecto
2. Configurar las credenciales de la base de datos
3. Ajustar los límites de archivos según el servidor
4. Configurar el envío de emails
5. Implementar backup automático
*/ 