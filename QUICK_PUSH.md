# ⚡ 빠른 푸시 가이드

## 현재 상황
- ✅ 변경사항이 커밋되어 있음
- ⚠️ Git 사용자 정보가 이전 계정으로 설정되어 있음

## 🚀 즉시 푸시하기

터미널에서 다음 명령어를 순서대로 실행하세요:

### 1단계: Git 사용자 정보 업데이트 (선택사항)
```bash
cd /Users/central/Desktop/YBM

# 이 프로젝트만 새 계정으로 설정
git config user.name "mlbooks001"
git config user.email "mlbooks001@gmail.com"  # 실제 이메일로 변경
```

### 2단계: 인증 정보 초기화
```bash
# macOS Keychain에서 GitHub 인증 정보 삭제
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase

# 또는 credential helper 재설정
git config --global credential.helper ""
git config --global credential.helper osxkeychain
```

### 3단계: 푸시
```bash
# 방법 A: Personal Access Token 사용 (권장)
git push https://mlbooks001:YOUR_TOKEN@github.com/mlbooks001/ybm.git main

# 방법 B: 일반 푸시 (새 인증 정보 입력)
git push origin main
```

**방법 A** 사용 시:
- `YOUR_TOKEN` 부분을 GitHub Personal Access Token으로 교체
- 토큰이 없다면: GitHub → Settings → Developer settings → Personal access tokens → Generate new token

## ✅ 완료 확인

푸시 성공 후:
1. **GitHub 확인**: https://github.com/mlbooks001/ybm
   - 파일들이 업로드되었는지 확인
   - 최근 커밋 확인

2. **Vercel 자동 배포 확인**: https://ybm-six.vercel.app
   - Deployments 탭에서 배포 시작 확인
   - 약 1-2분 후 배포 완료

3. **자동 동기화 확인**:
   - `auto-sync.html` 페이지 접속
   - "전체 연동 테스트" 클릭

## 📦 커밋된 내용

다음 자동 동기화 설정 파일들이 포함되어 있습니다:
- GitHub Actions 워크플로우
- 자동 동기화 스크립트
- Supabase 자동 초기화
- 설정 가이드 문서들

## 💡 앞으로는

인증이 완료되면:
```bash
git add .
git commit -m "변경사항"
git push origin main
```

이렇게 간단하게 사용할 수 있습니다!
