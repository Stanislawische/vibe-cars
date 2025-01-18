'use client'

import { Variant } from "@/@types/prisma";
import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
    items: readonly Variant[];
    onClick?: (value: Variant['value']) => void;
    value?: Variant['value'];
    className?: string;
}
 
/**
 * Отрисовывает группу кнопок вариантов трансмиссии на основе переданных элементов.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.items - Массив объектов вариантов, каждый из которых
 *                              содержит имя, значение, и необязательное состояние disabled.
 * @param {Function} [props.onClick] - Необязательная функция обратного вызова,
 *                                     вызываемая с значением варианта, когда
 *                                     кнопка нажата.
 * @param {string} [props.Value] - Текущее выбранное значение варианта, используемое
 *                                 для применения активного стиля к соответствующей кнопке.
 * @param {string} [props.className] - Необязательные дополнительные имена классов
 *                                     для стилизации контейнерного div.
 */

export const CarGearBoxVariants: React.FC<Props> = ({ items, onClick,  value, className }) => {
    return (
        <div className={cn('flex justify-between border-[1px] border-secondary bg-slate-800 shadow-lg shadow-slate-700 rounded-3xl p-1 select-none', className)}>
            {
                items.map((item) => (
                    <button 
                        key={item.name}
                        onClick={() => onClick?.(item.value)}
                        className={cn(
                                        'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl text-sm font-semibold',
                                            {
                                                'bg-slate-700 text-white shadow': item.value === value,
                                                'text-slate-300 opacity-50 pointer-events-none': item.disabled,
                                                        
                                            }   
                                    )}>

                            {item.name}
                    </button>
                ))
            }
        </div>
    );
}

