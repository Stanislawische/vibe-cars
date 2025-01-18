import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Props {
    id: number;
    name: string;
    imageUrl?: string;
    className?: string;
    description: string;
    price: number;
}

/**
 * Компонент, отображающий карточку автомобиля.
 *
 * @param {Object} props
 * @prop {number} id - ID автомобиля
 * @prop {string} name - Название автомобиля
 * @prop {string} [imageUrl] - URL-адрес изображения автомобиля
 * @prop {number} price - Цена автомобиля
 * @prop {string} [className] - Дополнительные CSS-классы для приминения к компоненту
 *
 * @returns {ReactElement} Компонент карточки автомобиля
 */
export const ProductCard: React.FC<Props> = ({
    id,
    name,
    price,
    description,
    imageUrl,
}) => {
    {
        return (
            <div className="bg-zinc-900 rounded-2xl p-2">
                <Link href={`/car/${id}`}>
                    {/* Изображение автомобиля */}

                    <div className="flex justify-center bg-secondary rounded-lg h-270">
                        <img
                            className="w-[550px] h-[250px] relative left-2 top-2"
                            src={imageUrl}
                            alt="No image"
                        />
                    </div>

                    {/* Описание автомобиля */}

                    <Title
                        text={name}
                        size="sm"
                        className="mb-1 mt-3 ml-2 font-bold "
                    />
                    <div className="text-sm text-gray-300 px-2  mb-4">
                        {description}
                    </div>

                    {/* Цена автомобиля */}

                    <div className="flex justify-between mt-4">
                        <span className="text-[20px] ml-2">
                            от <b>{price + 5} BYN</b>
                        </span>

                        {/* Кнопка "In Drive Epta" */}

                        <Button variant="secondary" className="text-base font-bold">
                            <Plus size={20} className="mr-1" />
                            Забронировать
                        </Button>
                    </div>
                </Link>
            </div>
        );
    }
};
