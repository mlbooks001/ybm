#!/bin/bash

# 파일 변경 시 자동으로 GitHub에 푸시하는 스크립트

echo "🔄 변경사항 확인 중..."

# 변경사항 확인
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ 변경사항이 없습니다."
    exit 0
fi

# 변경사항 스테이징
git add .

# 자동 커밋 메시지 생성
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
commit_msg="자동 업데이트: $timestamp"

# 커밋
git commit -m "$commit_msg"

# GitHub에 푸시
if git push origin main; then
    echo ""
    echo "✅ GitHub 푸시 완료!"
    echo "🚀 Vercel 자동 배포 시작: https://ybm-six.vercel.app"
else
    echo ""
    echo "❌ GitHub 푸시 실패"
    exit 1
fi
