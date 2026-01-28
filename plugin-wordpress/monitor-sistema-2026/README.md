# Monitor Sistema 2026 - Plugin WordPress

Plugin WordPress que integra o Dashboard Monitor Sistema 2026 ao seu site.

## 🎯 Funcionalidades

- ✅ Integração com Monitor Sistema 2026 via URL de API
- ✅ Painel administrativo dentro do WordPress
- ✅ Shortcode para exibir em qualquer página
- ✅ Configurações flexíveis de URL e intervalo de atualização
- ✅ Teste de conexão integrado
- ✅ Suporte CORS

## 📦 Instalação

### Método 1: Upload do Plugin

1. Faça download da pasta `monitor-sistema-2026`
2. Extraia no diretório `/wp-content/plugins/` do seu WordPress
3. Ative o plugin no painel de administração (Plugins > Plugin Instalados)

### Método 2: Via WP-CLI

```bash
wp plugin install /caminho/para/monitor-sistema-2026 --activate
```

## ⚙️ Configuração

1. **Acesse as configurações:**
   - Vá para: Admin → Monitor 2026 → Configurações

2. **Configure a URL da API:**
   - URL do servidor Node.js (ex: http://localhost:3000)
   - Intervalo de atualização dos dados

3. **Teste a conexão:**
   - Clique em "Testar Conexão"
   - Verifique se o servidor está respondendo

## 🚀 Uso

### Option 1: Dashboard Administrativo

Acesse: **Admin Dashboard → Monitor 2026**

O monitor será exibido em tela cheia no painel administrativo.

### Option 2: Página Pública com Shortcode

Adicione em qualquer página/post:

```
[monitor-sistema-2026 height="800" title="Monitor do Sistema"]
```

**Atributos disponíveis:**
- `height` - Altura em pixels (padrão: 800)
- `title` - Título do iframe (padrão: Monitor do Sistema)

**Exemplo completo:**

```
<h1>Monitor de Desempenho do Servidor</h1>
<p>Acompanhe em tempo real as métricas do sistema:</p>

[monitor-sistema-2026 height="900" title="Monitor 2026"]
```

## 🔌 Requisitos

- WordPress 5.0+
- PHP 7.4+
- Servidor Node.js com Monitor Sistema 2026 rodando
- CORS habilitado no servidor Node.js

## ⚡ Configuração do Node.js

O servidor Node.js precisa estar com CORS habilitado. Verifique se `servidor.js` tem:

```javascript
const cors = require('cors');

const corsOptions = {
    origin: [
        'https://www.cmaker.com.br',
        'http://www.cmaker.com.br',
        'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'OPTIONS']
};

app.use(cors(corsOptions));
```

## 🔐 Segurança

- O plugin respeita as permissões do WordPress (`manage_options`)
- AJAX calls incluem nonces do WordPress
- Todas as URLs são sanitizadas com `esc_url()`
- Os dados são validados antes do uso

## 📊 Endpoints Utilizados

- `GET /api/system-info` - Retorna informações do sistema em tempo real

## 🐛 Troubleshooting

### "Conexão recusada"

1. Verifique se o servidor Node.js está rodando
2. Confirme a URL correta nas configurações
3. Verifique se a porta está aberta (padrão: 3000)

### "CORS Error"

1. Verifique se CORS está habilitado no servidor Node.js
2. Adicione seu domínio WordPress à lista de `origin` permitidos
3. Reinicie o servidor Node.js

### "Timeout"

1. Aumentar o timeout nas configurações
2. Verifique a velocidade da rede
3. Verifique a carga do servidor Node.js

## 📝 Changelog

### v1.0.0
- Lançamento inicial
- Suporte a iframe e AJAX
- Configurações de URL e intervalo
- Teste de conexão integrado

## 📄 Licença

MIT License - Veja LICENSE para detalhes

## 🤝 Suporte

Para dúvidas ou problemas:
- 📧 Email: dev@espacocmaker.com
- 🌐 Site: https://cmaker.com.br
- 📱 GitHub: https://github.com/Espaco-CMaker/Monitor-Sistema-2026

---

**Versão:** 1.0.0  
**Compatibilidade:** WordPress 5.0+  
**Autor:** Espaço CMaker
