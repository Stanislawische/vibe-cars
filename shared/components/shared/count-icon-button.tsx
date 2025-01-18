import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui';
import { cn } from '@/shared/lib/utils';
import { CountButtonProps } from './count-button';

interface IconButtonProps {
  size?: CountButtonProps['size'];
  disabled?: boolean;
  type?: 'plus' | 'minus';
  onClick?: () => void;
}

/**
 * Кнопка с иконкой + или -, для использования в компоненте CountButton.
 *
 * @example
 * <CountIconButton type="plus" onClick={() => console.log('clicked')} />
 *
 * @param {IconButtonProps} props
 *
 * @prop {CountButtonProps['size']} [size='sm'] - Размер кнопки.
 * @prop {boolean} [disabled=false] - Флаг, указывающий, что кнопка disabled.
 * @prop {'plus' | 'minus'} [type] - Тип кнопки.
 * @prop {() => void} [onClick] - Функция, вызываемая при клике на кнопку.
 */
export const CountIconButton: React.FC<IconButtonProps> = ({
  size = 'sm',
  disabled,
  type,
  onClick,
}) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={cn(
        'p-0 bg-zinc-700 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
        size === 'sm' ? 'w-[30px] h-[30px] rounded-[10px]' : 'w-[38px] h-[38px] rounded-md',
      )}>
      {type === 'plus' ? (
        <Plus className={size === 'sm' ? 'h-4' : 'h-5'} />
      ) : (
        <Minus className={size === 'sm' ? 'h-4' : 'h-5'} />
      )}
    </Button>
  );
};
