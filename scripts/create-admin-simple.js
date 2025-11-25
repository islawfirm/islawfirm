/**
 * Script simple para crear el admin usando la API
 * Ejecutar con: node scripts/create-admin-simple.js
 */

require('dotenv').config();

async function createAdmin() {
  try {
    const secret = process.env.ADMIN_CREATE_SECRET || 'create-admin-2024';
    
    const response = await fetch('http://localhost:3000/api/admin/create-initial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ secret }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Usuario administrador creado exitosamente!');
      console.log(`   Email: ${data.data.email}`);
      console.log(`   ID: ${data.data.id}`);
      console.log(`   Nombre: ${data.data.nombre}`);
    } else {
      console.log('⚠️  ' + data.message || data.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('   Asegúrate de que el servidor esté corriendo (npm run dev)');
  }
}

createAdmin();

