import { ProductItemDB } from "@prisma/client";
import { colorTypes, gearboxType } from "../constants/car";
import { Variant } from "@/@types/prisma";

/**
 * Возвращает массив вариантов доступных цветов для заданной коробки передач.
 * @param {gearboxType} gearbox - тип коробки передач.
 * @param {ProductItemDB[]} items - массив элементов автомобиля.
 * @returns {Variant[]} массив вариантов доступных цветов.
 */
export const getAvailableCarColor = (gearbox: gearboxType, items: ProductItemDB[]): Variant[] => {
    const filteredCarByGearbox = items.filter((item) => item.gearbox === gearbox);
    
    return colorTypes.map((item) => ({
        name: item.name,
        value: String(item.value),
        disabled: !filteredCarByGearbox.some((color) => Number(color.color) === Number(item.value)),
    }))
}