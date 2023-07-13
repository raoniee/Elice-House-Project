import { drawHeaderMenu } from "../../components/header/header-menu.js";
import { insertHeaderCategoryData } from "../../components/header/header-category.js";
import { drawFooter } from "../../components/footer/footer.js";

// Header 삽입
drawHeaderMenu();
insertHeaderCategoryData();

//Footer 삽입
drawFooter("../../public/assets/imgs/EliceHouse_logo.png");

const cartContainer = document.querySelector(".cartContainer");
const allcartPrice = document.querySelector(".total_order_price");
const deleteBTN = document.querySelector(".delete_btn");
const nextstepBTN = document.querySelector(".nextstep");

const Products_KEY = "products";
let Products = [];

insertCartData();

async function insertCartData() {
  const cartProducts = localStorage.getItem(Products_KEY);
  const parsedProducts = JSON.parse(cartProducts);
  Products = parsedProducts;

  Products.forEach((product) => {
    const { id, productImg, productName, productPrice, productQuantity } =
      product;

    cartContainer.insertAdjacentHTML(
      "beforeend",
      `
          <tr class="tr_${id}">
            <td class="py-3 col-4 align-middle">
              <img src="${productImg}" class="img-thumbnail" alt="상품이미지" />
              <p>${productName}</p>
            </td>
            <td class="py-3 col-2 align-middle ee">
              <button class="btn btn-secondary minus_${id}">-</button>
              <input type="number" class="col-3 border border-2 rounded item_detail_quantity_input_${id}" value="${productQuantity}" readonly style="height: 36px;"/>
              <button class="btn btn-secondary plus_${id}">+</button>
            </td>
            <td class="py-3 align-middle item_detail_totalprice_${id}">
            ${(productQuantity * productPrice).toLocaleString()}원</td>
            <td class="py-3 align-middle">
              <button
                type="button"
                class="btn btn-outline-dark btn-sm individual_delete_btn_${id}"
              >
                삭제
              </button>
            </td>
          </tr>`
    );

    document
      .querySelector(`.plus_${id}`)
      .addEventListener("click", () => handlePlus(id));

    document
      .querySelector(`.minus_${id}`)
      .addEventListener("click", () => handleMinus(id));

    document
      .querySelector(`.individual_delete_btn_${id}`)
      .addEventListener("click", () => handleDeleteIndividual(id));
  });

  showAllCartPrice();

  async function handlePlus(id) {
    setQuantityBox(id, "plus");
    updateProductItem(id, "increase");

    await putToLocalStorage(id);
  }

  async function handleMinus(id) {
    setQuantityBox(id, "minus");
    updateProductItem(id, "decrease");

    await putToLocalStorage(id);
  }

  function setQuantityBox(id, type) {
    const isPlus = type.includes("plus");
    const isMinus = type.includes("minus");
    const isInput = type.includes("input");

    const quantityInput = document.querySelector(
      `.item_detail_quantity_input_${id}`
    );

    let quantityUpdate;
    if (isPlus) {
      quantityUpdate = +1;
    } else if (isMinus) {
      quantityUpdate = -1;
    } else if (isInput) {
      quantityUpdate = 0;
    } else {
      quantityUpdate = 0;
    }

    const currentQuantity = parseInt(quantityInput.value);
    const newQuantity = currentQuantity + quantityUpdate;

    if (newQuantity < 1) {
      alert("최소 1개이상 구매합니다!");
    } else {
      quantityInput.value = newQuantity;
    }
  }

  async function updateProductItem(id) {
    const inputElem = document.querySelector(
      `.item_detail_quantity_input_${id}`
    );
    const totalpriceElem = document.querySelector(
      `.item_detail_totalprice_${id}`
    );
    const inputQuantity = inputElem.value;

    const unitPrice = Products.find((p) => p.id === id).productPrice;

    totalpriceElem.innerText = `${(
      inputQuantity * unitPrice
    ).toLocaleString()}원`;
  }

  async function putToLocalStorage(id) {
    Products = Products.filter((product) => product.id !== id);
    const cartProducts = localStorage.getItem(Products_KEY);
    const parsedProducts = JSON.parse(cartProducts);
    const update = parsedProducts.find((p) => p.id === id);
    const inputElem = document.querySelector(
      `.item_detail_quantity_input_${id}`
    );
    const inputQuantity = inputElem.value;
    const updateProductObj = {
      id: update.id,
      productImg: update.productImg,
      productName: update.productName,
      productBrand: update.productbrand,
      productPrice: update.productPrice,
      productQuantity: inputQuantity,
      productTotalPrice: update.productPrice * inputQuantity,
    };
    Products.push(updateProductObj);
    saveProducts();
    showAllCartPrice();
  }

  async function handleDeleteIndividual(id) {
    const trElem = document.querySelector(`.tr_${id}`);
    trElem.remove();
    Products = Products.filter((p) => p.id !== id);
    saveProducts();
    showAllCartPrice();
  }

  async function saveProducts() {
    localStorage.setItem(Products_KEY, JSON.stringify(Products));
  }

  async function showAllCartPrice() {
    const price = Products.map((p) => p.productTotalPrice);
    let sum = 0;

    price.forEach((p) => {
      sum += p;
    });

    allcartPrice.innerText = sum.toLocaleString();
  }

  deleteBTN.addEventListener("click", () => {
    cartContainer.innerHTML = "";
    Products = [];
    saveProducts();
    showAllCartPrice();
  });

  nextstepBTN.addEventListener("click", () => {
    if (Products.length === 0) {
      alert("구매할 제품이 없습니다. 제품을 선택해 주세요.");
    } else {
      location.href = `/order/progress`;
    }
  });
}
