const makeAdminNav = () => {
  // 메인 페이지 이동
  const adminTitle = document.querySelector("#admin-title");
  adminTitle.addEventListener("click", function () {
    location.href = "/admin/main";
  });
  // admin navbar 생성
  const navContainer = document.querySelector("#nav-container");
  let adminNavTemplate = `<nav id="side-bar" class="nav flex-column">
    <a id="order-btn" class="nav-link" aria-current="page" href="#"
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

const clickNavbar = () => {
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
};

export { makeAdminNav, clickNavbar };
