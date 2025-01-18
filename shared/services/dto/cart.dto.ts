import { CartDB, CartItemDB, PlanDB, ProductDB, ProductItemDB } from "@prisma/client";

export type CartItemDTO = CartItemDB & {
    productItem: ProductItemDB & {
        product: ProductDB;
    };
    plan: PlanDB[];
}

export interface CartDTO extends CartDB {
    items: CartItemDTO[];
}

export interface CreateCartItemValues {
    productItemId: number;
    plan?: number[];
}