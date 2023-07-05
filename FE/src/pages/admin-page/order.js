import * as mockdata from "./mockdata.js";

const orderBtn = document.querySelector("#order-btn");
const listContainer = document.querySelector("#list-container");
const adminTitle = document.querySelector("#admin-title");

adminTitle.addEventListener("click", function () {
  location.reload();
});

// 화면 초기화 함수 >> makeOrderBox 함수가 계속 list 생성하는 것 방지
function initOrderPage() {
  listContainer.innerHTML = "";
}

// 주문 정보 리스트 박스 생성 함수
function makeOrderBox() {
  initOrderPage();

  // const data = mockdata.data[0];
  let data = mockdata.data;

  for (let i = 0; i < data.length; i++) {
    const orderBox = document.createElement("div");
    orderBox.className = "order-box";

    // 주문 정보 (주문 날짜, 주문 시간, 주문번호)
    const orderInfo = document.createElement("div");
    const orderDate = data[i].orderDate;
    orderInfo.innerHTML = `
  <p><b>주문 일자</b>: ${orderDate.slice(0, 10)}</p>
  <p><b>주문 시간</b>: ${orderDate.slice(11, 19)}</p>
  <p><b>주문 번호</b>: ${data[i].orderNumber}</p>
  
  <p><b>요청 사항</b>: ${data[i].deliverRequest}</p>`;

    // 주문 고객 정보 (이름, 전화번호, 이메일, 주소)
    const orderUserInfo = document.createElement("div");
    orderUserInfo.className = "order-user-info";
    orderUserInfo.innerHTML = `
  <p><b>성명</b>: ${data[i].userName}</p>
  <p><b>Email</b>: ${data[i].userEmail}</p>
  <p><b>전화번호</b>: ${data[i].userPhoneNumber}</p>
  <p><b>주소</b>: ${data[i].userAddress}</p>`;

    // 배송 상태 변경 및 주문삭제
    const orderStateModify = document.createElement("div");
    orderStateModify.className = "order-state";
    orderStateModify.innerHTML = `
  <div><b>배송 상태</b>: ${data[i].deliverState}</div>
  <label><b>배송상태변경</b></label>
  <select class=".deliver-state-select">
  <option>배송준비</option>
  <option>배송중</option>
  <option>배송완료</option>
  </select>
  <button type="button" class="btn btn-dark btn-sm del-order-btn">주문삭제</button>
  `;

    // 3줄 구성을 위해 잠시 주석처리함
    // // 배송 상태 정보
    // const deliverState = document.createElement("div");
    // deliverState.innerHTML = `${data.deliverState}`;
    // // 배송 요청 사항
    // const deliverRequest = document.createElement("div");
    // deliverRequest.innerHTML = `${data.deliverRequest}`;

    // 정보 병합
    // orderBox = orderInfo + orderUserInfo + deliverState + deliverRequest
    orderBox.appendChild(orderInfo);
    orderBox.appendChild(orderUserInfo);
    orderBox.appendChild(orderStateModify);
    // orderBox.appendChild(deliverState);
    // orderBox.appendChild(deliverRequest);
    listContainer.appendChild(orderBox);
  }
  // 배송 상태 변경시 작동
  const orderStateSelects = document.querySelectorAll(".deliver-state-select");
  // orderStateSelects.addEventListener("change", alert("hello"));
}

// 주문 삭제 버튼에 적용할 함수
function deleteOrder() {
  // 백 데이터 받아와서, 데이터를 없애면 자동으로 orderBox 사라지게 해야함
  const deleteOrderBtns = document.querySelectorAll(".del-order-btn");
}

//배송 상태 변경 시 작동하는 기능들을 담을 함수
function changeDeliverState() {
  alert("배송 상태가 변경되었습니다.");
  // 백 데이터에 상태변경 정보 반영
}

orderBtn.addEventListener("click", makeOrderBox);
