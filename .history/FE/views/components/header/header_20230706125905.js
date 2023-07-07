export const drawHeader = () => {
  let headerTemplate = `
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
            <a href="" class="nav-link link-dark px-2">장바구니</a>
          </li>
        </ul>
      </div>
    </div>
    <nav class="py-2 bg-light border-bottom">
      <div class="container">
        <ul class="nav justify-content-center nav-pills">
          <li class="nav-item">
            <div class="dropdown text-end">
              <a
                href="#"
                class="d-block link-dark text-decoration-none nav-link"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >침실가구
              </a>
              <ul class="dropdown-menu text-small">
                <li><a class="dropdown-item" href="#">침대</a></li>
                <li><a class="dropdown-item" href="#">매트리스/토퍼</a></li>
                <li><a class="dropdown-item" href="#">화장대/콘솔/거울</a></li>
                <li><a class="dropdown-item" href="#">서랍장/협탁</a></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <div class="dropdown text-end">
              <a
                href="#"
                class="d-block link-dark text-decoration-none nav-link"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >옷장/수납장
              </a>
              <ul class="dropdown-menu text-small">
                <li><a class="dropdown-item" href="#">옷장/붙박이장</a></li>
                <li><a class="dropdown-item" href="#">드레스룸/행거</a></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <div class="dropdown text-end">
              <a
                href="#"
                class="d-block link-dark text-decoration-none nav-link"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >거실가구
              </a>
              <ul class="dropdown-menu text-small">
                <li><a class="dropdown-item" href="#">소파</a></li>
                <li><a class="dropdown-item" href="#">거실테이블</a></li>
                <li><a class="dropdown-item" href="#">거실장</a></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <div class="dropdown text-end">
              <a
                href="#"
                class="d-block link-dark text-decoration-none nav-link"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >주방가구
              </a>
              <ul class="dropdown-menu text-small">
                <li><a class="dropdown-item" href="#">식탁/테이블</a></li>
                <li><a class="dropdown-item" href="#">홈바/아일랜드식탁</a></li>
                <li><a class="dropdown-item" href="#">식탁세트</a></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <div class="dropdown text-end">
              <a
                href="#"
                class="d-block link-dark text-decoration-none nav-link"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >서재가구
              </a>
              <ul class="dropdown-menu text-small">
                <li><a class="dropdown-item" href="#">책상/책장/ACC</a></li>
                <li><a class="dropdown-item" href="#">서재의자</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    `;
  // .header 부분에 header.html을 삽입
  const headerTag = document.querySelector(".header");
  headerTag.innerHTML = `eee`;

  //headerTag.innerHTML = headerTemplate;
};
