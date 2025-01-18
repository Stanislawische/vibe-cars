import React from "react";
import { colorType, gearboxType } from "../constants/car";
import { useSet } from "react-use";
import { getAvailableCarColor } from "../lib";
import { ProductItemDB } from "@prisma/client";
import { Variant } from "@/@types/prisma";

interface ReturnProps {
    gearbox: gearboxType;
    color: colorType;
    selectedPlan: Set<number>;
    availableColors: Variant[];
    currentItemId?: number;
    setGearbox: (gearbox: gearboxType) => void;
    setColor: (color: colorType) => void;
    addPlan: (id: number) => void;
}

/**
 * Hook для управления состоянием выбора автомобиля.
 * 
 * @param {ProductItemDB[]} items - массив элементов автомобиля.
 * 
 * @returns {ReturnProps} - объект с состоянием выбора автомобиля.
 * 
 * @example
 * const { gearbox, color, selectedPlan, availableColors, setGearbox, setColor, addPlan } = useCarOptions(items);
 */ 
export const useCarOptions = (
    items: ProductItemDB[],
): ReturnProps => {
    const [color, setColor] = React.useState<colorType>(10);
    const [gearbox, setGearbox] = React.useState<gearboxType>(1);
    const [selectedPlan, { toggle: addPlan }] = useSet(new Set<number>([]));
    const availableColors = getAvailableCarColor( gearbox, items);

    const currentItemId = items.find((item) => item.gearbox === gearbox && item.color === color)?.id;

    React.useEffect(() => {             
        
                const isAvailableCurrentColor = availableColors.find(
                    (item) => Number(item.value) === color  && !item.disabled 

                );

                const AvailableColor = availableColors.find((item) => !item.disabled);

                if (!isAvailableCurrentColor && AvailableColor) {
                    setColor(Number(AvailableColor.value) as colorType);
                }            
            }, [availableColors, color, gearbox]);
    return{
        gearbox,
        color,
        selectedPlan,
        availableColors,
        currentItemId,
        setGearbox,
        setColor,
        addPlan
    }
}
