import { productModel } from "../db/models/product-model.js";
import { orderitemModel } from "../db/models/orderitem-model.js";
import { orderModel } from "../db/models/order-model.js";

class OrderService {
  async addOrder(newOrder, newOrderitem) {
    const createOrder = await orderModel.create(newOrder);
    let createOrderitems = [];
    let result = [];
    if (createOrder) {
      const orderId = createOrder._id;
      const productIds = newOrderitem.productIds;
      for (const productId of productIds) {
        const orderProduct = await productModel.getProdInfo(productId);
        const productName = orderProduct.productName;
        const productImg = orderProduct.imageUrl;
        const price = orderProduct.price;

        const createOrderitem = {};

        createOrderitem.orderId = orderId;
        createOrderitem.productId = productId;
        createOrderitem.productName = productName;
        createOrderitem.productImg = productImg;
        createOrderitem.quantity = 0;
        createOrderitem.price = price;

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
    // console.log("orders :", orders);
    const results = [];
  

    for (const ord of orders) {
      const ordId = ord._id;
      let result = {};
      console.log("ordId : ", ordId)

      result.orderId = ordId;
      result.userPhoneNumber = ord.userPhoneNumber;
      result.orderDate = String(ord.createdAt).slice(0, 15);
      result.state = ord.state;
      result.addrNum = ord.addrNum;
      result.roughAddr = ord.roughAddr;
      result.detailAddr = ord.detailAddr;
      result.deliReq = ord.deliReq;

      if (ordId) {
        const ordItems = await orderitemModel.getOrderId(ordId);
        const productIds = [];
        const productNames = [];
        const productImgs = [];
        const quantitys = [];
        const prices = [];

        for (const ordItem of ordItems) {
          productIds.push(ordItem.productId);
          productNames.push(ordItem.productName);
          productImgs.push(ordItem.productImg);
          quantitys.push(ordItem.quantity);
          prices.push(ordItem.price);
        }
        result.productId = productIds;
        result.productName = productNames;
        result.productImg = productImgs;
        result.quantity = quantitys;
        result.price = prices;
      }
      results.push(result);
    }

    return results;
  }

  async getAll() {
    const orders = await orderModel.getAll();
    const results = [];

    for (const ord of orders) {
      const result = {};
      const createdAt = ord.createdAt.toString();
      const ordId = ord._id;
      result.createdAt = ord.createdAt;
      result.orderDate = String(ord.createdAt).slice(0, 15);
      result.orderTime = String(ord.createdAt).slice(16, 21);
      result.orderId = ord._id;
      result.state = ord.state;
      result.userName = ord.userName;
      result.userId = ord.userId;
      result.userPhoneNumber = ord.userPhoneNumber;
      result.roughAddr = ord.roughAddr;
      result.detailAddr = ord.detailAddr;
      result.deliReq = ord.deliReq;

      if (ordId) {
        const ordItems = await orderitemModel.getOrderId(ordId);
        const productIds = [];
        const productNames = [];
        const productImgs = [];
        const quantitys = [];
        const prices = [];


        for (const ordItem of ordItems) {
          productIds.push(ordItem.productId);
          productNames.push(ordItem.productName);
          productImgs.push(ordItem.productImg);
          quantitys.push(ordItem.quantity);
          prices.push(ordItem.price);
        }
        result.productId = productIds;
        result.productName = productNames;
        result.productImg = productImgs;
        result.quantity = quantitys;
        result.price = prices;
      }
      results.push(result);
    }

    return results;
  }

  // 수신 받은 주문 정보 수정
  async updateOrderInfo(orderId, toUpdate) {
    const checkUpdate = await orderModel.update(orderId, toUpdate);
    return checkUpdate;
  }

  // 주문의 배송상태 확인
  async getStateById(orderId) {
    const order = await orderModel.findByUserId(orderId);
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

  // orderId를 가지고 order 삭제
  async deleteOrder(orderId) {
    const deleteData = await orderModel.deleteByOrderId(orderId);

    if (deleteData.deletedCount === 0) {
      throw new Error("주문 삭제 실패");
    }

    return { result: "success" };
  }

  async deleteOrderItems(orderId) {
    const deleteData = await orderitemModel.deleteByOrderId(orderId);

    if (deleteData.deletedCount === 0) {
      throw new Error("주문 삭제 실패");
    }

    return { result: "success" };
  }
}

const orderService = new OrderService();

export { orderService };
