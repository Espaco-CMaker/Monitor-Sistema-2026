# 🚀 Guia Rápido - iFrame no UOLHost

## ✅ Solução Mais Simples

### **Arquitetura:**
1. **Node.js no Railway** (grátis, 5 min de setup)
2. **Página HTML no UOLHost** (com iframe)
3. **WordPress usa iframe** da página HTML

---

## 📦 Passo 1: Deploy no Railway

1. Acesse: https://railway.app
2. Login com GitHub
3. Deploy from GitHub → Monitor-Sistema-2026
4. Configure variáveis:
   - `PORT=3000`
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://www.cmaker.com.br`
5. Gere domínio público
6. **Copie a URL:** `https://seu-projeto.railway.app`

---

## 📤 Passo 2: Upload do HTML no UOLHost

### Arquivo: `monitor-iframe.html`

**Antes de fazer upload, edite linha 153:**

```html
<!-- Trocar esta linha: -->
<iframe src="http://localhost:3000" ...>

<!-- Por esta: -->
<iframe src="https://seu-projeto.railway.app" ...>
```

### Upload via FTP:

1. Conecte no FTP do UOLHost
2. Vá para: `/public_html/`
3. Crie pasta: `/public_html/monitor/`
4. Faça upload de: `monitor-iframe.html`
5. Renomeie para: `index.html`

**URL final:** `https://www.cmaker.com.br/monitor/`

---

## 🌐 Passo 3: Integrar no WordPress

### Opção A - Shortcode Simples

Adicione ao `functions.php` do tema:

```php
add_shortcode('monitor-sistema', function() {
    return '<iframe 
        src="https://www.cmaker.com.br/monitor/" 
        style="width:100%; height:900px; border:none; border-radius:8px;"
        title="Monitor Sistema 2026">
    </iframe>';
});
```

Use em páginas: `[monitor-sistema]`

### Opção B - Plugin Completo

Use o plugin que criamos:
1. Upload de: `/plugin-wordpress/monitor-sistema-2026/`
2. Ative o plugin
3. Configure URL: `https://seu-projeto.railway.app`

### Opção C - iFrame Direto

Em qualquer página, modo HTML:

```html
<iframe 
    src="https://www.cmaker.com.br/monitor/" 
    style="width:100%; height:900px; border:none; border-radius:8px;"
    title="Monitor Sistema 2026">
</iframe>
```

---

## ✅ Checklist Final

- [ ] Railway: Deploy completo
- [ ] Railway: Domínio público gerado
- [ ] HTML: URL do Railway configurada
- [ ] UOLHost: Upload do HTML feito
- [ ] UOLHost: Arquivo renomeado para index.html
- [ ] Teste: www.cmaker.com.br/monitor/ abre o dashboard
- [ ] WordPress: Shortcode ou plugin instalado
- [ ] WordPress: Página criada com monitor

---

## 🎯 Resultado Final

✅ **Dashboard em:** `https://www.cmaker.com.br/monitor/`  
✅ **API no Railway:** `https://seu-projeto.railway.app/api/system-info`  
✅ **WordPress integrado** via iframe  
✅ **Dados em tempo real** funcionando  

---

## 🔧 Troubleshooting

### "Iframe não carrega"
- Verifique se Railway está online
- Teste diretamente a URL do Railway
- Limpe cache do navegador

### "CORS Error"
- Adicione `www.cmaker.com.br` nas variáveis do Railway
- Reinicie o deploy no Railway

### "Página em branco"
- Verifique URL no iframe (linha 153 do HTML)
- Teste Railway diretamente no navegador
- Verifique logs do Railway

---

**Pronto para começar?** Siga os 3 passos acima! 🚀
