# 🔧 GitHub 인증 문제 해결 가이드

## 현재 문제

```
remote: Permission to mlbooks001/ybm.git denied to anteate9106.
fatal: unable to access 'https://github.com/mlbooks001/ybm.git/': The requested URL returned error: 403
```

**원인:** `anteate9106` 계정으로 인증을 시도하고 있지만, `mlbooks001` 계정의 저장소에 접근할 수 없습니다.

## 해결 방법

### 방법 1: Personal Access Token 사용 (권장)

1. **GitHub에서 Personal Access Token 생성:**
   - GitHub 웹사이트 접속
   - 오른쪽 상단 프로필 클릭 → Settings
   - 왼쪽 메뉴에서 Developer settings 클릭
   - Personal access tokens → Tokens (classic) 클릭
   - Generate new token (classic) 클릭
   - Note: "YBM 프로젝트" 입력
   - Expiration: 원하는 기간 선택
   - Select scopes: `repo` 체크 (전체 저장소 접근)
   - Generate token 클릭
   - **토큰을 복사해두세요! (다시 볼 수 없습니다)**

2. **토큰으로 원격 저장소 URL 변경:**
```bash
cd /Users/central/Desktop/YBM

# YOUR_TOKEN을 위에서 복사한 토큰으로 변경
git remote set-url origin https://mlbooks001:YOUR_TOKEN@github.com/mlbooks001/ybm.git

# 푸시 테스트
git push origin main
```

### 방법 2: Git Credential 완전 초기화

```bash
cd /Users/central/Desktop/YBM

# 1. 기존 인증 정보 삭제
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase

# 2. 원격 저장소 URL 확인
git remote -v

# 3. 푸시 (새 인증 정보 입력 요청)
git push origin main

# 사용자명: mlbooks001
# 비밀번호: Personal Access Token 입력
```

### 방법 3: SSH 키 사용 (장기적으로 가장 안전)

```bash
cd /Users/central/Desktop/YBM

# 1. SSH 키 생성 (이미 있다면 건너뛰기)
ssh-keygen -t ed25519 -C "mlbooks001@github.com"
# Enter로 기본 경로 선택
# 비밀번호 입력 (선택사항)

# 2. 공개 키 복사
cat ~/.ssh/id_ed25519.pub

# 3. GitHub에 SSH 키 추가
# GitHub → Settings → SSH and GPG keys → New SSH key
# Title: "MacBook Air"
# Key: 위에서 복사한 공개 키 붙여넣기
# Add SSH key 클릭

# 4. 원격 저장소 URL을 SSH로 변경
git remote set-url origin git@github.com:mlbooks001/ybm.git

# 5. 푸시 테스트
git push origin main
```

### 방법 4: GitHub CLI 사용

```bash
# GitHub CLI 설치 (Homebrew 사용)
brew install gh

# GitHub 로그인
gh auth login

# 저장소 확인
gh repo view mlbooks001/ybm

# 푸시
git push origin main
```

## 빠른 해결 (가장 간단)

```bash
cd /Users/central/Desktop/YBM

# 1. 기존 인증 정보 삭제
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase

# 2. Personal Access Token 생성 후:
#    (YOUR_TOKEN을 실제 토큰으로 변경)
git remote set-url origin https://mlbooks001:YOUR_TOKEN@github.com/mlbooks001/ybm.git

# 3. 푸시
git push origin main
```

## 확인 방법

```bash
# 원격 저장소 URL 확인
git remote -v

# 인증 테스트
git push origin main
```

## 문제가 지속될 경우

1. **Keychain Access 앱에서 수동 삭제:**
   - macOS Spotlight에서 "Keychain Access" 검색
   - "github.com" 검색
   - 관련 항목 삭제
   - 터미널에서 다시 `git push` 실행

2. **Git 설정 확인:**
```bash
git config --global user.name
git config --global user.email
git config --global credential.helper
```

3. **원격 저장소 재설정:**
```bash
git remote remove origin
git remote add origin https://github.com/mlbooks001/ybm.git
```

## 완료 확인

푸시 성공 시:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Writing objects: 100% (X/X), X bytes | X bytes/s, done.
Total X (delta X), reused X (delta X)
To https://github.com/mlbooks001/ybm.git
   xxxxxxx..xxxxxxx  main -> main
```

## 추가 도움

- GitHub Personal Access Token: https://github.com/settings/tokens
- SSH 키 설정: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- GitHub CLI: https://cli.github.com/
