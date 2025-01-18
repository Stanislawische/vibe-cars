import { colorType, gearboxType, mapGearbox } from "../constants/car";
import { CartStateItem } from "./get-cart-details";

/**
 * Возвращает строку с подробностями о товаре.
 * Если переданы тип коробки передач и цвет, они включаются в строку.
 * Если переданы тарифы, они включаются в строку.
 * @param {CartStateItem["plan"]} plans - Тарифы товара.
 * @param {gearboxType} [gearbox] - Тип коробки передач товара.
 * @param {colorType} [color] - Цвет товара.
 * @returns {string} Строка с подробностями о товаре.
 */
export const getCartItemDetails = (
  plans: CartStateItem["plan"],
  gearbox?: gearboxType,
  color?: colorType
): string => {
  const details = [];

  if (color && gearbox) {
    const gearboxName = mapGearbox[gearbox];
    details.push(`${gearboxName} КПП,` + ` ${color} цвет, Выбранные тарифы: `);
  }

  if (plans) {
    details.push(...plans.map((plan) => plan.name));
  }

  return details.join(",");
};
