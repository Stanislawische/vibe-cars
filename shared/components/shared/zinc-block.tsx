import React from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
interface Props {
  title?: string;
  endAdornment?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  contentClassName?: string;
}

/**
 * Компонент, который отображает блок с настраиваемым заголовком, необязательным украшением
 * и содержимым детей. Блок имеет фон по умолчанию и закругленные углы.
 *
 * @param {string} [title] - Текст заголовка для отображения в заголовке блока.
 * @param {ReactNode} [endAdornment] - Необязательный React-узел для отображения в конце строки заголовка.
 * @param {string} [className] - Дополнительные имена классов для стилизации контейнера блока.
 * @param {string} [contentClassName] - Дополнительные имена классов для стилизации области содержимого.
 * @param {ReactNode} children - Содержимое для отображения внутри блока.
 * @returns {JSX.Element} Отображаемый компонент ZincBlock.
 */

export const ZincBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div className={cn("bg-zinc-800 rounded-3xl", className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-600">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
    </div>
  );
};
