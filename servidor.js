const express = require('express');
const si = require('systeminformation');
const os = require('os');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configurar CORS para permitir requisições de www.cmaker.com.br
const corsOptions = {
    origin: [
        'http://www.cmaker.com.br',
        'https://www.cmaker.com.br',
        'http://cmaker.com.br',
        'https://cmaker.com.br',
        'http://localhost:3000',
        'http://localhost'
    ],
    credentials: true,
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Time']
};

app.use(cors(corsOptions));

// Middleware de logging para todas as requisições
app.use((req, res, next) => {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    
    console.log(`[${timestamp}] 📨 ${method} ${url} (IP: ${ip})`);
    
    // Log de resposta
    res.on('finish', () => {
        const statusCode = res.statusCode;
        const statusColor = statusCode === 200 ? '✅' : '❌';
        console.log(`[${timestamp}] ${statusColor} Resposta ${statusCode} para ${url}`);
    });
    
    next();
});

// Servir arquivos estáticos
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API para obter informações do sistema
app.get('/api/system-info', async (req, res) => {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const startTime = process.hrtime.bigint();
    
    try {
        console.log(`[${timestamp}] 🔄 Iniciando coleta de dados do sistema...`);
        const [
            cpu,
            cpuTemperature,
            currentLoad,
            mem,
            osInfo,
            system,
            battery,
            graphics,
            diskLayout,
            fsSize,
            networkInterfaces,
            networkStats,
            processes,
            cpuCurrentSpeed
        ] = await Promise.all([
            si.cpu(),
            si.cpuTemperature(),
            si.currentLoad(),
            si.mem(),
            si.osInfo(),
            si.system(),
            si.battery(),
            si.graphics(),
            si.diskLayout(),
            si.fsSize(),
            si.networkInterfaces(),
            si.networkStats(),
            si.processes(),
            si.cpuCurrentSpeed()
        ]);
        const endTime = process.hrtime.bigint();
        const responseTime = Number(endTime - startTime) / 1000000; // Converter para ms
        
        console.log(`[${timestamp}] ✅ Dados coletados em ${responseTime.toFixed(2)}ms`);
        const data = {
            timestamp: Date.now(),
            cpu: {
                manufacturer: cpu.manufacturer,
                brand: cpu.brand,
                cores: cpu.cores,
                physicalCores: cpu.physicalCores,
                processors: cpu.processors,
                speed: cpu.speed,
                speedMin: cpu.speedMin,
                speedMax: cpu.speedMax,
                currentSpeed: cpuCurrentSpeed.avg,
                governor: cpu.governor,
                socket: cpu.socket,
                vendor: cpu.vendor,
                cache: cpu.cache
            },
            cpuLoad: {
                avgLoad: currentLoad.avgLoad,
                currentLoad: currentLoad.currentLoad,
                currentLoadUser: currentLoad.currentLoadUser,
                currentLoadSystem: currentLoad.currentLoadSystem,
                currentLoadIdle: currentLoad.currentLoadIdle,
                cpus: currentLoad.cpus
            },
            temperature: {
                main: cpuTemperature.main,
                cores: cpuTemperature.cores,
                max: cpuTemperature.max
            },
            memory: {
                total: mem.total,
                free: mem.free,
                used: mem.used,
                active: mem.active,
                available: mem.available,
                swapTotal: mem.swaptotal,
                swapUsed: mem.swapused,
                swapFree: mem.swapfree
            },
            os: {
                platform: osInfo.platform,
                distro: osInfo.distro,
                release: osInfo.release,
                arch: osInfo.arch,
                hostname: osInfo.hostname,
                uptime: os.uptime()
            },
            system: {
                manufacturer: system.manufacturer,
                model: system.model,
                version: system.version,
                serial: system.serial,
                uuid: system.uuid,
                sku: system.sku
            },
            battery: {
                hasBattery: battery.hasBattery,
                percent: battery.percent,
                isCharging: battery.isCharging,
                acConnected: battery.acConnected,
                timeRemaining: battery.timeRemaining
            },
            graphics: {
                controllers: graphics.controllers.map(g => ({
                    model: g.model,
                    vendor: g.vendor,
                    vram: g.vram,
                    vramDynamic: g.vramDynamic,
                    temperatureGpu: g.temperatureGpu,
                    powerDraw: g.powerDraw,
                    clockCore: g.clockCore,
                    clockMemory: g.clockMemory,
                    utilizationGpu: g.utilizationGpu,
                    utilizationMemory: g.utilizationMemory
                })),
                displays: graphics.displays
            },
            disks: diskLayout.map(d => ({
                device: d.device,
                type: d.type,
                name: d.name,
                vendor: d.vendor,
                size: d.size,
                interfaceType: d.interfaceType,
                temperature: d.temperature
            })),
            filesystems: fsSize.map(fs => ({
                fs: fs.fs,
                type: fs.type,
                size: fs.size,
                used: fs.used,
                available: fs.available,
                use: fs.use,
                mount: fs.mount
            })),
            network: {
                interfaces: networkInterfaces.map(ni => ({
                    iface: ni.iface,
                    ip4: ni.ip4,
                    ip6: ni.ip6,
                    mac: ni.mac,
                    speed: ni.speed,
                    type: ni.type,
                    operstate: ni.operstate
                })),
                stats: networkStats.map(ns => ({
                    iface: ns.iface,
                    operstate: ns.operstate,
                    rx_bytes: ns.rx_bytes,
                    tx_bytes: ns.tx_bytes,
                    rx_sec: ns.rx_sec,
                    tx_sec: ns.tx_sec
                }))
            },
            processes: {
                all: processes.all,
                running: processes.running,
                blocked: processes.blocked,
                sleeping: processes.sleeping,
                list: processes.list.slice(0, 10).map(p => ({
                    pid: p.pid,
                    name: p.name,
                    cpu: p.cpu,
                    mem: p.mem
                }))
            }
        };

        res.json(data);
        console.log(`[${timestamp}] 📤 Resposta enviada com sucesso (${JSON.stringify(data).length} bytes)`);
        
    } catch (error) {
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        const errorType = error.name || 'Erro Desconhecido';
        const errorMsg = error.message || 'Sem mensagem';
        const errorStack = error.stack || '';
        
        console.error(`\n❌ ERRO NA COLETA DE DADOS [${timestamp}]`);
        console.error(`   Tipo: ${errorType}`);
        console.error(`   Mensagem: ${errorMsg}`);
        console.error(`   Stack: ${errorStack}`);
        console.error(`   Sistema Operacional: ${os.platform()} ${os.release()}`);
        console.error('━'.repeat(60));
        
        res.status(500).json({ 
            error: errorMsg,
            type: errorType,
            timestamp: timestamp,
            details: process.env.NODE_ENV === 'development' ? errorStack : undefined
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`🚀 SERVIDOR INICIADO COM SUCESSO`);
    console.log(`${'═'.repeat(60)}`);
    console.log(`📍 Porta: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api/system-info`);
    console.log(`🖥️  Sistema: ${os.platform()} ${os.release()}`);
    console.log(`📦 Versão Node: ${process.version}`);
    console.log(`${'═'.repeat(60)}\n`);
}).on('error', (err) => {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    console.error(`\n❌ ERRO AO INICIAR SERVIDOR [${timestamp}]`);
    console.error(`   Porta: ${PORT}`);
    console.error(`   Erro: ${err.message}`);
    
    if (err.code === 'EADDRINUSE') {
        console.error(`   ⚠️  A porta ${PORT} já está em uso!`);
        console.error(`   Tente: netstat -ano | findstr :${PORT}`);
    }
    
    console.error('━'.repeat(60));
    process.exit(1);
});
