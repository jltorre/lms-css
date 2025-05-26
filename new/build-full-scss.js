const fs = require('fs');
const path = require('path');

// Lista de archivos .scss en el orden deseado
const scssFiles = [
  'vars.scss',
  'common.scss',
  'login.scss',
  'footer.scss',
  'drawer.scss',
  'header.scss',
  'navigation.scss',
  'slider.scss',
  'course-sections.scss',
  'calendar.scss',
  'accordion.scss',
  'course-search.scss',
  'format-tiles.scss',
  'format-topics.scss',
  'grading.scss'
];

// Ruta de salida
const outputPath = path.join(__dirname, 'full_auto.scss');

// Construcción del contenido
let fullContent = `// AUTO-GENERADO - NO EDITAR MANUALMENTE\n\n`;

scssFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    fullContent += `// ---------- ${file} ----------\n${fileContent}\n\n`;
  } else {
    fullContent += `// ⚠️ Archivo no encontrado: ${file}\n\n`;
  }
});

// Escribir el resultado en full.scss
fs.writeFileSync(outputPath, fullContent);
console.log('✅ full_auto.scss generado con éxito.');