import * as productData from "./product-mockdata.js";

const productBtn = document.querySelector("#product-btn");
const listContainer = document.querySelector("#list-container");
const adminTitle = document.querySelector("#admin-title");

//제목 누르면 홈 화면
adminTitle.addEventListener("click", function () {
  location.href = "../admin-main/admin-main.html";
});

// 상품 관리창 생성 함수
function makeProductList() {
  // 테이블 상단 만들기
  listContainer.innerHTML = `
  <div id="table-container">
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">카테고리</th>
        <th scope="col">세부카테고리</th>
        <th scope="col">상품명</th>
        <th scope="col">브랜드</th>
        <th scope="col">가격</th>
        <th scope="col">이미지</th>
        <th scope="col">생성일</th>
        <th scope="col">누적판매량</th>
        <th scope="col">판매상태</th>
        <th scope="col">상세내용</th>
        <th scope="col">기타</th>
      </tr>
    </thead>
      <tbody id="tbody">
      </tbody>
  </table>
    <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
      추가
    </button>
  </div>`;

  // 데이터 정의
  let data = productData.data;

  for (let i = 0; i < data.length; i++) {
    const productTableBody = document.createElement("tr");
    // tr에 데이터 받아서 추가 >> tbody에 추가
    productTableBody.innerHTML = `
        <td>${data[i].categoryName}</td>
        <td>${data[i].subCategoryName}</td>
        <td>${data[i].productName}</td>
        <td>${data[i].brandName}</td>
        <td>${data[i].price}</td>
        <td>${data[i].productImage}</td>
        <td>${data[i].createDate}</td>
        <td>${data[i].salesVolume}</td>
        <td>${data[i].saleState}</td>
        <td>${data[i].detail}</td>
        <td>
          <button type="button" class="btn btn-dark btn-sm">수정</button>
          <button type="button" class="btn btn-dark btn-sm">삭제</button>
        </td>
        `;

    // 기존의 tbody 태그 안에 tr 생성
    const temp = document.querySelector("#tbody");
    temp.appendChild(productTableBody);
  }
}

// 상품 추가 함수
function addProduct() {}
// 상품 수정 함수
function modifyProduct() {}
// 상품 삭제 함수
function deleteProduct() {}

window.onload = makeProductList();
