# 🔄 GitHub 자동 연동 가이드

## 현재 상황

Git Hook이 설정되어 있어, `git commit`을 실행하면 자동으로 GitHub에 푸시됩니다.

## 자동 푸시 방법

### 방법 1: 일반 커밋 (자동 푸시)

```bash
cd /Users/central/Desktop/YBM

# 변경사항 추가
git add .

# 커밋 (자동으로 푸시됨!)
git commit -m "변경사항 설명"
```

커밋하면 `.git/hooks/post-commit` Hook이 자동으로 `git push origin main`을 실행합니다.

### 방법 2: 자동 푸시 스크립트

```bash
cd /Users/central/Desktop/YBM

# 모든 변경사항을 자동으로 커밋 및 푸시
./auto-push.sh
```

### 방법 3: 파일 변경 감지 (백그라운드)

```bash
cd /Users/central/Desktop/YBM

# 파일 변경을 감지하여 자동으로 푸시 (백그라운드 실행)
./watch-and-push.sh
```

## 문제 해결

### 문제 1: 푸시 실패 (인증 오류)

**증상:**
```
remote: Permission to mlbooks001/ybm.git denied
fatal: unable to access 'https://github.com/mlbooks001/ybm.git/': The requested URL returned error: 403
```

**해결 방법:**

1. **Personal Access Token 사용:**
```bash
# GitHub에서 Personal Access Token 생성 후:
git remote set-url origin https://mlbooks001:YOUR_TOKEN@github.com/mlbooks001/ybm.git
git push origin main
```

2. **Git Credential 초기화 (macOS):**
```bash
# Keychain에서 인증 정보 삭제
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase

# 다시 푸시 (새 인증 정보 입력)
git push origin main
```

3. **SSH 키 사용:**
```bash
# SSH 키를 GitHub에 추가한 후:
git remote set-url origin git@github.com:mlbooks001/ybm.git
git push origin main
```

### 문제 2: Hook이 실행되지 않음

**확인 방법:**
```bash
# Hook 파일 확인
ls -la .git/hooks/post-commit

# 실행 권한 확인 및 설정
chmod +x .git/hooks/post-commit
```

**Hook 내용 확인:**
```bash
cat .git/hooks/post-commit
```

### 문제 3: 자동 푸시가 작동하지 않음

**원인:**
- Hook은 **커밋 후**에만 실행됩니다
- 파일을 수정만 하고 커밋하지 않으면 자동 푸시되지 않습니다

**해결:**
```bash
# 변경사항 확인
git status

# 변경사항 추가 및 커밋 (자동 푸시됨)
git add .
git commit -m "변경사항 설명"
```

## 빠른 참조

```bash
# 현재 상태 확인
git status

# 변경사항 커밋 및 자동 푸시
git add .
git commit -m "변경사항 설명"

# 수동 푸시 (필요시)
git push origin main

# 자동 푸시 스크립트 실행
./auto-push.sh

# Hook 확인
cat .git/hooks/post-commit
chmod +x .git/hooks/post-commit
```

## 확인 방법

### 1. GitHub 확인
- 저장소: https://github.com/mlbooks001/ybm
- 최신 커밋이 있는지 확인

### 2. Vercel 확인
- 배포 URL: https://ybm-six.vercel.app
- Vercel 대시보드: https://vercel.com/dashboard

### 3. Hook 확인
```bash
# Hook 파일 확인
ls -la .git/hooks/post-commit

# Hook 내용 확인
cat .git/hooks/post-commit

# Hook 실행 권한 확인
chmod +x .git/hooks/post-commit
```

## 완료

✅ Git Hook 설정 완료
✅ 자동 푸시 스크립트 생성
✅ 파일 감시 스크립트 생성

**중요:** 파일을 수정한 후에는 반드시 `git commit`을 실행해야 자동 푸시가 됩니다!
