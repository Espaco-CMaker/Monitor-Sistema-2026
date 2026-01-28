# 🖥️ Monitor Sistema 2026 - Aplicativo Desktop (Electron)

Transformação da aplicação web em um executável standalone para Windows, macOS e Linux.

## 📦 Instalação e Execução

### Modo Desenvolvimento
```bash
npm run electron-dev
```
Inicia automaticamente o servidor Node.js e abre a janela Electron.

### Executar Electron (com servidor já rodando)
```bash
npm run electron
```

## 🏗️ Construir Executável

### Windows
```bash
npm run build-win
```
Cria:
- `Monitor-Sistema-2026-x.x.x.exe` (instalador NSIS)
- `Monitor-Sistema-2026-x.x.x.exe` (portável)

### macOS
```bash
npm run build-mac
```
Cria:
- `Monitor-Sistema-2026-x.x.x.dmg` (instalador)
- `Monitor-Sistema-2026-x.x.x.zip` (app compactado)

### Linux
```bash
npm run build-linux
```
Cria:
- `monitor-sistema-2026-x.x.x.AppImage` (portável)
- `monitor-sistema-2026_x.x.x_amd64.deb` (Debian/Ubuntu)

### Build Universal (Todos os SO)
```bash
npm run build
```

## 📂 Estrutura de Arquivos

```
ServidorTeste/
├── main.js                 # Processo principal do Electron
├── preload.js             # Bridge entre Node e renderizador
├── servidor.js            # Servidor Express (backend)
├── package.json           # Configuração npm + Electron Builder
├── public/
│   ├── index.html         # Interface do dashboard
│   ├── script.js          # Lógica frontend
│   └── style.css          # Estilos CSS
├── dist/                  # Aplicativo compilado (gerado)
└── out/                   # Executáveis finais (gerados)
```

## 🚀 Funcionalidades

✅ Interface nativa desktop  
✅ Sem necessidade de navegador  
✅ Servidor Node.js integrado  
✅ Monitoramento de sistema em tempo real  
✅ 5 temas personalizáveis  
✅ Atualiza automaticamente cada 2 segundos  
✅ Executa em Windows, macOS e Linux  

## ⚙️ Configuração

### Mudar Porta
Edite `servidor.js` e altere:
```javascript
const PORT = 3000; // Mude aqui
```

### Desabilitar DevTools
Em `main.js`, comente:
```javascript
// mainWindow.webContents.openDevTools();
```

### Ícone Personalizado
Coloque `icon.png` em pasta `assets/`:
```
assets/
└── icon.png (512x512 pixels mínimo)
```

## 🔧 Desenvolvimento

### Recarregar Electron
Pressione `Ctrl+R` (Windows/Linux) ou `Cmd+R` (Mac)

### DevTools
Pressione `Ctrl+Shift+I` (Windows/Linux) ou `Cmd+Option+I` (Mac)

### Menu Aplicativo
- **Arquivo** → Sair
- **Exibição** → Reload, DevTools, Zoom, Fullscreen
- **Ajuda** → Sobre

## 📋 Requisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- Windows 10+ / macOS 10.13+ / Linux (Ubuntu 18.04+)

## 🐛 Troubleshooting

### "Servidor não iniciou"
```bash
# Verifique se porta 3000 está livre
netstat -ano | findstr :3000
```

### Aplicativo não abre
```bash
# Execute com logs detalhados
npm run electron -- --verbose
```

### Build falha
```bash
# Limpe dependências e reinstale
rm -rf node_modules dist out
npm install
npm run build-win
```

## 📝 Licença

MIT - Espaço CMaker 2026
