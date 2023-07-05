const cateygoryBtn = document.querySelector("#category-btn");
const listContainer = document.querySelector("#list-container");
const adminTitle = document.querySelector("#admin-title");

// 화면 초기화 함수
function initCategoryPage() {
  listContainer.innerHTML = "";
}

// 카테고리 관리창 생성 함수
function makeCategoryList() {
  initCategoryPage();

  const categoryTable = document.createElement("div");
  // tbody에 데이터 받아서 추가필요
  categoryTable.innerHTML = `
  
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">카테고리</th>
      <th scope="col">제품번호</th>
      <th scope="col">상품개수</th>
      <th scope="col">수정/삭제</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">침대</th>
      <td>fnt-1313</td>
      <td>3</td>
      <td><button type="button" class="btn btn-dark btn-sm">수정</button>
      <button type="button" class="btn btn-dark btn-sm">삭제</button></td>
    </tr>
  </tbody>
</table>
<div id="add-category">
  <button type="button" class="btn btn-dark btn-sm">추가</button>
</div>`;
  // 테이블 밑에 카테고리 추가버튼 필요

  listContainer.appendChild(categoryTable);
}

// 추가 버튼 함수
function addCategory() {}

// 삭제 버튼 함수
function deleteCategory() {}

// 수정 버튼 함수
function modifyCategory() {}

cateygoryBtn.addEventListener("click", makeCategoryList);
