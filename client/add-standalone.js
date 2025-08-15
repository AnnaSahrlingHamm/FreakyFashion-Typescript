const fs = require('fs');
const path = require('path');

function updateComponents(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      updateComponents(filePath);
    } else if (file.endsWith('.component.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');

      if (!content.includes('standalone: true')) {
        content = content.replace(
          /@Component\s*\(\{/,
          '@Component({\n  standalone: true,'
        );
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Uppdaterad: ${filePath}`);
      }
    }
  });
}

updateComponents(path.join(__dirname, 'src/app'));
