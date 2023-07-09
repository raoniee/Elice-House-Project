import { productModel } from "../db/models/product-model.js";
import { orderitemModel } from "../db/models/orderitem-model.js";
import { orderModel } from "../db/models/order-model.js";


class OrderService {
    async addOrder(newOrder, newOrderitem) {
        const createOrder = await orderModel.create(newOrder);
        let createOrderitems = [];
        let result = [];
        let createOrderitem= {};  
        if (createOrder) {
            
            const orderId = createOrder._id;
            const productIds = newOrderitem.productIds;
            for (const productId of productIds) {
                const orderProduct  = await productModel.getProdInfo(productId);
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
                    result.push(addOrderIfo)
                }
                cnt++;
            }

        }
        const order = {
            createOrder : createOrder,
            createOrderitems: result
        }
        
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
}

const orderService = new OrderService();

export { orderService };