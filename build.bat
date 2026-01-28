@echo off
REM Check if running as Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo =========================================
    echo ERRO: Executar como Administrador!
    echo =========================================
    echo.
    echo Este script requer permissoes de administrador.
    echo.
    echo Clique direito neste arquivo e selecione:
    echo "Executar como administrador"
    echo.
    pause
    exit /b 1
)

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
    pause
    exit /b 1
)

if "%1"=="win" (
    echo [1/3] Limpando arquivos antigos...
    rmdir /s /q dist 2>nul
    rmdir /s /q out 2>nul
    echo.
    echo [2/3] Instalando dependencias...
    call npm install
    echo.
    echo [3/3] Gerando executavel Windows...
    call npm run build-win
    echo.
    echo ✅ Build Windows concluido!
    echo Arquivos em: dist\
    echo.
    pause
) else if "%1"=="all" (
    echo [1/3] Limpando arquivos antigos...
    rmdir /s /q dist 2>nul
    rmdir /s /q out 2>nul
    echo.
    echo [2/3] Instalando dependencias...
    call npm install
    echo.
    echo [3/3] Gerando builds para todos OS...
    call npm run build
    echo.
    echo ✅ Build completo!
    echo Arquivos em: dist\
    echo.
    pause
) else (
    echo Opcao invalida: %1
    echo Use: build.bat [win|all]
    pause
    exit /b 1
)

