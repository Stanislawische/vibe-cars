import { prisma } from "@/prisma/prisma-client";

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  colors?: string;
  gearboxTypes?: string;
  plans?: string;
  priceFrom?: number;
  priceTo?: number;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1500;

/**
 * Выполняет поиск автомобилей по заданным параметрам.
 *
 * @param {GetSearchParams} params Объект с параметрами поиска.
 * @param {string} [params.query] Поисковый запрос.
 * @param {string} [params.sortBy] Поле для сортировки.
 * @param {string} [params.colors] Список цветов, разделенный запятыми.
 * @param {string} [params.gearboxTypes] Список типов коробок передач, разделенный запятыми.
 * @param {string} [params.plans] Список ID планов, разделенный запятыми.
 * @param {number} [params.priceFrom] Минимальная цена.
 * @param {number} [params.priceTo] Максимальная цена.
 *
 * @returns {Promise<CategoryDB[]>} Промис с массивом категорий с продуктами.
 */
export const findCar = async (props: GetSearchParams) => {
  const params = await props;

  const colors = await params.colors?.split(",").map(Number);
  const gearboxTypes = await params.gearboxTypes?.split(",").map(Number);
  const plansIdArr = await params.plans?.split(",").map(Number);

  const minPrice = await Number(params.priceFrom || DEFAULT_MIN_PRICE);
  const maxPrice = await Number(params.priceTo || DEFAULT_MAX_PRICE);

  const categories = await prisma.categoryDB.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          plans: plansIdArr
            ? {
                some: {
                  id: {
                    in: plansIdArr,
                  },
                },
              }
            : undefined,
          items: {
            some: {
              color: {
                in: colors,
              },
              gearbox: {
                in: gearboxTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          plans: true,
          items: {
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  return categories;
};
