import { drawHeader } from "../../components/header/header.js";
import { drawFooter } from "../../components/footer/footer.js";
import { drawMenubar } from "../../components/menu-bar/menu-bar.js";
import { drawItemCard } from "../../components/item-card/item-detail-card.js";
//import * as API from "../../api.js";

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

//API가 없어서 더미 데이터 끌어다 씀
fetch("./item-dummy.json")
  .then((res) => res.json())
  .then((data) => {
    let Item = data;
    insertProductData(Item);
  });

function insertProductData(Item) {
  ItemImg.src = Item[0].imageUrl;
  ItemName.innerText = Item[0].name;
  ItemBrand.innerText = Item[0].brand;
  ItemPrice.innerText = `${Item[0].price}원`;
  ItemDesc.innerText = Item[0].description;
  ItemTotalPrice.innerText = `${Item[0].price}원`;

  ItemQuantityplus.addEventListener("click", () => {
    ItemQuantityinput.value++;
    ItemTotalPrice.innerText = `${Item[0].price * ItemQuantityinput.value}원`;
  });

  ItemQuantityminus.addEventListener("click", () => {
    if (ItemQuantityinput.value <= 1) {
      alert("최소 1개 이상만 구매가능합니다!");
    } else {
      ItemQuantityinput.value--;
    }
    ItemTotalPrice.innerText = `${Item[0].price * ItemQuantityinput.value}원`;
  });

  addToCartButton.addEventListener("click", () => {
    alert("장바구니에 추가 되었습니다!");
  });
  purchaseButton.addEventListener("click", () => {
    alert("구매하기 창으로 가기");
  });
}

// API 버전

addAllElements();

function addAllElements() {
  insertProductData();
}

async function insertProductData() {
  const product = await API.get(`/products/${id}`);
  const { name, brand, price, subcategoryId, imageUrl, description } = product;

  ItemImg.src = imageUrl;
  ItemName.innerText = name;
  ItemBrand.innerText = brand;
  ItemPrice.innerText = `${price}원`;
  ItemDesc.innerText = description;
  ItemTotalPrice.value = `${price}원`;

  ItemQuantityplus.addEventListener("click", () => {
    ItemQuantityinput.value++;
    ItemTotalPrice.innerText = `${price * ItemQuantityinput.value}원`;
  });

  ItemQuantityminus.addEventListener("click", () => {
    if (ItemQuantityinput.value <= 1) {
      alert("최소 1개 이상만 구매가능합니다!");
    } else {
      ItemQuantityinput.value--;
    }
    ItemTotalPrice.innerText = `${price * ItemQuantityinput.value}원`;
  });

  addToCartButton.addEventListener("click", async () => {
    try {
      await insertDb(product);

      alert("장바구니에 추가되었습니다.");
    } catch (err) {
      // Key already exists 에러면 아래와 같이 alert함
      if (err.message.includes("Key")) {
        alert("이미 장바구니에 추가되어 있습니다.");
      }

      console.log(err);
    }
  });

  purchaseButton.addEventListener("click", async () => {
    try {
      await insertDb(product);

      window.location.href = "/orders";
    } catch (err) {
      console.log(err);

      //insertDb가 에러가 되는 경우는 이미 제품이 장바구니에 있던 경우임
      //따라서 다시 추가 안 하고 바로 order 페이지로 이동함
      window.location.href = "/orders";
    }
  });
}

async function insertDb(product) {
  // 객체 destructuring
  const { _id: id, price } = product;

  // 장바구니 추가 시, indexedDB에 제품 데이터 및
  // 주문수량 (기본값 1)을 저장함.
  await addToDb("cart", { ...product, quantity: 1 }, id);

  // 장바구니 요약(=전체 총합)을 업데이트함.
  await putToDb("order", "summary", (data) => {
    // 기존 데이터를 가져옴
    const count = data.productsCount;
    const total = data.productsTotal;
    const ids = data.ids;
    const selectedIds = data.selectedIds;

    // 기존 데이터가 있다면 1을 추가하고, 없다면 초기값 1을 줌
    data.productsCount = count ? count + 1 : 1;

    // 기존 데이터가 있다면 가격만큼 추가하고, 없다면 초기값으로 해당 가격을 줌
    data.productsTotal = total ? total + price : price;

    // 기존 데이터(배열)가 있다면 id만 추가하고, 없다면 배열 새로 만듦
    data.ids = ids ? [...ids, id] : [id];

    // 위와 마찬가지 방식
    data.selectedIds = selectedIds ? [...selectedIds, id] : [id];
  });
}
