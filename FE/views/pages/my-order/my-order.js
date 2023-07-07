import { drawHeader } from "../../components/header/header.js";
import { drawFooter } from "../../components/footer/footer.js";
import { drawMyNav } from "../../components/my-nav/my-nav.js";

// Header, Footer 템플릿 삽입
drawHeader();
drawFooter();

// 마이페이지 사이드메뉴 템플릿 삽입
drawMyNav();

// 임시 데이터
import * as mockdata from "./mockdata.js";

const orderContents = document.querySelector("#order-contents");

const searchAddressBtn = document.querySelector("#search-address-btn");

searchAddressBtn.addEventListener("click", searchAddress);

window.onload = function getOrders() {
  const data = mockdata.data;

  for (let i = data.length - 1; i >= 0; i--) {
    const orderBox = document.createElement("tr");
    const orderDate = data[i].orderDate;
    const orderDeliverState = data[i].deliverState;

    orderBox.innerHTML = `
      <td class="py-3 col-2 align-middle">
        ${orderDate.slice(0, 10)}
      </td>
      <td class="py-3 col-4 align-middle">
        상품명
      </td>
      <td class="py-3 col-1 align-middle">
        1
      </td>
      <td class="py-3 align-middle">
        100,000원
      </td>
      <td class="py-3 align-middle">
        ${data[i].deliverState}
      </td>
      <td class="py-3 align-middle">
      </td>
    `;

    if (data[i].deliverState === "배송준비") {
      orderBox.lastElementChild.innerHTML = `
        <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#changeOrderModal">주문 수정</button>
        <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#cancelOrderModal">주문 취소</button>
      `;
    } else {
      orderBox.lastElementChild.innerHTML = `
        변경 불가
      `;
    }

    orderContents.appendChild(orderBox);
  }
};

function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var extraRoadAddr = ""; // 참고 항목 변수

      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr +=
          extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("roadAddress").value = roadAddr;
      document.getElementById("jibunAddress").value = data.jibunAddress;
    },
  }).open();
}
