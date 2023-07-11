import { drawHeader } from "../../components/header/header.js";
import { insertHeaderData } from "../../components/header/header.js";
import { drawFooter } from "../../components/footer/footer.js";
import { drawMenubar } from "../../components/menu-bar/menu-bar.js";

//Header, Footer 템플릿 삽입
drawHeader();
drawFooter();

//Header 메뉴 삽입
insertHeaderData();

//Menubar 템플릿 삽입
drawMenubar();

async function getItemlistData() {
  let itemlistdata = await fetch("/api/products/64ab013cca36a71193fd55e4").then(
    (res) => res.json()
  );

  return itemlistdata;
}

const productItemContainer = document.querySelector(".item_list");

addProductItemsToContainer();

async function addProductItemsToContainer() {
  const products = await getItemlistData();
  console.log(products);
  //api 코드 입력

  const { _id, productName, brand, price, subcategoryId, imageUrl } = products;

  let innerContainer = "";

  for (let i = 0; i < products.length; i++) {
    const htmlContainer = `
            <div
              class="item_list_card d-flex flex-column m-2"
              style="cursor: pointer"
            >
              <img
                class="item_list_img mb-2 border border-2 rounded-3"
                src="${products[i].imageUrl}"
                alt="가구"
              />
              <span class="item_list_name mb-1">${
                products[i].productName
              }</span>
              <p class="item_list_brand mb-1 text-muted">${
                products[i].brand
              }</p></p>
              <p class="item_list_price mb-3 fw-bold">${products[
                i
              ].price.toLocaleString()}원</p>
            </div>`;
    innerContainer += htmlContainer;
  }
  productItemContainer.innerHTML = innerContainer;
}
