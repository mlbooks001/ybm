# 🔐 GitHub 인증 설정 가이드

## 현재 상황
- ✅ 원격 저장소: `mlbooks001/ybm`
- ❌ 인증 오류: 이전 계정(anteate9106)으로 인증되어 있음

## 해결 방법

### 방법 1: Personal Access Token 사용 (권장)

1. **GitHub에서 Personal Access Token 생성**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - "Generate new token (classic)" 클릭
   - Note: "YBM Project"
   - Expiration: 원하는 기간 선택
   - Scopes: `repo` 체크
   - "Generate token" 클릭
   - **토큰을 복사해두세요!** (다시 볼 수 없습니다)

2. **터미널에서 푸시**
   ```bash
   cd /Users/central/Desktop/YBM
   git push origin main
   ```
   - Username: `mlbooks001`
   - Password: **복사한 Personal Access Token** (비밀번호가 아님!)

### 방법 2: SSH 키 사용

1. **SSH 키 생성 (이미 있다면 건너뛰기)**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **SSH 키를 GitHub에 추가**
   - `~/.ssh/id_ed25519.pub` 파일 내용 복사
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - 키 붙여넣기

3. **원격 저장소 URL을 SSH로 변경**
   ```bash
   cd /Users/central/Desktop/YBM
   git remote set-url origin git@github.com:mlbooks001/ybm.git
   git push origin main
   ```

### 방법 3: GitHub CLI 사용

1. **GitHub CLI 설치**
   ```bash
   brew install gh
   ```

2. **로그인**
   ```bash
   gh auth login
   ```

3. **푸시**
   ```bash
   cd /Users/central/Desktop/YBM
   git push origin main
   ```

## ✅ 빠른 해결 (가장 쉬운 방법)

터미널에서 다음 명령어를 실행하세요:

```bash
cd /Users/central/Desktop/YBM

# Personal Access Token을 사용하여 푸시
git push https://mlbooks001:YOUR_TOKEN@github.com/mlbooks001/ybm.git main
```

`YOUR_TOKEN` 부분을 GitHub Personal Access Token으로 교체하세요.

## 📋 확인 사항

푸시 후:
1. GitHub 저장소 확인: https://github.com/mlbooks001/ybm
2. Vercel 자동 배포 확인: https://ybm-six.vercel.app
3. 배포 완료까지 약 1-2분 소요

## 🎯 완료 후

인증이 완료되면 다음부터는:
```bash
git add .
git commit -m "변경사항"
git push origin main
```

이렇게 간단하게 푸시할 수 있습니다!
