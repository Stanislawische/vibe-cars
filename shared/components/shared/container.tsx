import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

/**
 * Компонент-контейнер, центрирующий детей по горизонтали и ограничивающий
 * ширину до 1280px. Компонент автоматически добавит отступы слева и справа
 * к детям, чтобыцентрировать их по горизонтали.
 *
 * @param {object} props - Свойства компонента
 * @param {string} [props.className] - Дополнительные имена классов для добавления
 *                                    к контейнеру
 * @param {*} props.children - Содержимое, которое будет отображено внутри контейнера
 * @returns {ReactElement} Элемент <div> с указанными именами классов и детьми
 */
export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>
  );
};
