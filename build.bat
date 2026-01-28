@echo off
echo =========================================
echo Monitor Sistema 2026 - Build Script
echo =========================================
echo.

if "%1"=="" (
    echo Uso: build.bat [win|mac|linux|all]
    echo.
    echo Exemplos:
    echo   build.bat win      - Build para Windows
    echo   build.bat mac      - Build para macOS
    echo   build.bat linux    - Build para Linux
    echo   build.bat all      - Build para todos OS
    exit /b 1
)

if "%1"=="win" (
    echo [1/2] Instalando dependencias...
    call npm install
    echo.
    echo [2/2] Gerando executavel Windows...
    call npm run build-win
    echo.
    echo ✅ Build Windows concluido!
    echo Arquivos em: dist/
    pause
) else if "%1"=="mac" (
    echo [1/2] Instalando dependencias...
    call npm install
    echo.
    echo [2/2] Gerando app macOS...
    call npm run build-mac
    echo.
    echo ✅ Build macOS concluido!
    echo Arquivos em: dist/
    pause
) else if "%1"=="linux" (
    echo [1/2] Instalando dependencias...
    call npm install
    echo.
    echo [2/2] Gerando AppImage e DEB...
    call npm run build-linux
    echo.
    echo ✅ Build Linux concluido!
    echo Arquivos em: dist/
    pause
) else if "%1"=="all" (
    echo [1/3] Instalando dependencias...
    call npm install
    echo.
    echo [2/3] Gerando Windows...
    call npm run build-win
    echo.
    echo [3/3] Build completo!
    echo ✅ Todos os arquivos prontos em: dist/
    pause
) else (
    echo Opcao invalida: %1
    echo Use: build.bat [win|mac|linux|all]
    exit /b 1
)
