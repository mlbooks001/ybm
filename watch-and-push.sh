#!/bin/bash

# 파일 변경 감지 및 자동 푸시 스크립트

echo "👀 파일 변경 감지 시작..."
echo "📁 디렉토리: $(pwd)"
echo "🔗 원격 저장소: $(git remote get-url origin)"
echo ""
echo "💡 변경사항이 감지되면 자동으로 GitHub에 푸시됩니다."
echo "🛑 중지하려면 Ctrl+C를 누르세요."
echo ""

# macOS는 fswatch 사용
if command -v fswatch &> /dev/null; then
    echo "✅ fswatch를 사용하여 파일 변경 감지 중..."
    fswatch -o . | while read f; do
        echo ""
        echo "📝 변경사항 감지됨: $(date '+%Y-%m-%d %H:%M:%S')"
        ./auto-push.sh
        echo ""
        echo "👀 계속 감지 중..."
    done
# Linux는 inotifywait 사용
elif command -v inotifywait &> /dev/null; then
    echo "✅ inotifywait를 사용하여 파일 변경 감지 중..."
    while true; do
        inotifywait -r -e modify,create,delete,move . 2>/dev/null
        echo ""
        echo "📝 변경사항 감지됨: $(date '+%Y-%m-%d %H:%M:%S')"
        ./auto-push.sh
        echo ""
        echo "👀 계속 감지 중..."
    done
else
    echo "❌ fswatch 또는 inotifywait가 설치되어 있지 않습니다."
    echo ""
    echo "📦 설치 방법:"
    echo "   macOS: brew install fswatch"
    echo "   Linux: sudo apt-get install inotify-tools"
    exit 1
fi
