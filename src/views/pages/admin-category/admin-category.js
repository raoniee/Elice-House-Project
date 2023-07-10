// import * as catMockData from "./category-mockdata.js";

const listContainer = document.querySelector("#list-container");
const adminTitle = document.querySelector("#admin-title");

// 메인 페이지 이동
adminTitle.addEventListener("click", function () {
  location.href = "/admin/main";
});

//db에서 임시 fetch >>> 추후 api.js 사용예정
async function getCategoryData() {
  let tempdata = await fetch("/api/admin/categories").then((res) => res.json());

  return tempdata;
}

// 카테고리 관리창 생성 함수
async function makeCategoryList() {
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
    <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
    추가
  </button>
  </div>
  `;

  // 데이터 정의
  let categoryObj = await getCategoryData();
  let data = categoryObj.AllCategory;
  console.log(data);
  // mockData
  // const data = catMockData.data;

  for (let i = 0; i < data.length; i++) {
    const categoryTableBody = document.createElement("tr");
    // tr에 데이터 받아서 추가
    categoryTableBody.innerHTML = `
    <td>${data[i].categoryName}</td>
    <td>${data[i].subcategoryName}</td>
    <td>${data[i].productQauntity}</td>
    <td>
    <button type="button" class="btn btn-dark btn-sm mod-category-btn" data-bs-toggle="modal" data-bs-target="#modCategoryModal">
    수정
    </button>
    <button type="button" class="btn btn-dark btn-sm del-category-btn">삭제</button>
    </td>
    `;

    const temp = document.querySelector("#tBody");
    temp.appendChild(categoryTableBody);
  }

  //수정 버튼 작동 함수
  modifyCategory();
  //삭제 버튼 작동 함수
  deleteCategory();
}

// 추가 버튼 함수
function addCategory() {
  // const addCategoryBtn = document.querySelector("#add-category");
}

// 삭제 버튼 함수
function deleteCategory() {
  const delCategoryBtn = document.querySelectorAll(".del-category-btn");
  if (delCategoryBtn && Array.from(delCategoryBtn).length) {
    delCategoryBtn.forEach((btn) =>
      btn.addEventListener("click", () => confirm("정말로 삭제하시겠습니까?"))
    );
    // confirm >> true/false 받아서 작업필요
    // 추후 데이터 삭제 관련 로직 필요
  }
}

// 수정 버튼 함수
function modifyCategory() {
  const modCategoryBtn = document.querySelectorAll(".mod-category-btn");
  if (modCategoryBtn && Array.from(modCategoryBtn).length) {
    modCategoryBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        console.log("modCategoryBtn clicked");
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

window.onload = makeCategoryList();
