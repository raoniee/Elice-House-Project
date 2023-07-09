export const drawItemCard = () => {
  let itemcardTemplate = `<img
            class="item_detail_img w-50 border border-2 rounded-3"
            src=""
            alt="가구"
          />
          <div
            class="item_detail_content d-flex flex-column justify-content-center w-50 ps-5"
          >
            <span class="item_detail_name fs-1"></span>
            <p class="item_detail_brand text-muted"></p>
            <p class="item_detail_price fs-3"></p>
            <p class="item_detail_desc text-muted"></p>
            <div class="item_detail_quantity mb-3">
              <p>수량옵션</p>
              <button id="minus">-</button>
              <input type="number" value="1" readonly/>
              <button id="plus">+</button>
            </div>
            <p>총 결제 금액</p>
            <p class="item_detail_totalprice fs-3"></p>
            <div class="item_detail_option">
              <button class="cart">장바구니 추가하기</button>
              <button class="purchase">바로 구매하기</button>
            </div>
          </div>`;
  // .item_detail_card 부분에 삽입
  const ItemCardTag = document.querySelector(".item_detail_card");
  ItemCardTag.innerHTML = itemcardTemplate;
};
