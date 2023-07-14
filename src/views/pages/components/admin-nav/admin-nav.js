const makeAdminNav = () => {
  // 메인 페이지 이동
  const adminTitle = document.querySelector("#admin-title");
  adminTitle.addEventListener("click", function () {
    location.href = "/admin/main";
  });
  // admin navbar 생성
  const navContainer = document.querySelector("#nav-container");
  let adminNavTemplate = `
    <nav id="side-bar" class="nav flex-column">
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
        style="white-space: nowrap;"
        href="#"
        >카테고리 관리</a
      >
      <button id="logout" type="button" class="btn btn-outline-primary btn-sm mt-3 ms-3 w-75">로그아웃</button>
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

  // 로그아웃 함수 실행
  logOut();
};

//admin 로그아웃 함수
const logOut = () => {
  const logOutBtn = document.querySelector("#logout");

  logOutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // 로그아웃 처리 로직
    localStorage.removeItem("admin");
    localStorage.removeItem("isLoggedIn");

    // 로그아웃 후 메인 페이지로 이동
    window.location.href = "/";
  });
};

function checkAdmin() {
  const isAdmin = localStorage.getItem("admin");
  // const isLoggedIn = localStorage.getItem("admin");
  if (!isAdmin) {
    location.href = "/";
  }
}

export { makeAdminNav, clickNavbar, checkAdmin };
