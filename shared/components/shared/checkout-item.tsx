

import React from "react";
import { X } from "lucide-react";
import * as CartItemDetails from "./cart-item-details";
import { cn } from "@/shared/lib/utils";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

/**
 * Компонент /checkout, отображающий информацию о добавленном в корзину автомобиле,
 * включая его картинку, название, цену, количество, информацию о нем,
 * кнопку изменения количества, кнопку удаления.
 *
 * @param {Object} props - Объект с пропсами.
 * @prop {string} name - Название автомобиля.
 * @prop {number} price - Цена автомобиля.
 * @prop {string} imageUrl - URL-адрес картинки автомобиля.
 * @prop {number} quantity - Количество автомобилей.
 * @prop {string} details - Информация о автомобиле.
 * @prop {string} [className] - Дополнительные CSS-классы для
 *    применения к блоку.
 * @prop {boolean} [disabled] - Флаг, означающий, что кнопки
 *    изменения количества и удаления неактивны.
 * @prop {(type: "plus" | "minus") => void} onClickCountButton -
 *    Функция, вызываемая при изменении количества автомобиля.
 * @prop {() => void} onClickRemove - Функция, вызываемая при
 *    удалении автомобиля.
 *
 * @returns {ReactElement} Отрисовываемый блок.
 */
export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        { "opacity-20 pointer-events-none bg-primary": disabled },
        className
      )}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetails.CountButton
          onClick={onClickCountButton}
          value={quantity}
        />
        <button type="button" onClick={onClickRemove}>
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
