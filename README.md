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


## 회고
처음 진행하는 리액트 프로젝트라 어려움도 많았지만 그만큼 리액트에 기초 개념에 대해 감을 잡을 수 있었습니다.   

다만 아직까지는 컴포넌트 분리 기준을 잡는것과 전역에서 관리할 데이터를 선택하는 것이 어려웠는데, 최대한 고민하면서 진행하였지만 추후 개선이 필요해 보입니다.    

git 사용에 익숙하지 않아서 git으로 프로젝트를 관리하는 것을 또다른 목표로 잡았는데 브랜치를 나누고 add commit push merge 등의 명렁어를 사용해보면서 git의 기본개념도 학습할 수 있었습니다.
