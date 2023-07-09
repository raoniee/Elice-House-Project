import { productModel } from "../db/models/product-model.js";
import { orderitemModel } from "../db/models/orderitem-model.js";
import { orderModel } from "../db/models/order-model.js";


class OrderService {
    async addOrder(newOrder, newOrderitem) {
        const createOrder = await orderModel.create(newOrder);
        let createOrderitem= {};
        if (createOrder) {
            const orderId = createOrder._id;
            const productId = newOrderitem.productId;
            
            const orderProduct  = await productModel.getProdInfo(productId);
            const productName = orderProduct.name;
            const productImg = orderProduct.imageUrl;
            
            const quantity = newOrderitem.quantity;

            createOrderitem = await orderitemModel.create({
                orderId,
                productId,
                productName,
                productImg,
                quantity,
            });
        }
        const order = {
            createOrder : createOrder,
            createOrderitem: createOrderitem
        }
        
        return order;
    }

    
}

const orderService = new OrderService();

export { orderService };