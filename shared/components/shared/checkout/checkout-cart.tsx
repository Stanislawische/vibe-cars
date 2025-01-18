import React from "react";
import { CheckoutItem, ZincBlock } from "..";
import { getCartItemDetails } from "@/shared/lib";
import { colorType, gearboxType } from "@/shared/constants/car";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { Skeleton } from "../../ui";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

/**
 * Компонент, отображающий список добавленных в корзину автомобилей.
 *
 * @param {Object} props - Объект с пропсами.
 * @prop {CartStateItem[]} items - Массив объектов, содержащий информацию о добавленных в корзину автомобилях.
 * @prop {string} [className] - Дополнительные CSS-классы для применения к блоку.
 * @prop {(id: number, quantity: number, type: "plus" | "minus") => void} onClickCountButton - Функция, вызываемая при изменении
 *    количества автомобиля.
 * @prop {(id: number) => void} removeCartItem - Функция, вызываемая при удалении автомобиля из корзины.
 *
 * @returns {ReactElement} Отрисовываемый блок.
 */
export const CheckoutCart: React.FC<Props> = ({
  items,
  className,
  removeCartItem,
  loading,
  onClickCountButton,
}) => {
  return (
    <ZincBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-2">
        {loading
          ? [...Array(1)].map((_, index) => (
              <Skeleton className="h-[76px]" key={index} />
            ))
          : items.map((item) => (
              <CheckoutItem
                className="p-2 rounded-3xl"
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                quantity={item.quantity}
                details={getCartItemDetails(
                  item.plan,
                  item.gearboxType as gearboxType,
                  item.color as colorType
                )}
                disabled={item.disabled}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </ZincBlock>
  );
};
