# 🚀 Vercel 배포 가이드

## 배포 방법

### 방법 1: Vercel 웹사이트에서 배포 (추천) ⭐

1. **Vercel 접속**
   - https://vercel.com 접속
   - **mlbooks001** GitHub 계정으로 로그인

2. **프로젝트 가져오기**
   - 대시보드에서 **Add New...** 클릭
   - **Project** 선택
   - **Import Git Repository** 탭에서
   - `mlbooks001/YBM-FC` 저장소 찾기
   - **Import** 클릭

3. **프로젝트 설정**
   ```
   Project Name: ybm-fc (또는 원하는 이름)
   Framework Preset: Other
   Root Directory: ./
   Build Command: (비워두기)
   Output Directory: (비워두기)
   Install Command: (비워두기)
   ```

4. **환경 변수** (현재는 불필요)
   - Skip 하고 다음으로

5. **Deploy 클릭!** 🚀

6. **배포 완료**
   - 약 1-2분 후 완료
   - 자동 생성된 URL로 접속 가능
   - 예: `https://ybm-fc.vercel.app`

### 방법 2: GitHub 저장소 생성 후 자동 배포

#### 1단계: GitHub 저장소 생성

1. **https://github.com/new** 접속
2. 저장소 설정:
   - Repository name: `YBM-FC`
   - Description: `YBM FC 축구팀 홈페이지`
   - Public 선택
   - ⚠️ **README, .gitignore 추가하지 않기** (이미 있음)
3. **Create repository** 클릭

#### 2단계: 로컬 파일 푸시

터미널에서 실행:

```bash
cd /Users/central/Desktop/YBM

# GitHub 저장소 연결
git remote set-url origin https://github.com/mlbooks001/YBM-FC.git

# 모든 파일 푸시
git push -u origin main
```

#### 3단계: Vercel에서 Import

1. Vercel 대시보드 → **Add New...** → **Project**
2. `mlbooks001/YBM-FC` 선택
3. **Import** 클릭
4. **Deploy** 클릭

### 방법 3: Vercel CLI 사용

```bash
# Vercel CLI 설치 (처음 한번만)
npm install -g vercel

# YBM 폴더에서 실행
cd /Users/central/Desktop/YBM

# Vercel 로그인
vercel login

# 배포
vercel

# 질문에 답하기:
# Set up and deploy? Y
# Which scope? mlbooks001 (또는 개인 계정)
# Link to existing project? N
# Project name? ybm-fc
# Directory? ./
# Override settings? N
```

## 배포 완료 후

### 예상 URL

```
프로덕션: https://ybm-fc.vercel.app
또는: https://ybm-fc-mlbooks001.vercel.app
```

### 자동 배포 설정

- GitHub에 푸시할 때마다 자동 배포
- PR(Pull Request)마다 미리보기 생성
- 롤백 기능 (이전 버전으로 복구)

### 커스텀 도메인 (선택사항)

1. Vercel 프로젝트 → **Settings** → **Domains**
2. 원하는 도메인 입력 (예: ybmfc.com)
3. DNS 설정 안내 따라하기

## 문제 해결

### 배포 실패 시

1. **로그 확인**
   - Vercel 대시보드 → **Deployments** → 실패한 배포 클릭
   - **Logs** 탭에서 에러 확인

2. **빌드 설정 확인**
   - Settings → General → Build & Development Settings
   - Framework Preset: **Other**
   - Build Command: 비워두기

3. **파일 확인**
   - `vercel.json` 파일이 있는지 확인
   - 모든 HTML, CSS, JS 파일이 있는지 확인

## 체크리스트

- [ ] GitHub 저장소 생성
- [ ] 로컬 파일 푸시
- [ ] Vercel 프로젝트 Import
- [ ] Deploy 클릭
- [ ] 배포 완료 확인
- [ ] URL로 접속 테스트

## 완료!

배포가 완료되면 Vercel에서 제공하는 URL로 접속할 수 있습니다! 🎉
