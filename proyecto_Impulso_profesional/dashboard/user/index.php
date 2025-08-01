<?php
require_once '../../backend/config/database.php';

// Verificar autenticación
$user = getAuthenticatedUser();
if (!$user || $user['type'] !== 'professional') {
    header('Location: /');
    exit;
}

// Obtener datos del usuario
$db = getDB();
$userData = $db->fetch("SELECT * FROM users WHERE id = ?", [$user['id']]);
$profile = $db->fetch("SELECT * FROM professional_profiles WHERE user_id = ?", [$user['id']]);

// Obtener estadísticas
$applications = $db->fetchAll("SELECT * FROM applications WHERE user_id = ? ORDER BY applied_at DESC LIMIT 5", [$user['id']]);
$totalApplications = $db->fetch("SELECT COUNT(*) as count FROM applications WHERE user_id = ?", [$user['id']])['count'];
$pendingApplications = $db->fetch("SELECT COUNT(*) as count FROM applications WHERE user_id = ? AND status = 'pending'", [$user['id']])['count'];
$acceptedApplications = $db->fetch("SELECT COUNT(*) as count FROM applications WHERE user_id = ? AND status = 'accepted'", [$user['id']])['count'];

// Obtener trabajos recomendados
$recommendedJobs = $db->fetchAll("
    SELECT j.*, c.company_name, c.industry 
    FROM job_postings j 
    JOIN company_profiles c ON j.company_id = c.id 
    WHERE j.status = 'active' 
    ORDER BY j.created_at DESC 
    LIMIT 6
");

// Obtener notificaciones no leídas
$notifications = $db->fetchAll("
    SELECT * FROM notifications 
    WHERE user_id = ? AND read_at IS NULL 
    ORDER BY created_at DESC 
    LIMIT 5
", [$user['id']]);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Dashboard - Impulso Profesional</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="../../frontend/css/style.css">
    <link rel="stylesheet" href="../../frontend/css/responsive.css">
    <link rel="stylesheet" href="css/dashboard.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="dashboard-body">
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <img src="../../frontend/assets/logo.png" alt="Impulso Profesional" class="sidebar-logo">
            <span class="sidebar-title">Dashboard</span>
        </div>
        
        <nav class="sidebar-nav">
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="index.php" class="nav-link active">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="profile.php" class="nav-link">
                        <i class="fas fa-user-edit"></i>
                        <span>Mi Perfil</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="applications.php" class="nav-link">
                        <i class="fas fa-file-alt"></i>
                        <span>Mis Postulaciones</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="jobs.php" class="nav-link">
                        <i class="fas fa-search"></i>
                        <span>Buscar Trabajos</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="messages.php" class="nav-link">
                        <i class="fas fa-envelope"></i>
                        <span>Mensajes</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="notifications.php" class="nav-link">
                        <i class="fas fa-bell"></i>
                        <span>Notificaciones</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="settings.php" class="nav-link">
                        <i class="fas fa-cog"></i>
                        <span>Configuración</span>
                    </a>
                </li>
            </ul>
        </nav>
        
        <div class="sidebar-footer">
            <a href="/" class="sidebar-link">
                <i class="fas fa-home"></i>
                <span>Volver al Sitio</span>
            </a>
            <button onclick="logout()" class="sidebar-link logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                <span>Cerrar Sesión</span>
            </button>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Header -->
        <header class="dashboard-header">
            <div class="header-left">
                <button class="sidebar-toggle" onclick="toggleSidebar()">
                    <i class="fas fa-bars"></i>
                </button>
                <h1>Dashboard</h1>
            </div>
            
            <div class="header-right">
                <div class="user-menu">
                    <div class="user-info">
                        <img src="<?php echo $userData['avatar'] ?: '../../frontend/assets/default-avatar.png'; ?>" alt="Avatar" class="user-avatar">
                        <div class="user-details">
                            <span class="user-name"><?php echo htmlspecialchars($userData['name']); ?></span>
                            <span class="user-email"><?php echo htmlspecialchars($userData['email']); ?></span>
                        </div>
                    </div>
                    
                    <div class="notifications-dropdown">
                        <button class="notifications-toggle" onclick="toggleNotifications()">
                            <i class="fas fa-bell"></i>
                            <?php if (count($notifications) > 0): ?>
                                <span class="notification-badge"><?php echo count($notifications); ?></span>
                            <?php endif; ?>
                        </button>
                        
                        <div class="notifications-menu" id="notificationsMenu">
                            <div class="notifications-header">
                                <h3>Notificaciones</h3>
                                <button onclick="markAllAsRead()" class="mark-all-read">Marcar como leídas</button>
                            </div>
                            
                            <div class="notifications-list">
                                <?php if (empty($notifications)): ?>
                                    <p class="no-notifications">No tienes notificaciones nuevas</p>
                                <?php else: ?>
                                    <?php foreach ($notifications as $notification): ?>
                                        <div class="notification-item">
                                            <div class="notification-icon">
                                                <i class="fas fa-info-circle"></i>
                                            </div>
                                            <div class="notification-content">
                                                <h4><?php echo htmlspecialchars($notification['title']); ?></h4>
                                                <p><?php echo htmlspecialchars($notification['message']); ?></p>
                                                <span class="notification-time"><?php echo date('d/m/Y H:i', strtotime($notification['created_at'])); ?></span>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Dashboard Content -->
        <div class="dashboard-content">
            <!-- Welcome Section -->
            <section class="welcome-section">
                <div class="welcome-content">
                    <h2>¡Bienvenido, <?php echo htmlspecialchars($userData['name']); ?>!</h2>
                    <p>Tu perfil está <?php echo $userData['profile_completed'] ? 'completo' : 'incompleto'; ?>. 
                    <?php if (!$userData['profile_completed']): ?>
                        <a href="profile.php" class="complete-profile-link">Completa tu perfil</a> para aumentar tus oportunidades.
                    <?php endif; ?>
                    </p>
                </div>
                
                <div class="welcome-actions">
                    <a href="jobs.php" class="btn btn-primary">
                        <i class="fas fa-search"></i> Buscar Trabajos
                    </a>
                    <a href="profile.php" class="btn btn-outline">
                        <i class="fas fa-user-edit"></i> Editar Perfil
                    </a>
                </div>
            </section>

            <!-- Stats Cards -->
            <section class="stats-section">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="stat-content">
                            <h3><?php echo $totalApplications; ?></h3>
                            <p>Total Postulaciones</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon pending">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3><?php echo $pendingApplications; ?></h3>
                            <p>Pendientes</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon success">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3><?php echo $acceptedApplications; ?></h3>
                            <p>Aceptadas</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="stat-content">
                            <h3><?php echo rand(10, 50); ?></h3>
                            <p>Perfil Visto</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Recent Applications -->
            <section class="applications-section">
                <div class="section-header">
                    <h2>Postulaciones Recientes</h2>
                    <a href="applications.php" class="view-all-link">Ver todas</a>
                </div>
                
                <div class="applications-grid">
                    <?php if (empty($applications)): ?>
                        <div class="empty-state">
                            <i class="fas fa-file-alt"></i>
                            <h3>No tienes postulaciones aún</h3>
                            <p>Comienza a buscar trabajos y postúlate para ver tus aplicaciones aquí.</p>
                            <a href="jobs.php" class="btn btn-primary">Buscar Trabajos</a>
                        </div>
                    <?php else: ?>
                        <?php foreach ($applications as $application): ?>
                            <?php 
                            $job = $db->fetch("SELECT j.*, c.company_name FROM job_postings j JOIN company_profiles c ON j.company_id = c.id WHERE j.id = ?", [$application['job_id']]);
                            ?>
                            <div class="application-card">
                                <div class="application-header">
                                    <h3><?php echo htmlspecialchars($job['title']); ?></h3>
                                    <span class="status-badge status-<?php echo $application['status']; ?>">
                                        <?php echo ucfirst($application['status']); ?>
                                    </span>
                                </div>
                                
                                <div class="application-details">
                                    <p class="company-name"><?php echo htmlspecialchars($job['company_name']); ?></p>
                                    <p class="application-date">Postulado: <?php echo date('d/m/Y', strtotime($application['applied_at'])); ?></p>
                                </div>
                                
                                <div class="application-actions">
                                    <a href="application-details.php?id=<?php echo $application['id']; ?>" class="btn btn-sm btn-outline">
                                        Ver Detalles
                                    </a>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </section>

            <!-- Recommended Jobs -->
            <section class="jobs-section">
                <div class="section-header">
                    <h2>Trabajos Recomendados</h2>
                    <a href="jobs.php" class="view-all-link">Ver todos</a>
                </div>
                
                <div class="jobs-grid">
                    <?php foreach ($recommendedJobs as $job): ?>
                        <div class="job-card">
                            <div class="job-header">
                                <h3><?php echo htmlspecialchars($job['title']); ?></h3>
                                <span class="job-type"><?php echo ucfirst(str_replace('_', ' ', $job['job_type'])); ?></span>
                            </div>
                            
                            <div class="job-company">
                                <p class="company-name"><?php echo htmlspecialchars($job['company_name']); ?></p>
                                <p class="job-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <?php echo htmlspecialchars($job['location']); ?>
                                </p>
                            </div>
                            
                            <div class="job-details">
                                <p class="job-description">
                                    <?php echo substr(htmlspecialchars($job['description']), 0, 100); ?>...
                                </p>
                                
                                <?php if ($job['salary_min'] && $job['salary_max']): ?>
                                    <p class="job-salary">
                                        <i class="fas fa-money-bill-wave"></i>
                                        <?php echo number_format($job['salary_min']); ?> - <?php echo number_format($job['salary_max']); ?> XAF
                                    </p>
                                <?php endif; ?>
                            </div>
                            
                            <div class="job-actions">
                                <a href="job-details.php?id=<?php echo $job['id']; ?>" class="btn btn-sm btn-outline">
                                    Ver Detalles
                                </a>
                                <button onclick="applyToJob(<?php echo $job['id']; ?>)" class="btn btn-sm btn-primary">
                                    Postularse
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>
        </div>
    </main>

    <!-- Loading Spinner -->
    <div id="loadingSpinner" class="loading-spinner">
        <div class="spinner"></div>
    </div>

    <!-- JavaScript -->
    <script src="../../frontend/js/main.js"></script>
    <script src="../../frontend/js/auth.js"></script>
    <script src="js/dashboard.js"></script>
</body>
</html> 