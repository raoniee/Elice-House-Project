import * as mockdata from "./mockdata.js";

const orderContents = document.querySelector("#order-contents");

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
