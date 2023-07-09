export const drawMyNav = () => {
  let myNavTemplate = `
    <h1 class="fs-3 mb-3">마이페이지</h1>
    <ul class="nav nav-pills flex-column">
      <li><a href="#" class="nav-link link-dark">주문/배송 조회</a></li>
      <li><a href="#" class="nav-link link-dark">내 정보 수정</a></li>
    </ul>
    `;
  // .my-nav 부분에 삽입
  const myNavTag = document.querySelector(".my-nav");
  myNavTag.innerHTML = myNavTemplate;
};
