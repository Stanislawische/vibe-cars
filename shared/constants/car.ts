/* Маппинг для кнопок выбора*/


/* Тип коробки передач*/

export const mapGearbox = {
    1: 'Автоматическая',
    2: 'Механическая',
} as const;

/* Цвет авто */

export const mapColor = {
    10: '#000000',  // черный
    11: '#7A7A7A',  // серый
    12: '#FFFFFF',  // белый
    13: '#FF0000',  // красный
    14: '#051FFF',  // синий
    15: '#26FF05',  // зеленый
    16: '#F3FF05',  // желтый
    17: '#FB05FF',  // фиолетовый
    18: '#8A452E',  // оранжевый
    21: '#FF470A',  // розовый
    22: '#0AFFFA',  // голубой
    23: '#FF0AD1',  // пурпурный
    24: '#E8E8E8',  // светло-серый
    25: '#8B2D30',  // коричневый
    26: '#E3B726',  // бежевый    

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