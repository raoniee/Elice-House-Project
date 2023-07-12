import { drawHeaderMenu } from "../../components/header/header-menu.js";
import { insertHeaderCategoryData } from "../../components/header/header-category.js";
import { drawFooter } from "../../components/footer/footer.js";
import * as Api from "../../apiUtil";

// Header 삽입
drawHeaderMenu();
insertHeaderCategoryData();

//Footer 삽입
drawFooter("../../public/assets/imgs/EliceHouse_logo.png");

const receiverNameInput = document.querySelector("#user-name");
const receiverPhoneNumberInput = document.querySelector("#phone-number");
const postalCodeInput = document.querySelector("#postcode");
const roadAddressInput = document.querySelector("#roadAddress");
const detailAddressInput = document.querySelector("#detailAddress");
const requestSelectBox = document.querySelector("#requestSelectBox");
const productsTitleElem = document.querySelector("#productsTitle");
const orderTotalElem = document.querySelector("#orderTotal");
const checkoutButton = document.querySelector("#checkoutButton");
const searchAddressBtn = document.querySelector("#search-address-btn");

const Products_KEY = "products";
let Products = [];

checkLogin();
addAllElements();
addAllEvents();

function checkLogin() {
  const token = localStorage.getItem("token");
  if (!token) {
    // 현재 페이지의 url 주소 추출하기
    const pathname = window.location.pathname;
    const search = window.location.search;

    // 로그인 후 다시 지금 페이지로 자동으로 돌아가도록 하기 위한 준비작업임.
    window.location.replace(`/login?previouspage=${pathname + search}`);
  }
}

function addAllElements() {
  insertOrderSummary();
}

function addAllEvents() {
  checkoutButton.addEventListener("click", doCheckout);
  searchAddressBtn.addEventListener("click", searchAddress);
}

async function insertOrderSummary() {
  const cartProducts = localStorage.getItem(Products_KEY);
  const parsedProducts = JSON.parse(cartProducts);
  Products = parsedProducts;

  if (Products.length === 0) {
    alert(`구매할 제품이 없습니다. 제품을 선택해 주세요.`);

    return window.location.replace(`/`);
  }

  Products.forEach((product) => {
    const { productName, productQuantity } = product;

    productsTitleElem.insertAdjacentHTML(
      "beforeend",
      `${productName} / ${productQuantity}<br/>`
    );
  });

  const price = Products.map((p) => p.productTotalPrice);
  let sum = 0;

  price.forEach((p) => {
    sum += p;
  });

  orderTotalElem.innerText = `${sum.toLocaleString()}원`;

  receiverNameInput.focus();
}

async function doCheckout() {
  const userName = receiverNameInput.value;
  const userPhoneNumber = receiverPhoneNumberInput.value;
  const addrNum = postalCodeInput.value;
  const roughAddr = roadAddressInput.value;
  const detailAddr = detailAddressInput.value;
  const deliReq = requestSelectBox.value;

  const cartProducts = localStorage.getItem(Products_KEY);
  const parsedProducts = JSON.parse(cartProducts);
  Products = parsedProducts;
  let productId = [];
  let quantity = [];
  Products.forEach((product) => {
    const { id, productQuantity } = product;
    productId.push(id);
    quantity.push(productQuantity);
  });

  if (!userName || !userPhoneNumber || !detailAddr) {
    return alert("배송지 정보를 모두 입력해 주세요.");
  }

  if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(userPhoneNumber)) {
    alert("유효하지 않는 전화번호입니다.");
    return receiverPhoneNumberInput.focus();
  }

  try {
    const orderDate = {
      userName,
      userPhoneNumber,
      addrNum,
      roughAddr,
      detailAddr,
      deliReq,
      productId,
      quantity,
    };
    console.log(orderDate);

    Products = [];
    localStorage.setItem(Products_KEY, JSON.stringify(Products));

    alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
    window.location.href = "/order/complete";
  } catch (err) {
    console.log(err);
    alert(`결제 중 문제가 발생하였습니다: ${err.message}`);
  }
}

//주소 찾기
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      const { roadAddress: roadAddr } = data; // 도로명 주소 변수

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("roadAddress").value = roadAddr;
      document.querySelector("#detailAddress").value = "";
    },
  }).open();
}
