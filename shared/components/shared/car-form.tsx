"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import React from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";
import { ChooseCarForm, ChooseCarNoVariantForm } from ".";

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

/**
 * Компонент формы выбора автомобиля.
 *
 * @param {{ product: ProductWithRelations, onSubmit?: VoidFunction }} props - Параметры компонента.
 * @prop {ProductWithRelations} product - Объект автомобиля.
 * @prop {VoidFunction} [onSubmit] - Функция, вызываемая при успешном добавлении автомобиля в корзину.
 *
 * @returns {React.ReactElement} Компонент формы выбора автомобиля.
 */
export const CarForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
    const [addCartItem, loading] = useCartStore(
        useShallow((state) => [state.addCartItem, state.loading])
    );
    const firstItem = product.items[0];
    const isCarForm = Boolean(product.plans[0]);

    const onSubmit = async (productItemId?: number, plan?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;

            await addCartItem({
                productItemId: itemId,
                plan,
            });
            toast.success(product.name + " добавлен в корзину!", {
                style: {
                    width: "600px",
                    borderRadius: "50px",
                    background: "#333",
                    color: "#fff",
                    border: "1px solid #666",
                    fontSize: "14px",
                    fontWeight: "bold",
                },
            });

            _onSubmit?.();
        } catch (e) {
            console.error(e);
            toast.error("Произошла ошибка при добавлении автомобиля в корзину");
        }
    };

    if (isCarForm) {
        return (
            <ChooseCarForm
                items={product.items}
                plans={product.plans}
                imageUrl={String(product.imageUrl)}
                name={product.name}
                onSubmit={onSubmit}
                loading={loading}
            />
        );
    }
    return (
        <ChooseCarNoVariantForm
            imageUrl={String(product.imageUrl)}
            name={product.name}
            loading={loading}
            items={product.items}
        />
    );
};
