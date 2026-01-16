#!/bin/bash

# GitHub 자동 연동 스크립트

echo "🔄 GitHub 자동 연동 시작..."
echo ""

# Git 원격 저장소 확인
echo "📋 Git 원격 저장소 확인 중..."
git remote -v

echo ""
echo "📊 Git 상태 확인 중..."
git status

echo ""
echo "📦 변경사항 스테이징 중..."
git add .

echo ""
read -p "커밋 메시지를 입력하세요 (Enter 시 자동 메시지): " commit_msg

# 기본 커밋 메시지 생성
if [ -z "$commit_msg" ]; then
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    commit_msg="자동 동기화: $timestamp"
fi

echo ""
echo "💾 커밋 중: $commit_msg"
git commit -m "$commit_msg"

echo ""
echo "📤 GitHub에 푸시 중..."
if git push origin main; then
    echo ""
    echo "✅ GitHub 푸시 완료!"
    echo ""
    echo "🚀 Vercel 자동 배포 시작..."
    echo "   배포 URL: https://ybm-six.vercel.app"
    echo "   배포 완료까지 약 1-2분 소요됩니다."
    echo ""
    echo "📊 배포 상태 확인: https://vercel.com/dashboard"
    echo ""
    echo "✅ 자동 연동 완료!"
else
    echo ""
    echo "❌ GitHub 푸시 실패"
    echo ""
    echo "🔧 문제 해결 방법:"
    echo "1. Git 인증 확인: git remote -v"
    echo "2. Personal Access Token 사용:"
    echo "   git push https://mlbooks001:YOUR_TOKEN@github.com/mlbooks001/ybm.git main"
    echo ""
    echo "📖 자세한 내용은 GITHUB_AUTH_GUIDE.md 참고"
    exit 1
fi
