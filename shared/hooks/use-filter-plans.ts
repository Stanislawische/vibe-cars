import { PlanDB } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";

interface ReturnProps {
    plans: PlanDB[];
}

/**
 * Hook, который получает список всех доступных тарифов.
 *
 * @returns {ReturnProps} - объект, который содержит список тарифов.
 *
 * @example
 * const { plans } = useFilterPlans();
 */

export const useFilterPlans = (): ReturnProps => {
    const [plans, setPlans] = React.useState<PlanDB[]>([]);

    React.useEffect(() => {
        async function fetchPlans() {
            try {
                const plans = await Api.plans.getAll();
                setPlans(plans);
            } catch (error) {
                console.log(error);                
            }
        }

        fetchPlans();
    }, []);

    return { plans };
}