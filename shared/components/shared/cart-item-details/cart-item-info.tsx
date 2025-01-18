import { cn } from "@/shared/lib/utils";

interface Props {
  name: string;
  details: string;
  className?: string;
}

/**
 * Компонент, отображающий имя и детали товара в корзине.
 *
 * @param {Object} props - Свойства для компонента.
 * @param {string} props.name - Имя товара в корзине.
 * @param {string} props.details - Дополнительные детали о товаре в корзине.
 * @param {string} [props.className] - Необязательный дополнительный CSS-класс для стилизации.
 *
 * @returns {ReactElement} Отрисовка информации о товаре в корзине.
 */

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
  return (
    <div>
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};
