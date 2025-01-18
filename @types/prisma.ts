import { PlanDB, ProductDB, ProductItemDB } from '@prisma/client';

/**
 * Тип для продукта с связями.
 *
 * @property {ProductItemDB[]} items - Массив элементов продукта.
 * @property {PlanDB[]} plans - Массив тарифов.
 */
export type ProductWithRelations = ProductDB & {
	items: ProductItemDB[];
	plans: PlanDB[];
};

/**
 * Тип для варианта.
 *
 * @property {string} name - Название варианта.
 * @property {string} value - Значение варианта.
 * @property {boolean} [disabled=false] - Флаг, указывающий, что вариант недоступен.
 */
export type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
};
