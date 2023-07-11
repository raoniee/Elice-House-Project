// import * as productMockData from "./product-mockdata.js";
import {
  makeAdminNav,
  clickNavbar,
} from "../../components/admin-nav/admin-nav.js";
//admin navbar 생성
makeAdminNav();
clickNavbar();

const listContainer = document.querySelector("#list-container");

//db에서 임시 fetch >>> 추후 api.js 사용예정
async function getProductData() {
  let productData = await fetch("/api/admin/products").then((res) =>
    res.json()
  );

  return productData;
}

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
  let data = await getProductData();
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    const productTableBody = document.createElement("tr");
    let createDate = data[i].createdAt.slice(0, 10);
    // tr에 데이터 받아서 추가 >> tbody에 추가
    productTableBody.innerHTML = `
        <td>${data[i].categoryName}</td>
        <td>${data[i].subCategoryName}</td>
        <td>${data[i].productName}</td>
        <td>${data[i].brand}</td>
        <td>${data[i].price.toLocaleString("en")}원</td>
        <td>${data[i].imageUrl}</td>
        <td>${createDate}</td>
        <td>${data[i].soldQuantity}</td>
        <td>${data[i].saleStatus}</td>
        <td>${data[i].description}</td>
        <td>
          <button type="button" class="btn btn-dark btn-sm mod-product-btn" data-bs-toggle="modal" data-bs-target="#modProductModal">
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
  //모달 데이터 담을 object
  const modalInputData = {};
  submitBtn.addEventListener("click", () => {
    // 모달 submit 클릭 확인
    console.log("submit clicked");
  });
}

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
// Api.del 임시구현 (추후 삭제 예정)
async function del(endpoint, params = "", data = {}) {
  const apiUrl = `${endpoint}/${params}`;
  const bodyData = JSON.stringify(data);

  console.log(`DELETE 요청 ${apiUrl}`);
  console.log(`DELETE 요청 데이터: ${bodyData}`);

  const res = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: bodyData,
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
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
          await del("/api/admin/products", btn.id);
          // 삭제 후 새로고침으로 삭제확인
          location.reload();
        }
      })
    );
  }
}

window.onload = makeProductList();
