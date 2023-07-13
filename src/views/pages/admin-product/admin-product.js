// import * as productMockData from "./product-mockdata.js";
import {
  makeAdminNav,
  clickNavbar,
} from "../../components/admin-nav/admin-nav.js";
import * as apiUtil from "../../apiUtil.js";

//admin navbar 생성
makeAdminNav();
clickNavbar();

const listContainer = document.querySelector("#list-container");

// 상품 관리 테이블 생성 함수
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
  // let data = productMockData.data;
  let data = await apiUtil.get("/api/admin/products");
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    const productTableBody = document.createElement("tr");
    let createDate = data[i].createdAt.slice(0, 10);
    // tr에 데이터 받아서 추가 >> tbody에 추가
    productTableBody.innerHTML = `
        <td>${data[i].categoryName}</td>
        <td>${data[i].subcategoryName}</td>
        <td>${data[i].productName}</td>
        <td>${data[i].brand}</td>
        <td>${data[i].price.toLocaleString("en")}원</td>
        <td>${data[i].imageUrl}</td>
        <td>${createDate}</td>
        <td>${data[i].soldQuantity}</td>
        <td>${data[i].saleStatus}</td>
        <td>${data[i].description}</td>
        <td>
          <button id="${
            data[i]._id
          }"type="button" class="btn btn-dark btn-sm mod-product-btn mb-1" data-bs-toggle="modal" data-bs-target="#modProductModal">
          수정
          </button>
          <button id="${
            data[i]._id
          }" type="button" class="btn btn-dark btn-sm del-product-btn">삭제</button>
        </td>
        `;

    // 기존의 tbody 태그 안에 tr 생성
    const tableBody = document.querySelector("#tbody");
    tableBody.appendChild(productTableBody);
  }
  // 추가 버튼 작동 함수
  addProduct();
  // 수정 버튼 작동 함수
  modifyProduct();
  // 삭제 버튼 작동 함수
  deleteProduct();
};

// 상품 추가 함수
function addProduct() {
  const submitBtn = document.querySelector("#submitBtn");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    // input value 변수 정의
    const categoryName = document.querySelector("#addCategoryName").value;
    const subcategoryName = document.querySelector("#addSubcategoryName").value;
    const productName = document.querySelector("#addProductName").value;
    const brandName = document.querySelector("#addBrand").value;
    const price = document.querySelector("#addPrice").value;
    const imageFile = document.querySelector("#addImageUrl").files[0];
    const description = document.querySelector("#addDescription").value;

    //FormData 생성
    const formData = new FormData();

    //modal input data를 formData에 추가
    formData.append("categoryName", categoryName);
    formData.append("subcategoryName", subcategoryName);
    formData.append("productName", productName);
    formData.append("brand", brandName);
    formData.append("price", price);
    formData.append("image", imageFile);
    formData.append("description", description);

    // 모달 formData 확인
    console.log(Array.from(formData.values()));
    // 정보 post
    const result = await apiUtil.adminPost(
      "/api/admin/products",
      formData,
      true
    );
    console.log(result);
    // 새로고침
    location.reload();
  });
}

// 상품 수정 함수
function modifyProduct() {
  const modProductBtns = document.querySelectorAll(".mod-product-btn");
  const submitModalBtn = document.querySelector("#submit-mod-product-btn");

  // 상품 수정 list 존재 확인
  if (modProductBtns && Array.from(modProductBtns).length) {
    modProductBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        console.log("modProductBtn clicked");
        // 모달 제출버튼 event
        submitModalBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          // input value 변수 정의
          const categoryName = document.querySelector("#modCategoryName").value;
          const subcategoryName = document.querySelector(
            "#modSubcategoryName"
          ).value;
          const productName = document.querySelector("#modProductName").value;
          const brandName = document.querySelector("#modBrand").value;
          const price = document.querySelector("#modPrice").value;
          const imageFile = document.querySelector("#modImageUrl").files[0];
          const saleStatus = document.querySelector("#modSaleStatus").value;
          const description = document.querySelector("#modDescription").value;

          //FormData 생성
          const formData = new FormData();

          //modal input data를 formData에 추가
          formData.append("categoryName", categoryName);
          formData.append("subcategoryName", subcategoryName);
          formData.append("productName", productName);
          formData.append("brand", brandName);
          formData.append("price", price);
          formData.append("image", imageFile);
          formData.append("saleStatus", saleStatus);
          formData.append("description", description);

          // 모달 formData 확인
          console.log(Array.from(formData.values()));
          // 정보 post
          const result = await apiUtil.adminPatch(
            "/api/admin/products",
            btn.id,
            formData,
            true
          );
          console.log(result);
          location.reload();
        });
      })
    );
  }
}

// 상품 삭제 함수
function deleteProduct() {
  const delProductBtn = document.querySelectorAll(".del-product-btn");
  if (delProductBtn && Array.from(delProductBtn).length) {
    delProductBtn.forEach((btn) =>
      btn.addEventListener("click", async () => {
        let confirmRes = confirm("정말로 삭제하시겠습니까?");
        // confirm 응답이 true인 경우 삭제 api 실행
        if (confirmRes === true) {
          // 삭제 함수 실행
          await apiUtil.delete("/api/admin/products", btn.id);
          // 삭제 후 새로고침으로 삭제확인
          location.reload();
        }
      })
    );
  }
}

window.onload = makeProductList();
