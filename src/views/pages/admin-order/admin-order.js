// import * as orderMockdata from "./order-mockdata.js";
import {
  makeAdminNav,
  clickNavbar,
  checkAdmin,
} from "../../components/admin-nav/admin-nav.js";
import * as apiUtil from "../../apiUtil.js";

//admin navbar 생성
makeAdminNav();
clickNavbar();
checkAdmin();

const listContainer = document.querySelector("#list-container");

// 주문 정보 리스트 박스 생성 함수
async function makeOrderBox() {
  // 데이터 정의
  const data = await apiUtil.get("/api/admin/orders");
  console.log(data);
  // const data = orderMockdata.data;

  for (let i = 0; i < data.length; i++) {
    const orderBox = document.createElement("div");
    orderBox.className = "order-box";

    // 주문 정보 (주문 날짜, 주문 시간, 주문번호)
    const orderInfo = document.createElement("div");
    orderInfo.className = "order-info";

    orderInfo.innerHTML = `
  <p><b>주문 일자</b>: ${data[i].orderDate}</p>
  <p><b>주문 시간</b>: ${data[i].orderTime}</p>
  <p><b>주문 번호</b>: ${data[i].orderId}</p>
  <p><b>요청 사항</b>: ${data[i].deliReq}</p>`;

    // 주문 고객 정보 (이름, 전화번호, 이메일, 주소)
    const orderUserInfo = document.createElement("div");
    orderUserInfo.className = "order-user-info";
    orderUserInfo.innerHTML = `
  <p><b>성명</b>: ${data[i].userName}</p>
  <p><b>Email</b>: ${data[i].email}</p>
  <p><b>전화번호</b>: ${data[i].userPhoneNumber}</p>
  <p><b>주소</b>: ${data[i].roughAddr} ${data[i].detailAddr}</p>`;

    // 배송 상태 변경 및 주문삭제
    const orderStateModify = document.createElement("div");
    orderStateModify.className = "order-state";
    orderStateModify.innerHTML = `
  <div><b>배송 상태</b>: ${data[i].state}</div>
  <label><b>배송상태변경</b></label>
  <select id="${data[i].orderId}"class="deliver-state-select">
  <option>배송준비중</option>
  <option>배송중</option>
  <option>배송완료</option>
  </select>
  <button id="${data[i].orderId}"type="button" class="btn btn-dark btn-sm del-order-btn">주문삭제</button>
  `;

    const orderProductInfo = document.createElement("div");

    orderProductInfo.innerHTML = `
  <p><b>상품명</b></p>
  <p><b>상품개수<b></p>
  <p><b>총 가격<b></p>
  `;
    // del-order-btn 클래스 >>> 추후 삭제 eventlistner 적용

    // 정보 병합
    // orderBox = orderInfo + orderUserInfo + orderStateModify
    orderBox.appendChild(orderInfo);
    orderBox.appendChild(orderUserInfo);
    // orderBox.appendChild(orderProductInfo);
    orderBox.appendChild(orderStateModify);
    listContainer.appendChild(orderBox);
  }

  // 주문 삭제 버튼 이벤트 추가
  deleteOrder();
  // 배송 상태 변경시 작동
  changeDeliverState();
}

// 주문 삭제 버튼에 적용할 함수
function deleteOrder() {
  // 버튼을 누르면 데이터 삭제 >> orderBox 사라짐
  const deleteOrderBtns = document.querySelectorAll(".del-order-btn");
  if (deleteOrderBtns && Array.from(deleteOrderBtns).length) {
    deleteOrderBtns.forEach((btn) =>
      btn.addEventListener("click", async () => {
        const confirmRes = confirm("정말로 삭제하시겠습니까?");
        // confirm 응답이 true인 경우 삭제 api 실행
        if (confirmRes === true) {
          // 삭제 함수 실행
          await apiUtil.delete("/api/admin/orders", btn.id);
          // 삭제 후 새로고침으로 삭제확인
          location.reload();
        }
      })
    );
  }
}

//배송 상태 변경 함수
function changeDeliverState() {
  const orderStateSelects = document.querySelectorAll(".deliver-state-select");
  if (orderStateSelects && Array.from(orderStateSelects).length) {
    orderStateSelects.forEach((select) =>
      select.addEventListener("change", async () => {
        const patchOrderData = { state: select.value };
        console.log(select.id, patchOrderData);
        await apiUtil.adminPatch(
          "/api/admin/orders",
          select.id,
          patchOrderData
        );
        location.reload();
      })
    );
  }
}

window.onload = makeOrderBox();
