# 🛠️ Desenvolvimento Desktop - Quick Start

## Iniciar em Modo Desenvolvimento

### Opção 1: Automático (Recomendado)
```bash
npm run electron-dev
```
Inicia servidor + Electron automaticamente

### Opção 2: Manual (Dois Terminais)

**Terminal 1 - Servidor:**
```bash
npm run dev
# ou
node servidor.js
```

**Terminal 2 - Aplicativo:**
```bash
npm run electron
```

---

## Desenvolvimento Rápido

### 🔄 Hot Reload
Pressione **Ctrl+R** (ou Cmd+R no Mac) para recarregar a aplicação

### 🐛 DevTools
Pressione **Ctrl+Shift+I** (ou Cmd+Option+I no Mac)

Para abrir automaticamente, mantenha essa linha em `main.js`:
```javascript
mainWindow.webContents.openDevTools();
```

Para production, comente essa linha.

---

## Estrutura de Arquivos

```
├── main.js              ← Processo principal Electron (Desktop)
├── preload.js           ← Bridge seguro Electron/Node
├── servidor.js          ← Express Server (Backend)
├── public/
│   ├── index.html       ← UI do Dashboard
│   ├── script.js        ← Lógica Frontend
│   └── style.css        ← Estilos
├── package.json         ← Config npm + Build
├── assets/
│   └── icon.svg         ← Ícone da aplicação
└── ELECTRON.md          ← Docs completas
```

---

## Modificações Comuns

### Mudar Porta
**arquivo:** `servidor.js`
```javascript
const PORT = 3000; // ← Mude aqui
```
Depois reinicie o app: **Ctrl+R**

### Mudar Título da Janela
**arquivo:** `main.js`
```javascript
mainWindow = new BrowserWindow({
  width: 1920,
  height: 1080,
  // ...resto da config
});

// Adicione:
mainWindow.setTitle('Monitor Sistema 2026');
```

### Mudar Tamanho Inicial
**arquivo:** `main.js`
```javascript
mainWindow = new BrowserWindow({
  width: 1920,    // ← Largura
  height: 1080,   // ← Altura
  // ...
});
```

### Desabilitar Menu
**arquivo:** `main.js`
```javascript
// Comente essa linha em main.js:
// createMenu();
```

### Iniciar em Fullscreen
**arquivo:** `main.js`
```javascript
mainWindow = new BrowserWindow({
  width: 1920,
  height: 1080,
  fullscreen: true, // ← Adicione isto
  // ...
});
```

---

## Build para Distribuição

### Windows
```bash
npm run build-win
# Gera: Monitor-Sistema-2026-Setup-x.x.x.exe + portable
```

### macOS
```bash
npm run build-mac
# Gera: Monitor-Sistema-2026-x.x.x.dmg + .zip
```

### Linux
```bash
npm run build-linux
# Gera: Monitor-Sistema-2026-x.x.x.AppImage + .deb
```

### Build Rápido (Script)
```bash
./build.sh win    # No Linux/Mac
build.bat win     # No Windows
```

---

## Debug Avançado

### Logs de Servidor
Observe terminal do servidor para ver:
```
[HH:MM:SS] 📨 GET /api/system-info
[HH:MM:SS] 🔄 Iniciando coleta...
[HH:MM:SS] ✅ Dados coletados em XXXms
```

### Logs de Electron
Abra DevTools: **Ctrl+Shift+I**
- **Console**: Ver erros JS
- **Network**: Verificar requisições
- **Storage**: LocalStorage dos temas
- **Sources**: Debug JavaScript

### Erro de Porta em Uso
```powershell
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000
```

Matar processo:
```powershell
# Windows
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>
```

---

## Performance

### Arquivo de Log
O server registra tudo em console. Para salvar em arquivo:

**servidor.js:**
```javascript
const fs = require('fs');
const logStream = fs.createWriteStream('server.log', { flags: 'a' });

// Depois em cada log.console:
logStream.write(`[${new Date().toLocaleTimeString()}] ...\n`);
```

### Profiling
DevTools → Performance → Record
1. Deixe rodando 10s
2. Para gravação
3. Analise o gráfico

---

## Empacotamento Customizado

### Adicionar Assets
Coloque arquivos em `assets/`:
- `icon.png` - Ícone 512x512 (Windows)
- `icon.icns` - Ícone macOS
- `icon.png` - Ícone Linux

Atualize `package.json`:
```json
"build": {
  "directories": {
    "buildResources": "assets"
  }
}
```

### Código de Assinatura (Segurança)
Para distribuição profissional, assine os executáveis.

---

## Próximos Passos

✅ Desenvolvimento local funcionando  
✅ Deploy no GitHub  
⏭️ **Próximo:** Build e distribuição  

```bash
npm run build-win  # Gera executável
```

---

**Dúvidas?** Veja [ELECTRON.md](ELECTRON.md) para docs completas!
