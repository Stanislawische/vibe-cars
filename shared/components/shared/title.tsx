import clsx from 'clsx';
import React from 'react';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
  size?: TitleSize;
  className?: string;
  text: string;
}

/**
 * Компонент заголовка, предоставляющий разные размеры.
 *
 * @example
 * <Title text="Мой заголовок" size="md" />
 *
 * @param {Props} props
 * @prop {TitleSize} [size=sm] - Размер заголовка.
 * @prop {string} [className] - Дополнительные имена классов, применяемые к элементу.
 * @prop {string} text - Текстовое содержимое заголовка.
 * @returns {ReactElement} Элемент заголовка.
 */
export const Title: React.FC<Props> = ({ text, size = 'sm', className }) => {

  const mapTagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  } as const;

  const mapClassNameBySize = {
    xs: 'text-[16px]',
    sm: 'text-[22px]',
    md: 'text-[26px]',
    lg: 'text-[32px]',
    xl: 'text-[40px]',
    '2xl': 'text-[48px]',
  } as const;

  return React.createElement(
    mapTagBySize[size],
    { className: clsx(mapClassNameBySize[size], className) },
    text,
  );
};
