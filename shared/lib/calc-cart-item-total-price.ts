import { CartItemDTO } from "../services/dto/cart.dto";

/**
 * Рассчитывает общую стоимость позиции в корзине
 *
 * @param {CartItemDTO} item - Позиция в корзине
 * @returns {number} Общая стоимость позиции
 */
export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const planPrice = item.plan.reduce((acc, plan) => acc + plan.price, 0);
    const totalPrice = ((item.productItem.price + planPrice) * item.quantity);

    return Number(totalPrice);
}