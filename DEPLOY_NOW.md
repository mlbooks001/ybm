# 🚀 Vercel 배포 가이드

## 현재 상태
- ✅ Vercel 프로젝트 설정 완료 (`vercel.json`)
- ✅ GitHub 저장소: `mlbooks001/ybm`
- ✅ Vercel 자동 배포 활성화

## 배포 방법

### 방법 1: GitHub 푸시로 자동 배포 (권장)

터미널에서 다음 명령어를 실행하세요:

```bash
cd /Users/central/Desktop/YBM

# 변경사항 확인
git status

# 변경사항 추가
git add .

# 커밋
git commit -m "회원 추가 기능 구현 및 개선"

# GitHub에 푸시 (자동 배포 트리거)
git push origin main
```

**푸시 후:**
- ✅ Vercel이 자동으로 배포를 시작합니다
- ✅ 약 1-2분 후 배포 완료
- ✅ 배포 URL: https://ybm-six.vercel.app

### 방법 2: Vercel CLI 사용

```bash
cd /Users/central/Desktop/YBM

# Vercel CLI 설치 (처음 한 번만)
npm install -g vercel

# 배포
vercel --prod
```

## 배포 확인

### 1. Vercel 대시보드
- https://vercel.com/dashboard
- 프로젝트: `ybm` 또는 `ybm-six`
- Deployments 탭에서 배포 상태 확인

### 2. 배포 URL
- 프로덕션: https://ybm-six.vercel.app
- 또는 Vercel에서 제공하는 커스텀 도메인

### 3. 배포된 사이트 확인
- 메인 페이지: https://ybm-six.vercel.app/index.html
- 로그인: https://ybm-six.vercel.app/login.html
- 관리자 페이지: https://ybm-six.vercel.app/admin.html

## 배포된 내용

### 새로운 기능
- ✅ 회원 추가 기능 (관리자 페이지)
- ✅ 회원 추가 폼 (이름, 아이디, 이메일, 비밀번호)
- ✅ 아이디/이메일 중복 확인
- ✅ 입력 검증 강화

### 개선 사항
- ✅ Supabase와 LocalStorage 모두 지원
- ✅ 에러 처리 개선
- ✅ 사용자 경험 개선

## 문제 해결

### 푸시가 안 될 때
```bash
# Git 원격 저장소 확인
git remote -v

# 저장소 URL 재설정 (필요시)
git remote set-url origin https://github.com/mlbooks001/ybm.git

# 다시 푸시
git push origin main
```

### 배포가 안 될 때
1. Vercel 대시보드에서 오류 확인
2. Build Logs 확인
3. 환경 변수 확인 (필요시)

## 완료!

GitHub에 푸시하면 Vercel이 자동으로 배포합니다! 🎉
