# 🔗 GitHub와 Vercel 연동 가이드

## 현재 상황
- ✅ GitHub 저장소: `mlbooks001/ybm` 생성 완료
- ✅ Vercel 프로젝트 생성 완료
- ⏳ 연동만 하면 됩니다!

## 방법 1: Vercel에서 GitHub 저장소 연결 (가장 쉬움) ⭐

### 1단계: Vercel 프로젝트 설정

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - mlbooks001 계정으로 로그인

2. **프로젝트 찾기**
   - 만든 YBM 프로젝트 클릭
   - 또는 **Add New...** → **Project**

3. **GitHub 저장소 연결**
   - **Import Git Repository** 클릭
   - `mlbooks001/ybm` 저장소 찾기
   - **Import** 클릭

4. **프로젝트 설정**
   ```
   Project Name: ybm (또는 원하는 이름)
   Framework Preset: Other
   Root Directory: ./
   Build Command: (비워두기)
   Output Directory: (비워두기)
   Install Command: (비워두기)
   ```

5. **Deploy 클릭!** 🚀

### 2단계: 자동 배포 설정 확인

배포 완료 후:
- **Settings** → **Git** 탭에서
- **Production Branch**: `main` 확인
- **Automatic deployments from Git**: ✅ 활성화 확인

이제 GitHub에 푸시할 때마다 자동으로 배포됩니다!

## 방법 2: GitHub에 파일 수동 업로드

### 1단계: GitHub 웹사이트에서 파일 업로드

1. **https://github.com/mlbooks001/ybm** 접속
2. **Add file** → **Upload files** 클릭
3. 다음 파일들을 모두 선택하여 업로드:

```
필수 파일:
- index.html
- login.html
- register.html
- admin.html
- styles.css
- admin-styles.css
- auth.js
- admin.js
- supabase-config.js
- supabase-helpers.js
- supabase-init.js
- vercel.json
- .gitignore
- README.md

선택 파일:
- setup.html
- supabase-schema.sql
- SUPABASE_SETUP.md
- admin-info.md
- VERCEL_DEPLOY.md
- GITHUB_VERCEL_LINK.md
```

4. **Commit changes** 클릭

### 2단계: Vercel에서 Import

1. Vercel 대시보드 → **Add New...** → **Project**
2. `mlbooks001/ybm` 선택
3. **Import** → **Deploy**

## 방법 3: Git 인증 설정 후 푸시

### Personal Access Token 생성

1. **GitHub** → **Settings** → **Developer settings**
2. **Personal access tokens** → **Tokens (classic)**
3. **Generate new token** → **Generate new token (classic)**
4. 설정:
   - Note: `YBM-FC`
   - Expiration: 원하는 기간
   - Scopes: `repo` 체크
5. **Generate token** 클릭
6. 토큰 복사 (한번만 보임!)

### 푸시하기

터미널에서:

```bash
cd /Users/central/Desktop/YBM

# GitHub에 푸시
git push -u origin main

# Username: mlbooks001
# Password: (위에서 복사한 Personal Access Token 붙여넣기)
```

## 방법 4: SSH 키 사용 (고급)

### SSH 키 생성 및 등록

```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "mlbooks001@example.com"

# 공개 키 복사
cat ~/.ssh/id_ed25519.pub

# GitHub → Settings → SSH and GPG keys → New SSH key
# 위에서 복사한 키 붙여넣기

# Git remote를 SSH로 변경
cd /Users/central/Desktop/YBM
git remote set-url origin git@github.com:mlbooks001/ybm.git

# 푸시
git push -u origin main
```

## 추천 방법

**가장 쉬운 방법: 방법 1 (Vercel에서 직접 Import)**

1. Vercel 대시보드 접속
2. Add New... → Project
3. `mlbooks001/ybm` 선택
4. Import → Deploy

이렇게 하면 Vercel이 자동으로 GitHub 저장소와 연결하고 배포합니다!

## 연동 완료 확인

연동이 완료되면:

1. **Vercel 대시보드**에서:
   - 프로젝트 → **Settings** → **Git**
   - Connected Git Repository: `mlbooks001/ybm` 확인

2. **GitHub 저장소**에서:
   - Settings → **Webhooks**
   - Vercel webhook이 추가되어 있는지 확인

3. **자동 배포 테스트**:
   - GitHub에서 파일 수정
   - Vercel에서 자동 배포 시작 확인

## 완료! 🎉

이제 GitHub에 푸시하면 Vercel이 자동으로 배포합니다!
