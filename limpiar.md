# Limpieza Automatizada de Módulos

```javascript {name="limpiar-archivos"}
const fs = require('fs');
const path = require('path');

const rutaCatalogos = path.join(process.cwd(), 'src', 'app', 'catalogos');

function recorrerDirectorio(directorio) {
    if (!fs.existsSync(directorio)) return;
    
    const elementos = fs.readdirSync(directorio);
    
    elementos.forEach(elemento => {
        const rutaCompleta = path.join(directorio, elemento);
        const estado = fs.statSync(rutaCompleta);
        
        if (estado.isDirectory()) {
            recorrerDirectorio(rutaCompleta);
        } else if (elemento.endsWith('.ts')) {
            procesarTS(rutaCompleta);
        } else if (elemento.endsWith('.html')) {
            procesarHTML(rutaCompleta);
        }
    });
}

function procesarTS(ruta) {
    let contenido = fs.readFileSync(ruta, 'utf8');
    
    contenido = contenido.replace(/cargando\s*=\s*(true|false);?\n?/g, '');
    contenido = contenido.replace(/this\.cargando\s*=\s*(true|false);?\n?/g, '');
    
    contenido = contenido.replace(/,\s*error\s*=>\s*\{[\s\S]*?\}\s*\)/g, ')');
    
    contenido = contenido.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
    
    fs.writeFileSync(ruta, contenido, 'utf8');
}

function procesarHTML(ruta) {
    let contenido = fs.readFileSync(ruta, 'utf8');
    
    contenido = contenido.replace(/<app-cargando[\s\S]*?><\/app-cargando>\n?/g, '');
    
    contenido = contenido.replace(/<app-botones([^>]*?)>/g, '<app-botones$1 (emitidor)="seleccion = undefined">');
    
    contenido = contenido.replace(//g, '');
    
    fs.writeFileSync(ruta, contenido, 'utf8');
}

recorrerDirectorio(rutaCatalogos);
```