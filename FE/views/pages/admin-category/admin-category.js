const cateygoryBtn = document.querySelector("#category-btn");
const listContainer = document.querySelector("#list-container");
const adminTitle = document.querySelector("#admin-title");
// 모달창
const categoryModalBox = document.querySelector("#modal-container");

// 제목 누르면 홈 화면
adminTitle.addEventListener("click", function () {
  location.reload();
});

// 카테고리 관리창 생성 함수
function makeCategoryList() {
  // initCategoryPage();

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
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Launch demo modal
</button>
</div>`;
  // 테이블 밑에 카테고리 추가버튼 필요

  listContainer.appendChild(categoryTable);

  //추가 버튼 기능
  addCategory();
}

// 추가 버튼 함수
function addCategory() {
  const addCategoryBtn = document.querySelector("#add-category");
  addCategoryBtn.addEventListener("click", () => {
    categoryModalBox.innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`;
  });
}

// 삭제 버튼 함수
function deleteCategory() {}

// 수정 버튼 함수
function modifyCategory() {}

window.onload(makeCategoryList());
// cateygoryBtn.addEventListener("click", makeCategoryList);
