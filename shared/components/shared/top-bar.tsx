import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import { Categories } from "./categories";
import { CategoryDB } from "@prisma/client";

interface Props {
  className?: string;
  categories: CategoryDB[];
}

/**
 * Компонент TopBar, отображающий прилипаемый верхний бар с категориями и
 * всплывающим меню сортировки.
 *
 * @param {Object} props - Свойства компонента
 * @param {string} [props.className] - Дополнительные имена классов для стилизации
 * @param {CategoryDB[]} props.categories - Массив категорий для отображения
 */

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    /* Топ бар с "Прилипанием" */

    <div
      className={cn(
        "sticky top-0 bg-background border-b-0 py-2 shadow-lg shadow-zinc-800 z-10",
        className
      )}>
      <Container className="flex items-center justify-between">
        <Categories cats={categories} />
      </Container>
    </div>
  );
};
