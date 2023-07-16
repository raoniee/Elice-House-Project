import { orderService } from "../services/order-service.js";

const OrderController = {
  async createOrder(req, res, next) {
    try {
      const userId = req.body.userId;
      const userName = req.body.userName;
      const userPhoneNumber = req.body.userPhoneNumber;
      const addrNum = req.body.addrNum;
      const roughAddr = req.body.roughAddr;
      const detailAddr = req.body.detailAddr;
      const deliReq = req.body.deliReq;

      // 배열로 들어온다,, 상품과 수량은 각각 같은 인덱스에 저장되어 있다.
      const productIds = req.body.productId;
      const quantitys = req.body.quantity;

      const addOrder = await orderService.addOrder(
        {
          userId,
          userName,
          userPhoneNumber,
          addrNum,
          roughAddr,
          detailAddr,
          deliReq,
        },
        {
          productIds,
          quantitys,
        }
      );

      res.status(201).json(addOrder);
    } catch (error) {
      next(error);
    }
  },

  async getUserOrder(req, res, next) {
    try {
      const userId = req.body.userId;
      const userOrderInfo = await orderService.getOrder(userId);

      res.status(200).json(userOrderInfo);
    } catch (error) {
      next(error);
    }
  },

  async getAdminOrder(req, res, next) {
    try {
      const getAllOrder = await orderService.getAll();

      res.status(200).json(getAllOrder);
    } catch (error) {
      next(error);
    }
  },

  async updateOrderByUser(req, res, next) {
    try {
      const orderId = req.params.orderId;
      const {
        userName,
        userPhoneNumber,
        addrNum,
        roughAddr,
        detailAddr,
        quantity,
        deliReq,
      } = req.body;

      const toUpdate = {
        ...(userName && { userName }),
        ...(userPhoneNumber && { userPhoneNumber }),
        ...(addrNum && { addrNum }),
        ...(roughAddr && { roughAddr }),
        ...(detailAddr && { detailAddr }),
        ...(quantity && { quantity }),
        ...(deliReq && { deliReq }),
      };

      const isBeforeShipping = orderService.getStateById(orderId);

      if (!isBeforeShipping) {
        throw new Error("이미 배송중입니다.");
      }

      const checkUpdate = await orderService.updateOrderInfo(orderId, toUpdate);

      res.status(200).json(checkUpdate);
    } catch (error) {
      next(error);
    }
  },

  async updateOrderByAdmin(req, res, next) {
    try {
      const orderId = req.params.orderId;
      const state = req.body.state;

      const checkUpdate = await orderService.updateOrderInfo(orderId, {
        state,
      });

      res.status(200).json(checkUpdate);
    } catch (error) {
      next(error);
    }
  },

  async deleteOrderByUser(req, res, next) {
    try {
      // order 삭제

      const orderId = req.params.orderId;

      const isBeforeShipping = orderService.getStateById(orderId);

      if (!isBeforeShipping) {
        throw new Error("이미 배송중입니다.");
      }

      const checkDeleteOrder = await orderService.deleteOrder(orderId);

      // res.status(200).json(checkDelete);

      // orderItem 삭제.
      // const checkDeleteOrderItems = await orderService.deleteOrderItem(orderId);
      res.status(200).json(checkUpdate);
    } catch (error) {
      next(error);
    }
  },

  async deleteOrderByAdmin(req, res, next) {
    try {
      // order 삭제
      // orderItem 삭제
    } catch (error) {
      next(error);
    }
  },
  async deleteOrderByUser(req, res, next) {
    try {
      const orderId = req.params.orderId;

      // 배송 전인지 확인
      const isBeforeShipping = await orderService.getStateById(orderId);

      if (!isBeforeShipping) {
        throw new Error("이미 배송시작되었습니다.");
      }

      // orderId로 order 삭제
      const checkDeleteOrder = await orderService.deleteOrder(orderId);

      // orderItem 삭제
      const checkDeleteOrderItems = await orderService.deleteOrderItems(
        orderId
      );

      const result = {
        deletedOrder: checkDeleteOrder,
        deletedOrderItems: checkDeleteOrderItems,
      };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async deleteOrderByAdmin(req, res, next) {
    try {
      const orderId = req.params.orderId;

      // orderId로 order 삭제
      const checkDeleteOrder = await orderService.deleteOrder(orderId);

      // orderItem 삭제
      const checkDeleteOrderItems = await orderService.deleteOrderItems(
        orderId
      );

      const result = {
        deletedOrder: checkDeleteOrder,
        deletedOrderItems: checkDeleteOrderItems,
      };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

export { OrderController };
