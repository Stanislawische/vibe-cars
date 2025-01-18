import { ProductDB } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";


/**
 * Осуществляет поиск автомобилей по имени. Поиск не зависит от регистра.
 * @param query Строка, по которой нужно выполнить поиск
 * @returns Промис, который разрешается в массив автомобилей, соответствующих запросу
 */
export const search = async (query: string): Promise<ProductDB[]> => {
    return (await axiosInstance.get<ProductDB[]>(ApiRoutes.SEARCH_CARS, { params: { query } })).data
};