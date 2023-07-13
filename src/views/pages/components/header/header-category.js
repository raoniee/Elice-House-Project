//라온님
import * as Api from "../../apiUtil";

// 로직
const result = document.querySelector(".nav-bottom");

// insertHeaderCategoryData();

export async function insertHeaderCategoryData() {
  //api 코드 입력
  //const CategoryData = await getHeaderCategoryData();
  //console.log(CategoryData);
  const CategoryData = await Api.get(`/api/categories`);

  for (let i = 0; i < CategoryData.length; i++) {
    result.insertAdjacentHTML(
      "beforeend",
      `<li class="nav-item">
                        <div class="dropdown text-end">
                          <a
                            href="#"
                            class="d-block link-dark text-decoration-none nav-link nav-bottom-link"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id="${CategoryData[i].categoryId}"
                            >
                            ${CategoryData[i].categoryName}
                          </a>
                          <ul class="dropdown-menu text-small subnav${[
                            i,
                          ]}"></ul>
                        </div>
                      </li>`
    );
    const result1 = document.querySelector(`.subnav${[i]}`);
    for (let j = 0; j < CategoryData[i].subcategory.length; j++) {
      result1.insertAdjacentHTML(
        "beforeend",
        `<li>
      <a class="dropdown-item" href="/product/list?CategoryId=${CategoryData[i].categoryId}&&SubCategoryId=${CategoryData[i].subcategory[j].subcategoryId}">
      ${CategoryData[i].subcategory[j].subcategoryName}
      </a>
      </li>`
      );
    }
  }
}
