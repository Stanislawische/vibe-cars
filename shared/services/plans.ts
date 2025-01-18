import { PlanDB } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";

/**
 * Возвращает список всех автокомплектующих.
 * @returns Промис, который разрешается в список объектов CarEquipment.
 */
export const getAll = async (): Promise<PlanDB[]> => {
    return (await axiosInstance.get<PlanDB[]>(ApiRoutes.SEARCH_PLANS)).data
};