import { drawHeaderMenu } from "../../components/header/header-menu.js";
import { insertHeaderCategoryData } from "../../components/header/header-category.js";
import { drawMenubar } from "../../components/menu-bar/menu-bar.js";
import { drawFooter } from "../../components/footer/footer.js";
import * as Api from "../../apiUtil";

// Header 삽입
drawHeaderMenu();
insertHeaderCategoryData();

// Menubar 삽입
drawMenubar();

//Footer 삽입
drawFooter("../../public/assets/imgs/EliceHouse_logo.png");

const productItemContainer = document.querySelector(".item_list");

addProductItemsToContainer();

async function addProductItemsToContainer() {
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("CategoryId");
  const subcategoryId = params.get("SubCategoryId");
  const products = await Api.get(`/api/products/${subcategoryId}`);

  products.forEach(async (product) => {
    const { _id, productName, brand, price, imageUrl } = product;

    productItemContainer.insertAdjacentHTML(
      "beforeend",
      `
            <div
              class="item_list_card d-flex flex-column m-2"
              style="cursor: pointer"
              id="a${_id}"
            >
              <img
                class="item_list_img mb-2 border border-2 rounded-3"
                src="${imageUrl}"
                alt="가구"
              />
              <span class="item_list_name mb-1">${productName}</span>
              <p class="item_list_brand mb-1 text-muted">${brand}</p></p>
              <p class="item_list_price mb-3 fw-bold">${price.toLocaleString()}원</p>
            </div>`
    );
    const ItemListCard = document.querySelector(`#a${_id}`);
    ItemListCard.addEventListener("click", () => {
      console.log("아이템클릭하기");
      location.href = `/product/detail?CategoryId=${categoryId}&&SubCategoryId=${subcategoryId}&&id=${_id}`;
    });
  });
}
