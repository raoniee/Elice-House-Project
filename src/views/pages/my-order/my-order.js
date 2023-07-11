import { drawHeader } from "../../components/header/header.js";
import { insertHeaderData } from "../../components/header/header.js";
import { drawFooter } from "../../components/footer/footer.js";
import { drawMyNav } from "../../components/my-nav/my-nav.js";

// Header, Footer 템플릿 삽입
drawHeader();
insertHeaderData();
drawFooter();

// 마이페이지 사이드메뉴 템플릿 삽입
drawMyNav();

// 주문 내역 불러오기
getOrders();

const orderContainer = document.querySelector("#order-container");

const phoneNumberInput = document.querySelector("#phone-number");
const postcodeInput = document.querySelector("#postcode");
const roadAddressInput = document.querySelector("#roadAddress");
const detailAddressInput = document.querySelector("#detailAddress");
const deliveryRequestSelect = document.querySelector("#delivery-request");
const searchAddressBtn = document.querySelector("#search-address-btn");

searchAddressBtn.addEventListener("click", searchAddress);

// async function ordersData() {
//   let data = await fetch("api/orders/64a7db93072b8881f32b5d56").then((res) =>
//     res.json()
//   );

//   return data;
// }

// let orders = await ordersData();
// console.log(orders);

function getOrders() {
  fetch("/api/orders/64a7db93072b8881f32b5d56")
    .then((response) => response.json())
    .then((orders) => {
      // fetch("dummy.json")
      //   .then((response) => response.json())
      //   .then((orders) => {
      console.log(orders);
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
          <tr id="${orderId}">
            <td class="py-3 col-2 align-middle">
              ${orderDate.slice(4)}
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
              <div style="display:none" id="changeable-order">
                <button type="button" class="btn btn-outline-primary btn-sm change-order-btn" data-bs-toggle="modal" data-bs-target="#changeOrderModal">주문 수정</button>
                <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#cancelOrderModal">주문 취소</button>
              </div>
              <span style="display:none" id="unchangeable-order">변경 불가</span>
            </td>
          </tr>
          `
        );

        if (state === "배송준비중") {
          document.querySelector("#changeable-order").style.display = "block";
        } else {
          document.querySelector("#unchangeable-order").style.display = "block";
        }

        //주문 수정창 : 수정 가능 데이터 삽입
        const changeOrderBtn = document.querySelector(".change-order-btn");
        const deliveryRequest = deliveryRequestSelect;
        let isRun = false;
        changeOrderBtn.addEventListener("click", changeOrder);
        function changeOrder(e) {
          e.preventDefault();

          //클릭이벤트 중복 방지
          if (isRun === true) {
            return false;
          }

          phoneNumberInput.value = userPhoneNumber;
          postcodeInput.value = addrNum;
          roadAddressInput.value = roughAddr;
          detailAddressInput.value = detailAddr;
          deliveryRequestSelect.value = deliReq;

          isRun = true;

          //주문 수정 저장
          const saveOrderChangeBtn = document.querySelector(
            "#save-order-change-btn"
          );
          saveOrderChangeBtn.addEventListener("click", saveOrderChange);
          async function saveOrderChange(e) {
            e.preventDefault();

            const changedData = {};
            const phoneNumber = phoneNumberInput.value;
            const postcode = postcodeInput.value;
            const roadAddress = roadAddressInput.value;
            const detailAddress = detailAddressInput.value;
            const deliveryRequest = deliveryRequestSelect.value;

            if (phoneNumber !== userPhoneNumber) {
              changedData.phoneNumber = phoneNumber;
            }

            if (postcode !== addrNum) {
              changedData.postcode = postcode;
            }
            if (roadAddress !== roughAddr) {
              changedData.roadAddress = roadAddress;
            }
            if (detailAddress !== detailAddr) {
              changedData.detailAddress = detailAddress;
            }
            if (deliveryRequest !== deliReq) {
              changedData.deliveryRequest = deliveryRequest;
            }

            if (Object.keys(changedData).length === 0) {
              return alert("수정된 정보가 없습니다");
            }

            console.log(changedData);

            // 수정 사항 업데이트
            // try {
            //   await Api.patch("/api/users", orderId, data);
            //   alert("수정 사항이 저장되었습니다.");
            // } catch (err) {
            //   alert(`오류가 발생하였습니다: ${err}`);
            // }
          }

          //주문 취소
          // const cancelOrderBtn = document.querySelector("#cancel-order-btn");
          // saveOrderChangeBtn.addEventListener("click", cancelOrder);
          // async function cancelOrder(e) {
          //   e.preventDefault();

          //   try {
          //     await Api.delete("/api/orders", orderId);
          //     alert("주문이 취소되었습니다.");

          //     // 삭제한 아이템 화면에서 지우기
          //     const deletedItem = document.querySelector(`#${orderId}`);
          //     deletedItem.remove();
          //   } catch (err) {
          //     alert(`오류가 발생하였습니다: ${err}`);
          //   }
          // }
        }
      }
    });
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
      document.querySelector("#detailAddress").value = "";
    },
  }).open();
}
