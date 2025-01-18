"use client";

import React from "react";
import { useIntersection } from "react-use";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

{
  /* Карточка автомобиля в группе */
}

/**
 * @description
 * Компонент, рендерящий список автомобилей,
 * группируя их по категориям.
 * @param {React.PropsWithChildren<Props>} props
 * @prop {string} title - Заголовок группы
 * @prop {CarWithRelations[]} cars - Список автомобилей
 * @prop {number} categoryId - ID категории
 * @prop {string} [listClassName] - Имена классов для списка
 * @prop {string} [className] - Дополнительные имена классов
 * @returns {React.ReactElement}
 */
export const ProductGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  listClassName,
  className,
}) => {
  {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
      threshold: 0.4,
    });

    React.useEffect(() => {
      if (intersection?.isIntersecting) {
        setActiveCategoryId(categoryId);
      }
    }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

    return (
      <div className={className} id={title} ref={intersectionRef}>
        <Title text={title} size="lg" className="font-extrabold bg-1 ml-4" />
        <hr className="w-full h-[2px] bg-secondary mb-5  border-x-8 border-background" />
        <div
          className={cn(
            "grid grid-cols-2 gap-x-5 gap-y-5 px-5 ml-3",
            listClassName
          )}>
          {items.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
              price={item.items[0].price}
              description={item.items[0].description}
            />
          ))}
        </div>
      </div>
    );
  }
};
