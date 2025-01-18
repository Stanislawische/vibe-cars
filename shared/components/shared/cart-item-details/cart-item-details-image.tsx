import { cn } from "@/shared/lib/utils";


interface Props {
  src: string;
  className?: string;
}

/**
 * Компонент, отображающий изображение с фиксированной шириной и высотой.
 *
 * @param src - URL-адрес источника изображения.
 * @param className - Дополнительные CSS-классы для добавления к изображению.
 *
 * @example
 * <CartItemDetailsImage src="https://example.com/image.jpg" />
 */
export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <img className={cn('w-[120px] h-[60px]', className)} src={src} />;
};
