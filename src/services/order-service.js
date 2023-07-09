import { productModel } from "../db/models/product-model.js";
import { orderitemModel } from "../db/models/orderitem-model.js";
import { orderModel } from "../db/models/order-model.js";

class OrderService {
  async addOrder(newOrder, newOrderitem) {
    const createOrder = await orderModel.create(newOrder);
    let createOrderitems = [];
    let result = [];
    let createOrderitem = {};
    if (createOrder) {
      const orderId = createOrder._id;
      const productIds = newOrderitem.productIds;
      for (const productId of productIds) {
        const orderProduct = await productModel.getProdInfo(productId);
        const productName = orderProduct.name;
        const productImg = orderProduct.imageUrl;

        createOrderitem.orderId = orderId;
        createOrderitem.productId = productId;
        createOrderitem.productName = productName;
        createOrderitem.productImg = productImg;
        createOrderitem.quantity = 0;

        createOrderitems.push(createOrderitem);
      }

      const quantitys = newOrderitem.quantitys;
      let cnt = 0;

      for (const quantity of quantitys) {
        createOrderitems[cnt].quantity = quantity;
        const addOrderIfo = await orderitemModel.create(createOrderitems[cnt]);
        if (addOrderIfo) {
          result.push(addOrderIfo);
        }
        cnt++;
      }
    }
    const order = {
      createOrder: createOrder,
      createOrderitems: result,
    };

    return order;
  }

  async getOrder(userId) {
    const orders = await orderModel.getOrder(userId);
    let orderInfo = [];

    for (const order of orders) {
      const orderId = order._id;
      if (orderId) {
        const orderItem = await orderitemModel.getOrderOne(orderId);
        orderInfo.push(orderItem);
      }
    }

    return orderInfo;
  }

  // 수신 받은 주문 정보 수정
  async updateOrderInfo(orderId, toUpdate) {
    const checkUpdate = await orderModel.update(orderId, toUpdate);
    return checkUpdate;
  }

  async updateOrderByAdmin() {}

  // 주문의 배송상태 확인
  async getStateById(orderId) {
    console.log(orderId);
    const order = await orderModel.findByUserId(orderId);
    console.log(order);
    console.log(orderId);
    const checkOrderState = order.state == "배송준비중";
    return checkOrderState;
  }

  // orderId를 가지고 order 삭제
  async deleteOrder(orderId) {
    const deleteData = await orderModel.deleteByOrderId(orderId);

    if (deleteData.deletedCount === 0) {
      throw new Error("주문 삭제 실패");
    }

    return { result: "success" };
  }
}

const orderService = new OrderService();

export { orderService };
