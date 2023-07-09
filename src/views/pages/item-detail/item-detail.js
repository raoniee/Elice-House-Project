import { drawHeader } from "../../components/header/header.js";
import { drawFooter } from "../../components/footer/footer.js";
import { drawMenubar } from "../../components/menu-bar/menu-bar.js";
import { drawItemCard } from "../../components/item-card/item-detail-card.js";
import { getUrlParams } from "../../useful-functions.js";
import * as API from "../../api.js";

// Header, Footer 템플릿 삽입
drawHeader();
drawFooter();

// Menubar 템플릿 삽입
drawMenubar();

// ItemCard 템플릿 삽입
drawItemCard();

const ItemImg = document.querySelector(".item_detail_img");
const ItemName = document.querySelector(".item_detail_name");
const ItemBrand = document.querySelector(".item_detail_brand");
const ItemPrice = document.querySelector(".item_detail_price");
const ItemDesc = document.querySelector(".item_detail_desc");

const ItemQuantityinput = document.querySelector(".item_detail_quantity input");
const ItemQuantityplus = document.querySelector("#plus");
const ItemQuantityminus = document.querySelector("#minus");
const ItemTotalPrice = document.querySelector(".item_detail_totalprice");

const addToCartButton = document.querySelector(".cart");
const purchaseButton = document.querySelector(".purchase");

const Products_KEY = "products";
let Products = [];

insertProductData();

async function insertProductData() {
  const { id } = getUrlParams();
  const product = await API.get(`/products/detail/${id}`);
  const { name, brand, price, subcategoryId, imageUrl, description } = product;

  ItemImg.src = imageUrl;
  ItemName.innerText = name;
  ItemBrand.innerText = brand;
  ItemPrice.innerText = `${price.toLocaleString()}원`;
  ItemDesc.innerText = description;
  ItemTotalPrice.value = `${price.toLocaleString()}원`;

  ItemQuantityplus.addEventListener("click", () => {
    ItemQuantityinput.value++;
    ItemTotalPrice.innerText = `${(
      price * ItemQuantityinput.value
    ).toLocaleString()}원`;
  });

  ItemQuantityminus.addEventListener("click", () => {
    if (ItemQuantityinput.value <= 1) {
      alert("최소 1개 이상만 구매가능합니다!");
    } else {
      ItemQuantityinput.value--;
    }
    ItemTotalPrice.innerText = `${(
      price * ItemQuantityinput.value
    ).toLocaleString()}원`;
  });

  addToCartButton.addEventListener("click", () => {
    if (Products.map(product).includes(product.id)) {
      // 로컬스토리지에 해당 상품이 포함되어 있다면
      alert("이미 장바구니에 추가되어 있습니다.");
    } else {
      // 없다면 로컬스토리지에 담기
      function saveProducts() {
        localStorage.setItem(Products_KEY, JSON.stringify(Products));
      }

      const newProductObj = {
        id: Date.now(),
        productImg: imageUrl,
        productName: name,
        productBrand: brand,
        productPrice: price,
        productQuantity: ItemQuantityinput.value.toLocaleString(),
        productTotalPrice: price * ItemQuantityinput.value.toLocaleString(),
      };
      Products.push(newProductObj);
      saveProducts();
    }
  });

  purchaseButton.addEventListener("click", () => {
    if (Products.map(product).includes(product.id)) {
      // 이미 로컬스토리지에 담겨있다면 바로 구매페이지로 이동
      window.location.href = "/order";
    } else {
      // 아니라면 로컬스토리지에 담고 구매페이지로 이동
      function saveProducts() {
        localStorage.setItem(Products_KEY, JSON.stringify(Products));
      }

      const newProductObj = {
        id: Date.now(),
        productImg: imageUrl,
        productName: name,
        productBrand: brand,
        productPrice: price,
        productQuantity: ItemQuantityinput.value.toLocaleString(),
        productTotalPrice: price * ItemQuantityinput.value.toLocaleString(),
      };
      Products.push(newProductObj);
      saveProducts();
      window.location.href = "/order";
    }
  });
}
