import { calcCartItemTotalPrice } from ".";
import { CartDTO } from "../services/dto/cart.dto";

export type CartStateItem ={
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled?: boolean;
    gearboxType: number | null;
    color: number | null;
    plan: Array<{name: string; price: number}>;
  }

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

/**
 * Принимает объект передачи данных корзины, возвращает 
 * массив элементов корзины со всеми данными, 
 * а также общую сумму.
 *
 * @param {CartDTO} data - Объект передачи данных корзины.
 *
 * @returns {ReturnProps} - Объект с массивом элементов корзины 
 *                         и общей суммой.
 */
export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({ 
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        disabled: false,
        price: calcCartItemTotalPrice(item),
        gearboxType: item.productItem.gearbox,
        color: item.productItem.color,
        plan: item.plan.map((plans) => ({
            name: plans.name,
            price: plans.price
        }))
    })) as CartStateItem[]

    return {
        items,
        totalAmount: data.totalAmount,
    }
}