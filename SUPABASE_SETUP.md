# Supabase 설정 가이드

## 1단계: Supabase 프로젝트 생성

1. https://supabase.com/dashboard 접속
2. New Project 클릭
3. 설정:
   - Name: `ybm-fc`
   - Database Password: 안전한 비밀번호 (저장 필수!)
   - Region: Northeast Asia (Seoul)
4. Create new project 클릭 (2분 소요)

## 2단계: 데이터베이스 테이블 생성

1. Supabase 프로젝트 → SQL Editor
2. `supabase-schema.sql` 파일 내용 전체 복사
3. SQL Editor에 붙여넣기
4. Run 클릭

## 3단계: Storage Bucket 생성

1. Supabase 프로젝트 → Storage
2. Create a new bucket 클릭
3. Name: `news-images`
4. Public bucket: ✅ 체크
5. Create bucket 클릭

## 4단계: API 키 확인

1. Supabase 프로젝트 → Settings → API
2. 다음 정보 복사:
   - Project URL
   - anon public (API Key)

## 5단계: 설정 파일 업데이트

`supabase-config.js` 파일을 열고 다음을 업데이트:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://xxxxx.supabase.co', // 실제 Project URL
    anonKey: 'eyJhbGc...' // 실제 anon public key
};
```

## 6단계: HTML 파일에 Supabase 클라이언트 추가

모든 HTML 파일 (`index.html`, `login.html`, `register.html`, `admin.html`)의 `</head>` 태그 직전에 추가:

```html
<!-- Supabase 클라이언트 -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
```

## 7단계: 코드 마이그레이션

기존 LocalStorage 코드를 Supabase API로 변경합니다.
자동 마이그레이션 스크립트가 제공됩니다.

## 8단계: 테스트

1. 회원가입 테스트
2. 로그인 테스트
3. 관리자 페이지 테스트

## 완료!

이제 YBM FC 홈페이지가 Supabase를 사용합니다.
데이터는 클라우드에 저장되며 어디서나 접속 가능합니다.
