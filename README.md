<img width="1079" alt="find-animal-crossing-origin" src="https://user-images.githubusercontent.com/117163085/231338410-33ef16cc-0f34-4885-b288-beca233ee0c5.png">

# 찾아봐요, 동물의 숲

나와 닮은 '모여봐요 동물의 숲' 주민 캐릭터 찾기

<br/>

## 💻 프로젝트 소개

**'모여봐요 동물의 숲' 게임의 주민 캐릭터 중 나와 닮은 주민은 누가 있을까?**

**'찾기'** 탭에서 성별, 성격, 닮은 동물을 선택하여 나와 이미지가 비슷한 주민 캐릭터나, 좋아하는 색상, 스타일, 취미를 선택하여 취향이 비슷한 주민 캐릭터, 그리고 생일을 입력하여 나와 생일이 같은 주민을 찾아 볼 수 있습니다.

찾기 결과로 나온 주민에는 랭크가 추가되어 **'랭킹'** 탭에서 나와 닮은, 취향이 비슷한 주민으로 많이 등장한 캐릭터들의 랭킹을 볼 수 있습니다.

**'도감'** 탭에서는 전체 주민의 정보를 확인하고 검색할 수 있습니다. 이 기능은 현재 구현 중입니다.

주민 캐릭터의 데이터베이스는 Firebase의 Firestore에 저장하고 관리했습니다.

---

찾동숲 프로젝트는 현재 **미완성**된 상태이며, **구현 진행 중**에 있습니다.

추후에 추가 될 기능으로는 주민 도감, 주민 즐겨찾기, 결과 공유하기가 있습니다.

<br/>

## ✨ 배포사이트

https://find-animal-crossing.vercel.app/

<br/>

## ⏱ 개발 기간

23년 3월 19일 - (진행중)

<br/>

## ⚙ 기술 스택

<img src="https://img.shields.io/badge/REACT-000000?style=for-the-badge&logo=React&logoColor=61DAFB"> <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/REDUX-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/FIREBASE-000?style=for-the-badge&logo=Firebase&logoColor=#FFCA28"> <img src="https://img.shields.io/badge/EXPRESS-000?style=for-the-badge&logo=Express&logoColor=white"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/STYLEDCOMPONENTS-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GitHub&logoColor=white">

- **`React`** : useEffect, useLayoutEffect, useRef, useState 등 React Hooks을 활용하여 돔을 업데이트하고, 렌더링(리렌더링) 시 필요한 작업을 구현했습니다. **`react-router-dom`** 을 사용하여 여러 페이지로 구성했으며 페이지 이동 및 경로 파악, URL을 통한 값 전달을 위해 useLocation, useNavigate, useParams 등을 활용했습니다.
- **`Typescript`** : 타입을 명시하여 코드 작성 단계에서 버그를 예방하고 변수나 함수 등의 목적을 명확하게 하여 안전한 코드를 작성할 수 있도록 했습니다.
- **`Styled-Components`**, **`HTML5`** : JSX를 사용하는 리액트의 특성을 살려 CSS-in-JS 방식의 styled-components를 사용하여 컴포넌트의 구조, 기능, 디자인을 하나의 파일로 파악할 수 있도록 했습니다.
- **`Redux`** : 재사용되는 상태값을 하나의 컴포넌트에 종속시키지 않고 store로 관리하여 반복되는 props 전달을 피하고 코드의 가독성과 유지보수를 높였습니다. **`Redux-toolkit`** 으로 코드를 간결하게 작성했습니다. **`Redux-persist`** 를 사용하여 새로고침, 페이지 이동 후에도 상태값을 유지하게 만들어 서버 요청 횟수를 줄이고 중복 요청을 방지했습니다.
- **`Firebase`** : 주민 캐릭터의 데이 저장하고 관리하기 위해 Firebase의 Firestore 기능을 사용하여 데이터베이스를 생성했습니다.
- **`Express`** : 클라이언트 측에서 직접적인 데이터 조작 없이 서버를 통해 DB에 접근하기 위해 Node.js의 Express 프레임워크를 사용하여 서버를 구축했습니다.
- **`Axios`** : 서버와의 비동기 통신을 위해 사용했습니다.
- **`React-Icons`** : 버튼, 링크에 필요한 아이콘을 사용했습니다.
- **`Git`**, **`Github`**, **`SourceTree`** : Git을 통해 소스코드를 관리했습니다. 주로 SourceTree를 통해 commit할 파일 또는 라인을 add 하고, CLI로 commit, push 하여 작업했습니다.
- **`Vercel`** : Vercel에 Git Repository를 연동하여 웹사이트를 배포했습니다.

<br/>
  
## 📌 주요 기능

✔ 개발 환경 서버 - [index.js](src/server/index.js)

✔ 배포 서버 - [index.js](https://github.com/InnSeonn/find-animal-crossing-server/blob/main/index.js)

---

### 1. 찾기 - [Search.tsx](src/pages/Search.tsx)

- 나와 닮은 - [Feature.tsx](src/pages/Feature.tsx)
- 취향이 비슷한 - [Favorite.tsx](src/pages/Favorite.tsx)
- 생일이 같은 - [Birthday.tsx](src/pages/Birthday.tsx)

**`클라이언트`**

1. 단계에 따라 옵션 선택 - [Progress.tsx](src/components/Progress.tsx), [ProgressStep](src/components/ProgressStep.tsx), [CheckButton.tsx](src/components/CheckButton.tsx) [RadioButton.tsx](src/components/RadioButton.tsx)
   - **나와 닮은** : 성별, 성격 3가지, 닮은 동물
   - **취향이 비슷한** : 좋아하는 취미 활동, 색상 2가지, 스타일 2가지
   - **생일이 같은** : 월, 일
2. 선택한 옵션을 파라미터로 서버에 요청을 보내고 응답 결과를 화면에 표시
3. 서버 응답을 기다리는 동안 로딩 화면 표시
   - react-spinners 라이브러리를 사용하여 로딩바 구현 - [Loading.tsx](src/components/Loading.tsx)
4. 응답 결과 일치하는 주민이 여럿일 경우 슬라이드로 표시
   - swiper 라이브러리를 사용하여 슬라이드 구현 - [ResultSuccess.tsx](src/components/ResultSuccess.tsx), [SlideItem.tsx](src/components/SlideItem.tsx)
5. 일치하는 주민이 없는 경우 에러 메시지와 함께 실패 화면 표시 - [ResultFail.tsx](src/components/ResultFail.tsx)

**`서버`**

1. 요청에 따라 DB를 조회하여 일치하는 주민 또는 에러 메시지 응답
   - **나와 닮은** : 동물 종류와 일치하는 성별의 주민을 먼저 필터링하고, 성격 우선순위에 따라 가장 일치하는 주민 또는 주민 목록을 응답. 일치하는 성별 또는 성격이 없을 경우 에러 메시지 응답.
   - **취향이 비슷한** : 취미 활동이 일치하는 주민을 먼저 필터링 하고, 색상과 스타일을 비교하여 일치하는 개수에 따라 분류한 뒤 일치하는 개수가 가장 많은 주민 또는 주민 목록을 응답. 일치하는 개수가 없을 경우 에러 메시지 응답.
   - **생일이 같은** : 월, 일이 모두 일치하는 주민 또는 주민 목록을 응답. 일치하는 주민이 없을 경우 에러 메시지 응답.
2. 응답 결과에 해당하는 주민 랭크 1 증가

<br/>

### 2. 랭킹 - [Ranking.tsx](src/pages/Ranking.tsx)

**`클라이언트`**

- 나와 닮은 / 취향이 비슷한 찾기 결과로 많이 등장한 주민 순위 표시 - [RankingItem.tsx](src/components/RankingItem.tsx)
- 서버 응답을 기다리는 동안 로딩바 표시
  - 에러 메시지를 응답 받을 경우, '데이터 부족' 메시지와 함께 '찾기 탭'으로 유도

**`서버`**

- DB의 rank 필드를 내림차순으로 정렬하여 10개까지 가져오고 1~3위까지 구분
  - 동일한 순위에 해당하는 주민이 3개 초과인 경우, 순위 분별력을 위해 해당 순위부터 아래 순위까지 응답 보내지 않음
  - 1위 주민 목록이 3개 초과인 경우, 에러 메시지 응답

<br/>

### 3. 도감 (구현중..)

- 전체 주민의 정보를 확인하고 검색

<br/>

## 🗃️ 상태 관리

- 스토어 - [store.tsx](src/store/store.tsx)
- 프로그레스바 - [progressSlice.ts](src/store/progressSlice.ts)
- 나와 닮은 찾기 옵션 목록 - [featureSlice.ts](src/store/featureSlice.ts)
- 취향이 비슷한 찾기 옵션 목록 - [favoriteSlice.ts](src/store/favoriteSlice.ts)
- 결과 데이터 - [resultSlice.ts](src/store/resultSlice.ts)

<br/>

## 🎨 UI / UX

### UI

- Figma를 사용하여 UI 화면 설계
- '동물의 숲' 이미지를 떠올리게 하는 '초록색'을 메인 컬러로 사용
- 모바일에 최적화하기 위해 하단 앱 바 구현, 세로 스크롤 사용
- 넓은 가로 영역이 불필요하여 콘텐츠를 표시하는 컨테이너의 최대 너비를 576px로 제한하고 이하 사이즈를 반응형으로 구현

### UX

- 사용자가 찾기 진행 상황을 파악할 수 있도록 프로그레스바 구현
- 사용자의 옵션 선택에 도움을 주기 위해 배경색과 체크 아이콘을 활용하여 옵션 버튼의 선택 여부를 표시하고, 여러 개의 옵션을 선택하거나 우선 순위가 있는 경우 선택된 버튼에 해당하는 숫자를 표시
- 서버 요청 후 스피너를 표시하여 사용자에게 로딩중임을 알리고, '일치하는 주민을 찾고 있어요'와 같은 메시지를 함께 표시하여 사용자에게 로딩 이유에 대한 정보를 제공
- 옵션 선택에 의도치 않은 터치가 발생하지 않도록 충분한 사이즈 고려
- 일치하는 결과가 없는 경우, 'tip' 메시지를 표시하여 이유와 다른 방안을 제시하여 '다시하기' 유도

<br/>

https://user-images.githubusercontent.com/117163085/231338425-65dcb5a5-4700-4cc5-845b-dff68d5bf111.mp4
