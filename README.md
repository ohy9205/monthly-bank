# :money_with_wings: 월간 가계부 프로젝트

월별로 지출, 수입 내역을 기록할 수 있는 가계부 애플리케이션입니다.  
Rect기초 공부 후 실습삼아 만든 미니 프로젝트입니다.

> https://ohy9205.github.io/monthly-bank/

## 기능

- [x] 월단위로 내역을 조회
- [x] 월단위로 전체 자산내역 조회
- [x] 조회할 월을 변경
- [x] 해당 월의 자산 금액을 통합해서 조회
- [x] 내역을 추가/수정/삭제
- [x] 내역을 타입(수입/지출)별로 필터링
- [x] 모달창 on/off

## 사용

```js
npm install

npm run start
```

## 프로젝트 구조

```
📦src
 ┣ 📂components
 ┃ ┣ 📜Add.js
 ┃ ┣ 📜ControlMenu.js
 ┃ ┣ 📜DayItem.js
 ┃ ┣ 📜Header.js
 ┃ ┗ 📜List.js
 ┣ 📂store
 ┃ ┣ 📜item-context.js
 ┃ ┗ 📜ItemProvider.js
 ┣ 📂UI
 ┃ ┣ 📜Button.js
 ┃ ┗ 📜Input.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜index.css
 ┗ 📜index.js
```

- components : 컴포넌트 모음
- store : 애플리케이션 공통 데이터 모음
- UI : 공통으로 쓰이는 UI요소 컴포넌트 모음

## 내역 조회

![가계부2_gif.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a87a253a-83e9-4462-a822-dfb67ed79e31/%EA%B0%80%EA%B3%84%EB%B6%802_gif.gif)

- `localstorage` 에 저장된 전체 내역 리스트 중 해당 월에 해당하는 데이터만 필터링해서 조회합니다.
- 내역을 수입/지출별로 필터링해서 조회할 수 있습니다.
- 필터 type값을 구분하기 위해 각 `button` 요소에 `data-set` 을 추가했습니다.

## 내역 추가, 수정, 삭제

![가계부_gif.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6b7a007-7555-4147-91c1-0a70989e5b05/%EA%B0%80%EA%B3%84%EB%B6%80_gif.gif)

- 내역을 추가, 수정, 삭제하면 브라우저의 `localstorage` 에 업데이트됩니다.
- 추가, 수정 작업은 동일한 `Add` 컴포넌트에서 이루어지되, props로 전달받은 `targetId`의 유무에 따라 서로 다른 작업을 수행합니다.
