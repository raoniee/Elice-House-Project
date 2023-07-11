//라온님

// Api
async function getHeaderCategoryData() {
  let headercategorydata = await fetch("/api/categories").then((res) =>
    res.json()
  );

  return headercategorydata;
}

// 로직
const result = document.querySelector(".nav-bottom");

// insertHeaderCategoryData();

export async function insertHeaderCategoryData() {
  //api 코드 입력
  const CategoryData = await getHeaderCategoryData();
  //console.log(CategoryData);

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
      <a class="dropdown-item" href="/product/list?categoryid=${CategoryData[i].subcategory[j].subcategoryId}">
      ${CategoryData[i].subcategory[j].subcategoryName}
      </a>
      </li>`
      );
    }
  }
}
