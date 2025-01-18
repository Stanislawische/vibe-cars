/* eslint-disable react/jsx-no-duplicate-props */
'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { Dialog } from '../../ui';
import { DialogContent, DialogDescription, DialogTitle } from '../../ui/dialog';
import { CarForm } from '..';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
	car: ProductWithRelations;
	className?: string;
}

/**
 * Модальное окно для выбора автомобиля.
 *
 * @param {ProductWithRelations} car - объект автомобиля.
 * @param {string} [className] - CSS-класс.
 *
 * @returns {React.ReactElement} Компонент.
 *
 * @example
 * <ChooseCarModal car={car} />
 */
export const ChooseCarModal: React.FC<Props> = ({ car, className }) => {
	const router = useRouter();

	return (
		<Dialog open={Boolean(car)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1000px] max-w-[1000px] min-h-[450px] bg-zinc-800 overflow-hidden',
					className
				)}>
					
				<VisuallyHidden.Root>
					<DialogTitle />
					<DialogDescription />
				</VisuallyHidden.Root>

				<CarForm product={car} onSubmit={() => router.back()} />
			</DialogContent>
		</Dialog>
	);
};
