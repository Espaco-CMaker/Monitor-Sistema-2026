// Sistema de Logs
class SystemLogger {
    constructor(maxLogs = 50) {
        this.logs = [];
        this.maxLogs = maxLogs;
    }

    add(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        const log = { message, type, timestamp };
        this.logs.unshift(log);
        
        if (this.logs.length > this.maxLogs) {
            this.logs.pop();
        }
        
        this.render();
    }

    clear() {
        this.logs = [];
        this.render();
    }

    render() {
        const logContent = document.getElementById('log-content');
        logContent.innerHTML = '';
        
        this.logs.forEach(log => {
            const entry = document.createElement('div');
            entry.className = `log-entry ${log.type}`;
            entry.innerHTML = `<span>[${log.timestamp}]</span> <span>${log.message}</span>`;
            logContent.appendChild(entry);
        });
    }
}

const logger = new SystemLogger();

// ===== CARD VISIBILITY CONTROL =====
const toggleButton = document.getElementById('toggle-controls');
const controlPanel = document.getElementById('control-panel');
const cardToggles = document.querySelectorAll('.card-toggle');

// Toggle painel de controle
toggleButton.addEventListener('click', () => {
    controlPanel.style.display = controlPanel.style.display === 'none' ? 'block' : 'none';
});

// Fechar painel ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.control-btn') && !e.target.closest('.control-panel')) {
        controlPanel.style.display = 'none';
    }
});

// Toggle de visibilidade de cards
cardToggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
        const cardClass = toggle.dataset.card;
        const card = document.querySelector(`.${cardClass}`);
        
        if (toggle.checked) {
            card.classList.remove('hidden');
            localStorage.setItem(`card-${cardClass}`, 'visible');
        } else {
            card.classList.add('hidden');
            localStorage.setItem(`card-${cardClass}`, 'hidden');
        }
    });
});

// Carregar visibilidade salva dos cards
cardToggles.forEach(toggle => {
    const cardClass = toggle.dataset.card;
    const saved = localStorage.getItem(`card-${cardClass}`);
    
    if (saved === 'hidden') {
        toggle.checked = false;
        document.querySelector(`.${cardClass}`).classList.add('hidden');
    }
});

// ===== TEMA SELECTOR =====
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.body.className = theme === 'cyberpunk' ? '' : theme;
        
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        localStorage.setItem('selectedTheme', theme);
        logger.add(`Tema alterado para ${theme}`, 'success');
    });
});

// Carregar tema salvo
const savedTheme = localStorage.getItem('selectedTheme') || 'cyberpunk';
document.body.className = savedTheme === 'cyberpunk' ? '' : savedTheme;
document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');

// Circuitos de fundo DESABILITADOS
// generateCircuits();

// Função para gerar circuitos dinâmicos - PCB vista de cima (inspirado em placa-mãe)
function generateCircuits() {
    const svg = document.getElementById('circuit-overlay');
    svg.innerHTML = `
        <defs>
            <linearGradient id="trace-gradient-h" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0.2" />
                <stop offset="50%" style="stop-color:#00ffff;stop-opacity:0.9" />
                <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:0.2" />
            </linearGradient>
            <linearGradient id="trace-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#0088ff;stop-opacity:0.2" />
                <stop offset="50%" style="stop-color:#00ccff;stop-opacity:0.9" />
                <stop offset="100%" style="stop-color:#0088ff;stop-opacity:0.2" />
            </linearGradient>
            <filter id="glow-strong">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <radialGradient id="chip-gradient">
                <stop offset="0%" style="stop-color:#003366;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#001133;stop-opacity:1" />
            </radialGradient>
        </defs>
    `;
    
    // Criar múltiplas camadas de trilhas paralelas (muito mais denso)
    const layers = [
        { startY: 100, spacing: 40, count: 12, offset: 50, color: '#00ccff' },
        { startY: 200, spacing: 35, count: 14, offset: 150, color: '#0099ff' },
        { startY: 350, spacing: 45, count: 10, offset: 80, color: '#00ddff' },
        { startY: 550, spacing: 38, count: 13, offset: 200, color: '#00aaff' },
        { startY: 700, spacing: 42, count: 11, offset: 120, color: '#00bbff' },
        { startY: 880, spacing: 36, count: 9, offset: 90, color: '#0088ff' }
    ];
    
    layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
            const y = layer.startY + (i * layer.spacing);
            const startX = layer.offset + (Math.random() * 100);
            const length = 1400 + (Math.random() * 400);
            
            // Trilha principal
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${startX} ${y} L ${startX + length} ${y}`);
            path.setAttribute('stroke', layer.color);
            path.setAttribute('stroke-width', '2');
            path.setAttribute('fill', 'none');
            path.setAttribute('opacity', '0.7');
            svg.appendChild(path);
            
            // Adicionar pequenas ramificações perpendiculares (vias)
            const branches = Math.floor(Math.random() * 5) + 3;
            for (let b = 0; b < branches; b++) {
                const branchX = startX + (length / branches) * b + Math.random() * 100;
                const branchLength = 20 + Math.random() * 30;
                const branchDir = Math.random() > 0.5 ? 1 : -1;
                
                const branch = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                branch.setAttribute('d', `M ${branchX} ${y} L ${branchX} ${y + (branchLength * branchDir)}`);
                branch.setAttribute('stroke', layer.color);
                branch.setAttribute('stroke-width', '1.5');
                branch.setAttribute('fill', 'none');
                branch.setAttribute('opacity', '0.5');
                svg.appendChild(branch);
            }
            
            // Bits fluindo nesta trilha
            createBitsOnTrace(svg, startX, y, length, layerIndex * layer.count + i, layer.color);
        }
    });
    
    // Adicionar "chips" (retângulos simulando componentes)
    const chipPositions = [
        { x: 960, y: 300, w: 120, h: 80 },
        { x: 400, y: 500, w: 100, h: 70 },
        { x: 1400, y: 400, w: 90, h: 90 },
        { x: 700, y: 700, w: 110, h: 75 },
        { x: 1200, y: 800, w: 95, h: 85 }
    ];
    
    chipPositions.forEach(chip => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', chip.x);
        rect.setAttribute('y', chip.y);
        rect.setAttribute('width', chip.w);
        rect.setAttribute('height', chip.h);
        rect.setAttribute('fill', 'url(#chip-gradient)');
        rect.setAttribute('stroke', '#00aaff');
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('rx', '3');
        rect.setAttribute('opacity', '0.6');
        svg.appendChild(rect);
        
        // Pinos do chip
        const pinsPerSide = 8;
        for (let p = 0; p < pinsPerSide; p++) {
            const pinSpacing = chip.w / (pinsPerSide + 1);
            const pinX = chip.x + pinSpacing * (p + 1);
            
            // Pino superior
            const pinTop = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pinTop.setAttribute('cx', pinX);
            pinTop.setAttribute('cy', chip.y);
            pinTop.setAttribute('r', '2');
            pinTop.setAttribute('fill', '#00ffff');
            pinTop.setAttribute('filter', 'url(#glow-strong)');
            svg.appendChild(pinTop);
            
            // Pino inferior
            const pinBottom = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pinBottom.setAttribute('cx', pinX);
            pinBottom.setAttribute('cy', chip.y + chip.h);
            pinBottom.setAttribute('r', '2');
            pinBottom.setAttribute('fill', '#00ffff');
            pinBottom.setAttribute('filter', 'url(#glow-strong)');
            svg.appendChild(pinBottom);
        }
    });
    
    // Adicionar pontos de conexão (vias) mais densos
    const connectionPoints = [];
    for (let i = 0; i < 150; i++) {
        const x = 100 + Math.random() * 1720;
        const y = 100 + Math.random() * 880;
        connectionPoints.push({ x, y });
    }
    
    connectionPoints.forEach((point, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', '2.5');
        circle.setAttribute('fill', '#00ffff');
        circle.setAttribute('filter', 'url(#glow-strong)');
        circle.setAttribute('style', `animation: via-pulse ${0.8 + Math.random() * 0.6}s ease-in-out infinite; animation-delay: ${i * 0.02}s;`);
        svg.appendChild(circle);
    });
    
    // Adicionar styles de animação se não existirem
    if (!document.getElementById('circuit-styles')) {
        const style = document.createElement('style');
        style.id = 'circuit-styles';
        style.innerHTML = `
            @keyframes bit-flow-horizontal {
                0% { opacity: 0; }
                5% { opacity: 1; }
                95% { opacity: 1; }
                100% { opacity: 0; }
            }
            @keyframes via-pulse {
                0%, 100% { 
                    fill-opacity: 0.5; 
                    r: 2px; 
                    filter: drop-shadow(0 0 3px #00ffff); 
                }
                50% { 
                    fill-opacity: 1; 
                    r: 4px; 
                    filter: drop-shadow(0 0 12px #00ffff); 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Função para criar bits fluindo em uma trilha específica
function createBitsOnTrace(svg, startX, y, length, traceIndex, color = '#00ffff') {
    const numBits = 3;
    
    for (let i = 0; i < numBits; i++) {
        const bit = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const delay = (i * 2) + (traceIndex * 0.1);
        const duration = 5 + Math.random() * 3;
        const bitValue = Math.random() > 0.5 ? '1' : '0';
        
        bit.setAttribute('y', y + 5);
        bit.setAttribute('fill', color);
        bit.setAttribute('font-size', '12');
        bit.setAttribute('font-family', 'monospace');
        bit.setAttribute('font-weight', 'bold');
        bit.setAttribute('filter', 'url(#glow-strong)');
        bit.textContent = bitValue;
        
        // Criar animação para mover horizontalmente
        const animateX = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateX.setAttribute('attributeName', 'x');
        animateX.setAttribute('from', startX);
        animateX.setAttribute('to', startX + length);
        animateX.setAttribute('dur', `${duration}s`);
        animateX.setAttribute('repeatCount', 'indefinite');
        animateX.setAttribute('begin', `${delay}s`);
        
        bit.appendChild(animateX);
        bit.setAttribute('style', `animation: bit-flow-horizontal ${duration}s linear infinite; animation-delay: ${delay}s;`);
        
        svg.appendChild(bit);
    }
}

// Limpar logs
document.getElementById('clear-log').addEventListener('click', () => {
    logger.clear();
    logger.add('Logs limpos', 'info');
});

logger.add('Sistema iniciado com sucesso', 'success');

// ===== GRÁFICO DE MEMÓRIA =====
const memoryCanvas = document.getElementById('memory-chart');
const memoryCtx = memoryCanvas.getContext('2d');
const memoryHistory = [];
const memoryGBHistory = [];
const maxMemoryPoints = 60;
let currentMemoryGB = 0;
let totalMemoryGB = 0;

function drawMemoryChart(usedPercent, usedGB, totalGB) {
    // Adicionar novo ponto
    memoryHistory.push(usedPercent);
    memoryGBHistory.push(usedGB);
    currentMemoryGB = usedGB;
    totalMemoryGB = totalGB;
    
    if (memoryHistory.length > maxMemoryPoints) {
        memoryHistory.shift();
        memoryGBHistory.shift();
    }
    
    // Redimensionar canvas para HiDPI
    const rect = memoryCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    memoryCanvas.width = rect.width * dpr;
    memoryCanvas.height = rect.height * dpr;
    memoryCtx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = rect.height;
    
    // Limpar canvas
    memoryCtx.clearRect(0, 0, width, height);
    
    // Configurações com padding maior para o eixo Y
    const leftPadding = 35;
    const rightPadding = 15;
    const topPadding = 15;
    const bottomPadding = 20;
    const chartWidth = width - (leftPadding + rightPadding);
    const chartHeight = height - (topPadding + bottomPadding);
    const pointSpacing = chartWidth / (maxMemoryPoints - 1);
    
    // Desenhar grid de fundo com rótulos
    memoryCtx.strokeStyle = 'rgba(0, 200, 255, 0.2)';
    memoryCtx.lineWidth = 1;
    memoryCtx.fillStyle = 'rgba(0, 200, 255, 0.5)';
    memoryCtx.font = '8px monospace';
    memoryCtx.textAlign = 'right';
    
    for (let i = 0; i <= 5; i++) {
        const y = topPadding + (chartHeight / 5) * i;
        const percent = (5 - i) * 20;
        const gbValue = (totalGB * percent / 100).toFixed(1);
        
        // Linha de grid
        memoryCtx.beginPath();
        memoryCtx.moveTo(leftPadding, y);
        memoryCtx.lineTo(width - rightPadding, y);
        memoryCtx.stroke();
        
        // Rótulos de GB (fora da área do gráfico)
        memoryCtx.fillText(gbValue + 'GB', leftPadding - 5, y + 3);
    }
    
    // Desenhar área preenchida (gradiente dinâmico baseado em uso)
    if (memoryHistory.length > 1) {
        let gradientColor1, gradientColor2;
        const avgPercent = memoryHistory.reduce((a, b) => a + b) / memoryHistory.length;
        
        if (avgPercent < 30) {
            gradientColor1 = 'rgba(0, 255, 136, 0.3)';
            gradientColor2 = 'rgba(0, 255, 136, 0.05)';
        } else if (avgPercent < 60) {
            gradientColor1 = 'rgba(0, 200, 255, 0.3)';
            gradientColor2 = 'rgba(0, 200, 255, 0.05)';
        } else if (avgPercent < 80) {
            gradientColor1 = 'rgba(255, 170, 0, 0.3)';
            gradientColor2 = 'rgba(255, 170, 0, 0.05)';
        } else {
            gradientColor1 = 'rgba(255, 50, 100, 0.3)';
            gradientColor2 = 'rgba(255, 50, 100, 0.05)';
        }
        
        const gradient = memoryCtx.createLinearGradient(0, topPadding, 0, height - bottomPadding);
        gradient.addColorStop(0, gradientColor1);
        gradient.addColorStop(0.5, gradientColor2);
        gradient.addColorStop(1, 'rgba(255, 100, 136, 0.05)');
        
        memoryCtx.fillStyle = gradient;
        memoryCtx.beginPath();
        memoryCtx.moveTo(leftPadding, height - bottomPadding);
        
        memoryHistory.forEach((percent, i) => {
            const x = leftPadding + (i * pointSpacing);
            const y = (height - bottomPadding) - ((percent / 100) * chartHeight);
            memoryCtx.lineTo(x, y);
        });
        
        memoryCtx.lineTo(leftPadding + ((memoryHistory.length - 1) * pointSpacing), height - bottomPadding);
        memoryCtx.closePath();
        memoryCtx.fill();
    }
    
    // Desenhar linha do gráfico com gradiente
    if (memoryHistory.length > 1) {
        const gradient = memoryCtx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#00ff88');
        gradient.addColorStop(0.5, '#00ccff');
        gradient.addColorStop(1, '#ff5588');
        
        memoryCtx.strokeStyle = gradient;
        memoryCtx.lineWidth = 2.5;
        memoryCtx.lineCap = 'round';
        memoryCtx.lineJoin = 'round';
        memoryCtx.shadowBlur = 6;
        memoryCtx.shadowColor = '#00ccff';
        
        memoryCtx.beginPath();
        memoryHistory.forEach((percent, i) => {
            const x = leftPadding + (i * pointSpacing);
            const y = (height - bottomPadding) - ((percent / 100) * chartHeight);
            
            if (i === 0) {
                memoryCtx.moveTo(x, y);
            } else {
                memoryCtx.lineTo(x, y);
            }
        });
        memoryCtx.stroke();
        memoryCtx.shadowBlur = 0;
    }
    
    // Desenhar pontos no gráfico (com positioning melhorado)
    memoryHistory.forEach((percent, i) => {
        const x = leftPadding + (i * pointSpacing);
        const y = (height - bottomPadding) - ((percent / 100) * chartHeight);
        
        // Cor baseada na porcentagem
        let color;
        if (percent < 30) {
            color = '#00ff88';
        } else if (percent < 60) {
            color = '#00ccff';
        } else if (percent < 80) {
            color = '#ffaa00';
        } else {
            color = '#ff3366';
        }
        
        memoryCtx.fillStyle = color;
        memoryCtx.shadowBlur = 8;
        memoryCtx.shadowColor = color;
        memoryCtx.beginPath();
        memoryCtx.arc(x, y, 2, 0, Math.PI * 2);
        memoryCtx.fill();
    });
    memoryCtx.shadowBlur = 0;
    
    // Desenhar valor atual em GB no topo direito
    if (memoryGBHistory.length > 0) {
        const lastPercent = memoryHistory[memoryHistory.length - 1];
        const lastGB = memoryGBHistory[memoryGBHistory.length - 1];
        
        memoryCtx.fillStyle = '#00ffff';
        memoryCtx.font = 'bold 10px monospace';
        memoryCtx.textAlign = 'right';
        memoryCtx.shadowBlur = 10;
        memoryCtx.shadowColor = '#00ffff';
        memoryCtx.fillText(lastGB.toFixed(1) + 'GB / ' + lastPercent + '%', width - rightPadding - 5, topPadding + 12);
        memoryCtx.shadowBlur = 0;
    }
}

// ===== FUNÇÕES UTILITÁRIAS =====

// Formato de bytes para GB/MB
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Formato de memória em GB
function formatGigabytes(bytes) {
    const gb = bytes / (1024 * 1024 * 1024);
    return gb.toFixed(2) + ' GB';
}

// Formato de tempo de uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
}

// Formato de velocidade de rede
function formatSpeed(bytesPerSec) {
    return formatBytes(bytesPerSec) + '/s';
}

// Atualizar informações do sistema
async function updateSystemInfo() {
    try {
        const startTime = performance.now();
        const requestUrl = '/api/system-info';
        
        console.log(`[${new Date().toLocaleTimeString('pt-BR')}] 📡 Iniciando requisição para ${requestUrl}`);
        
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Request-Time': new Date().toISOString()
            }
        });
        
        const responseTime = (performance.now() - startTime).toFixed(0);
        
        if (!response.ok) {
            const errorText = await response.text();
            const errorMsg = `❌ Erro HTTP ${response.status}: ${response.statusText}`;
            console.error(`[${new Date().toLocaleTimeString('pt-BR')}] ${errorMsg}`);
            console.error(`   URL: ${requestUrl}`);
            console.error(`   Status: ${response.status}`);
            console.error(`   Response Body: ${errorText || '(vazio)'}`);
            console.error(`   Tempo de resposta: ${responseTime}ms`);
            logger.add(`${errorMsg} - Tempo: ${responseTime}ms`, 'error');
            return;
        }
        
        const data = await response.json();
        console.log(`[${new Date().toLocaleTimeString('pt-BR')}] ✅ Dados recebidos com sucesso - ${responseTime}ms`);
        
        if (!data || Object.keys(data).length === 0) {
            const warningMsg = '⚠️ Dados vazios recebidos da API';
            console.warn(`[${new Date().toLocaleTimeString('pt-BR')}] ${warningMsg}`);
            logger.add(warningMsg, 'warning');
            return;
        }
        
        logger.add(`✅ Dados atualizados (${responseTime}ms)`, 'success');
        document.getElementById('cpu-brand').textContent = data.cpu.brand;
        document.getElementById('cpu-physical-cores').textContent = data.cpu.physicalCores;
        document.getElementById('cpu-cores').textContent = data.cpu.cores;
        document.getElementById('cpu-speed').textContent = `${data.cpu.currentSpeed.toFixed(2)} GHz`;
        
        const cpuLoad = data.cpuLoad.currentLoad.toFixed(1);
        const cpuLoadUser = data.cpuLoad.currentLoadUser.toFixed(1);
        const cpuLoadSystem = data.cpuLoad.currentLoadSystem.toFixed(1);
        const cpuLoadIdle = data.cpuLoad.currentLoadIdle.toFixed(1);
        
        document.getElementById('cpu-badge').textContent = cpuLoad + '%';
        document.getElementById('cpu-progress').style.width = cpuLoad + '%';
        
        // Log detalhado de CPU
        logger.add(`CPU: ${cpuLoad}% (User: ${cpuLoadUser}% | System: ${cpuLoadSystem}% | Idle: ${cpuLoadIdle}%)`, 'info');
        
        // Cores individuais
        const coresGrid = document.getElementById('cores-grid');
        coresGrid.innerHTML = '';
        let maxCoreLoad = 0;
        let minCoreLoad = 100;
        let avgCoreLoad = 0;
        
        data.cpuLoad.cpus.forEach((core, index) => {
            const coreDiv = document.createElement('div');
            coreDiv.className = 'core-item';
            coreDiv.innerHTML = `
                <div class="core-label">Core ${index}</div>
                <div class="core-value">${core.load.toFixed(0)}%</div>
            `;
            coresGrid.appendChild(coreDiv);
            
            maxCoreLoad = Math.max(maxCoreLoad, core.load);
            minCoreLoad = Math.min(minCoreLoad, core.load);
            avgCoreLoad += core.load;
        });
        
        avgCoreLoad = (avgCoreLoad / data.cpuLoad.cpus.length).toFixed(1);
        logger.add(`Cores: Min=${minCoreLoad.toFixed(1)}% | Avg=${avgCoreLoad}% | Max=${maxCoreLoad.toFixed(1)}%`, 'info');
        
        // Temperatura
        if (data.temperature && data.temperature.main) {
            const temp = data.temperature.main;
            const tempBadge = document.getElementById('temp-badge');
            const tempMain = document.getElementById('temp-main');
            const tempMax = document.getElementById('temp-max');
            const tempCircle = document.getElementById('temp-circle');
            
            if (tempBadge) tempBadge.textContent = temp + '°C';
            if (tempMain) tempMain.textContent = temp + '°C';
            if (tempMax) tempMax.textContent = data.temperature.max + '°C';
            
            // Cor baseada na temperatura
            if (tempCircle) {
                if (temp > 80) {
                    tempCircle.style.borderColor = '#ff3366';
                    tempCircle.style.background = 'radial-gradient(circle, rgba(255, 51, 102, 0.3), transparent)';
                } else if (temp > 60) {
                    tempCircle.style.borderColor = '#ffaa00';
                    tempCircle.style.background = 'radial-gradient(circle, rgba(255, 170, 0, 0.3), transparent)';
                } else {
                    tempCircle.style.borderColor = '#00ff88';
                    tempCircle.style.background = 'radial-gradient(circle, rgba(0, 255, 136, 0.3), transparent)';
                }
            }
            logger.add(`Temperatura CPU: ${temp}°C`, 'info');
        } else {
            const tempBadge = document.getElementById('temp-badge');
            const tempMain = document.getElementById('temp-main');
            const tempMax = document.getElementById('temp-max');
            
            if (tempBadge) tempBadge.textContent = 'N/A';
            if (tempMain) tempMain.textContent = '--°C';
            if (tempMax) tempMax.textContent = '--°C';
            logger.add('Temperatura não disponível', 'warning');
        }
        
        // Temperatura dos cores
        const coresTemp = document.getElementById('cores-temp');
        coresTemp.innerHTML = '';
        if (data.temperature.cores && data.temperature.cores.length > 0) {
            data.temperature.cores.forEach((temp, index) => {
                const coreDiv = document.createElement('div');
                coreDiv.className = 'core-temp';
                coreDiv.innerHTML = `
                    <div class="core-label">Core ${index}</div>
                    <div class="core-value">${temp}°C</div>
                `;
                coresTemp.appendChild(coreDiv);
            });
        }
        
        // Memória
        const memPercent = ((data.memory.used / data.memory.total) * 100).toFixed(1);
        const memUsedGB = data.memory.used / (1024 * 1024 * 1024);
        const memTotalGB = data.memory.total / (1024 * 1024 * 1024);
        
        document.getElementById('mem-badge').textContent = memPercent + '%';
        document.getElementById('mem-total').textContent = formatGigabytes(data.memory.total);
        document.getElementById('mem-used').textContent = formatGigabytes(data.memory.used);
        document.getElementById('mem-available').textContent = formatGigabytes(data.memory.available);
        document.getElementById('mem-free').textContent = formatGigabytes(data.memory.free);
        document.getElementById('mem-progress').style.width = memPercent + '%';
        
        // Atualizar gráfico de memória com valores em GB
        drawMemoryChart(parseFloat(memPercent), memUsedGB, memTotalGB);
        
        document.getElementById('swap-total').textContent = formatGigabytes(data.memory.swapTotal);
        document.getElementById('swap-used').textContent = formatGigabytes(data.memory.swapUsed);
        
        // GPU
        const gpuBody = document.getElementById('gpu-body');
        const gpuCard = document.getElementById('gpu-card');
        if (gpuBody) gpuBody.innerHTML = '';
        if (data.graphics.controllers.length > 0) {
            if (gpuCard) gpuCard.style.display = 'block';
            if (gpuBody) {
                data.graphics.controllers.forEach((gpu, index) => {
                    const gpuDiv = document.createElement('div');
                    gpuDiv.className = 'gpu-info';
                    
                    let gpuHtml = `
                        <div class="gpu-title">${gpu.model || 'GPU ' + (index + 1)}</div>
                        <div class="info-row">
                            <span class="label">Fabricante:</span>
                            <span class="value">${gpu.vendor || 'N/A'}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">VRAM:</span>
                            <span class="value">${gpu.vram ? gpu.vram + ' MB' : 'N/A'}</span>
                        </div>
                    `;
                    
                    if (gpu.temperatureGpu) {
                        gpuHtml += `
                            <div class="info-row">
                                <span class="label">Temperatura:</span>
                                <span class="value">${gpu.temperatureGpu}°C</span>
                            </div>
                        `;
                    }
                    
                    if (gpu.utilizationGpu) {
                        gpuHtml += `
                            <div class="info-row">
                                <span class="label">Uso GPU:</span>
                                <span class="value">${gpu.utilizationGpu}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${gpu.utilizationGpu}%; background: linear-gradient(90deg, #ff00ff, #ff3366);"></div>
                            </div>
                        `;
                        const gpuBadge = document.getElementById('gpu-badge');
                        if (gpuBadge) gpuBadge.textContent = gpu.utilizationGpu + '%';
                    }
                    
                    if (gpu.clockCore) {
                        gpuHtml += `
                            <div class="info-row">
                                <span class="label">Clock Core:</span>
                                <span class="value">${gpu.clockCore} MHz</span>
                            </div>
                        `;
                    }
                    
                    gpuDiv.innerHTML = gpuHtml;
                    gpuBody.appendChild(gpuDiv);
                });
            }
            logger.add(`GPU detectada: ${data.graphics.controllers[0].model}`, 'success');
        } else {
            if (gpuCard) gpuCard.style.display = 'none';
            logger.add('Nenhuma GPU detectada', 'warning');
        }
        
        // Discos
        const disksBody = document.getElementById('disks-body');
        disksBody.innerHTML = '';
        data.disks.forEach((disk) => {
            const diskDiv = document.createElement('div');
            diskDiv.className = 'disk-item';
            diskDiv.innerHTML = `
                <div class="disk-name">${disk.name || disk.device}</div>
                <div class="info-row">
                    <span class="label">Tipo:</span>
                    <span class="value">${disk.type}</span>
                </div>
                <div class="info-row">
                    <span class="label">Capacidade:</span>
                    <span class="value">${formatBytes(disk.size)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Interface:</span>
                    <span class="value">${disk.interfaceType}</span>
                </div>
                ${disk.temperature ? `
                <div class="info-row">
                    <span class="label">Temperatura:</span>
                    <span class="value">${disk.temperature}°C</span>
                </div>
                ` : ''}
            `;
            disksBody.appendChild(diskDiv);
        });
        
        // Sistema de arquivos
        const fsBody = document.getElementById('fs-body');
        fsBody.innerHTML = '';
        data.filesystems.forEach((fs) => {
            const fsDiv = document.createElement('div');
            fsDiv.className = 'fs-item';
            fsDiv.innerHTML = `
                <div class="fs-header">
                    <div class="fs-label"><strong>${fs.fs}</strong> - ${fs.mount}</div>
                    <div class="fs-usage">${fs.use.toFixed(1)}%</div>
                </div>
                <div class="info-row">
                    <span class="label">Sistema:</span>
                    <span class="value">${fs.type}</span>
                </div>
                <div class="info-row">
                    <span class="label">Tamanho:</span>
                    <span class="value">${formatBytes(fs.size)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Usado:</span>
                    <span class="value">${formatBytes(fs.used)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Disponível:</span>
                    <span class="value">${formatBytes(fs.available)}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${fs.use}%; background: linear-gradient(90deg, #ffaa00, #ff3366);"></div>
                </div>
            `;
            fsBody.appendChild(fsDiv);
        });
        
        // Rede
        const networkBody = document.getElementById('network-body');
        networkBody.innerHTML = '';
        data.network.interfaces.forEach((iface) => {
            const stats = data.network.stats.find(s => s.iface === iface.iface);
            const ifaceDiv = document.createElement('div');
            ifaceDiv.className = 'network-interface';
            
            let networkHtml = `
                <div class="interface-name">${iface.iface}</div>
                <div class="info-row">
                    <span class="label">Status:</span>
                    <span class="value">${iface.operstate === 'up' ? '🟢 Online' : '🔴 Offline'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Tipo:</span>
                    <span class="value">${iface.type}</span>
                </div>
                ${iface.ip4 ? `
                <div class="info-row">
                    <span class="label">IPv4:</span>
                    <span class="value">${iface.ip4}</span>
                </div>
                ` : ''}
                ${iface.mac ? `
                <div class="info-row">
                    <span class="label">MAC:</span>
                    <span class="value">${iface.mac}</span>
                </div>
                ` : ''}
                ${iface.speed && iface.speed > 0 ? `
                <div class="info-row">
                    <span class="label">Velocidade:</span>
                    <span class="value">${iface.speed} Mbps</span>
                </div>
                ` : ''}
            `;
            
            if (stats) {
                networkHtml += `
                    <div class="network-stats">
                        <div class="stat-box">
                            <div class="stat-value-net">${formatSpeed(stats.rx_sec)}</div>
                            <div class="stat-label-net">⬇ Download</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value-net">${formatSpeed(stats.tx_sec)}</div>
                            <div class="stat-label-net">⬆ Upload</div>
                        </div>
                    </div>
                    <div class="info-row">
                        <span class="label">Total RX:</span>
                        <span class="value">${formatBytes(stats.rx_bytes)}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Total TX:</span>
                        <span class="value">${formatBytes(stats.tx_bytes)}</span>
                    </div>
                `;
            }
            
            ifaceDiv.innerHTML = networkHtml;
            networkBody.appendChild(ifaceDiv);
        });
        
        // Sistema
        document.getElementById('os-distro').textContent = `${data.os.distro} ${data.os.release}`;
        document.getElementById('os-hostname').textContent = data.os.hostname;
        document.getElementById('os-arch').textContent = data.os.arch;
        document.getElementById('os-uptime').textContent = formatUptime(data.os.uptime);
        document.getElementById('sys-manufacturer').textContent = data.system.manufacturer;
        document.getElementById('sys-model').textContent = data.system.model;
        
        // Processos
        document.getElementById('proc-all').textContent = data.processes.all;
        document.getElementById('proc-running').textContent = data.processes.running;
        document.getElementById('proc-sleeping').textContent = data.processes.sleeping;
        
        const processList = document.getElementById('process-list');
        processList.innerHTML = '';
        data.processes.list.forEach((proc) => {
            const procDiv = document.createElement('div');
            procDiv.className = 'process-item';
            procDiv.innerHTML = `
                <span class="process-name">${proc.name}</span>
                <span class="process-cpu">${proc.cpu.toFixed(1)}%</span>
                <span class="process-mem">${proc.mem.toFixed(1)}%</span>
            `;
            processList.appendChild(procDiv);
        });
        
        // Bateria
        const batteryCard = document.getElementById('battery-card');
        const batteryBody = document.getElementById('battery-body');
        
        if (data.battery.hasBattery) {
            if (batteryCard) batteryCard.style.display = 'block';
            const batteryBadge = document.getElementById('battery-badge');
            if (batteryBadge) batteryBadge.textContent = data.battery.percent + '%';
            
            const batteryIcon = data.battery.isCharging ? '🔌' : 
                                data.battery.percent > 80 ? '🔋' :
                                data.battery.percent > 50 ? '🔋' :
                                data.battery.percent > 20 ? '🪫' : '🪫';
            
            if (batteryBody) {
                batteryBody.innerHTML = `
                    <div class="battery-display">
                        <div class="battery-icon">${batteryIcon}</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${data.battery.percent}%; background: linear-gradient(90deg, #00ff88, #00fff9);"></div>
                            <span class="progress-text">${data.battery.percent}%</span>
                        </div>
                        <div class="battery-status">
                            Status: ${data.battery.isCharging ? 'Carregando' : 'Em bateria'}<br>
                            ${data.battery.timeRemaining > 0 ? `Tempo restante: ${Math.floor(data.battery.timeRemaining)}min` : ''}
                        </div>
                    </div>
                `;
            }
            logger.add(`Bateria: ${data.battery.percent}% (${data.battery.isCharging ? 'Carregando' : 'Em bateria'})`, 'info');
        } else {
            if (batteryCard) batteryCard.style.display = 'none';
        }
        
        // Última atualização
        document.getElementById('last-update').textContent = new Date().toLocaleTimeString('pt-BR');
        
    } catch (error) {
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        const errorType = error.name || 'Erro Desconhecido';
        const errorMsg = error.message || 'Sem mensagem de erro';
        const errorStack = error.stack || 'Sem stack trace';
        
        console.error(`\n❌ ERRO NA API [${timestamp}]`);
        console.error(`   Tipo: ${errorType}`);
        console.error(`   Mensagem: ${errorMsg}`);
        console.error(`   Stack: ${errorStack}`);
        console.error(`   URL: /api/system-info`);
        console.error(`   Navegador: ${navigator.userAgent}`);
        console.error(`   Documento pronto: ${document.readyState}`);
        console.error('━'.repeat(60));
        
        // Diferenciar entre tipos de erro
        let userMessage = '';
        if (error instanceof TypeError) {
            userMessage = `⚠️ Erro de conexão: ${errorMsg}`;
        } else if (error instanceof SyntaxError) {
            userMessage = `⚠️ Erro ao processar dados: ${errorMsg}`;
        } else {
            userMessage = `❌ Erro na API: ${errorMsg}`;
        }
        
        logger.add(userMessage, 'error');
    }
}

// Atualizar a cada 2 segundos
updateSystemInfo();
setInterval(updateSystemInfo, 2000);

// ===== TOGGLE TEMA =====
document.getElementById('toggle-theme').addEventListener('click', () => {
    const panel = document.getElementById('theme-buttons');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
});

// Fechar painel ao clicar fora
document.addEventListener('click', (e) => {
    const toggleBtn = document.getElementById('toggle-theme');
    const panel = document.getElementById('theme-buttons');
    if (!toggleBtn.contains(e.target) && !panel.contains(e.target)) {
        panel.style.display = 'none';
    }
});