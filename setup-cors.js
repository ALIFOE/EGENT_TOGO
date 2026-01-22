const { Storage } = require('@google-cloud/storage');

const projectId = 'egenttogo-edc4e';
const bucketName = 'egenttogo-edc4e.firebasestorage.app';

const corsConfiguration = [
  {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'https://alifoe.github.io',
      'https://www.egenttogo.com',
      'https://egenttogo.com'
    ],
    method: ['GET', 'HEAD', 'DELETE', 'POST', 'PUT'],
    responseHeader: ['Content-Type', 'Authorization'],
    maxAgeSeconds: 3600
  }
];

async function setCorsConfiguration() {
  try {
    console.log('🔧 Configuration de CORS pour Firebase Storage...');
    console.log(`📦 Bucket: ${bucketName}`);
    
    const storage = new Storage({ projectId });
    const bucket = storage.bucket(bucketName);

    await bucket.setCorsConfiguration(corsConfiguration);
    
    console.log('✅ CORS configuré avec succès!');
    console.log('Domaines autorisés:');
    corsConfiguration[0].origin.forEach(origin => {
      console.log(`   ✓ ${origin}`);
    });
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

setCorsConfiguration();
