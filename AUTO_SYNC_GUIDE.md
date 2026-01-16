# 🔄 자동 동기화 가이드

## ✅ 완료된 자동화 설정

### 1. GitHub 자동 배포
- ✅ Vercel과 GitHub 연동 완료
- ✅ GitHub에 푸시하면 자동으로 Vercel 배포
- ✅ GitHub Actions 워크플로우 설정

### 2. Supabase 자동 초기화
- ✅ 페이지 로드 시 Supabase 클라이언트 자동 초기화
- ✅ 관리자 계정 자동 생성
- ✅ 초기 데이터 자동 생성

## 🚀 사용 방법

### GitHub 자동 동기화

#### 방법 1: Git 명령어 (터미널)
```bash
cd /Users/central/Desktop/YBM

# 변경사항 커밋 및 푸시
git add .
git commit -m "변경사항 설명"
git push origin main

# Vercel이 자동으로 배포합니다!
```

#### 방법 2: 자동 동기화 스크립트
```bash
# Node.js가 설치되어 있다면
npm run sync

# 또는 직접 실행
node auto-sync.js "커밋 메시지"
```

### Supabase 자동 동기화

#### 자동 초기화
1. **페이지 로드 시 자동 실행**
   - 모든 페이지에서 `supabase-init.js`가 자동 실행
   - 관리자 계정 자동 생성
   - 초기 데이터 자동 생성

2. **수동 초기화**
   - `setup.html` 페이지 접속
   - "초기 데이터 생성하기" 버튼 클릭

3. **연동 확인**
   - `check-supabase.html` 페이지 접속
   - "전체 확인하기" 버튼 클릭

## 📋 자동화 체크리스트

### GitHub
- [x] Vercel과 GitHub 연동
- [x] 자동 배포 활성화
- [x] GitHub Actions 워크플로우 설정

### Supabase
- [x] Supabase 클라이언트 자동 초기화
- [x] 관리자 계정 자동 생성
- [x] 초기 데이터 자동 생성
- [x] 자동 동기화 스크립트

## 🔧 설정 파일

### GitHub
- `.github/workflows/auto-sync.yml` - GitHub Actions 워크플로우
- `auto-sync.js` - 자동 동기화 스크립트
- `package.json` - npm 스크립트 설정

### Supabase
- `supabase-config.js` - Supabase 설정
- `supabase-helpers.js` - Supabase API 헬퍼
- `supabase-init.js` - 자동 초기화 스크립트

## 🎯 자동화 흐름

### GitHub → Vercel 자동 배포
```
1. 로컬 파일 수정
   ↓
2. git add . && git commit && git push
   ↓
3. GitHub에 푸시 완료
   ↓
4. Vercel이 자동으로 감지
   ↓
5. 자동 배포 시작
   ↓
6. 배포 완료 (약 1-2분)
```

### Supabase 자동 초기화
```
1. 페이지 로드
   ↓
2. supabase-init.js 실행
   ↓
3. Supabase 클라이언트 초기화
   ↓
4. 관리자 계정 확인/생성
   ↓
5. 초기 데이터 확인/생성
   ↓
6. 완료!
```

## 📊 확인 방법

### GitHub 자동 배포 확인
1. Vercel 대시보드 접속
2. Deployments 탭 확인
3. GitHub 푸시 후 자동 배포 시작 확인

### Supabase 자동 초기화 확인
1. F12 → Console 확인
2. 다음 메시지 확인:
   ```
   ✅ Supabase 클라이언트 초기화 완료
   🚀 Supabase 자동 초기화 시작...
   ✅ Supabase 자동 초기화 완료!
   ```

## 🛠️ 문제 해결

### GitHub 푸시가 안 될 때
```bash
# 원격 저장소 확인
git remote -v

# 저장소 재설정
git remote set-url origin https://github.com/mlbooks001/ybm.git

# 강제 푸시 (주의!)
git push -u origin main --force
```

### Supabase 초기화가 안 될 때
1. `check-supabase.html` 페이지 접속
2. "전체 확인하기" 클릭
3. 오류 메시지 확인
4. `setup.html`에서 수동 설정

## ✅ 완료!

이제 GitHub와 Supabase가 자동으로 연동됩니다!

- **GitHub**: 푸시하면 자동 배포
- **Supabase**: 페이지 로드 시 자동 초기화

추가 설정이 필요하면 알려주세요!
