"use client";

import React from "react";
import Image from "next/image";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Button } from "../ui";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { colorType, gearboxType } from "@/shared/constants/car";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { useCart } from "@/shared/hooks";

/**
 * Компонент CartDrawer, который предоставляет интерактивный боковой
 * ящик для отображения элементов корзины. Он позволяет пользователям
 * просматривать, обновлять количество и удалять элементы из корзины.
 * Ящик также отображает общую сумму и предлагает кнопку "Оформить" для
 * продолжения покупки. Отображает сообщение о пустой корзине, когда
 * в ней нет элементов.
 *
 * @param {React.PropsWithChildren} props - Компоненты-children,
 * которые будут отображены внутри ячейки триггера.
 *
 * @returns {ReactElement} Отображенный боковой ящик с деталями корзины.
 */

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();
  const [reditecting, setRedirecting] = React.useState(false);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-secondary-foreground">
        <VisuallyHidden.Root>
      <SheetTitle/>
        </VisuallyHidden.Root>
        <div
          className={cn(
            "flex flex-col h-full",
            !totalAmount && "justify-center"
          )}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине{" "}
                <span className="font-bold">{items.length} автомобилей</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-cart.png"
                width={120}
                height={120}
                alt="Empty cart"
              />
              <Title
                size="sm"
                text="Корзина пуста"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-sm text-gray-500 mb-5">
                Добавьте хотя бы один автомобиль, чтобы совершить заказ
              </p>
              <SheetClose asChild>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
                <div className="mb-2">
                  {items.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={getCartItemDetails(
                        item.plan,
                        item.gearboxType as gearboxType,
                        item.color as colorType
                      )}
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  ))}
                </div>
              </div>

              <SheetFooter className="-mx-6 bg-zinc-800 p-2">
                <div className="w-full">
                  <div className="flex my-2">
                    <span className="flex flex-1 text-lg text-neutral-300 ml-2">
                      Всего:
                      <div className="flex-1 border-b border-dashed border-b-neutral-700 relative -top-1 mx-2" />
                    </span>
                    <span className="text-lg text-neutral-100 mr-2 font-extrabold">
                      {totalAmount} BYN{" "}
                    </span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={reditecting}
                      disabled={items.length === 0}
                      type="submit"
                      className="w-full h-12 text-xl my-4">
                      Оформить
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

