import { drawHeaderMenu } from "../components/header/header-menu.js";
import { insertHeaderCategoryData } from "../components/header/header-category.js";
import { drawFooter } from "../components/footer/footer.js";
// import { get } from "../apiUtil";

// Header 삽입.
drawHeaderMenu();
insertHeaderCategoryData();

//Footer 삽입
drawFooter("../public/assets/imgs/EliceHouse_logo.png");
