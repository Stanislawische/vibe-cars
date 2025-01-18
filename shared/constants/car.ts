/* Маппинг для кнопок выбора*/


/* Тип коробки передач*/

export const mapGearbox = {
    1: 'Автоматическая',
    2: 'Механическая',
} as const;

/* Цвет авто */

export const mapColor = {
    10: '#000000',  // черный +
    11: '#7A7A7A',  // серый +
    12: '#FFFFFF',  // белый +
    13: '#FF0000',  // красный +
    14: '#051FFF',  // синий +
    15: '#26FF05',  // зеленый +
    18: '#FF4F00',  // оранжевый +
    22: '#0AFFFA',  // голубой +

} as const;

export const gearboxTypes = Object.entries(mapGearbox).map(([value, name]) => ({
    value,
    name,
}));

export const colorTypes = Object.entries(mapColor).map(([value, name]) => ({
    value,
    name,
}));

export type gearboxType = keyof typeof mapGearbox;
export type colorType = keyof typeof mapColor;