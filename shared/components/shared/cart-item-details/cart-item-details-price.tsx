import { cn } from "@/shared/lib/utils";


interface Props {
  value: number;
  className?: string;
}

/**
 * Отображает цену элемента корзины.
 *
 * @param {number} value - Цена элемента.
 * @param {string} [className] - Дополнительный CSS класс.
 */

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} BYN</h2>;
};
