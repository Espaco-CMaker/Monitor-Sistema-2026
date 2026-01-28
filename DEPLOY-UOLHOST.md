# 🚀 Deploy no UOLHost - Guia Completo

## 📋 Pré-requisitos

### 1. Verificar se UOLHost suporta Node.js

Entre em contato com o suporte da UOLHost e pergunte:
- ✅ Suporte a Node.js (versão 18+)
- ✅ Acesso SSH ao servidor
- ✅ Possibilidade de executar processos Node.js
- ✅ Portas disponíveis (geralmente 3000, 8080 ou custom)

**IMPORTANTE:** Se UOLHost não suportar Node.js, você tem 3 opções:
1. Contratar VPS/Cloud separado (DigitalOcean, AWS, Azure)
2. Usar plataforma de hospedagem Node.js (Heroku, Railway, Render)
3. Usar apenas WordPress (sem dados em tempo real)

---

## 🎯 Opção 1: UOLHost com Suporte Node.js (Ideal)

### Passo 1: Preparar Arquivos para Upload

1. **Fazer upload via FTP/SFTP:**
```
/public_html/monitor-sistema-2026/
├── servidor.js
├── package.json
├── package-lock.json
├── .gitignore
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

2. **NÃO fazer upload:**
- `node_modules/` (será instalado no servidor)
- `.git/` (não necessário em produção)

### Passo 2: Conectar via SSH

```bash
ssh seu-usuario@cmaker.com.br
# ou
ssh seu-usuario@seu-servidor.uolhost.com.br
```

### Passo 3: Instalar Dependências

```bash
cd /caminho/para/monitor-sistema-2026
npm install
```

### Passo 4: Configurar Variáveis de Ambiente

Crie arquivo `.env`:

```bash
nano .env
```

Adicione:
```
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://www.cmaker.com.br,https://cmaker.com.br
```

### Passo 5: Iniciar o Servidor (Modo Produção)

**Opção A - PM2 (Recomendado):**
```bash
npm install -g pm2
pm2 start servidor.js --name monitor-sistema-2026
pm2 save
pm2 startup
```

**Opção B - Forever:**
```bash
npm install -g forever
forever start servidor.js
```

**Opção C - Screen/Tmux:**
```bash
screen -S monitor
node servidor.js
# Ctrl+A+D para detach
```

### Passo 6: Configurar Nginx/Apache (Proxy Reverso)

**Nginx:**
```nginx
server {
    listen 80;
    server_name monitor.cmaker.com.br;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

### Passo 7: Configurar Plugin WordPress

1. Admin → Monitor 2026 → Configurações
2. URL da API: `https://www.cmaker.com.br:3000` ou `https://monitor.cmaker.com.br`
3. Testar conexão

---

## 🎯 Opção 2: UOLHost SEM Suporte Node.js (Alternativa)

### Hospedar Node.js em Plataforma Externa

#### **Railway.app (Recomendado - Grátis)**

1. **Acesse:** https://railway.app
2. **Login com GitHub**
3. **New Project → Deploy from GitHub**
4. **Selecione:** Espaco-CMaker/Monitor-Sistema-2026
5. **Add Variables:**
   ```
   PORT=3000
   NODE_ENV=production
   CORS_ORIGIN=https://www.cmaker.com.br
   ```
6. **Deploy automático!**
7. **Copie a URL:** `https://seu-app.railway.app`

#### **Render.com (Alternativa Grátis)**

1. **Acesse:** https://render.com
2. **New → Web Service**
3. **Connect GitHub:** Monitor-Sistema-2026
4. **Configurações:**
   - Build Command: `npm install`
   - Start Command: `node servidor.js`
   - Environment: Node
5. **Environment Variables:**
   ```
   PORT=3000
   CORS_ORIGIN=https://www.cmaker.com.br
   ```
6. **Deploy!**
7. **URL:** `https://monitor-sistema-2026.onrender.com`

#### **Heroku (Pago)**

```bash
heroku login
heroku create monitor-sistema-cmaker
git push heroku main
heroku config:set CORS_ORIGIN=https://www.cmaker.com.br
heroku open
```

### Configurar WordPress

```php
// URL da API externa
URL: https://seu-app.railway.app/api/system-info
```

---

## 🎯 Opção 3: Dados Estáticos (Sem Node.js)

Se não quiser hospedar Node.js:

### Criar Versão Estática

1. Remover atualização em tempo real
2. Usar dados de exemplo
3. Dashboard apenas para visualização

Vou criar essa versão se você quiser.

---

## 📦 Checklist de Deploy

- [ ] Node.js instalado no servidor
- [ ] Dependências instaladas (`npm install`)
- [ ] Porta configurada e liberada no firewall
- [ ] PM2 ou Forever configurado
- [ ] Proxy reverso configurado (Nginx/Apache)
- [ ] SSL/HTTPS configurado (Let's Encrypt)
- [ ] CORS configurado com domínio correto
- [ ] Plugin WordPress instalado
- [ ] URL da API configurada no WordPress
- [ ] Teste de conexão bem-sucedido

---

## 🔧 Troubleshooting

### "Porta em uso"
```bash
# Verificar processos
netstat -tulpn | grep :3000
# Matar processo
kill -9 PID
```

### "Permissão negada"
```bash
# Dar permissão de execução
chmod +x servidor.js
# Usar porta > 1024 (não requer root)
```

### "CORS Error"
- Verificar CORS_ORIGIN no .env
- Reiniciar servidor após mudanças

### "Memória insuficiente"
```bash
# Limitar memória do Node
node --max-old-space-size=512 servidor.js
```

---

## 📞 Próximos Passos

1. **Contate UOLHost:** Pergunte sobre suporte Node.js
2. **Escolha a opção:** Local no UOLHost ou Externa (Railway/Render)
3. **Me avise:** Qual opção você escolheu para eu te ajudar no deploy

**Qual caminho você prefere seguir?**
