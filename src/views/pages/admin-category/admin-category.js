import * as categoryData from "./category-mockdata.js";

const cateygoryBtn = document.querySelector("#category-btn");
const listContainer = document.querySelector("#list-container");
const adminTitle = document.querySelector("#admin-title");
// 모달창
const categoryModalBox = document.querySelector("#modal-container");

// 제목 누르면 홈 화면
adminTitle.addEventListener("click", function () {
  location.href = "../admin-main/admin-main.html";
});

// 카테고리 관리창 생성 함수
function makeCategoryList() {
  // 테이블 상단 만들기
  listContainer.innerHTML = `
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">카테고리</th>
          <th scope="col">서브카테고리</th>
          <th scope="col">상품개수</th>
          <th scope="col">수정/삭제</th>
        </tr>
      </thead>
      <tbody id="tBody">
      </tbody>
    </table>
    <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
    추가
  </button>
  </div>
  `;

  // 데이터 정의
  const data = categoryData.data;

  for (let i = 0; i < data.length; i++) {
    const categoryTableBody = document.createElement("tr");
    // tr에 데이터 받아서 추가
    categoryTableBody.innerHTML = `
    <td>${data[i].categoryName}</td>
    <td>${data[i].subcategoryName}</td>
    <td>${data[i].productQuantity}</td>
    <td>
      <button type="button" class="btn btn-dark btn-sm">수정</button>
      <button type="button" class="btn btn-dark btn-sm">삭제</button>
    </td>
    `;

    const temp = document.querySelector("#tBody");
    temp.appendChild(categoryTableBody);
  }
}

// 추가 버튼 함수
function addCategory() {
  // const addCategoryBtn = document.querySelector("#add-category");
}

// 삭제 버튼 함수
function deleteCategory() {}

// 수정 버튼 함수
function modifyCategory() {}

window.onload = makeCategoryList();
