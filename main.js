const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let mainWindow;
let serverProcess;
let serverReady = false;

const logFile = path.join(__dirname, 'app.log');

const log = (message) => {
  const timestamp = new Date().toLocaleTimeString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(logFile, logMessage + '\n', { encoding: 'utf-8' });
};

const createWindow = () => {
  log('🪟 Criando janela...');
  
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
  });

  // Aguardar servidor iniciar com retry
  let retries = 0;
  const maxRetries = 30; // 30 tentativas (30 segundos com 1s de intervalo)
  
  const tryConnect = () => {
    if (retries > maxRetries) {
      log('❌ ERRO: Servidor não respondeu após 30 segundos');
      dialog.showErrorBox(
        'Erro ao Iniciar',
        'Não consegui iniciar o servidor.\n\nVerifique:\n- Porta 3000 não está em uso\n- Node.js está instalado\n- Arquivo servidor.js existe'
      );
      app.quit();
      return;
    }

    retries++;
    log(`📡 Tentativa ${retries}/${maxRetries} de conectar ao servidor...`);

    mainWindow.loadURL('http://localhost:3000').catch(() => {
      setTimeout(tryConnect, 1000);
    });
  };

  // Primeira tentativa após 3 segundos (tempo para servidor iniciar)
  setTimeout(tryConnect, 3000);

  // Abrir DevTools para debug
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('crashed', () => {
    log('❌ ERRO: Janela Electron caiu');
    dialog.showErrorBox('Erro', 'A aplicação encontrou um erro e será fechada.');
    app.quit();
  });

  mainWindow.on('closed', () => {
    log('🔴 Janela fechada');
    mainWindow = null;
  });
};

const startServer = () => {
  log('🚀 Iniciando servidor Node.js...');
  log(`📂 Diretório: ${__dirname}`);
  
  const serverPath = path.join(__dirname, 'servidor.js');
  
  // Verificar se arquivo existe
  if (!fs.existsSync(serverPath)) {
    log(`❌ ERRO: Arquivo não encontrado: ${serverPath}`);
    dialog.showErrorBox('Erro', `Arquivo servidor.js não encontrado em:\n${serverPath}`);
    return;
  }

  log(`📄 Iniciando: ${serverPath}`);

  serverProcess = spawn('node', [serverPath], {
    cwd: __dirname,
    stdio: ['ignore', 'pipe', 'pipe'], // Capturar stdout e stderr
    detached: false,
  });

  if (!serverProcess) {
    log('❌ ERRO: Falha ao spawn processo Node.js');
    return;
  }

  log(`✅ Processo Node.js iniciado (PID: ${serverProcess.pid})`);

  // Capturar output do servidor
  serverProcess.stdout.on('data', (data) => {
    const message = data.toString().trim();
    if (message) {
      log(`📊 [SERVER] ${message}`);
      if (message.includes('SERVIDOR INICIADO COM SUCESSO') || message.includes('Porta:')) {
        serverReady = true;
        log('✅ Servidor respondeu!');
      }
    }
  });

  serverProcess.stderr.on('data', (data) => {
    const message = data.toString().trim();
    if (message) {
      log(`⚠️ [SERVER ERROR] ${message}`);
    }
  });

  serverProcess.on('error', (error) => {
    log(`❌ Erro ao iniciar servidor: ${error.message}`);
    dialog.showErrorBox('Erro do Servidor', `Não consegui iniciar o servidor Node.js:\n${error.message}`);
  });

  serverProcess.on('exit', (code, signal) => {
    log(`📊 Servidor encerrado (código: ${code}, sinal: ${signal})`);
  });
};

const createMenu = () => {
  const template = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Sair',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Exibição',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Ver Log',
          click: () => {
            log('📋 Abrindo arquivo de log...');
            require('child_process').exec(`notepad "${logFile}"`);
          },
        },
        {
          label: 'Sobre',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Sobre',
              message: 'Monitor Sistema 2026',
              detail: 'Versão 0.2.0\n© 2026 Espaço CMaker\nLicença: MIT',
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

app.on('ready', () => {
  log('════════════════════════════════════════');
  log('🚀 APP INICIANDO');
  log('════════════════════════════════════════');
  startServer();
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => {
  log('🔴 Todas as janelas fechadas');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  log('⚡ App ativada');
  if (mainWindow === null) {
    createWindow();
  }
});

// Encerrar servidor quando app fecha
app.on('before-quit', () => {
  log('🛑 Encerrando aplicação...');
  if (serverProcess && !serverProcess.killed) {
    log('🛑 Encerrando servidor Node.js...');
    try {
      serverProcess.kill('SIGTERM');
      setTimeout(() => {
        if (!serverProcess.killed) {
          serverProcess.kill('SIGKILL');
        }
      }, 3000);
    } catch (e) {
      log(`⚠️ Erro ao encerrar servidor: ${e.message}`);
    }
  }
});
