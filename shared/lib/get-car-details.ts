import { PlanDB, ProductItemDB } from "@prisma/client";
import { calcTotalCarPrice } from ".";
import { colorType, gearboxType } from "../constants/car";


/**
 * Возвращает объект с общей стоимостью и описанием выбранного автомобиля.
 * 
 * @param {gearboxType} gearbox - Тип трансмиссии автомобиля.
 * @param {colorType} color - Цвет автомобиля.
 * @param {ProductItemDB[]} items - Массив элементов автомобиля.
 * @param {PlanDB[]} plans - Массив доступных планов.
 * @param {Set<number>} selectedPlan - Множество ID выбранных планов.
 * 
 * @returns {{ totalPrice: number, descrption: string }} Объект с полями:
 * - totalPrice: общая стоимость автомобиля с учётом выбранных планов.
 * - descrption: строка с описанием автомобиля, включая описание цвета, трансмиссии и мощности.
 *   Если описание или мощность отсутствуют, возвращает сообщение об отсутствии автомобиля с такими опциями.
 */

export const getCarDetails = (
    gearbox: gearboxType,
    color: colorType,
    items: ProductItemDB[],
    plans: PlanDB[],
    selectedPlan: Set<number>
) => {
    const totalPrice = calcTotalCarPrice(
        gearbox,
        color,
        items,
        plans,
        selectedPlan
    );

    const colorGearboxDescription = items.find(
        (items) => items.color === color && items.gearbox === gearbox
    )?.description;
    const horsepower = items.find((items) => items.horsepower)?.horsepower;

    if (!colorGearboxDescription || !horsepower) {
        return {
            totalPrice: 0,
            descrption: "Автомобиль с такими опции отсутствует",
        };
    }
    const descrption = `${colorGearboxDescription}, Мощность: ${horsepower} ЛС.`;

    return {
        totalPrice,
        descrption,
    };
};
