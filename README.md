# View My Startup Frontend

스타트업 기업 정보를 조회하고, 관심 기업을 비교하며, 모의 투자까지 진행할 수 있는 웹 서비스의 Frontend 프로젝트입니다.  
사용자는 기업의 투자 현황과 재무 정보를 확인하고, 여러 기업을 비교하여 투자 판단을 시뮬레이션할 수 있습니다.

---

## 프로젝트 소개

**View My Startup Frontend**는 사용자가 다양한 스타트업 정보를 직관적으로 확인하고,  
기업 비교 및 모의 투자 기능을 편리하게 사용할 수 있도록 구현한 사용자 인터페이스입니다.

주요 목표는 다음과 같습니다.

- 스타트업 기업 정보 제공 UI 구현
- 관심 기업 비교 기능 제공
- 모의 투자 및 투자 내역 관리 화면 구성
- 선택기업 및 비교 기업 저장 기능
- 투자 랭킹 및 상세 페이지 제공

---

## 주요 기능

### 1. 기업 목록 조회

- 전체 스타트업 리스트 조회
- 기업명 검색 기능
- 정렬 기능 (매출, 투자금, 직원 수 등)
- 페이지네이션 UI 지원

### 2. 기업 상세 페이지

- 기업 상세 정보 조회
- 누적 투자 금액 확인
- 투자 내역 리스트 확인
- 투자 수정 / 삭제 기능

### 3. 기업 비교 기능

- 최대 5개 기업 비교 가능
- 선택한 기업 저장
- 비교 결과 UI 제공

### 4. 관심 기업 (Favorite)

- 관심 기업 추가 / 제거
- 선택된 기업 상태 유지

### 5. 모의 투자 기능

- 투자 금액 입력
- 투자 코멘트 작성
- 비밀번호 검증 후 수정 / 삭제 가능

### 6. 랭킹 시스템

- 누적 투자 금액 기준 기업 순위 제공
- 매출, 고용 인원, 투자 유치 금액 등 다양한 기준으로 정렬 가능
- 기업별 투자 현황을 비교하며 랭킹 확인 가능

---

## 기술 스택

### Frontend

- React
- JavaScript
- CSS Modules
- Custom Hooks
- React Router DOM
- Zustand
- LocalStorage

---

## 프로젝트 구조

    frontend
     ┣ components
     ┃ ┣ Header
     ┃ ┣ Auth
     ┃ ┣ TodoForm
     ┃ ┗ TodoList
     ┣ hooks
     ┃ ┗ useCompanyList
     ┣ pages
     ┃ ┣ CompanyPage
     ┃ ┣ InvestmentList
     ┃ ┗ Result
     ┣ api
     ┃ ┗ company.api.js
     ┣ layouts
     ┃ ┗ Layout.jsx
     ┗ App.jsx

---

## 주요 화면 구성

### Company Page

- 기업 리스트 조회
- 검색 및 정렬 기능
- 기업 비교 선택

### Investment Page

- 투자 내역 조회
- 투자 등록 / 수정 / 삭제

### Compare Page

- 선택한 기업 비교
- 비교 결과 시각화

---

## 상태 관리 방식

- useState
- useEffect
- Custom Hook (`useCompanyList`)
- `useDebounce`를 활용한 검색 최적화

---

## API 연동 방식

- API 요청은 `services` 폴더에서 관리
- 통일된 Response 구조 처리

  {
  "data": {},
  "meta": {},
  "error": null
  }

---

## 실행 방법

    cd frontend
    npm install
    npm run dev

---

## 프로젝트 회고

이번 Frontend 프로젝트를 통해

- React 컴포넌트 설계
- 상태 관리 최적화
- Custom Hook 활용
- 사용자 중심 UI/UX 설계
- API 연동 및 데이터 흐름 관리

를 경험할 수 있었습니다.

특히  
“실제 서비스처럼 동작하는 사용자 경험 설계”와  
“재사용 가능한 컴포넌트 구조 설계”에 대해 깊이 이해할 수 있었습니다.

---

## GitHub

### Frontend Repository

    GitHub Frontend Repository Link

https://github.com/wkdalswn11/Codeit-FS12-Part2-Team2-View-My-Startup-FE.git

---
