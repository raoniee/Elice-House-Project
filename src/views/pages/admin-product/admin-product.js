import * as dummyData from "./product-mockdata.js";

const listContainer = document.querySelector("#list-container");
const adminTitle = document.querySelector("#admin-title");

// 메인 페이지 이동
adminTitle.addEventListener("click", function () {
  location.href = "/admin/main";
});

//db에서 임시 fetch >>> 추후 api.js 사용예정
async function getProductData() {
  let productData = await fetch("/api/admin/products").then((res) =>
    res.json()
  );

  return productData;
}

// 상품 관리창 생성 함수
const makeProductList = async () => {
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
    <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#addProductModal">
      추가
    </button>
  </div>`;

  // 데이터 정의
  // let data = dummyData.data;
  let data = await getProductData();
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    const productTableBody = document.createElement("tr");
    let createDate = data[i].createdAt.slice(0, 10);
    // tr에 데이터 받아서 추가 >> tbody에 추가
    productTableBody.innerHTML = `
        <td>${data[i].categoryName}</td>
        <td>${data[i].subCategoryName}</td>
        <td>${data[i].name}</td>
        <td>${data[i].brand}</td>
        <td>${data[i].price.toLocaleString("en")}원</td>
        <td>${data[i].imageUrl}</td>
        <td>${createDate}</td>
        <td>${data[i].soldQuantity}</td>
        <td>${data[i].saleState}</td>
        <td>${data[i].description}</td>
        <td>
          <button type="button" class="btn btn-dark btn-sm mod-product-btn" data-bs-toggle="modal" data-bs-target="#modProductModal">
          수정
          </button>
          <button type="button" class="btn btn-dark btn-sm del-product-btn">삭제</button>
        </td>
        `;

    // 기존의 tbody 태그 안에 tr 생성
    const tableBody = document.querySelector("#tbody");
    tableBody.appendChild(productTableBody);
  }

  //수정 버튼 작동 함수
  modifyProduct();
  //삭제 버튼 작동 함수
  deleteProduct();
};

// 상품 추가 함수
function addProduct() {}

// 상품 수정 함수
function modifyProduct() {
  const modProductBtn = document.querySelectorAll(".mod-product-btn");
  if (modProductBtn && Array.from(modProductBtn).length) {
    modProductBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        console.log("modProductBtn clicked");
      })
    );
  }
}
// 상품 삭제 함수
function deleteProduct() {
  const delProductBtn = document.querySelectorAll(".del-product-btn");
  if (delProductBtn && Array.from(delProductBtn).length) {
    delProductBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        confirm("정말로 삭제하시겠습니까?");
      })
    );
  }
}

// navbar 메뉴 클릭시 이동 함수 >>> 추후 component 이동 예정
function clickNavbar() {
  const orderBtn = document.querySelector("#order-btn");
  const productBtn = document.querySelector("#product-btn");
  const categoryBtn = document.querySelector("#category-btn");

  orderBtn.addEventListener("click", function () {
    location.href = "/admin/order";
  });

  productBtn.addEventListener("click", function () {
    location.href = "/admin/product";
  });

  categoryBtn.addEventListener("click", function () {
    location.href = "/admin/category";
  });
}
// navbar 함수 실행
clickNavbar();

window.onload = makeProductList();
