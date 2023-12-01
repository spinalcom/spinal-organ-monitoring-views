const express = require('express');
const path = require('path');
const app = express();

// Définissez le dossier public pour servir les fichiers statiques de l'application Vue.js
app.use(express.static(path.join(__dirname, 'dist')));

// Définissez une route pour servir votre page principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Définissez d'autres routes si nécessaire

// Lancez le serveur sur un port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});