export const drawFooter = () => {
  let footerTemplate = `        <div class="border-top">
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
    
        </div>`;
  // .footer 부분에 삽입
  const footerTag = document.querySelector(".footer");
  footerTag.innerHTML = footerTemplate;
};
