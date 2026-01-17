# ✅ GitHub 연동 설정 완료

## 설정 완료 내역

### ✅ Git 설정
- **원격 저장소**: `https://github.com/mlbooks001/ybm.git`
- **브랜치**: `main`
- **사용자 정보**: `mlbooks001`

### ✅ GitHub Actions 워크플로우
- `.github/workflows/auto-sync.yml` - Supabase 자동 동기화
- `.github/workflows/vercel-deploy.yml` - Vercel 자동 배포

### ✅ 자동 동기화 스크립트
- `git-auto-sync.sh` - GitHub 자동 동기화 스크립트
- `deploy.sh` - 배포 스크립트

### ✅ 설정 파일
- `.gitignore` - Git 무시 파일 목록
- `.git/config` - Git 설정 파일

## 다음 단계

### 1. GitHub에 푸시

터미널에서 다음 명령어를 실행하세요:

```bash
cd /Users/central/Desktop/YBM
git push origin main
```

또는 자동 동기화 스크립트를 사용하세요:

```bash
./git-auto-sync.sh
```

### 2. 인증 문제 해결

만약 인증 오류가 발생하면:

#### 방법 1: Personal Access Token 사용
```bash
# GitHub에서 Personal Access Token 생성 후:
git push https://mlbooks001:YOUR_TOKEN@github.com/mlbooks001/ybm.git main
```

#### 방법 2: Credential 초기화
```bash
# macOS Keychain에서 인증 정보 삭제
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase

# 다시 푸시 (새 인증 정보 입력)
git push origin main
```

#### 방법 3: SSH 키 사용
```bash
# SSH 키 생성 (아직 없다면)
ssh-keygen -t ed25519 -C "mlbooks001@users.noreply.github.com"

# SSH 키를 GitHub에 추가한 후:
git remote set-url origin git@github.com:mlbooks001/ybm.git
git push origin main
```

### 3. GitHub Actions 확인

푸시 후 GitHub에서 확인:
- **저장소**: https://github.com/mlbooks001/ybm
- **Actions 탭**: 워크플로우 실행 확인
- **Settings 탭**: 저장소 설정 확인

### 4. Vercel 자동 배포 확인

- **Vercel 대시보드**: https://vercel.com/dashboard
- **Deployments 탭**: 배포 상태 확인
- **배포 URL**: https://ybm-six.vercel.app

## 자주 사용하는 명령어

```bash
# 상태 확인
git status

# 원격 저장소 확인
git remote -v

# 브랜치 확인
git branch -a

# 변경사항 추가
git add .

# 커밋
git commit -m "변경사항 설명"

# GitHub에 푸시
git push origin main

# 자동 동기화 (권장)
./git-auto-sync.sh
```

## 확인 체크리스트

- [x] Git 설정 완료
- [x] 원격 저장소 연결 확인
- [x] GitHub Actions 워크플로우 설정
- [x] 자동 동기화 스크립트 생성
- [x] .gitignore 파일 설정
- [ ] GitHub에 푸시 완료 (사용자가 직접 실행)
- [ ] GitHub Actions 실행 확인
- [ ] Vercel 자동 배포 확인

## 문제 해결

### 문제 1: 푸시 실패 (403 Forbidden)
→ `GITHUB_AUTH_GUIDE.md` 참고

### 문제 2: GitHub Actions 실행 안됨
→ GitHub 저장소 Settings → Actions → General에서 확인

### 문제 3: Vercel 배포 안됨
→ Vercel 대시보드에서 GitHub 연동 확인

## 추가 도움

- `GITHUB_AUTH_GUIDE.md` - 인증 가이드
- `GITHUB_AUTO_SYNC_FIX.md` - 자동 연동 문제 해결
- `QUICK_PUSH.md` - 빠른 푸시 가이드
- `DEPLOY_NOW.md` - 배포 가이드

## 완료

✅ GitHub 연동 설정이 완료되었습니다!
이제 `git push origin main` 또는 `./git-auto-sync.sh`를 실행하여 푸시하세요.
