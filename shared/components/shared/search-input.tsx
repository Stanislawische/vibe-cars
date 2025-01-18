'use client';

import { cn } from "@/shared/lib/utils";
import { Api } from "@/shared/services/api-client";
import { ProductDB } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";

interface Props {
    className?: string;
}

/**
 * Компонент SearchInput предоставляет интерактивное поле поиска для поиска автомобилей.
 * 
 * Компонент управляет состоянием поискового запроса и загружает соответствующие результаты
 * из API.
 * Результаты поиска отображаются в раскрывающемся меню ниже поля ввода, когда оно находится в фокусе.
 * 
 * Свойства:
 * - className?: string - необязательные имена классов для применения настроенных стилей.
 * 
 * Состояние:
 * - searchQuery: string - Представляет текущий поисковый запрос, введенный пользователем.
 * - focused: boolean - Указывает, является ли поле ввода в данный момент фокусированным.
 * - cars: ProductDB[] - Хранит список автомобилей, полученных из API на основе поискового запроса.
 * 
 * Ссылки:
 * - ref: React.RefObject - Используется для обнаружения кликов вне компонента, чтобы его убрать.
 * 
 * Хуки:
 * - useClickAway: Скрывает результаты поиска, когда пользователь кликает вне компонента.
 * - useDebounce: Откладывает вызов API поиска, чтобы оптимизировать производительность.
 * 
 * Компонент отображает поле ввода с необязательным наложением и раскрывающимся меню для
 * отображения результатов поиска. Нажатие на автомобиль в раскрывающемся меню перенаправляет на
 * страницу автомобиля.
 */

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    const [cars, setCars] = React.useState<ProductDB[]>([]);
    const ref = React.useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
    async () => {
        try {
        const response = await Api.cars.search(searchQuery);
        setCars(response);            
        } catch (error) {
            console.log(error);            
        }
    },50, 
    [searchQuery]);

    const onClickCar = () => {
        setFocused(false);
        setSearchQuery('');
        setCars([]);
    };

    return (
        <>  
            {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-zinc-900/50 z-30"/>}

                <div ref={ref} className={cn("flex rounded-2xl flex-1 justify-between relative h-9 z-30", className)}>
                    <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                        <input className="rounded-2xl outline-none w-full bg-zinc-800 pl-11"
                            type="text"
                            placeholder="Найти авто..."
                            onFocus={() => setFocused(true)}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {cars.length > 0 && (
                            <div 
                            className={cn(
                            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                            focused && 'visible opacity-100 top-12',
                            )}>
                            {
                            cars.map((car) => (
                                <Link 
                                    onClick={onClickCar}
                                    key={car.id}
                                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer text-primary"
                                    href={`/car/${car.id}`}>
                                    <img className="rounded-full w-10 h-4"
                                    src={car.imageUrl}
                                    alt={car.name}
                                    />
                                    <span>
                                        {car.name}
                                    </span>
                                </Link>
                            
                        )   )    
                    }
                    </div>
                )}
                </div>
        </>
    );
};