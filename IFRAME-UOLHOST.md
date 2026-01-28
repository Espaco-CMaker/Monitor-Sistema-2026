# 🌐 Hospedagem Completa no UOLHost com iFrame

## 📋 Opções Disponíveis

### **Opção A: Node.js no UOLHost (Se disponível)**
Se o UOLHost suportar Node.js, você hospeda tudo lá.

### **Opção B: Arquivos Estáticos + Node.js Externo**
Arquivos HTML/CSS/JS no UOLHost + Node.js no Railway/Render.

---

## 🎯 Opção A: UOLHost com Node.js

### Passo 1: Upload via FTP

Faça upload destes arquivos para: `/public_html/monitor/`

```
monitor/
├── servidor.js
├── package.json
├── package-lock.json
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

### Passo 2: Conectar via SSH

```bash
ssh usuario@cmaker.com.br
cd ~/public_html/monitor
npm install
```

### Passo 3: Iniciar Servidor

```bash
# Com PM2 (recomendado)
npm install -g pm2
pm2 start servidor.js --name monitor-cmaker
pm2 save
pm2 startup

# Verificar status
pm2 status
pm2 logs monitor-cmaker
```

### Passo 4: Configurar Proxy (Apache)

Crie arquivo `.htaccess` em `/public_html/`:

```apache
RewriteEngine On
RewriteRule ^monitor/(.*)$ http://localhost:3000/$1 [P,L]
```

### Passo 5: Usar no WordPress

Crie uma página e adicione:

```html
<iframe 
    src="https://www.cmaker.com.br/monitor" 
    style="width:100%; height:900px; border:none; border-radius:8px;"
    title="Monitor Sistema 2026">
</iframe>
```

---

## 🎯 Opção B: Arquivos Estáticos no UOLHost

### Passo 1: Usar Node.js no Railway

1. Faça deploy no Railway: https://railway.app
2. Copie a URL gerada: `https://seu-projeto.railway.app`

### Passo 2: Hospedar Página Wrapper no UOLHost

Vou criar um arquivo HTML simples que você hospeda no UOLHost.

Este arquivo carrega o dashboard do Railway em iframe.

### Passo 3: Upload no UOLHost

Faça upload deste arquivo para: `/public_html/monitor.html`

### Passo 4: Acessar

URL final: `https://www.cmaker.com.br/monitor.html`

### Passo 5: Integrar no WordPress

**Opção 1 - iFrame direto:**
```html
<iframe 
    src="https://www.cmaker.com.br/monitor.html" 
    style="width:100%; height:900px; border:none;"
    title="Monitor Sistema 2026">
</iframe>
```

**Opção 2 - Plugin WordPress:**
Use o plugin que criamos e configure a URL.

---

## 📝 Qual opção escolher?

### Use Opção A se:
- ✅ UOLHost suporta Node.js
- ✅ Você tem acesso SSH
- ✅ Quer tudo em um lugar

### Use Opção B se:
- ✅ UOLHost não suporta Node.js
- ✅ Quer usar Railway (grátis)
- ✅ Mais simples e rápido

---

## 🚀 Vou criar os arquivos necessários

Qual opção você prefere?

1. **Opção A** - Tentar Node.js no UOLHost
2. **Opção B** - Node.js no Railway + Wrapper no UOLHost (mais fácil)
