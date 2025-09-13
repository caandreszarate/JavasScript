const express = require('express');
const cors = require('cors');

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor de prueba funcionando',
    timestamp: new Date().toISOString()
  });
});

// Ruta para crear lote (sin base de datos)
app.post('/api/test-lote', (req, res) => {
  console.log('📥 Datos recibidos:', req.body);
  
  res.json({
    success: true,
    message: 'Lote de prueba creado exitosamente',
    data: {
      id: 'test-123',
      ...req.body,
      fecha_creacion: new Date().toISOString()
    }
  });
});

const PORT = 8001;

app.listen(PORT, () => {
  console.log(`🧪 Servidor de prueba ejecutándose en puerto ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
