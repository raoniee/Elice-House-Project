import { drawHeaderMenu } from "../../components/header/header-menu.js";
import { insertHeaderCategoryData } from "../../components/header/header-category.js";
import { drawFooter } from "../../components/footer/footer.js";

// Header 삽입
drawHeaderMenu();
insertHeaderCategoryData();

//Footer 삽입
drawFooter("../../public/assets/imgs/EliceHouse_logo.png");

const MyOderBTN = document.querySelector("#my-order");
const MainBTN = document.querySelector("#main");

MyOderBTN.addEventListener("click", () => {
  location.href = `/mypage/order`;
});
MainBTN.addEventListener("click", () => {
  location.href = `/`;
});
