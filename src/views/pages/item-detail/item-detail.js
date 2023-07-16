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

//Menubar 템플릿 삽입.
drawMenubar();

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

insertProductData();

async function insertProductData() {
  const params = new URLSearchParams(location.search);
  const productId = params.get("id");
  const product = await Api.get(`/api/products/detail/${productId}`);
  const { _id, productName, brand, price, imageUrl, description } = product;

  ItemImg.src = imageUrl;
  ItemName.innerText = productName;
  ItemBrand.innerText = brand;
  ItemPrice.innerText = `${price.toLocaleString()}원`;
  ItemDesc.innerText = description;
  ItemTotalPrice.innerText = `${price.toLocaleString()}원`;

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

  const Products_KEY = "products";
  let Products = "";

  function getProducts() {
    const cartProducts = localStorage.getItem(Products_KEY);
    const parsedProducts = JSON.parse(cartProducts);
    if (parsedProducts !== null) {
      Products = parsedProducts;
    } else {
      return (Products = []);
    }
  }

  function saveProducts() {
    localStorage.setItem(Products_KEY, JSON.stringify(Products));
  }

  addToCartButton.addEventListener("click", () => {
    getProducts();
    if (Products.map((p) => p.id).includes(product._id)) {
      alert("이미 장바구니에 추가되어 있습니다.");
    } else {
      const newProductObj = {
        id: _id,
        productImg: imageUrl,
        productName: productName,
        productBrand: brand,
        productPrice: price,
        productQuantity: ItemQuantityinput.value.toLocaleString(),
        productTotalPrice: price * ItemQuantityinput.value.toLocaleString(),
      };
      Products.push(newProductObj);
      saveProducts();
      alert("장바구니에 추가되었습니다!");
    }
  });

  purchaseButton.addEventListener("click", () => {
    getProducts();
    if (Products.map((p) => p.id).includes(product._id)) {
      window.location.href = "/order/progress";
    } else {
      function saveProducts() {
        localStorage.setItem(Products_KEY, JSON.stringify(Products));
      }

      const newProductObj = {
        id: _id,
        productImg: imageUrl,
        productName: productName,
        productBrand: brand,
        productPrice: price,
        productQuantity: ItemQuantityinput.value.toLocaleString(),
        productTotalPrice: price * ItemQuantityinput.value.toLocaleString(),
      };
      Products.push(newProductObj);
      saveProducts();
      window.location.href = "/order/progress";
    }
  });
}
