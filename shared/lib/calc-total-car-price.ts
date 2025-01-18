import { PlanDB, ProductItemDB } from '@prisma/client';
import { colorType, gearboxType } from '../constants/car';

/**
 * Рассчитывает общую стоимость автомобиля с планами.
 * @param gearbox - тип трансмиссии.
 * @param color - цвет автомобиля.
 * @param items - массив элементов автомобиля.
 * @param plans - массив планов.
 * @param selectedPlan - множество выбранных планов.
 * @returns общая стоимость автомобиля с планами.
 */

export const calcTotalCarPrice = (
    gearbox: gearboxType,
    color: colorType,
    items: ProductItemDB[],
    plans: PlanDB[],
    selectedPlan: Set<number>,
    ) => {

        const carPrice = items.find((items) => items.gearbox === gearbox && items.color === color)?.price || 0
        const totalPlanPrice = plans
        .filter((plan) => selectedPlan.has(plan.id))
        .reduce((acc, plan) => acc + plan.price, 0);

        return (carPrice + totalPlanPrice).toFixed(2)
}