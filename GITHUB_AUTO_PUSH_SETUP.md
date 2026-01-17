# 🚀 GitHub 자동 푸시 설정 가이드

## 설정 완료 내역

### ✅ 자동 푸시 방법

#### 방법 1: Git Hook 사용 (권장) - 커밋 시 자동 푸시

`.git/hooks/post-commit` hook이 설정되어 있어, 커밋할 때마다 자동으로 GitHub에 푸시됩니다.

**사용 방법:**
```bash
cd /Users/central/Desktop/YBM

# 변경사항 스테이징
git add .

# 커밋 (자동으로 푸시됨)
git commit -m "변경사항 설명"
```

#### 방법 2: 자동 푸시 스크립트 사용

변경사항을 감지하고 자동으로 커밋 및 푸시하는 스크립트:

```bash
cd /Users/central/Desktop/YBM

# 자동 푸시 실행
./auto-push.sh
```

#### 방법 3: 파일 변경 감지 및 자동 푸시 (백그라운드 실행)

파일 변경을 감지하고 자동으로 푸시하는 감시 스크립트:

```bash
cd /Users/central/Desktop/YBM

# 파일 변경 감지 시작 (백그라운드 실행)
./watch-and-push.sh
```

이 스크립트는 파일 변경을 감지하면 자동으로:
1. 변경사항 스테이징
2. 커밋 생성
3. GitHub에 푸시
4. Vercel 자동 배포 트리거

## 현재 변경사항 푸시

현재 변경된 파일을 푸시하려면:

```bash
cd /Users/central/Desktop/YBM

# 방법 1: 자동 푸시 스크립트 사용
./auto-push.sh

# 방법 2: 수동 푸시
git add .
git commit -m "업데이트: 메뉴 변경 및 자동 푸시 설정"
git push origin main
```

## 문제 해결

### 문제 1: 푸시 실패 (인증 오류)

**증상:**
```
remote: Permission to mlbooks001/ybm.git denied
```

**해결 방법:**

1. **Personal Access Token 사용:**
```bash
# GitHub에서 Personal Access Token 생성 후:
git remote set-url origin https://mlbooks001:YOUR_TOKEN@github.com/mlbooks001/ybm.git
git push origin main
```

2. **Git Credential 초기화:**
```bash
# macOS Keychain에서 인증 정보 삭제
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase

# 다시 푸시 (새 인증 정보 입력)
git push origin main
```

### 문제 2: Hook이 실행되지 않음

**확인 방법:**
```bash
ls -la .git/hooks/post-commit
chmod +x .git/hooks/post-commit
```

**재설정:**
```bash
chmod +x .git/hooks/post-commit
```

### 문제 3: 파일 감시 스크립트가 작동하지 않음

**macOS:**
```bash
brew install fswatch
chmod +x watch-and-push.sh
./watch-and-push.sh
```

**Linux:**
```bash
sudo apt-get install inotify-tools
chmod +x watch-and-push.sh
./watch-and-push.sh
```

## 자동화 워크플로우

### 권장 워크플로우

1. **일반 사용:** Git Hook 사용 (커밋 시 자동 푸시)
   ```bash
   git add .
   git commit -m "변경사항 설명"
   # 자동으로 푸시됨
   ```

2. **지속적 개발:** 파일 감시 스크립트 사용
   ```bash
   ./watch-and-push.sh
   # 백그라운드에서 자동으로 변경사항 감지 및 푸시
   ```

3. **수동 푸시:** 자동 푸시 스크립트 사용
   ```bash
   ./auto-push.sh
   ```

## 확인 방법

### 1. GitHub 확인
- 저장소: https://github.com/mlbooks001/ybm
- 최신 커밋 확인

### 2. Vercel 확인
- 배포 URL: https://ybm-six.vercel.app
- Vercel 대시보드: https://vercel.com/dashboard

### 3. Hook 확인
```bash
cat .git/hooks/post-commit
ls -la .git/hooks/post-commit
```

## 추가 설정

### Vercel 자동 배포

Vercel은 GitHub 푸시 시 자동으로 배포됩니다. 확인:
1. Vercel 대시보드 → 프로젝트 → Settings → Git
2. GitHub 연동 확인

### GitHub Actions

`.github/workflows/` 디렉토리의 워크플로우가 푸시 시 자동으로 실행됩니다.

## 빠른 참조

```bash
# 현재 변경사항 확인
git status

# 자동 푸시
./auto-push.sh

# 파일 감시 시작
./watch-and-push.sh

# 수동 푸시
git add .
git commit -m "메시지"
git push origin main

# Hook 재설정
chmod +x .git/hooks/post-commit
```

## 완료

✅ Git Hook 설정 완료
✅ 자동 푸시 스크립트 생성
✅ 파일 감시 스크립트 생성

이제 변경사항을 커밋하면 자동으로 GitHub에 푸시됩니다!
