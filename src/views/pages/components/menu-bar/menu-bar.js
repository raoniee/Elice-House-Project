import * as Api from "../../apiUtil";

export async function drawMenubar() {
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("CategoryId");
  const subcategoryId = params.get("SubCategoryId");

  const CategoryData = await Api.get(`/api/categories`);

  const result = CategoryData.find((p) => p.categoryId === categoryId);
  const parentMenu = result.categoryName;
  console.log(parentMenu);

  const result1 = result.subcategory;
  const result2 = result1.find((p) => p.subcategoryId === subcategoryId);
  const childMenu = result2.subcategoryName;
  console.log(childMenu);

  let menubarTemplate = `<p class="menu-depth1">${parentMenu}</p>
      <p class="arrow">></p>
      <p class="menu-depth2">${childMenu}</p>`;
  // .menu_bar 부분에 삽입
  const menu_barTag = document.querySelector(".menu_bar");
  menu_barTag.innerHTML = menubarTemplate;
}
