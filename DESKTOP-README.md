# 🖥️ Monitor Sistema 2026 - Desktop Edition

Transform your web dashboard into a standalone desktop application for Windows, macOS, and Linux.

![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20|%20macOS%20|%20Linux-lightgrey.svg)

## 📦 O Que é Isso?

Sua aplicação Monitor Sistema 2026 agora funciona como um **executável nativo desktop** usando [Electron](https://www.electronjs.org/), sem necessidade de navegador web!

### Antes ❌
```
Abrir navegador → Digitar localhost:3000 → Dashboard
```

### Agora ✅
```
Clique no app → Dashboard aparece instantaneamente
```

---

## 🚀 Quick Start

### 1. Executar em Desenvolvimento
```bash
npm run electron-dev
# Inicia servidor + app automaticamente
```

### 2. Compilar Executável
```bash
# Windows
npm run build-win

# macOS
npm run build-mac

# Linux
npm run build-linux

# Todos os SO
npm run build
```

### 3. Encontrar Executável
```
./dist/Monitor-Sistema-2026-Setup-0.2.0.exe  (Windows)
./dist/Monitor-Sistema-2026-0.2.0.dmg        (macOS)
./dist/Monitor-Sistema-2026-0.2.0.AppImage   (Linux)
```

---

## 📋 Recursos

✅ **Sem Navegador** - App desktop nativo  
✅ **Multiplataforma** - Windows, macOS, Linux  
✅ **Integrado** - Servidor Node.js embutido  
✅ **Real-time** - Monitoramento a cada 2 segundos  
✅ **5 Temas** - Cyberpunk, Steampunk, Futurista, Circuitos, Neon  
✅ **10 Painéis** - CPU, RAM, GPU, Disco, Rede, etc.  
✅ **Menu Nativo** - Integrado com SO  
✅ **DevTools** - Ferramentas de desenvolvimento integradas  

---

## 📁 Arquivos Criados

```
ServidorTeste/
├── main.js                    ← 🔴 NOVO: Processo Electron
├── preload.js                 ← 🔴 NOVO: Bridge seguro
├── ELECTRON.md                ← 🔴 NOVO: Docs Electron
├── DEVELOPMENT-DESKTOP.md     ← 🔴 NOVO: Dev guide
├── INSTALL-DESKTOP.md         ← 🔴 NOVO: Guia instalação
├── build.bat                  ← 🔴 NOVO: Script build Win
├── build.sh                   ← 🔴 NOVO: Script build *nix
├── assets/                    ← 🔴 NOVO: Pasta ícones
│   └── icon.svg
├── package.json               ← ✏️  MODIFICADO: +Electron config
└── [resto dos arquivos...]
```

---

## 💻 Estrutura Técnica

```
┌─────────────────────────────────────┐
│    App Desktop (Electron)           │
│  ┌───────────────────────────────┐  │
│  │  Janela Nativa do SO          │  │
│  │  (Windows/macOS/Linux)        │  │
│  ├───────────────────────────────┤  │
│  │  HTML/CSS/JS (Dashboard)      │  │
│  │  - index.html                 │  │
│  │  - script.js                  │  │
│  │  - style.css                  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
            ↓ (fetch)
┌─────────────────────────────────────┐
│  Node.js Server (Integrado)         │
│  - servidor.js (Express)            │
│  - /api/system-info                 │
│  - systeminformation library        │
└─────────────────────────────────────┘
            ↓ (spawn)
┌─────────────────────────────────────┐
│  Sistema Operacional                │
│  - CPU, RAM, GPU, Disco, Rede       │
└─────────────────────────────────────┘
```

---

## 🎮 Controles Rápidos

| Ação | Windows/Linux | macOS |
|------|:---:|:---:|
| **Recarregar** | Ctrl+R | Cmd+R |
| **DevTools** | Ctrl+Shift+I | Cmd+Option+I |
| **Zoom In** | Ctrl+= | Cmd+= |
| **Zoom Out** | Ctrl+- | Cmd+- |
| **Fullscreen** | F11 | Cmd+Ctrl+F |
| **Sair** | Ctrl+Q | Cmd+Q |

---

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [ELECTRON.md](ELECTRON.md) | Guia completo Electron |
| [INSTALL-DESKTOP.md](INSTALL-DESKTOP.md) | Instalação end-user |
| [DEVELOPMENT-DESKTOP.md](DEVELOPMENT-DESKTOP.md) | Guia desenvolvimento |
| [README.md](README.md) | Info do projeto geral |

---

## 🔧 Desenvolvimento

### Estrutura de Arquivos Key

**main.js** - Processo principal
```javascript
// Cria janela, gerencia lifecycle, inicia servidor
const mainWindow = new BrowserWindow({...});
const serverProcess = spawn('node', ['servidor.js']);
```

**preload.js** - Bridge seguro
```javascript
// Expõe API segura do Electron para renderizador
contextBridge.exposeInMainWorld('electronAPI', {...});
```

**package.json** - Scripts
```json
{
  "main": "main.js",
  "scripts": {
    "electron": "electron .",
    "electron-dev": "concurrently \"npm run dev\" \"npm run electron\"",
    "build-win": "electron-builder --win"
  },
  "build": {
    "appId": "com.cmaker.monitor-sistema-2026",
    "files": ["main.js", "servidor.js", "public/**/*", ...]
  }
}
```

### Modificações Comuns

**Mudar Porta:**
```javascript
// main.js
const PORT = 3000; // ← mude aqui
```

**Mudar Título:**
```javascript
// main.js
mainWindow.setTitle('Seu Novo Título');
```

**Iniciar em Fullscreen:**
```javascript
// main.js
mainWindow = new BrowserWindow({
  fullscreen: true,
  ...
});
```

---

## 🏗️ Build & Distribuição

### Build Rápido (Batch)

**Windows:**
```bash
./build.bat win
```

**macOS/Linux:**
```bash
./build.sh linux
```

### Build Profissional

```bash
# Instalações necessárias
npm install

# Build único SO
npm run build-win     # Windows
npm run build-mac     # macOS
npm run build-linux   # Linux

# Build universal
npm run build         # Todos SO (requer ferramentas)
```

### Saída Esperada
```
dist/
├── Monitor-Sistema-2026-Setup-0.2.0.exe      (Windows installer)
├── Monitor-Sistema-2026-0.2.0.exe            (Windows portable)
├── Monitor-Sistema-2026-0.2.0.dmg            (macOS)
├── Monitor-Sistema-2026-0.2.0.AppImage       (Linux portable)
└── monitor-sistema-2026_0.2.0_amd64.deb      (Linux package)
```

---

## 📊 Requisitos do Sistema

| Requisito | Mínimo | Recomendado |
|-----------|--------|-------------|
| **RAM** | 256 MB | 512 MB+ |
| **Espaço em Disco** | 200 MB | 500 MB |
| **Processador** | 1 GHz | 2 GHz+ |
| **Resolução** | 1280x720 | 1920x1080 |

**Compatível com:**
- Windows 10/11
- macOS 10.13+
- Ubuntu 18.04+, Debian, Fedora, etc.

---

## 🔐 Segurança

- ✅ Context Isolation ativada
- ✅ Node Integration desativada
- ✅ Preload script para bridge seguro
- ✅ Sem vulnerabilidades críticas (npm audit)

---

## 🐛 Troubleshooting

### Aplicativo não inicia
```bash
# Verifique Node.js
node --version    # deve ser v18+

# Reinstale dependências
rm -rf node_modules
npm install

# Execute com logs
npm run electron -- --verbose
```

### Porta 3000 em uso
```powershell
# Windows
Get-NetTCPConnection -LocalPort 3000
taskkill /PID <PID> /F
```

### "Aplicativo danificado" (macOS)
```bash
xattr -d com.apple.quarantine /Applications/Monitor\ Sistema\ 2026.app
```

---

## 📦 Releases

Baixe executáveis prontos:
- **GitHub Releases**: https://github.com/Espaco-CMaker/Monitor-Sistema-2026/releases
- **Formato**: .exe (Windows), .dmg (macOS), .AppImage (Linux)

---

## 🚀 Próximas Melhorias

- [ ] Auto-update automática
- [ ] Notificações sistema para alertas críticos
- [ ] Exportar relatórios (PDF/CSV)
- [ ] Dark/Light theme sistema
- [ ] Suporte a plugins

---

## 📝 Licença

MIT - Espaço CMaker 2026

---

## 🤝 Contribuir

1. Fork do repositório
2. Crie uma branch (`git checkout -b feature/amazing`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing`)
5. Abra um Pull Request

---

## 📞 Suporte

**Issues?** Abra uma no GitHub:  
https://github.com/Espaco-CMaker/Monitor-Sistema-2026/issues

**Dúvidas?** Veja documentação:
- [ELECTRON.md](ELECTRON.md) - Guia técnico
- [DEVELOPMENT-DESKTOP.md](DEVELOPMENT-DESKTOP.md) - Desenvolvimento

---

**Made with ❤️ by Espaço CMaker**

```
🖥️  Monitor Sistema 2026 v0.2.0
✨ Agora em Desktop!
```
