// Configuração para ambiente de produção
module.exports = {
    // Porta do servidor
    port: process.env.PORT || 3000,
    
    // Ambiente
    env: process.env.NODE_ENV || 'production',
    
    // CORS Origins permitidos
    corsOrigins: (process.env.CORS_ORIGIN || 'https://www.cmaker.com.br').split(','),
    
    // Configurações de cache
    cache: {
        enabled: true,
        ttl: 2000 // 2 segundos
    },
    
    // Logs
    logging: {
        enabled: true,
        level: 'info' // 'debug', 'info', 'warn', 'error'
    },
    
    // Rate limiting
    rateLimit: {
        enabled: true,
        maxRequests: 100,
        windowMs: 60000 // 1 minuto
    }
};
