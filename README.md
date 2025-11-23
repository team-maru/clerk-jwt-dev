
# 📘 **[Swagger] Clerk JWT 발급 Dev Tool 사용 매뉴얼**

백엔드 API를 Swagger로 테스트하기 위해서는 **Clerk JWT**가 필요합니다.

이를 위해 백엔드 팀에서 제공하는 **로컬 React 기반 JWT 발급 툴**을 사용합니다.

아래 순서대로 따라 하면 누구나 1분 만에 JWT 발급 가능!

---

# 📌 **1. Repository 클론 받기**

GitHub에서 다음 프로젝트를 클론합니다:

```
git clone https://github.com/team-maru/clerk-jwt-dev.git

```

---

# 📌 **2. 설치 (처음 1회만)**

프로젝트 폴더로 이동:

```
cd clerk-jwt-dev

```

패키지 설치:

```
npm install

```

---

# 📌 **3. 환경변수 (.env) 설정**

루트 경로에 `.env` 파일 생성(카톡방에 올려드렸어요):

```
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXX

```

👉 (셈 참고용) 키는 **Clerk Dashboard → API keys**에서 확인 가능

---

# 📌 **4. 실행**

```
npm start

```

브라우저 자동 실행됨:

[**http://localhost:3000**](http://localhost:3000/)


---

# 📌 **5. Clerk 로그인**

1. 화면에서 **"Sign in"** 클릭

<img width="1487" height="785" alt="1" src="https://github.com/user-attachments/assets/c6f86235-ea87-478f-9f86-9016ad5cd9de" />

   
2. 본인 Clerk 계정으로 로그인
    
    회원가입 안 했으면 [**https://welcome-amoeba-62.accounts.dev/sign-up**](https://welcome-amoeba-62.accounts.dev/sign-up) 에서 회원가입하기

<img width="1736" height="1326" alt="2" src="https://github.com/user-attachments/assets/8c179aac-3160-4d45-8e6e-f0535f274091" />



3. 로그인 성공하면 버튼들이 나타남

<img width="1613" height="849" alt="4" src="https://github.com/user-attachments/assets/1bc5c2c0-ddf6-455d-9b39-785f850ec67e" />


---

# 📌 **6. JWT 발급하기**

### 기본 JWT 생성

```
템플릿 JWT 발급

```

버튼 클릭 → 콘솔 및 화면에 JWT 표시됨

### 강제 리프레시(서버로부터 새 JWT)

```
강제 리프레시 발급

```

버튼 클릭

둘 중 아무거나 Swagger 테스트용으로 OK.

---

# 📌 **7. JWT 복사해서 Swagger Authorization에 입력**

Swagger 우측 상단:

```
Authorize → <복사한 JWT> 붙여넣기(Bearer 안 써도 됨) → Close

```

이제 모든 인증 필요한 API 호출 가능.

---

# 📌 **8. 이 도구의 목적**

이 React Dev Tool은:

- 앱 개발 중이라 **웹 프론트 배포가 없는 상태에서**
- **백엔드/QA 팀이 Swagger 테스트를 하기 위한 임시 JWT 발급기**

즉,

프론트 도움 없이 백엔드가 자체적으로 JWT 발급 가능하게 하기 위해 만든 도구.

---


