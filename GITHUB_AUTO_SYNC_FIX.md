# 🔧 GitHub 자동 연동 문제 해결 가이드

## 현재 설정 상태

### ✅ 완료된 설정
- ✅ Git 원격 저장소: `https://github.com/mlbooks001/ybm.git`
- ✅ GitHub Actions 워크플로우 설정
- ✅ Vercel 자동 배포 설정

## 자동 연동 방법

### 방법 1: 자동 동기화 스크립트 사용 (권장)

```bash
cd /Users/central/Desktop/YBM
./git-auto-sync.sh
```

이 스크립트는 다음을 자동으로 수행합니다:
1. Git 상태 확인
2. 변경사항 스테이징
3. 커밋 (메시지 입력 또는 자동)
4. GitHub에 푸시
5. Vercel 자동 배포 트리거

### 방법 2: 수동 푸시

```bash
cd /Users/central/Desktop/YBM

# 변경사항 확인
git status

# 변경사항 추가
git add .

# 커밋
git commit -m "변경사항 설명"

# GitHub에 푸시 (자동 배포 트리거)
git push origin main
```

## 문제 해결

### 문제 1: 인증 오류 (403 Forbidden)

**증상:**
```
remote: Permission to mlbooks001/ybm.git denied to anteate9106.
```

**해결 방법:**

1. **Personal Access Token 사용:**
```bash
cd /Users/central/Desktop/YBM

# 토큰으로 직접 푸시
git push https://mlbooks001:YOUR_TOKEN@github.com/mlbooks001/ybm.git main
```

2. **Git Credential 초기화:**
```bash
# macOS Keychain에서 인증 정보 삭제
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase

# 다시 푸시 (새 인증 정보 입력)
git push origin main
```

3. **SSH 키 사용:**
```bash
# 원격 저장소 URL을 SSH로 변경
git remote set-url origin git@github.com:mlbooks001/ybm.git

# 푸시
git push origin main
```

### 문제 2: 원격 저장소 연결 안됨

**증상:**
```
fatal: remote origin does not appear to be a git repository
```

**해결 방법:**
```bash
# 원격 저장소 확인
git remote -v

# 원격 저장소 추가 (필요시)
git remote add origin https://github.com/mlbooks001/ybm.git

# 원격 저장소 URL 업데이트 (필요시)
git remote set-url origin https://github.com/mlbooks001/ybm.git
```

### 문제 3: Vercel 자동 배포가 안됨

**증상:**
- GitHub에 푸시는 되지만 Vercel 배포가 시작되지 않음

**해결 방법:**

1. **Vercel 대시보드 확인:**
   - https://vercel.com/dashboard
   - 프로젝트 설정에서 GitHub 연동 확인

2. **Vercel 프로젝트 재연동:**
   - Vercel 대시보드 → 프로젝트 → Settings → Git
   - GitHub 저장소 재연결

3. **수동 배포:**
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel --prod
```

## 자동 연동 확인

### 1. GitHub Actions 확인
- GitHub 저장소: https://github.com/mlbooks001/ybm
- Actions 탭에서 워크플로우 실행 확인

### 2. Vercel 배포 확인
- Vercel 대시보드: https://vercel.com/dashboard
- Deployments 탭에서 배포 상태 확인

### 3. 배포 URL 확인
- 프로덕션: https://ybm-six.vercel.app
- 최신 변경사항이 반영되었는지 확인

## 설정 파일 확인

### GitHub Actions
- `.github/workflows/auto-sync.yml` - Supabase 동기화
- `.github/workflows/vercel-deploy.yml` - Vercel 배포

### Git 설정
- `.git/config` - 원격 저장소 설정
- `git remote -v` - 원격 저장소 확인

## 빠른 명령어

```bash
# 자동 동기화
./git-auto-sync.sh

# Git 상태 확인
git status

# 원격 저장소 확인
git remote -v

# 최근 커밋 확인
git log --oneline -5

# 변경사항 확인
git diff
```

## 완료 확인

✅ GitHub에 푸시 성공
✅ GitHub Actions 실행 확인
✅ Vercel 자동 배포 시작 확인
✅ 배포 URL에서 최신 변경사항 확인

## 추가 도움

문제가 지속되면:
1. `GITHUB_AUTH_GUIDE.md` - 인증 가이드
2. `QUICK_PUSH.md` - 빠른 푸시 가이드
3. `DEPLOY_NOW.md` - 배포 가이드

위 가이드를 참고하세요!
