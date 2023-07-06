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
  headerTag.innerHTML = headerTemplate;
};

export const drawFooter = () => {
  let footerTemplate = `
        <div class="container">
      <div class="row py-5">
        <div class="col mb-3">
          <a
            href="/"
            class="d-flex align-items-center mb-3 link-dark text-decoration-none"
          >
            로고
          </a>
          <p class="text-muted">&copy; 2022</p>
        </div>

        <div class="col mb-3"></div>

        <div class="col mb-3">
          <ul class="nav flex-column">
            <li class="nav-item mb-2 text-muted">개인정보처리방침</li>
            <li class="nav-item mb-2">서비스 이용약관</li>
            <li class="nav-item mb-2">영상정보처리기기 운영관리방침</li>
            <li class="nav-item mb-2">회사소개</li>
            <li class="nav-item mb-2">채용정보</li>
          </ul>
        </div>

        <div class="col mb-3">
          <ul class="nav flex-column">
            <li class="nav-item mb-2">상호명 : (주)신세계까사</li>
            <li class="nav-item mb-2">대표이사 : 김홍극</li>
            <li class="nav-item mb-2">
              주소 : 서울시 중구 남대문시장10길2 메사빌딩 5-6층
            </li>
          </ul>
        </div>

        <div class="col mb-3">
          <ul class="nav flex-column">
            <li class="nav-item mb-2">사업자등록번호 : 120-81-11794</li>
            <li class="nav-item mb-2">통신판매업 신고:2021-서울중구</li>
            <li class="nav-item mb-2">개인정보보호책임자 : 김찬후</li>
            <li class="nav-item mb-2">사업자 정보확인</li>
          </ul>
        </div>
      </div>
      <div
        class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top"
      >
        <p>&copy; 2022 Company, Inc. All rights reserved.</p>
        <ul class="list-unstyled d-flex">
          <li class="ms-3">
            <a class="link-dark" href="#"
              ><svg class="bi" width="24" height="24">
                <use xlink:href="#twitter" /></svg
            ></a>
          </li>
          <li class="ms-3">
            <a class="link-dark" href="#"
              ><svg class="bi" width="24" height="24">
                <use xlink:href="#instagram" /></svg
            ></a>
          </li>
          <li class="ms-3">
            <a class="link-dark" href="#"
              ><svg class="bi" width="24" height="24">
                <use xlink:href="#facebook" /></svg
            ></a>
          </li>
        </ul>
      </div>
    </div>
    `;
  // .footer 부분에 footer.html을 삽입
  const footerTag = document.querySelector(".footer");
  footerTag.innerHTML = footerTemplate;
};
