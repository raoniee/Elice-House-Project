// import { clickNavbar } from "../components/admin-nav/admin-nav.js";

// navbar 생성 함수 >> 추후 components 파일로 이동 예정
const makeAdminNav = () => {
  const navContainer = document.querySelector("#nav-container");

  let adminNavTemplate = `<nav id="side-bar" class="nav flex-column">
    <a
      id="order-btn"
      class="nav-link"
      href="#"
      >주문 관리</a
    >
    <a
      id="product-btn"
      class="nav-link"
      href="#"
      >상품 관리</a
    >
    <a
      id="category-btn"
      class="nav-link"
      href="#"
      >카테고리 관리</a
    >
  </nav>`;

  navContainer.innerHTML = adminNavTemplate;
};

// navbar 불러오기
makeAdminNav();

// navbar 메뉴 클릭시 이동 함수 >>> 추후 component 이동 예정
function clickNavbar() {
  const orderBtn = document.querySelector("#order-btn");
  const productBtn = document.querySelector("#product-btn");
  const categoryBtn = document.querySelector("#category-btn");

  orderBtn.addEventListener("click", function () {
    location.href = "/admin/order";
  });

  productBtn.addEventListener("click", function () {
    location.href = "/admin/product";
  });

  categoryBtn.addEventListener("click", function () {
    location.href = "/admin/category";
  });
}

// navbar 클릭 함수 실행
clickNavbar();
