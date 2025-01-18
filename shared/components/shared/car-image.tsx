import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
    className?: string;
    imageUrl?: string;
}

/**
 * Компонент, отображающий изображение автомобиля.
 *
 * @param {string} imageUrl URL-адрес отображаемого изображения
 * @param {string} className Дополнительные CSS-классы для добавления к компоненту
 * @returns {React.ReactElement} Компонент изображения
 */

export const CarImage: React.FC<Props> = ({ imageUrl, className }) => {
    return (
        <div
            className={cn("flex justify-center flex-1 relative w-full", className)}>
            <img
                src={imageUrl}
                alt="No image"
                className={cn(
                    " left-2 top-2 transition-all z-10 duration-300",
                    className
                )}
            />
        </div>
    );
};
