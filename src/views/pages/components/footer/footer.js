export const drawFooter = (img) => {
  let footerTemplate = `        <div class="border-top">
        <div class="container">
      <div class="row py-5">
        <div class="col mb-3">
          <a
            href="/"
            class="d-flex align-items-center mb-3 link-dark text-decoration-none"
          >
            <img src="${img}" alt="엘리스 하우스 로고" style="height: 10vh" />
          </a>
          <p class="text-muted">&copy; 2023</p>
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
            <li class="nav-item mb-2">상호명 : (주)Elice House</li>
            <li class="nav-item mb-2">대표 : 일단 13팀</li>
            <li class="nav-item mb-2">
              주소 : 서울 성동구 아차산로17길 48 성수낙낙 2층 엘리스랩
            </li>
          </ul>
        </div>

        <div class="col mb-3">
          <ul class="nav flex-column">
            <li class="nav-item mb-2">사업자등록번호 : 123-45-67890</li>
            <li class="nav-item mb-2">통신판매업 신고 : 2023-서울중구</li>
            <li class="nav-item mb-2">개인정보보호책임자 : 김엘리스</li>
            <li class="nav-item mb-2">사업자 정보확인</li>
          </ul>
        </div>
      </div>
      <div
        class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top"
      >
        <p>&copy; 2023 Company, Inc. All rights reserved.</p>

      </div>
    </div>
    
        </div>`;
  // .footer 부분에 삽입
  const footerTag = document.querySelector(".footer");
  footerTag.innerHTML = footerTemplate;
};
