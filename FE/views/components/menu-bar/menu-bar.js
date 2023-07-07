export const drawMenubar = () => {
  let menubarTemplate = `<p class="menu-depth1">침실가구</p>
    <p class="arrow">></p>
    <p class="menu-depth2">침대</p>`;
  // .menu_bar 부분에 삽입
  const menu_barTag = document.querySelector(".menu_bar");
  menu_barTag.innerHTML = menubarTemplate;
};
