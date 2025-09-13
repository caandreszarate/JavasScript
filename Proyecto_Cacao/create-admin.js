const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Esquema simplificado del usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  cedula: String,
  rol: String,
  finca: {
    nombre: String,
    area_total: Number,
    ubicacion: {
      municipio: { type: String, default: 'Granada' },
      departamento: { type: String, default: 'Meta' }
    }
  },
  estado: { type: String, default: 'activo' }
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

async function crearUsuarioAdmin() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cacao_control');
    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existe un admin
    const adminExistente = await Usuario.findOne({ rol: 'admin' });
    if (adminExistente) {
      console.log('⚠️  Ya existe un usuario administrador:', adminExistente.email);
      process.exit(0);
    }

    // Datos del administrador
    const adminData = {
      nombre: 'Administrador',
      apellido: 'CacaoControl',
      email: 'admin@cacaocontrol.com',
      password: await bcrypt.hash('admin123', 12), // Contraseña: admin123
      cedula: '12345678',
      rol: 'admin',
      finca: {
        nombre: 'Finca Administrativa',
        area_total: 10,
        ubicacion: {
          municipio: 'Granada',
          departamento: 'Meta'
        }
      }
    };

    // Crear usuario administrador
    const admin = new Usuario(adminData);
    await admin.save();

    console.log('🎉 Usuario administrador creado exitosamente!');
    console.log('📧 Email: admin@cacaocontrol.com');
    console.log('🔑 Contraseña: admin123');
    console.log('');
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

crearUsuarioAdmin();
