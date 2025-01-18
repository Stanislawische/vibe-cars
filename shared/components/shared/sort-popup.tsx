import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";

interface Props {
    className?: string;
}

/**
 * Компонент SortPopup, который отображает элемент интерфейса для сортировки.
 *
 * @param {Props} props - Свойства для компонента.
 * @param {string} [props.className] - Дополнительные имена классов для стилизации.
 *
 * @returns {ReactElement} Элемент div, который содержит параметры сортировки.
 */

export const SortPopup: React.FC<Props> = ({ className }) => {
    return (
        /* Сортировка */

        <div
            className={cn(
                "inline-flex items-center gap-1 bg-zinc-800 px-5 h-11 p-2 rounded-2xl cursor-pointer",
                className
            )}>
            <ArrowUpDown size={16} />
            <b>Сортировка:</b>
            <b className="text-primary">Популярное</b>
        </div>
    );
};
