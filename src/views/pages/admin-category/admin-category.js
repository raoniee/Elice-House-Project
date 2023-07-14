// import * as catMockData from "./category-mockdata.js";
import {
  makeAdminNav,
  clickNavbar,
  checkAdmin,
} from "../../components/admin-nav/admin-nav.js";
import * as apiUtil from "../../apiUtil.js";

//admin navbar 생성
makeAdminNav();
clickNavbar();
checkAdmin();

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
      <button id="${data[i].subcategoryId}"type="button" class="btn btn-dark btn-sm mod-category-btn" data-bs-toggle="modal" data-bs-target="#modCategoryModal">
      수정
      </button>
      <button id="${data[i].subcategoryId}"type="button" class="btn btn-dark btn-sm del-category-btn">삭제</button>
    </td>
    `;

    const temp = document.querySelector("#tBody");
    temp.appendChild(categoryTableBody);
  }

  //추가 버튼 작동 함수
  addCategory();
  //삭제 버튼 작동 함수
  deleteCategory();
  //수정 버튼 작동 함수
  modifyCategory();
  clickCancelBtn();
}

// 카테고리 추가 함수
function addCategory() {
  const addCatBtn = document.querySelector("#add-category-btn");
  const addCatInput = document.querySelector(".add-category-input");
  const addSubCatInput = document.querySelector(".add-subcategory-input");

  addCatBtn.addEventListener("click", async () => {
    //빈칸 확인 if문(모든 input이 입력되어야 post 작동)
    if (addCatInput.value && addSubCatInput.value) {
      const addCatData = {
        categoryName: addCatInput.value,
        subcategoryName: addSubCatInput.value,
      };
      await apiUtil.post("/api/admin/categories", addCatData);
      location.reload();
    } else {
      alert("모든 칸을 입력해주세요.");
    }
  });
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
          await apiUtil.delete("/api/admin/categories", btn.id, deleteData);
          // 삭제 후 새로고침으로 삭제확인
          location.reload();
        }
      })
    );
  }
}

// 카테고리 수정 함수
function modifyCategory() {
  const modCategoryBtn = document.querySelectorAll(".mod-category-btn");
  const submitModalBtn = document.querySelector("#submit-mod-category-btn");
  const modCatInput = document.querySelector(".mod-category-input");
  const modSubCatInput = document.querySelector(".mod-subcategory-input");

  if (modCategoryBtn && Array.from(modCategoryBtn).length) {
    modCategoryBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        console.log("modCategoryBtn clicked");
        // 모달 제출버튼 event
        submitModalBtn.addEventListener("click", async () => {
          //빈칸 확인 if문(모든 칸이 입력되어야 patch 작동)
          if (modCatInput.value && modSubCatInput.value) {
            const patchCatData = {
              changeCategoryName: modCatInput.value,
              changeSubcategoryName: modSubCatInput.value,
              subcategoryId: btn.id,
            };
            await apiUtil.patch(
              "/api/admin/categories",
              btn.parentElement.id,
              patchCatData
            );
            location.reload();
          } else {
            alert("모든 칸을 입력해주세요.");
          }
        });
      })
    );
  }
}

// //Modal 취소 버튼 >>> input값 초기화 // 추후 완성 예정
// function clickCancelBtn() {
//   const formObject = document.querySelector("#modCategoryForm");
//   const cancelBtns = document.querySelectorAll(".cancel-btn");
//   cancelBtns.forEach((btn) =>
//     btn.addEventListener("click", () => () => {
//       //추후 보충 예정
//       console.log("cancel btn clicked");
//     })
//   );
// }

window.onload = makeCategoryList();
