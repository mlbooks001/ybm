#!/bin/bash

# YBM FC Vercel 배포 스크립트

echo "🚀 YBM FC Vercel 배포를 시작합니다..."
echo ""

# Git 상태 확인
echo "📋 Git 상태 확인 중..."
git status

echo ""
echo "📦 변경사항을 스테이징 중..."
git add .

echo ""
read -p "커밋 메시지를 입력하세요 (기본: 'Vercel 배포'): " commit_msg
commit_msg=${commit_msg:-"Vercel 배포"}

echo ""
echo "💾 변경사항 커밋 중..."
git commit -m "$commit_msg"

echo ""
echo "📤 GitHub에 푸시 중..."
git push origin main

echo ""
echo "✅ 푸시 완료!"
echo ""
echo "🌐 Vercel이 자동으로 배포를 시작합니다."
echo "   배포 URL: https://ybm-six.vercel.app"
echo "   배포 완료까지 약 1-2분 소요됩니다."
echo ""
echo "📊 배포 상태 확인: https://vercel.com/dashboard"
