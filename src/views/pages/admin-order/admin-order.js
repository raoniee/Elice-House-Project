import * as orderMockdata from "./order-mockdata.js";

const listContainer = document.querySelector("#list-container");
const adminTitle = document.querySelector("#admin-title");

// 메인 페이지 이동
adminTitle.addEventListener("click", function () {
  location.href = "/admin/main";
});

//db에서 임시 fetch >>> 추후 api.js 사용예정
async function getOrderData() {
  let tempdata = await fetch("/api/admin/orders").then((res) => res.json());

  return tempdata;
}

// 주문 정보 리스트 박스 생성 함수
function makeOrderBox() {
  const data = orderMockdata.data;

  for (let i = 0; i < data.length; i++) {
    const orderBox = document.createElement("div");
    orderBox.className = "order-box";

    // 주문 정보 (주문 날짜, 주문 시간, 주문번호)
    const orderInfo = document.createElement("div");

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
  <select class="deliver-state-select">
  <option>배송준비</option>
  <option>배송중</option>
  <option>배송완료</option>
  </select>
  <button type="button" class="btn btn-dark btn-sm del-order-btn">주문삭제</button>
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
      btn.addEventListener("click", () => confirm("정말로 삭제하시겠습니까?"))
    );
    // confirm >> true/false 받아서 작업필요
    // 추후 데이터 삭제 관련 로직 필요
  }
}

//배송 상태 변경 시 작동하는 기능들을 담을 함수
function changeDeliverState() {
  const orderStateSelects = document.querySelectorAll(".deliver-state-select");
  if (orderStateSelects && Array.from(orderStateSelects).length) {
    orderStateSelects.forEach((select) =>
      select.addEventListener(
        "change",
        () => console.log(select.value)
        // 여기에 데이터 변경 관련 함수 필요 >> data[i].deliverState가 바뀌어야함
      )
    );
  }
  // 백 데이터에 상태변경 정보 반영
}

// navbar 메뉴 클릭시 이동 함수 >>> 추후 component 이동 예정
function clickNavbar() {
  const orderBtn = document.querySelector("#order-btn");
  const productBtn = document.querySelector("#product-btn");
  const categoryBtn = document.querySelector("#category-btn");

  orderBtn.addEventListener("click", function () {
    location.href = "/admin/order";
  });

  productBtn.addEventListener("click", function () {
    location.href = "/admin/product";
  });

  categoryBtn.addEventListener("click", function () {
    location.href = "/admin/category";
  });
}
// navbar 함수 실행
clickNavbar();

window.onload = makeOrderBox();
