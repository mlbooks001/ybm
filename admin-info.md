# 🔑 관리자 계정 정보

## 관리자 로그인 정보

```
아이디: admin
비밀번호: admin123
```

## 로그인 방법

1. 메인 페이지에서 **로그인** 클릭
2. 또는 `login.html` 직접 접속
3. 위 정보로 로그인
4. 로그인 후 **관리자 페이지** 버튼 클릭

## 문제 해결

만약 로그인이 안 된다면:

### 방법 1: LocalStorage 초기화 (F12 Console)

```javascript
// 브라우저 개발자 도구 (F12) → Console에서 실행

// 1. 기존 사용자 삭제
localStorage.removeItem('ybmfc_users');

// 2. 관리자 계정 생성
const users = [{
    name: '관리자',
    username: 'admin',
    email: 'admin@ybmfc.com',
    password: 'admin123',
    registeredDate: new Date().toISOString()
}];
localStorage.setItem('ybmfc_users', JSON.stringify(users));

// 3. 확인
console.log('관리자 계정 생성 완료!');
console.log('아이디: admin');
console.log('비밀번호: admin123');
```

### 방법 2: login.html 열기

`login.html` 페이지를 열면 자동으로 관리자 계정이 생성됩니다.

### 방법 3: 관리자 페이지 직접 접속

`admin.html` 페이지를 열면 자동으로 관리자 계정이 생성됩니다.

## 주의사항

- 관리자 비밀번호는 **admin123**입니다
- 비밀번호를 변경하려면 관리자 페이지에서 회원 정보를 수정하세요
- Supabase를 사용하는 경우 Supabase 데이터베이스에도 동일한 계정이 생성됩니다
