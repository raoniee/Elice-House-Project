import { drawHeader } from "../components/header/header.js";
import { insertHeaderData } from "../components/header/header.js";
import { drawFooter } from "../components/footer/footer.js";
import { drawMenubar } from "../components/menu-bar/menu-bar.js";

// Header, Footer 템플릿 삽입
drawHeader();
drawFooter();

// Header 메뉴 삽입
insertHeaderData();

// Menubar 템플릿 삽입
drawMenubar();

const productItemContainer = document.querySelector(".item_list");

addProductItemsToContainer();

async function addProductItemsToContainer() {
  //api 코드 입력
  const products = [
    {
      _id: "1234",
      name: "1.밀튼 침대 Q (매트제외)",
      brand: "까사미아",
      price: 4000000,
      imageUrl: "../public/assets/imgs/item-list-card.webp",
      description: "세상 어디에도 없는 디자인",
    },
    {
      _id: "1234",
      name: "2.밀튼 침대 Q (매트제외)",
      brand: "까사미아",
      price: 4000000,
      imageUrl: "../public/assets/imgs/item-list-card.webp",
      description: "세상 어디에도 없는 디자인",
    },
    {
      _id: "1234",
      name: "3.밀튼 침대 Q (매트제외)",
      brand: "까사미아",
      price: 4000000,
      imageUrl: "../public/assets/imgs/item-list-card.webp",
      description: "세상 어디에도 없는 디자인",
    },
    {
      _id: "1234",
      name: "4.밀튼 침대 Q (매트제외)",
      brand: "까사미아",
      price: 4000000,
      imageUrl: "../public/assets/imgs/item-list-card.webp",
      description: "세상 어디에도 없는 디자인",
    },
    {
      _id: "1234",
      name: "5.밀튼 침대 Q (매트제외)",
      brand: "까사미아",
      price: 4000000,
      imageUrl: "../public/assets/imgs/item-list-card.webp",
      description: "세상 어디에도 없는 디자인",
    },
    {
      _id: "1234",
      name: "6.밀튼 침대 Q (매트제외)",
      brand: "까사미아",
      price: 4000000,
      imageUrl: "../public/assets/imgs/item-list-card.webp",
      description: "세상 어디에도 없는 디자인",
    },
    {
      _id: "1234",
      name: "7.밀튼 침대 Q (매트제외)",
      brand: "까사미아",
      price: 4000000,
      imageUrl: "../public/assets/imgs/item-list-card.webp",
      description: "세상 어디에도 없는 디자인",
    },
    {
      _id: "1234",
      name: "8.밀튼 침대 Q (매트제외)",
      brand: "까사미아",
      price: 4000000,
      imageUrl: "../public/assets/imgs/item-list-card.webp",
      description: "세상 어디에도 없는 디자인",
    },
    {
      _id: "1234",
      name: "9.밀튼 침대 Q (매트제외)",
      brand: "까사미아",
      price: 4000000,
      imageUrl: "../public/assets/imgs/item-list-card.webp",
      description: "세상 어디에도 없는 디자인",
    },
  ];
  const { _id, name, brand, price, subcategoryId, imageUrl } = products;

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
            <span class="item_list_name mb-1">${products[i].name}</span>
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
