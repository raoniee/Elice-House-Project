import { drawHeader } from "../components/header/header.js";
import { insertHeaderData } from "../components/header/header.js";
import { drawFooter } from "../components/footer/footer.js";

// Header, Footer 템플릿 삽입
drawHeader();
drawFooter();

// Header 메뉴 삽입
insertHeaderData();

const cartContainer = document.querySelector(".cartContainer");

const Products_KEY = "products";
let Products = [];

insertCartData();

async function insertCartData() {
  const cartProducts = localStorage.getItem(Products_KEY);
  const parsedProducts = JSON.parse(cartProducts);
  Products.push(parsedProducts);
  console.log(Products);

  const productImg = parsedProducts.map((p) => p.productImg);
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
              <button id="minus">-</button>
              <input type="number" class="col-3 item_detail_quantity_input" value="${productQuantity}" readonly/>
              <button id="plus">+</button>
            </td>
            <td class="py-3 align-middle item_detail_totalprice">
            ${(productQuantity * productPrice).toLocaleString()}원</td>
            <td class="py-3 align-middle">
              <button
                type="button"
                class="btn btn-outline-dark btn-sm individual_delete_btn"
                onclick=""
              >
                삭제
              </button>
            </td>`;
  const ItemQuantityinput = document.querySelector(
    ".item_detail_quantity_input"
  );
  const ItemQuantityplus = document.querySelector("#plus");
  const ItemQuantityminus = document.querySelector("#minus");
  const ItemTotalPrice = document.querySelector(".item_detail_totalprice");
  const IndividualDeleteBTN = document.querySelector(".individual_delete_btn");

  ItemQuantityplus.addEventListener("click", () => {
    ItemQuantityinput.value++;
    ItemTotalPrice.innerText = `${(
      productPrice * ItemQuantityinput.value
    ).toLocaleString()}원`;
  });

  ItemQuantityminus.addEventListener("click", () => {
    if (ItemQuantityinput.value <= 1) {
      alert("최소 1개 이상만 구매가능합니다!");
    } else {
      ItemQuantityinput.value--;
    }
    ItemTotalPrice.innerText = `${(
      productPrice * ItemQuantityinput.value
    ).toLocaleString()}원`;
  });

  function saveProducts() {
    localStorage.setItem(Products_KEY, JSON.stringify(Products));
  }

  IndividualDeleteBTN.addEventListener("click", () => {
    product_tr.remove();
    //toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    //console.log(parsedProducts.map((p) => p.id));
    //saveProducts();
  });
}
