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

            const productId = req.body.productId;
            const quantity = req.body.quantity;

            const addOrder = await orderService.addOrder({ 
                userId,
                userName,
                userPhoneNumber,
                addrNum,
                roughAddr,
                detailAddr,
                deliReq,
             }, {
                productId,
                quantity,
             });


            res.status(201).json(addOrder);
        } catch(error) {
            next(error);
        }
    },

};

export { OrderController };