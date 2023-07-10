import { drawHeader } from "../../components/header/header.js";
import { insertHeaderData } from "../components/header/header.js";
import { drawFooter } from "../../components/footer/footer.js";
import { drawMenubar } from "../../components/menu-bar/menu-bar.js";
import { drawItemList } from "../../components/item-card/item-list-card.js";

// Header, Footer 템플릿 삽입
drawHeader();
drawFooter();

// Menubar 템플릿 삽입
drawMenubar();

// drawItemList 템플릿 삽입
drawItemList();

// Header 메뉴 삽입
insertHeaderData();

const productItemContainer = document.querySelector(".item_list");

addProductItemsToContainer();

function addProductItemsToContainer() {
  Items.forEach((product) => {
    const { name, price, brand, subcategoryId, imageUrl } = product;
    // prodcuct가 몇갠지 알아서 html 요소 생성
    // 그거를 각 키값에 대입함
    // 그러고 그냥 뿌리면 됨
    // 뿌린 아이템을 클릭하면 해당 product url로 가게 만들기
  });
}
