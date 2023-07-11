import { drawHeaderMenu } from "../../components/header/header-menu.js";
import { insertHeaderCategoryData } from "../../components/header/header-category.js";
import { drawFooter } from "../../components/footer/footer.js";

// Header 삽입
drawHeaderMenu();
insertHeaderCategoryData();

//Footer 삽입
drawFooter();

const cartContainer = document.querySelector(".cartContainer");

const Products_KEY = "products";
let Products = [];

insertCartData();

async function insertCartData() {
  const cartProducts = localStorage.getItem(Products_KEY);
  const parsedProducts = JSON.parse(cartProducts);
  Products = parsedProducts;
  console.log(Products);

  const productImg = parsedProducts.map((p) => p.productImg);
  const productId = parsedProducts.map((p) => p.id);
  const productName = parsedProducts.map((p) => p.productName);
  const productQuantity = parsedProducts.map((p) => p.productQuantity);
  const productPrice = parsedProducts.map((p) => p.productPrice);

  const product_tr = document.createElement("tr");
  product_tr.id = parsedProducts.map((p) => p.id);
  cartContainer.appendChild(product_tr);

  product_tr.innerHTML = `
            <td class="py-3 col-4 align-middle">
              <img src="${productImg}" class="img-thumbnail" alt="상품이미지" />
              <p>${productName}</p>
            </td>
            <td class="py-3 col-2 align-middle">
              <button class="minus" id="${productId}">-</button>
              <input type="number" class="col-3 item_detail_quantity_input" value="${productQuantity}" readonly/>
              <button class="plus" id="${productId}">+</button>
            </td>
            <td class="py-3 align-middle item_detail_totalprice">
            ${(productQuantity * productPrice).toLocaleString()}원</td>
            <td class="py-3 align-middle">
              <button
                type="button"
                class="btn btn-outline-dark btn-sm individual_delete_btn"
                id="${productId}"
              >
                삭제
              </button>
            </td>`;
  const ItemQuantityinput = document.querySelector(
    ".item_detail_quantity_input"
  );
  const ItemQuantityplus = document.querySelector(".plus");
  const ItemQuantityminus = document.querySelector(".minus");
  const ItemTotalPrice = document.querySelector(".item_detail_totalprice");
  const IndividualDeleteBTN = document.querySelector(".individual_delete_btn");

  const totalOrderPrice = document.querySelector(".total_order_price");

  function saveProducts() {
    localStorage.setItem(Products_KEY, JSON.stringify(Products));
  }

  ItemQuantityplus.addEventListener("click", (e) => {
    ItemQuantityinput.value++;
    ItemTotalPrice.innerText = `${(
      productPrice * ItemQuantityinput.value
    ).toLocaleString()}원`;

    Products = Products.filter((product) => product.id !== e.target.id);
    const cartProducts = localStorage.getItem(Products_KEY);
    const parsedProducts = JSON.parse(cartProducts);
    const update = parsedProducts.find((p) => p.id === e.target.id);
    const updateProductObj = {
      id: update.id,
      productImg: update.productImg,
      productName: update.productName,
      productBrand: update.productbrand,
      productPrice: update.productPrice,
      productQuantity: ItemQuantityinput.value.toLocaleString(),
      productTotalPrice: (
        update.productPrice * ItemQuantityinput.value
      ).toLocaleString(),
    };
    Products.push(updateProductObj);
    saveProducts();
  });

  ItemQuantityminus.addEventListener("click", (e) => {
    if (ItemQuantityinput.value <= 1) {
      alert("최소 1개 이상만 구매가능합니다!");
    } else {
      ItemQuantityinput.value--;
    }
    ItemTotalPrice.innerText = `${(
      productPrice * ItemQuantityinput.value
    ).toLocaleString()}원`;

    Products = Products.filter((product) => product.id !== e.target.id);
    const cartProducts = localStorage.getItem(Products_KEY);
    const parsedProducts = JSON.parse(cartProducts);
    const update = parsedProducts.find((p) => p.id === e.target.id);
    const updateProductObj = {
      id: update.id,
      productImg: update.productImg,
      productName: update.productName,
      productBrand: update.productbrand,
      productPrice: update.productPrice,
      productQuantity: ItemQuantityinput.value.toLocaleString(),
      productTotalPrice: (
        update.productPrice * ItemQuantityinput.value
      ).toLocaleString(),
    };
    Products.push(updateProductObj);
    saveProducts();
  });

  IndividualDeleteBTN.addEventListener("click", (e) => {
    const td = e.target.parentElement;
    const tr = td.parentElement;
    tr.remove();
    // product_tr.remove();
    // console.log(product_tr.id === Products.map((p) => p.id));
    // console.log(parseInt(product_tr.id));
    // console.log(Products.map((p) => p.id));
    //Products = Products.filter((p) => p.id !== parseInt(product_tr.id));
    //console.log(Products);
    //saveProducts();
  });
}
