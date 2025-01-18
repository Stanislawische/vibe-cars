'use client'

import { Variant } from "@/@types/prisma";
import { cn } from "@/shared/lib/utils";
import { Circle } from "lucide-react";
import React from "react";



interface Props {
    items: readonly Variant[];
    onClick?: (value: Variant['value']) => void;
    value?: Variant['value'];
    className?: string;
}
 
/**
 * Отображает группу кнопок вариантов цвета на основе предоставленных элементов.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.items - Массив объектов вариантов, каждый из которых содержит
 *                              имя, значение и необязательное состояние отключения.
 * @param {Function} [props.onClick] - Необязательная функция обратного вызова, вызываемая
 *                                     с значением варианта при нажатии на кнопку.
 * @param {string} [props.Value] - Текущее выбранное значение варианта, используется
 *                                 для применения активного стиля к соответствующей кнопке.
 * @param {string} [props.className] - Необязательные дополнительные классы для стилизации
 *                                     контейнера div.
 */
export const CarColorVariants: React.FC<Props> = ({ items, onClick,  value, className }) => {
    return (
        <div className={cn('flex justify-between border-[1px] border-secondary bg-slate-800 shadow-lg shadow-slate-700 rounded-3xl p-1 select-none', className)}>
            {
                items.map((item) => (
                    <button 
                        key={item.name}
                        onClick={() => onClick?.(item.value)}
                        className={cn(
                                        'flex items-center justify-center cursor-pointer h-[30px] flex-1 rounded-full transition-all duration-300 text-sm',
                                            {
                                                'bg-slate-700 text-white shadow': item.value === value,
                                                'text-slate-300  opacity-5 pointer-events-none': item.disabled,
                                                        
                                            }   
                                    )}>
                                        <Circle color={item.name} fill={item.name} size={20} strokeWidth={4} className="rounded-full"/>
                    </button>
                ))
            }
        </div>
    );
} 