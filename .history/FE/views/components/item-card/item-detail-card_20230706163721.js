export const drawItemCard = () => {
  let itemcardTemplate = `<img
            class="w-50 border border-2 rounded-3"
            src="../../../public/assets/imgs/item-list-card.webp"
            alt="가구"
          />
          <div
            class="item_detail_content d-flex flex-column justify-content-center w-50 ps-5"
          >
            <span class="item_detail_name fs-1">밀튼 침대 Q (매트제외)</span>
            <p class="item_detail_brand text-muted">까사미아</p>
            <p class="item_detail_price fs-3">437,400원</p>
            <p class="item_detail_desc text-muted">
              어디에나 잘 어울리는 클래식한 디자인
            </p>
            <div class="item_detail_quantity mb-3">
              <p>수량옵션</p>
              <button id="minus">-</button>
              <input type="number" />
              <button id="plus">+</button>
            </div>
            <div class="item_detail_option">
              <button class="basket">장바구니 추가하기</button>
              <button class="purchase">바로 구매하기</button>
            </div>
          </div>`;
  // .item_detail_card 부분에 header.html을 삽입
  const ItemCardTag = document.querySelector(".item_detail_card");
  ItemCardTag.innerHTML = itemcardTemplate;
};
