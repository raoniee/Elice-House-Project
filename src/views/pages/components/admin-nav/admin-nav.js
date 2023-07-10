export const makeAdminNav = () => {
  const navContainer = document.querySelector("#nav-container");

  let adminNavTemplate = `<nav id="side-bar" class="nav flex-column">
    <a id="order-btn" class="nav-link active" aria-current="page"
      >주문 관리</a
    >
    <a
      id="product-btn"
      class="nav-link"
      href="../admin-product/admin-product.html"
      >상품 관리</a
    >
    <a
      id="category-btn"
      class="nav-link"
      href="../admin-category/admin-category.html"
      >카테고리 관리</a
    >
    <a id="user-btn" class="nav-link" href="#">회원 관리</a>
  </nav>`;

  navContainer.innerHTML = adminNavTemplate;
};
