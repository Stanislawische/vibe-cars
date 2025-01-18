"use client";

import { cn } from "@/shared/lib/utils";
import { ArrowRight, CarFront } from "lucide-react";
import { Button } from "../ui";
import React from "react";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/shared/store";
import { useShallow } from "zustand/shallow";

interface Props {
  className?: string;
}

/**
 * Кнопка, отображающая общую стоимость товаров в корзине и
 * открывающая/закрывающая панель корзины при клике.
 *
 * @example
 * <CartButton />
 *
 * @param {Object} props
 * @prop {string} [className] - Дополнительные CSS-классы для применения к кнопке.
 *
 * @returns {ReactElement} Отрисовываемая кнопка.
 */
export const  CartButton: React.FC<Props> = ({ className }) => {
  const [totalAmount, items, loading] = useCartStore(
    useShallow((state) => [state.totalAmount, state.items, state.loading])
  );

  return (
    <CartDrawer>
      <Button
      loading={loading}
        className={cn(
          "group relative w-[150px]",
          { "w-[150px]": loading },
          className
        )}>
        <b>{totalAmount} BYN</b>
        <span className="h-full w-[1px] bg-white/80 mx-2 m-3" />
        <div className="flex items-center gap-1 transition duration-200 group-hover:opacity-0">
          <CarFront size={20} className="relative mb-1" strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-6 transition duration-200 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
