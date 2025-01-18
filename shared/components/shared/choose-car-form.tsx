/* eslint-disable jsx-a11y/alt-text */
import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { CarColorVariants, CarGearBoxVariants, PlansItem } from ".";
import { colorType, gearboxType, gearboxTypes } from "@/shared/constants/car";
import { PlanDB, ProductItemDB } from "@prisma/client";
import { useCarOptions } from "@/shared/hooks";
import { getCarDetails } from "@/shared/lib";

interface Props {
    imageUrl: string;
    name: string;
    plans: PlanDB[];
    items: ProductItemDB[];
    loading?: boolean;
    onSubmit: (itemId: number, plan: number[]) => void;
    className?: string;
}
/**
 * Компонент формы выбора автомобиля.
 *
 * @param {{ name: string, items: ProductItemDB[], imageUrl: string, plans: PlanDB[], loading?: boolean, onSubmit: (itemId: number, plan: number[]) => void, className?: string }} props - Параметры компонента.
 * @prop {string} name - Название автомобиля.
 * @prop {ProductItemDB[]} items - массив элементов автомобиля.
 * @prop {string} imageUrl - URL картинки автомобиля.
 * @prop {PlanDB[]} plans - массив планов.
 * @prop {boolean} [loading=false] - Флаг загрузки.
 * @prop {(itemId: number, plan: number[]) => void} onSubmit - Функция, вызываемая при успешном добавлении автомобиля в корзину.
 * @prop {string} [className] - CSS-класс.
 *
 * @returns {React.ReactElement} Компонент.
 */

export const ChooseCarForm: React.FC<Props> = ({
    name,
    items,
    imageUrl,
    plans,
    loading,
    onSubmit,
    className,
}) => {
    const {
        gearbox,
        color,
        selectedPlan,
        availableColors,
        currentItemId,
        setGearbox,
        setColor,
        addPlan,
    } = useCarOptions(items);

    const { totalPrice, descrption } = getCarDetails(
        gearbox,
        color,
        items,
        plans,
        selectedPlan
    );

    const handleClickAdd = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedPlan));
        }
    };

    const textTotalPrice = () => {
        if (!currentItemId || selectedPlan.size === 0) {
            return `Выберите доступные опции`;
        }
        return `Забронировать за ${totalPrice} BYN`;
    };

    return (
        <div className={cn("flex flex-1 w-full", className)}>
            <div className=" relative w-1/2 bg-secondary-foreground">
                <img
                    src={imageUrl}
                    alt="No image"
                    className="relative mt-[100px] transition-all z-10 duration-300 p-5 w-[500px] h-[260px]"
                />
            </div>

            <div className="w-1/2 bg-primary p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <div className="text-sm text-gray-300">
                    <div className="mt-1 font-semibold">{descrption}</div>
                </div>

                <div className="flex flex-col gap-2 mt-2 mb-2">
                    <CarGearBoxVariants
                        className="mb-1"
                        items={gearboxTypes}
                        value={String(gearbox)}
                        onClick={(value) => setGearbox(Number(value) as gearboxType)}
                    />
                    <CarColorVariants
                        className="mb-1"
                        items={availableColors}
                        value={String(color)}
                        onClick={(value) => setColor(Number(value) as colorType)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {plans.map((plan) => (
                        <PlansItem
                            key={plan.id}
                            name={plan.name}
                            price={plan.price}
                            onClick={() => addPlan(plan.id)}
                            active={selectedPlan.has(plan.id)}
                        />
                    ))}
                </div>

                <div className="flex justify-end">
                    <Button
                        disabled={!currentItemId || selectedPlan.size === 0}
                        loading={loading}
                        onClick={handleClickAdd}
                        className="position mt-3 h-[42px] border-[1px] border-secondary bg-slate-800 shadow-lg shadow-slate-700 text-base rounded-3xl w-full hover:bg-slate-700">
                        {textTotalPrice()}
                    </Button>
                </div>
            </div>
        </div>
    );
};
