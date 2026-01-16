# ✅ YBM FC 배포 완료 체크리스트

## 🎉 배포 완료!

GitHub와 Vercel 연동이 완료되었습니다! 🚀

## 📋 확인 사항

### 1. 배포 URL 확인
- Vercel 대시보드에서 배포된 URL 확인
- 예: `https://ybm.vercel.app` 또는 `https://ybm-mlbooks001.vercel.app`

### 2. 메인 페이지 확인
- [ ] 메인 페이지 접속 확인
- [ ] 뉴스 섹션 표시 확인
- [ ] 모든 메뉴 작동 확인

### 3. 로그인 기능 확인
- [ ] 로그인 페이지 접속 (`/login.html`)
- [ ] 관리자 계정 로그인 테스트
  - 아이디: `admin`
  - 비밀번호: `admin123`
- [ ] 로그인 후 관리자 페이지 버튼 표시 확인

### 4. 관리자 페이지 확인
- [ ] 관리자 페이지 접속 (`/admin.html`)
- [ ] 대시보드 표시 확인
- [ ] 모든 관리 기능 작동 확인

### 5. Supabase 연동 확인
- [ ] F12 → Console에서 Supabase 클라이언트 초기화 확인
- [ ] `setup.html` 페이지에서 설정 확인
- [ ] 뉴스가 Supabase에서 로드되는지 확인

### 6. 자동 배포 확인
- [ ] GitHub에 푸시 테스트
- [ ] Vercel 자동 배포 트리거 확인

## 🔗 주요 링크

### 프로덕션
- 메인 페이지: `https://ybm.vercel.app/`
- 로그인: `https://ybm.vercel.app/login.html`
- 회원가입: `https://ybm.vercel.app/register.html`
- 관리자: `https://ybm.vercel.app/admin.html`
- 설정 페이지: `https://ybm.vercel.app/setup.html`

### 저장소
- GitHub: `https://github.com/mlbooks001/ybm`
- Vercel: `https://vercel.com/mlbooks001/ybm`

### Supabase
- 프로젝트 URL: `https://lhpiiakbbwmuiuoyksmz.supabase.co`
- 대시보드: `https://supabase.com/dashboard`

## 🎯 관리자 계정 정보

```
아이디: admin
비밀번호: admin123
```

## 📝 다음 단계 (선택사항)

### 커스텀 도메인 연결
1. Vercel 프로젝트 → Settings → Domains
2. 원하는 도메인 입력 (예: ybmfc.com)
3. DNS 설정 안내 따라하기

### Supabase 설정 완료
1. `setup.html` 페이지 접속
2. SQL 스키마 실행 (1단계)
3. Storage Bucket 생성 (2단계)
4. 초기 데이터 생성 (3단계)
5. 설정 확인 (4단계)

### 환경 변수 설정 (필요시)
- Vercel 프로젝트 → Settings → Environment Variables
- Supabase URL과 API Key 설정 (현재는 코드에 포함됨)

## ✅ 완료!

모든 설정이 완료되었습니다! 이제 YBM FC 홈페이지가 인터넷에서 접속 가능합니다! 🎉

궁금한 점이나 문제가 있으면 언제든지 알려주세요!
