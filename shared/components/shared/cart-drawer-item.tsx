/* eslint-disable @typescript-eslint/no-unused-vars */

import { cn } from "@/shared/lib/utils";
import React from "react";

import * as CartItem from "./cart-item-details";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";

interface Props extends CartItemProps {
    onClickCountButton?: (type: "plus" | "minus") => void;
    onClickRemove?: () => void;
    className?: string;
}

/**
 * Компонент CartDrawerItem отображает детали элемента корзины
 * в боковом ящике. Включает изображение, название, цену, количество,
 * информацию о товаре, а также кнопки для изменения количества и
 * удаления товара.
 *
 * @param {string} imageUrl - URL-адрес изображения товара.
 * @param {string} name - Название товара.
 * @param {number} price - Цена товара.
 * @param {number} quantity - Количество товара.
 * @param {string} details - Дополнительная информация о товаре.
 * @param {boolean} [disabled] - Флаг, указывающий, что элемент
 *    корзины неактивен.
 * @param {(type: "plus" | "minus") => void} [onClickCountButton] -
 *    Обработчик изменения количества товара.
 * @param {() => void} [onClickRemove] - Обработчик удаления товара.
 * @param {string} [className] - Дополнительные CSS-классы для
 *    применения к блоку.
 *
 * @returns {ReactElement} Отображаемый элемент корзины.
 */

export const CartDrawerItem: React.FC<Props> = ({
    imageUrl,
    name,
    price,
    quantity,
    details,
    disabled,
    onClickCountButton,
    onClickRemove,
    className,
}) => {
    return (
        <div
            className={cn(
                "flex flex-col bg-zinc-800 p-2 rounded-sm m-2",
                { "opacity-20 pointer-events-none bg-primary": disabled },
                className
            )}>
            <div className="flex flex-1">
                <CartItem.Image src={imageUrl} className="rounded-full" />
                <div className="flex-1 ml-8">
                    {/* Информация о товаре */}
                    <CartItem.Info name={name} details={details} />
                </div>
            </div>
            <hr className="my-2"></hr>
            <div className="flex-1 justify-between ml-2">
                <div className="flex justify-between items-center">
                    {/* Кнопка изменения количества */}
                    <CountButton onClick={onClickCountButton} value={quantity} />

                    {/* Иконка удаления */}
                    <CartItem.Price value={price} className="font-extrabold text-xl" />
                    <Trash2Icon
                        onClick={onClickRemove}
                        className="text-zinc-400 cursor-pointer hover:text-zinc-800"
                        size={24}
                    />
                </div>
            </div>
        </div>
    );
};
