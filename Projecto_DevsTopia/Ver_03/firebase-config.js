// Firebase configuration for DevsTopia Chat
// IMPORTANTE: Reemplaza estos valores con tu configuración real de Firebase

const firebaseConfig = {
  apiKey: "tu-api-key-aqui",
  authDomain: "devstopia-chat.firebaseapp.com",
  databaseURL: "https://devstopia-chat-default-rtdb.firebaseio.com",
  projectId: "devstopia-chat",
  storageBucket: "devstopia-chat.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id-aqui"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = firebase.database();

// Export for use in other files
window.firebaseDB = database;

// Log initialization
console.log('🔥 Firebase inicializado para DevsTopia Chat');

// Verificar conexión
database.ref('.info/connected').on('value', function(snap) {
  if (snap.val() === true) {
    console.log('✅ Conectado a Firebase Realtime Database');
  } else {
    console.log('❌ Desconectado de Firebase Realtime Database');
  }
}); 