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
          <li id="login" class="nav-item">
            <a href="" class="nav-link link-dark px-2">Login</a>
          </li>
          <li id="sign-up" class="nav-item">
            <a href="" class="nav-link link-dark px-2">Sign up</a>
          </li>
          <li id="cart" class="nav-item">
            <a href="../order-cart/order-cart.html" class="nav-link link-dark px-2">장바구니</a>
          </li>
        </ul>
      </div>
    </div>
    `;
  // .header 부분에 삽입
  const header = document.querySelector(".header");
  header.innerHTML = headermenuTemplate;

  // header-menu의 nav 영역 이동 페이지 연결
  const LOGIN = document.getElementById("login");
  const SIGNUP = document.getElementById("sign-up");
  const CART = document.getElementById("cart");

  // 로그인 상태에 따라 로그인/로그아웃 버튼 텍스트 변경
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // 로그인 상태일 때
  if (isLoggedIn) {
    LOGIN.innerHTML = `<a href="" class="nav-link link-dark px-2">Logout</a>`;
    SIGNUP.innerHTML = `<a href="" class="nav-link link-dark px-2">My Page</a>`;

    // Logout 버튼 클릭 -> 로그아웃 처리
    LOGIN.addEventListener("click", (event) => {
      event.preventDefault();

      // 로그아웃 처리 로직
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");

      // 로그아웃 후 메인 페이지로 이동
      window.location.href = "/";
    });
    // My page 버튼 클릭 -> 마이 페이지로 이동
    SIGNUP.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/mypage/order";
    });
  } else {
    // login 버튼 클릭 -> 로그인 페이지로 이동
    LOGIN.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/login";
    });
    // sign up 버튼 클릭 -> 회원가입 페이지로 이동
    SIGNUP.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/register";
    });
  }

  // 장바구니 버튼 클릭 -> 장바구니 페이지로 이동
  CART.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/order/cart";
  });
};
