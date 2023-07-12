// import * as catMockData from "./category-mockdata.js";
import {
  makeAdminNav,
  clickNavbar,
} from "../../components/admin-nav/admin-nav.js";
import * as apiUtil from "../../apiUtil.js";

//admin navbar 생성
makeAdminNav();
clickNavbar();

const listContainer = document.querySelector("#list-container");

// 카테고리 관리 테이블 생성 함수
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
  const categoryObj = await apiUtil.get("/api/admin/categories");
  let data = categoryObj.AllCategory;
  console.log(data);
  // const data = catMockData.data;

  for (let i = 0; i < data.length; i++) {
    const categoryTableBody = document.createElement("tr");
    // tr에 데이터 받아서 추가
    categoryTableBody.innerHTML = `
    <td>${data[i].categoryName}</td>
    <td>${data[i].subcategoryName}</td>
    <td>${data[i].productQauntity}</td>
    <td id="${data[i].categoryId}">
      <button type="button" class="btn btn-dark btn-sm mod-category-btn" data-bs-toggle="modal" data-bs-target="#modCategoryModal">
      수정
      </button>
      <button id="${data[i].subcategoryId}"type="button" class="btn btn-dark btn-sm del-category-btn">삭제</button>
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

// 카테고리 추가 함수
function addCategory() {
  // const addCategoryBtn = document.querySelector("#add-category");
}

// 카테고리 삭제 함수
function deleteCategory() {
  const delCategoryBtn = document.querySelectorAll(".del-category-btn");
  if (delCategoryBtn && Array.from(delCategoryBtn).length) {
    delCategoryBtn.forEach((btn) =>
      btn.addEventListener("click", async () => {
        const confirmRes = confirm("정말로 삭제하시겠습니까?");
        // confirm 응답이 true인 경우 삭제 api 실행
        if (confirmRes === true) {
          const deleteData = { categoryId: btn.parentElement.id };
          console.log(typeof deleteData);
          await apiUtil.delete("/api/admin/categories", btn.id, deleteData);
          // 삭제 후 새로고침으로 삭제확인
          location.reload();
        }
      })
    );
    // confirm >> true/false 받아서 작업필요
    // 추후 데이터 삭제 관련 로직 필요
  }
}

// 카테고리 수정 함수
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

window.onload = makeCategoryList();
