# 🖥️ Monitor Sistema 2026

Um dashboard futurista de monitoramento de sistema em tempo real, construído com **Express.js** e **Node.js**, exibindo informações detalhadas do seu computador com 5 temas visuais incríveis.

![Version](https://img.shields.io/badge/version-0.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/node.js-18+-339933)

## ✨ Recursos Principais

- 📊 **10 Cards de Monitoramento:**
  - CPU (uso em tempo real)
  - Temperatura do Sistema
  - Memória RAM
  - GPU
  - Discos (múltiplos)
  - Filesystems
  - Rede (upload/download)
  - Informações do Sistema
  - Processos Ativos
  - Bateria

- 🎨 **5 Temas Dinâmicos:**
  - 🤖 **Cyberpunk** (padrão)
  - ⚙️ **Steampunk**
  - 🚀 **Futurista**
  - ⚡ **Circuitos**
  - 💡 **Neon**

- 📱 **Design Responsivo** - Adaptado para desktop, tablet e mobile
- 🔄 **Atualização em Tempo Real** - Dados atualizados a cada 2 segundos
- 💾 **Persistência Local** - Tema e cards selecionados salvos no navegador
- 🎛️ **Controle de Visibilidade** - Mostre/oculte cards individualmente

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Espaco-CMaker/Monitor-Sistema-2026.git
cd Monitor-Sistema-2026

# Instale as dependências
npm install
```

### Execução

```bash
# Inicie o servidor
node servidor.js

# O dashboard estará disponível em:
# http://localhost:3000
```

## 📦 Dependências

- **express** (5.2.1) - Framework web para Node.js
- **systeminformation** (5.30.6) - Biblioteca para coletar informações do sistema

## 🏗️ Estrutura do Projeto

```
Monitor-Sistema-2026/
├── servidor.js              # Servidor Express e API
├── package.json             # Configurações do projeto
├── public/
│   ├── index.html          # Interface HTML
│   ├── style.css           # Estilos e temas (1452 linhas)
│   └── script.js           # Lógica frontend (950 linhas)
└── README.md               # Este arquivo
```

## 🔌 API Disponível

### `GET /api/system-info`

Retorna todas as informações do sistema em JSON.

**Exemplo de resposta:**

```json
{
  "cpu": {
    "manufacturer": "Intel",
    "cores": 8,
    "usage": 23.5
  },
  "temperature": {
    "main": 45.2
  },
  "memory": {
    "total": 16000,
    "used": 8234,
    "percentage": 51.5
  },
  "gpu": [...],
  "network": {...},
  ...
}
```

## 🎨 Temas

Todos os temas podem ser alternados em tempo real usando o botão **TEMA** na barra superior.

### Cyberpunk
Cores neon vibrantes - azul, roxo e rosa

### Steampunk
Tons quentes - marrom, ouro e cobre

### Futurista
Cores frias - azul claro, ciano e verde

### Circuitos
Design eletrônico - verde limão e preto

### Neon
Iluminação neon pura - cores vibrantes

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript Vanilla
- **Backend:** Express.js, Node.js
- **Monitoramento:** systeminformation
- **Armazenamento:** LocalStorage (client-side)

## 📊 Recursos de Interface

### Botão CARDS
Alterna a visibilidade de todos os cards de monitoramento

### Botão TEMA
Abre menu de seleção de temas com 5 opções

### Banner CMaker
Promoção do Espaço CMaker no canto superior direito

### Grid Responsivo
- **Desktop (1600px+):** 6 colunas
- **Tablet (1024-1599px):** 4 colunas
- **Mobile (<1024px):** 2 colunas

## 🔄 Desenvolvimento

### Modificar o Layout

Edite `public/style.css` para alterar cores, espaçamento ou responsividade.

### Adicionar Novos Dados

1. Modifique `servidor.js` para adicionar novas métricas
2. Atualize `public/index.html` com novo card
3. Estilize em `public/style.css`
4. Implemente a lógica em `public/script.js`

### Reiniciar o Servidor

Após qualquer mudança no backend, reinicie o servidor:

```bash
# Ctrl+C para parar
# Depois:
node servidor.js
```

## 🎯 Roadmap Futuro

- [ ] Exportar dados para CSV/JSON
- [ ] Histórico de desempenho com gráficos
- [ ] Alertas customizados de temperatura/CPU
- [ ] Modo dark/light permanente
- [ ] Suporte a múltiplos idiomas
- [ ] API REST expandida

## 📝 Licença

MIT License - Veja LICENSE para detalhes.

## 🏢 Sobre o Espaço CMaker

O **Espaço CMaker** é um ambiente de inovação dedicado ao desenvolvimento de soluções tecnológicas e criativas.

- 📍 [Visite nosso site](https://espacocmaker.com)
- 🤝 [Entre em contato](mailto:contato@espacocmaker.com)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📧 Suporte

Para dúvidas ou problemas, abra uma issue no repositório GitHub.

---

**Versão:** 0.2.0  
**Última atualização:** Janeiro 2026  
**Status:** ✅ Ativo e em desenvolvimento
