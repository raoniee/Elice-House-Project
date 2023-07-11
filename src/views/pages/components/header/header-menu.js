//유진님

export const drawHeaderMenu = () => {
  let headermenuTemplate = `
    <div class="py-3 border-bottom">
      <div class="container d-flex flex-wrap justify-content-center">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none"
        >
          <svg class="bi me-2" width="40" height="32">
            <use xlink:href="#bootstrap" />
          </svg>
          <span class="fs-4">로고 넣기</span>
        </a>
        <ul class="nav">
          <li class="nav-item">
            <a href="" class="nav-link link-dark px-2">Login</a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link link-dark px-2">Sign up</a>
          </li>
          <li class="nav-item">
            <a href="../order-cart/order-cart.html" class="nav-link link-dark px-2">장바구니</a>
          </li>
        </ul>
      </div>
    </div>
    `;
  // .header 부분에 삽입
  const header = document.querySelector(".header");
  header.innerHTML = headermenuTemplate;
};
