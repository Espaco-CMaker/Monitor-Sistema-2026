# 🚀 Guia de Instalação - Monitor Sistema 2026 Desktop

## Download e Instalação Rápida

### Windows 10/11

#### Opção 1: Instalador (.exe)
1. Baixe `Monitor-Sistema-2026-Setup-x.x.x.exe`
2. Execute o instalador
3. Siga os passos (aceitar licença, escolher pasta, criar atalho)
4. Encontre no Menu Iniciar: **Monitor Sistema 2026**
5. Clique para iniciar

#### Opção 2: Versão Portável
1. Baixe `Monitor-Sistema-2026-x.x.x.exe` (portável)
2. Execute diretamente
3. Não necessita instalação
4. Funciona de pen-drive, nuvem, etc

#### Opção 3: Linha de Comando
```powershell
# Instalar
Monitor-Sistema-2026-Setup-x.x.x.exe /SILENT /INSTALLPATH="C:\Program Files\Monitor2026"

# Desinstalar
"C:\Program Files\Monitor2026\uninstall.exe" /SILENT
```

---

## macOS (10.13+)

### Instalação via DMG
1. Baixe `Monitor-Sistema-2026-x.x.x.dmg`
2. Abra o arquivo (monta automaticamente)
3. Arraste **Monitor Sistema 2026** para **Applications**
4. Abra via Launchpad ou Finder
5. Autorize na primeira execução (clique em "Abrir")

### Instalação via ZIP
1. Baixe `Monitor-Sistema-2026-x.x.x.zip`
2. Descompacte
3. Arraste o app para **Applications**
4. Finito!

---

## Linux

### Ubuntu/Debian (recomendado)
```bash
# Instalar
sudo apt install ./monitor-sistema-2026_x.x.x_amd64.deb

# Executar
monitor-sistema-2026
# ou pelo menu de aplicativos
```

### AppImage (portável, funciona em qualquer distro)
```bash
# Tornar executável
chmod +x Monitor-Sistema-2026-x.x.x.AppImage

# Executar
./Monitor-Sistema-2026-x.x.x.AppImage
```

### Atalho no Menu de Aplicativos
1. Copie para `~/.local/share/applications/`:
```bash
cp monitor-sistema-2026.desktop ~/.local/share/applications/
```
2. Encontre em seu menu de aplicativos

---

## Usando o Aplicativo

### Interface Principal
- **Monitoramento em Tempo Real**: Atualiza a cada 2 segundos
- **10 Painéis de Dados**:
  - CPU (cores, velocidade, uso %)
  - Temperatura (processador, núcleos)
  - RAM (usada, disponível, gráfico)
  - GPU (VRAM, utilização, temperatura)
  - Discos (espaço, temperatura)
  - Sistemas de arquivos
  - Rede (I/O, velocidade)
  - Sistema (SO, uptime)
  - Processos (top 10)
  - Bateria (Windows)

### Controles
| Ação | Windows/Linux | macOS |
|------|:---:|:---:|
| Recarregar | Ctrl+R | Cmd+R |
| DevTools | Ctrl+Shift+I | Cmd+Opt+I |
| Zoom In | Ctrl+Plus | Cmd+Plus |
| Zoom Out | Ctrl+Minus | Cmd+Minus |
| Tela Cheia | F11 | Cmd+Ctrl+F |

### Temas Disponíveis
1. **Cyberpunk** (Padrão) - Neon azul e rosa
2. **Steampunk** - Marrom e ouro quente
3. **Futurista** - Azuis e cianos frios
4. **Circuitos** - Verde limão fluorescente
5. **Neon** - Cores neon vibrantes

---

## Desinstalação

### Windows
1. Menu Iniciar → Configurações → Aplicativos
2. Busque "Monitor Sistema 2026"
3. Clique em Desinstalar

**Alternativa**: Painel de Controle → Programas → Desinstalar um programa

### macOS
1. Abra Finder
2. Vá para **Aplicativos**
3. Encontre **Monitor Sistema 2026**
4. Mova para Lixeira ou clique direito → Mover para Lixeira

### Linux (apt)
```bash
sudo apt remove monitor-sistema-2026
```

### Linux (AppImage)
Simply delete the file

---

## Requisitos do Sistema

| Requisito | Valor |
|-----------|-------|
| **RAM** | 256 MB mínimo (512 MB recomendado) |
| **Espaço em Disco** | ~200 MB para instalação |
| **Processador** | 1 GHz ou superior |
| **Tela** | 1280x720 mínimo |

---

## Troubleshooting

### "Aplicativo danificado" (macOS)
```bash
# Contorne proteção Gatekeeper
xattr -d com.apple.quarantine /Applications/Monitor\ Sistema\ 2026.app
```

### "Acesso negado" (Linux AppImage)
```bash
chmod +x ./Monitor-Sistema-2026-*.AppImage
```

### Porta 3000 em Uso
1. Matador processo:
   - **Windows**: `netstat -ano | findstr :3000`
   - **macOS/Linux**: `lsof -i :3000`
2. Ou mude a porta em `main.js` (requer recompilação)

### Aplicativo congela
1. Force-feche: Ctrl+Alt+Delete (Windows) ou Force Quit (macOS)
2. Reinicie o aplicativo
3. Se persistir, desinstale e reinstale

### Sem dados aparecendo
1. Verifique conexão com internet (local)
2. Reinicie o app
3. Limpe cache: pressione Ctrl+Shift+Delete no DevTools

---

## Atualizações

Monitor Sistema 2026 verifica automaticamente atualizações.

Para atualizar manualmente:
1. Baixe a nova versão
2. Instale sobre a versão anterior
3. Clique em "Instalar" ou "Atualizar"

Dados anteriores são preservados.

---

## Suporte Técnico

**Erros?** Abra uma issue no GitHub:  
https://github.com/Espaco-CMaker/Monitor-Sistema-2026/issues

**Sugestões?** Crie uma discussão no projeto

---

**Versão**: 0.2.0  
**Data**: Janeiro 2026  
**Licença**: MIT  
**Desenvolvedor**: Espaço CMaker
