
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

/**
 * Получает текущие детали корзины с сервера.
 * 
 * @returns {Promise<CartDTO>} Обещание, которое разрешается в объект передачи данных корзины, содержащий текущие элементы корзины и общую сумму.
 */

export const getCart = async (): Promise<CartDTO> => {
    return (await axiosInstance.get<CartDTO>(ApiRoutes.CART)).data
}

/**
 * Обновляет количество позиции корзины с указанным ID.
 * 
 * @param {number} itemId ID обновляемой позиции.
 * @param {number} quantity Новое количество.
 * 
 * @returns {Promise<CartDTO>} Обещание, которое разрешается в обновленный объект передачи данных корзины.
 */

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    return (await axiosInstance.patch<CartDTO>(ApiRoutes.CART_ID + itemId , { quantity })).data
}


/**
 * Удаляет позицию корзины с указанным ID.
 * 
 * @param {number} itemId ID удаляемой позиции.
 * 
 * @returns {Promise<CartDTO>} Обещание, которое разрешается в обновленный объект передачи данных корзины.
 */

export const removeCartItem = async (itemId: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>(ApiRoutes.CART_ID + itemId )).data
}

/**
 * Добавляет новый элемент в корзину.
 * 
 * @param {CreateCartItemValues} values Объект, содержащий ID готового автомобиля и желаемое количество элемента.
 * 
 * @returns {Promise<CartDTO>} Обещание, которое разрешается в обновленный объект передачи данных корзины.
 */
export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>(ApiRoutes.CART, values)).data
}