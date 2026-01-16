# 🚀 GitHub 푸시 가이드

## 현재 상황
- ✅ 변경사항이 로컬에 커밋되어 있음
- ❌ GitHub 푸시 시 인증 오류 발생 (이전 계정으로 인증되어 있음)

## 해결 방법

### 방법 1: Personal Access Token으로 직접 푸시 (가장 쉬움)

터미널에서 다음 명령어를 실행하세요:

```bash
cd /Users/central/Desktop/YBM

# Personal Access Token이 있다면
git push https://mlbooks001:YOUR_TOKEN@github.com/mlbooks001/ybm.git main
```

`YOUR_TOKEN` 부분을 GitHub Personal Access Token으로 교체하세요.

### 방법 2: Git Credential 캐시 초기화 후 푸시

```bash
cd /Users/central/Desktop/YBM

# macOS Keychain에서 Git 인증 정보 삭제
git credential-osxkeychain erase
host=github.com
protocol=https
# Enter 키 두 번 누르기

# 또는 credential helper 초기화
git config --global --unset credential.helper
git config --global credential.helper osxkeychain

# 다시 푸시 (새 인증 정보 입력)
git push origin main
```

### 방법 3: SSH로 전환

```bash
cd /Users/central/Desktop/YBM

# 원격 저장소 URL을 SSH로 변경
git remote set-url origin git@github.com:mlbooks001/ybm.git

# 푸시
git push origin main
```

## ✅ 푸시 완료 후

푸시가 성공하면:
1. **GitHub 저장소 확인**: https://github.com/mlbooks001/ybm
2. **Vercel 자동 배포 확인**: https://ybm-six.vercel.app
3. **배포 완료까지 약 1-2분 소요**

## 📋 현재 커밋된 내용

다음 파일들이 커밋되어 있습니다:
- `.github/workflows/auto-sync.yml` - GitHub Actions 워크플로우
- `auto-sync.js` - 자동 동기화 스크립트
- `auto-sync.html` - 자동 동기화 설정 페이지
- `package.json` - npm 스크립트
- `AUTO_SYNC_GUIDE.md` - 자동 동기화 가이드
- `GITHUB_AUTH_GUIDE.md` - GitHub 인증 가이드
- `README_AUTO_SYNC.md` - 빠른 시작 가이드
- `supabase-init.js` - Supabase 자동 초기화 (개선)
- `index.html`, `admin.html` - Supabase 자동 초기화 활성화

## 🎯 완료 후 확인

푸시 후 다음을 확인하세요:

1. **GitHub 저장소**
   - 파일들이 업로드되었는지 확인
   - `.github/workflows/` 폴더 확인

2. **Vercel 배포**
   - Deployments 탭에서 자동 배포 시작 확인
   - 배포 완료 후 사이트 확인

3. **자동 동기화 테스트**
   - `auto-sync.html` 페이지 접속
   - "전체 연동 테스트" 버튼 클릭

## 💡 앞으로 사용 방법

인증이 완료되면:
```bash
git add .
git commit -m "변경사항 설명"
git push origin main
```

이렇게 간단하게 푸시할 수 있습니다!
