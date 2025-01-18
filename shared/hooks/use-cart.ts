/* eslint-disable react-hooks/exhaustive-deps */

import { useShallow } from 'zustand/shallow';
import { useCartStore } from '../store';
import React from 'react';
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { CartStateItem } from '../lib/get-cart-details';

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[];
	loading: boolean;
	updateItemQuantity: (id: number, quantity: number) => void;
	removeCartItem: (id: number) => void;
	addCartItem: (values: CreateCartItemValues) => void;
};

/**
 * Hook, который возвращает объект, содержащий информацию о корзине:
 * общую сумму, массив элементов корзины, и функции для
 * обновления количества элемента, удаления элемента и
 * добавления нового элемента.
 *
 * @returns {ReturnProps}
 */
export const useCart = (): ReturnProps => {
	const cartState = useCartStore(useShallow((state) => state));

	React.useEffect(() => {
		cartState.fetchCartItems();
	}, []);

	return cartState;
};

