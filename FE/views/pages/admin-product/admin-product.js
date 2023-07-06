const productBtn = document.querySelector("#product-btn");
const listContainer = document.querySelector("#list-container");
const adminTitle = document.querySelector("#admin-title");

//제목 누르면 홈 화면
adminTitle.addEventListener("click", function () {
  location.reload();
});

// 화면 초기화 함수
function initProductPage() {
  listContainer.innerHTML = "";
}

// 상품 관리창 생성 함수
function makeProductList() {
  initProductPage();
  console.log("product");

  const productTable = document.createElement("div");
  // tbody에 데이터 받아서 추가필요
  productTable.innerHTML = `<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">카테고리</th>
      <th scope="col">상품명</th>
      <th scope="col">가격</th>
      <th scope="col">생성일</th>
      <th scope="col">누적판매량</th>
      <th scope="col">판매상태</th>
      <th scope="col">상세내용</th>
      <th scope="col">기타</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="col">침대</td>
      <td>프리미엄 가죽침대</td>
      <td>1,550,000</td>
      <td>2023-07-05</td>
      <td>6</td>
      <td>판매중</td>
      <td>좋은 가죽으로 만든 프리미엄 침대</td>
      <td><button type="button" class="btn btn-dark btn-sm">수정</button>
      <button type="button" class="btn btn-dark btn-sm">삭제</button></td>
    </tr>
  </tbody>
</table>
<div>
  <button type="button" class="btn btn-dark btn-sm">추가</button>
</div>`;
  // 테이블 밑에 상품 추가버튼 필요

  listContainer.appendChild(productTable);
}

// 상품 추가 함수
function addProduct() {}
// 상품 수정 함수
function modifyProduct() {}
// 상품 삭제 함수
function deleteProduct() {}

productBtn.addEventListener("click", makeProductList);
