'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { useCategoryStore } from '@/shared/store/category';
import { CategoryDB } from '@prisma/client';

interface Props {
    className?: string;
    cats: CategoryDB[];
}


/**
 * Рендерит список категорий в виде горизонтальной навигационной панели.
 *
 * @prop {string} className - Имя класса контейнерного элемента.
 * @prop {CategoryDB[]} cats - Список категорий для рендера.
 *
 * @returns JSX-элемент, представляющий навигационную панель категорий.
 */

export const Categories: React.FC<Props> = ({ cats, className }) => { 

    const categoryActiveId = useCategoryStore((state) => state.activeId);

    return (
      <div className={cn('inline-flex gap-5 h-11 bg-zinc-800 p-2 rounded-2xl', className)}>

        {cats.map(({name, id}, index) => (
            <a 
                className={cn(
                'flex items-center font-bold h-7 rounded-xl p-1',
                categoryActiveId === id && 'bg-gray-200 shadow-sm shadow-gray-400 text-primary px-2',
                )} 
                href={`#${name}`}
                key={index}>
                <button>{name}</button>
            </a>
        ))}

      </div>
    )
  
}