import React from 'react';
import { cn } from '@/shared/lib/utils';
import { CountIconButton } from '.';

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  className?: string;
  onClick?: (type: 'plus' | 'minus') => void;
}

/**
 * Отрисовывает компонент, позволяющий пользователю увеличивать или уменьшать значение.
 *
 * @example
 * <CountButton value={3} onClick={(type) => console.log(type)} />
 *
 * @param {CountButtonProps} props
 *
 * @prop {number} [value=1] - Значение, отображаемое в кнопке. По умолчанию - 1.
 * @prop {'sm' | 'lg'} [size='sm'] - Размер кнопки. По умолчанию - 'sm'.
 * @prop {string} [className] - Дополнительные классы, добавляемые к кнопке.
 * @prop {(type: 'plus' | 'minus') => void} [onClick] - Колбэк, вызываемый при клике на кнопку.
 */
export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClick={() => onClick?.('minus')}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton onClick={() => onClick?.('plus')} size={size} type="plus" />
    </div>
  );
};
