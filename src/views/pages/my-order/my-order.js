import { drawHeaderMenu } from "../../components/header/header-menu.js";
import { insertHeaderCategoryData } from "../../components/header/header-category.js";
import { drawFooter } from "../../components/footer/footer.js";
import * as Api from "../../apiUtil";
import { drawMyNav } from "../../components/my-nav/my-nav.js";

// Header 삽입
drawHeaderMenu();
insertHeaderCategoryData();

//Footer 삽입
drawFooter("../../public/assets/imgs/EliceHouse_logo.png");

// 마이페이지 사이드메뉴 템플릿 삽입
drawMyNav();

// 주문 내역 불러오기
getOrders();

const orderContainer = document.querySelector("#order-container");

const phoneNumberInput = document.querySelector("#phone-number");
const postcodeInput = document.querySelector("#postcode");
const roadAddressInput = document.querySelector("#roadAddress");
const detailAddressInput = document.querySelector("#detailAddress");
const searchAddressBtn = document.querySelector("#search-address-btn");
const deliveryRequestSelect = document.querySelector("#delivery-request");

searchAddressBtn.addEventListener("click", searchAddress);

async function getOrders() {
  //주문 데이터 가져오기
  const orders = await Api.get("/api/orders");

  //주문 내역 리스트, 주문 수정 창에 기존 데이터 입력
  for (const order of orders) {
    const {
      orderDate,
      orderId,
      state,
      userPhoneNumber,
      addrNum,
      roughAddr,
      detailAddr,
      deliReq,
      productName,
      quantity,
      price,
    } = order;

    // 상품명
    let productList;
    if (productName.length === 1) {
      productList = productName[0];
    } else {
      productList = `${productName[0]} 외 ${productName.length - 1}건`;
    }

    // 총 가격
    let orderPrice = 0;
    for (let i = 0; i < price.length; i++) {
      orderPrice += quantity[i] * price[i];
    }

    // 주문 내역 삽입
    orderContainer.insertAdjacentHTML(
      "afterbegin",
      `
            <tr>
              <td class="py-3 col-2 align-middle">
                ${orderDate.slice(0, 11)}
              </td>
              <td class="py-3 col-4 align-middle">
                ${productList}
              </td>
              <td class="py-3 align-middle">
                ${orderPrice.toLocaleString("ko-KR")}원
              </td>
              <td class="py-3 align-middle">
              ${state}
              </td>
              <td class="py-3 align-middle">
                <div style="display:none" class="changeable-order">
                  <button type="button" id="change-${orderId}" class="btn btn-outline-primary btn-sm change-order-btn">주문 수정</button>
                  <button type="button" id="delete-${orderId}" class="btn btn-outline-primary btn-sm del-order-btn">주문 취소</button>
                </div>
                <span style="display:none" class="unchangeable-order">변경 불가</span>
              </td>
            </tr>
            `
    );

    if (state === "배송준비중") {
      document.querySelector(".changeable-order").style.display = "block";
    } else {
      document.querySelector(".unchangeable-order").style.display = "block";
    }

    //주문 수정창 : 수정 가능 데이터 삽입
    const changeOrderBtn = document.querySelector(`#change-${orderId}`);
    const deliveryRequest = deliveryRequestSelect;

    changeOrderBtn.addEventListener("click", changeOrder);
    function changeOrder(e) {
      e.preventDefault();
      openModal();

      phoneNumberInput.value = userPhoneNumber;
      postcodeInput.value = addrNum;
      roadAddressInput.value = roughAddr;
      detailAddressInput.value = detailAddr;
      deliveryRequestSelect.value = deliReq;

      let changedOrder = {
        orderId: this.id.slice(7),
        userPhoneNumber,
        addrNum,
        roughAddr,
        detailAddr,
        deliReq,
      };

      return saveOrderChange(changedOrder);
    }

    //주문 취소
    const deleteOrderBtn = document.querySelector(`#delete-${orderId}`);
    deleteOrderBtn.addEventListener("click", deleteOrder);
    function deleteOrder(e) {
      let deletedOrder = this.id.slice(7);

      return confirmDeleteOrder(deletedOrder);
    }
  }

  //주문 수정 사항 저장
  const saveOrderChangeBtn = document.querySelector("#save-order-change-btn");
  const cancelChangeBtn = document.querySelector("#cancel-change-btn");
  async function saveOrderChange(changedOrder) {
    const {
      orderId,
      userPhoneNumber,
      addrNum,
      roughAddr,
      detailAddr,
      deliReq,
    } = changedOrder;

    saveOrderChangeBtn.addEventListener("click", async () => {
      const changedData = {};
      const newPhoneNumber = phoneNumberInput.value;
      const newPostcode = postcodeInput.value;
      const newRoadAddress = roadAddressInput.value;
      const newDetailAddress = detailAddressInput.value;
      const newDeliveryRequest = deliveryRequestSelect.value;

      if (!newPhoneNumber || !newDetailAddress) {
        return alert("배송지 정보를 모두 입력해 주세요.");
      }

      if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(newPhoneNumber)) {
        return alert("유효하지 않은 전화번호입니다.");
      }

      if (newPhoneNumber !== userPhoneNumber) {
        changedData.userPhoneNumber = newPhoneNumber;
      }

      if (newPostcode !== addrNum) {
        changedData.addrNum = newPostcode;
      }
      if (newRoadAddress !== roughAddr) {
        changedData.roughAddr = newRoadAddress;
      }
      if (newDetailAddress !== detailAddr) {
        changedData.detailAddr = newDetailAddress;
      }

      if (newDeliveryRequest !== deliReq) {
        changedData.deliReq = newDeliveryRequest;
      }

      if (Object.keys(changedData).length === 0) {
        alert("수정된 정보가 없습니다");
        window.location.reload();
      } else {
        await Api.patch("/api/orders", orderId, changedData);
        alert("수정 사항이 저장되었습니다.");
        window.location.reload();
      }
    });

    cancelChangeBtn.addEventListener("click", async () => {
      closeModal();
      window.location.reload();
    });
  }

  //주문 취소
  async function confirmDeleteOrder(deletedOrder) {
    const confirmRes = confirm("정말로 취소하시겠습니까?");
    //confirm 응답이 true인 경우 삭제 api 실행
    if (confirmRes === true) {
      // 삭제 함수 실행
      await Api.delete("/api/orders", deletedOrder, {});
      alert("주문이 취소되었습니다.");
      // 삭제 후 새로고침으로 삭제확인
      window.location.reload();
    } else {
      window.location.reload();
    }
  }
}

function openModal() {
  document.querySelector("#changeOrderModal").style.display = "block";
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.querySelector("#changeOrderModal").style.display = "none";
  document.body.style.overflow = "auto";
}

//주소 찾기
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      const { roadAddress: roadAddr } = data; // 도로명 주소 변수

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("roadAddress").value = roadAddr;
      document.getElementById("detailAddress").value = "";
    },
  }).open();
}
