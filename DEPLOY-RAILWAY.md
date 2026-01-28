# 🚂 Deploy Rápido no Railway (5 minutos)

## Por que Railway?
- ✅ **100% GRÁTIS** para começar ($5/mês de créditos)
- ✅ Deploy automático do GitHub
- ✅ SSL/HTTPS incluído
- ✅ Zero configuração necessária
- ✅ Node.js já configurado

---

## 🚀 Passo a Passo

### 1️⃣ Criar Conta no Railway

1. Acesse: https://railway.app
2. Clique em **"Start a New Project"**
3. Login com **GitHub** (mesma conta do projeto)

### 2️⃣ Deploy do Projeto

1. Clique em **"Deploy from GitHub repo"**
2. Selecione: **Espaco-CMaker/Monitor-Sistema-2026**
3. Railway detecta automaticamente Node.js ✅
4. Clique em **"Deploy Now"**

### 3️⃣ Configurar Variáveis de Ambiente

1. No dashboard do projeto, clique em **"Variables"**
2. Adicione:

```
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://www.cmaker.com.br,https://cmaker.com.br
```

3. Clique em **"Add"** para cada variável

### 4️⃣ Obter URL Pública

1. Clique na aba **"Settings"**
2. Role até **"Domains"**
3. Clique em **"Generate Domain"**
4. Copie a URL: `https://seu-projeto.railway.app`

### 5️⃣ Testar

Abra no navegador:
```
https://seu-projeto.railway.app
```

Deve ver o dashboard funcionando! 🎉

### 6️⃣ Configurar WordPress

1. Acesse: **Admin → Monitor 2026 → Configurações**
2. Cole a URL: `https://seu-projeto.railway.app`
3. Clique em **"Testar Conexão"**
4. ✅ Deve conectar!

---

## 📋 URL Final

Seu monitor estará disponível em:
- **Dashboard direto:** `https://seu-projeto.railway.app`
- **API:** `https://seu-projeto.railway.app/api/system-info`
- **No WordPress:** Via plugin ou shortcode

---

## 🎯 Vantagens

✅ Deploy automático a cada push no GitHub  
✅ Logs em tempo real  
✅ Restart automático se cair  
✅ SSL/HTTPS grátis  
✅ Backup automático  
✅ Fácil de escalar  

---

## 💰 Custos

- **$5 de créditos GRÁTIS por mês**
- Suficiente para projetos pequenos
- Sem cartão de crédito necessário inicialmente

---

## 🔄 Atualizações

Sempre que você fizer `git push` no GitHub, o Railway atualiza automaticamente! 🚀

---

## 📞 Precisa de Ajuda?

Me avise se tiver algum erro no deploy!
