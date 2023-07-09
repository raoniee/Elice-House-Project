import { orderService } from "../services/order-service.js";

const OrderController = {
    async createOrder(req, res, next) {
        try{
            const userId = req.body.userId;
            const userName = req.body.userName;
            const userPhoneNumber = req.body.userPhoneNumber;
            const addrNum = req.body.addrNum;
            const roughAddr= req.body.roughAddr;
            const detailAddr = req.body.detailAddr;
            const deliReq = req.body.deliReq;

            // 배열로 들어온다,, 상품과 수량은 각각 같은 인덱스에 저장되어 있다.
            const productIds = req.body.productId;
            const quantitys = req.body.quantity;
            


            const addOrder = await orderService.addOrder({ 
                userId,
                userName,
                userPhoneNumber,
                addrNum,
                roughAddr,
                detailAddr,
                deliReq,
             }, {
                productIds,
                quantitys,
             });


            res.status(201).json(addOrder);
        } catch(error) {
            next(error);
        }
    },

    async getUserOrder(req, res, next) {
        try {
            const userId = req.params.userId;
            const userOrderInfo = await orderService.getOrder(userId);

            res.status(200).json(userOrderInfo);
        } catch (error) {
            next(error);
        }
    }

};

export { OrderController };