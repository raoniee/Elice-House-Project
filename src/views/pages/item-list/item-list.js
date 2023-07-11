// 헤더 수정후 임포트 다시 하기
import { insertHeaderCategoryData } from "../../components/header/header-category.js";
import { drawFooter } from "../../components/footer/footer.js";
// import { drawMenubar } from "../../components/menu-bar/menu-bar.js";

// Header 삽입
insertHeaderCategoryData();

//Footer 템플릿 삽입
drawFooter();

//Menubar 템플릿 삽입
// drawMenubar();

// 임시 api
async function getItemlistData() {
  let itemlistdata = await fetch("/api/products/64ab013cca36a71193fd55e4").then(
    (res) => res.json()
  );

  return itemlistdata;
}

const productItemContainer = document.querySelector(".item_list");

addProductItemsToContainer();

async function addProductItemsToContainer() {
  //api 코드 입력
  const products = await getItemlistData();
  //console.log(products);

  products.forEach(async (product) => {
    const { _id, productName, brand, price, imageUrl } = product;

    productItemContainer.insertAdjacentHTML(
      "beforeend",
      `
            <div
              class="item_list_card d-flex flex-column m-2"
              style="cursor: pointer"
              id="${_id}"
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
    const ItemListCard = document.querySelector(".item_list_card");
    ItemListCard.addEventListener("click", () => {
      console.log("아이템클릭하기");
      location.href = `/product/detail?id=${_id}`;
    });
  });
}
