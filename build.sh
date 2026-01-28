#!/bin/bash

echo "========================================="
echo "Monitor Sistema 2026 - Build Script"
echo "========================================="
echo ""

if [ -z "$1" ]; then
    echo "Uso: ./build.sh [win|mac|linux|all]"
    echo ""
    echo "Exemplos:"
    echo "  ./build.sh win      - Build para Windows"
    echo "  ./build.sh mac      - Build para macOS"
    echo "  ./build.sh linux    - Build para Linux"
    echo "  ./build.sh all      - Build para todos OS"
    exit 1
fi

case "$1" in
    win)
        echo "[1/2] Instalando dependências..."
        npm install
        echo ""
        echo "[2/2] Gerando executável Windows..."
        npm run build-win
        echo ""
        echo "✅ Build Windows concluído!"
        echo "Arquivos em: dist/"
        ;;
    mac)
        echo "[1/2] Instalando dependências..."
        npm install
        echo ""
        echo "[2/2] Gerando app macOS..."
        npm run build-mac
        echo ""
        echo "✅ Build macOS concluído!"
        echo "Arquivos em: dist/"
        ;;
    linux)
        echo "[1/2] Instalando dependências..."
        npm install
        echo ""
        echo "[2/2] Gerando AppImage e DEB..."
        npm run build-linux
        echo ""
        echo "✅ Build Linux concluído!"
        echo "Arquivos em: dist/"
        ;;
    all)
        echo "[1/3] Instalando dependências..."
        npm install
        echo ""
        echo "[2/3] Gerando builds para todos OS..."
        npm run build
        echo ""
        echo "✅ Build completo!"
        echo "Arquivos em: dist/"
        ;;
    *)
        echo "❌ Opção inválida: $1"
        echo "Use: ./build.sh [win|mac|linux|all]"
        exit 1
        ;;
esac
