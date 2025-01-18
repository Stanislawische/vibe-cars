import { ChooseCarModal } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
 
/**
 * Страница с модальным окном для выбора автомобиля.
 * Эта страница используется как компонент модального окна для `NextLink` из `@/components/layout/header/header-links`.
 * Если автомобиль не найден, возвращает ответ 404.
 * @param {Object} params - Параметры маршрута.
 * @param {string} params.id - ID автомобиля.
 * @returns {React.ReactElement} Компонент.
 * @example
 * <NextLink href="/@modal/car/1">Link text</NextLink>
 */

export default async function CarModalPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const car = await prisma.productDB.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            plans: true,
            items: true,
        },
    });

    if (!car) {
        return notFound();
    }

    return <ChooseCarModal car={car} />;
}
