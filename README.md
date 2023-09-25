## [Team 13] Elice House

### 🤗 팀원 소개

| 팀원명 | 역할     | 담당부분                                                                                                                                                                                         |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 양유진 | 팀장, FE | - 와이어프레임, 스토리보드 제작<br>- 데일리 스크럼 작성<br>- 페이지: register, login<br>- 컴포넌트: header-menu<br>- README 작성                                                                 |
| 김라온 | FE       | - 와이어프레임 피그마<br>- 컴포넌트: footer, header-category, item-card, menu-bar<br>- 페이지: main, order-cart, order-complete, order-complete<br>- 최종발표                                                 |
| 김래희 | FE       | - 컴포넌트: my-nav<br>- 페이지: my-order, my-info                                                                                                                                                |
| 안성빈 | FE       | - 컴포넌트: admin-nav<br>- 페이지: admin-main, admin-order, admin-category, admin-product                                                                                                        |
| 강성관 | BE       | - 카테고리 스키마 및 모델 구현, rest API 설계 및 CRUD 기능 구현<br>- '상품' 제외한 조회(GET) 및 생성(POST) 구현<br>- VM 서버 활용 배포<br>- MongoDB 한국시간대 추가                              |
| 곽수경 | BE       | - 상품 스키마 및 모델 구현, 상품 rest API 설계 및 CRUD 기능 구현<br>- '카테고리' 제외한 업데이트(PATCH) 기능 구현<br>- middleware 구현<br>- jwt 토큰 활용 로그인 인증 구현<br>- multer 기능 구현 |


<br>

### 📡 VM <배포용 IP주소> \_\_ (링크, 테스트 계정 생성 필수)

- 배포용 IP 주소
  [kdt-sw-5-team13.elicecoding.com](http://kdt-sw-5-team13.elicecoding.com/)

- admin 계정
  - ID: admin01@admin.com
  - PW: 1234
- test 계정
  - ID: test00@test00.com
  - PW: 1234


<br>

### 🔎 서비스 소개 및 기능

#### 🏡 프로젝트 서비스 소개

모두가 편히 휴식을 취할 수 있는 자신의 공간,
엘리스 하우스는 바쁜 일상 속 그 소중한 공간을
보다 효율적이고 실용적인 공간으로 꾸리는 데에 도움을 드리고자 합니다.

#### 💡 제품 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현합니다.

1. 회원가입, 로그인, 회원정보 수정 및 탈퇴 등 사용자 관련 CRUD를 할 수 있습니다.
2. 카테고리 관련 CRUD, 제품 관련 CRUD, 주문 관련 CRUD할 할 수 있습니다.
3. 장바구니 관련 기능을 프론트 단에서 수행할 수 있습니다.
4. 관리자 페이지가 있습니다.

#### 🎥 데모영상
<details>
<summary>사용자 관련 CRUD</summary>
<div markdown="1">

![](https://velog.velcdn.com/images/raoni/post/ccc425ad-10a2-4c46-9d71-82c28cbef84f/image.gif)


</div>
</details>

<br>

<details>
<summary>장바구니 기능</summary>
<div markdown="1">

![](https://velog.velcdn.com/images/raoni/post/9539f85c-8c4b-4ae8-a415-0ce9d1904c11/image.gif)


</div>
</details>

<br>

<details>
<summary>제품 주문 기능</summary>
<div markdown="1">

![](https://velog.velcdn.com/images/raoni/post/69fc5c35-209a-4eec-8263-a4643ce1ca9b/image.gif)


</div>
</details>

<br>

<details>
<summary>관리자 페이지</summary>
<div markdown="1">

![](https://velog.velcdn.com/images/raoni/post/e0cf17c5-29eb-42f8-8eb6-411fdf8a7e44/image.gif)


</div>
</details>
<br>
<details>
<summary>주문 관리 및 반영</summary>
<div markdown="1">

![](https://velog.velcdn.com/images/raoni/post/72518b9e-68d9-4315-8dde-5c97515e5a87/image.gif)


</div>
</details>

<br>

<details>
<summary>제품 추가 및 반영</summary>
<div markdown="1">

![](https://velog.velcdn.com/images/raoni/post/95bf0d17-c856-42a4-9bfe-7d521e05a920/image.gif)



</div>
</details>

<br>


<details>
<summary>카테고리 추가 및 반영</summary>
<div markdown="1">

![](https://velog.velcdn.com/images/raoni/post/4091d90e-1c2d-4bed-b36b-76bf328e8998/image.gif)



</div>
</details>

#### ⚙️ 페이지 별 화면

|||
|------|---|
|![](https://velog.velcdn.com/images/raoni/post/8782ccbd-c2e2-445d-b4fc-33e2175ddfa7/image.png)|![](https://velog.velcdn.com/images/raoni/post/5daaa7a0-e4b9-4aab-a3aa-c0f971c4ab8b/image.png)|
|메인 페이지 (카테고리별 제품 목록 페이지 이동 링크)|회원가입 화면|
|![](https://velog.velcdn.com/images/raoni/post/60c14cbe-1840-416e-af6b-4672f78f538b/image.png)|![](https://velog.velcdn.com/images/raoni/post/65947ede-3c57-45c8-aeb1-42212aba7c24/image.png)|
|로그인 페이지|카테고리별 제품 목록 페이지 (침대)|
|![](https://velog.velcdn.com/images/raoni/post/881114b4-1489-499c-8833-887d806a7ba2/image.png)|![](https://velog.velcdn.com/images/raoni/post/aab7c05e-a4c9-469c-b9e4-d37257f5617f/image.png)|
|카테고리별 제품 목록 페이지 (옷장)|제품 상세 페이지|
|![](https://velog.velcdn.com/images/raoni/post/2bc31926-d0ab-484d-b0fd-8740eb5090d3/image.png)|![](https://velog.velcdn.com/images/raoni/post/6d799bac-96c1-4bda-a608-a6db7e3d8afb/image.png)|
|장바구니 페이지|주문 페이지|
|![](https://velog.velcdn.com/images/raoni/post/cf663067-b5f1-4e6a-ad12-e91255193360/image.png)|![](https://velog.velcdn.com/images/raoni/post/8a1d0a75-81bd-4b01-a7ad-cb2131ed4796/image.png)|
|주문완료 페이지|주문내역 페이지|
|![](https://velog.velcdn.com/images/raoni/post/69b38fa1-b49b-419b-bad5-766a03b7e244/image.png)|![](https://velog.velcdn.com/images/raoni/post/3223753d-c5a2-484d-94ff-0e871034ba3a/image.png)|
|관리자 관리 페이지|관리자 주문관리 페이지|
|![](https://velog.velcdn.com/images/raoni/post/9e052b24-bd5a-438b-b4b5-b3ce9ebefcaa/image.png)|![](https://velog.velcdn.com/images/raoni/post/a738b7ac-20c8-420d-962f-bb2b70a57fc5/image.png)|
|관리자 상품관리 페이지|관리자 카테고리관리 페이지|
## <br>

#### 🖥️ 기술 스택
![](https://velog.velcdn.com/images/raoni/post/26782e12-d2be-4f62-9ddd-aba9f518a416/image.png)


<br>

### 🚀 트러블 슈팅

**- API 404 에러**

- **문제**<br>라우터, api 파일 작성 등 파일 자체에는 에러가 보이지 않지만, 웹 브라우저에서 확인해보면 `GET httmp://localhost:PORT번호/utils/api 404 (Not Found)` 에러와 함께 api 호출이 정상적으로 이루어지지 않는 문제
- **해결과정**<br>간단하게 요약하면 api파일 경로 문제였습니다.<br>resourcePath 변수에 작성한 파일 경로 기준으로만 접근가능하다는 점과 app.js 파일에서 `app.use("/api", 라우터명)`으로 작성했던 내용에서 api 파일이 필요한 곳에 접근할 수 없는 것이 원인이었습니다. 따라서 1차적으로 "api.js" 파일을 "apiUtils.js"로 파일명을 변경하고, 2차적으로 기준점인 resourcePath에 작성된 파일 경로에 "apiUtils.js" 파일을 이동하여 정상적으로 api 호출이 가능토록 해결하였습니다.
<br>

### 👀 실제 동작 시연 (직접 시연)

### 🙋🏻 What did I do?

- 홈 페이지<br>
 -Depth 2 메뉴바<br>
**→ 이중 for 문 사용**<br>
- 카테고리 페이지<br>
 -Depth 단계 표시<br>
-아이템 정렬<br>
**→ forEach 문 사용**<br>
- 아이템 상세 페이지<br>
-이름, 설명, 장바구니 수량 및 가격 조절 기능<br>
- 장바구니 페이지<br>
-수량 및 가격 조절<br>
-전체 가격 표시<br>
-개별 삭제 및 전체 삭제<br>
**→ 장바구니 Local Storage 이용하여 유무 판단 및 저장 기능**<br>
- 주문 페이지<br>
-이름, 전화번호, 배송지 주소, 배송 메시지 표시 및 유효성 검사<br>
-도로명 주소 설정<br>
-주문 목록 표시<br>
**→ 도로명 주소 Api 추가**<br>
- 주문 완료 페이지<br>
- 재사용 가능한 api 코드 파일<br>
**→ GET, POST, PATCH 로 나눠 작성<br>
→ async, await 으로 작성, throw문으로 에러 받음<br>
→ delete 단어는 자바스크립트의 reserved 단어이기에, 우선 delete 대신 del로 쓰고 export 시에 delete로 alias 함.**<br>

