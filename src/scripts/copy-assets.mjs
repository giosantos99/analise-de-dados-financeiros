
import { cp, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'

await mkdir('dist', { recursive: true })

// Lê o HTML original
let html = await readFile('index.html', 'utf-8')

// Ajusta os caminhos para a estrutura de produção
html = html
  .replace('./src/css/style.css', './css/style.css')
  .replace('./dist/ts/script.js', './ts/script.js')

// Salva o HTML dentro de dist
await writeFile('dist/index.html', html)

// Copia os arquivos CSS
await cp('src/css', 'dist/css', {
  recursive: true
})
