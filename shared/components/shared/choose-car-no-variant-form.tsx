import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { getCarDetails } from "@/shared/lib";
import { useCarOptions } from "@/shared/hooks";
import { ProductItemDB } from "@prisma/client";

interface Props {
  imageUrl: string;
  name: string;
  loading?: boolean;
  onClickAddCart?: VoidFunction;
  className?: string;
  items: ProductItemDB[];
}
/**
 * Компонент формы выбора автомобиля, когда у автомобиля нет вариантов.
 *
 * @param {{ name: string; imageUrl: string; loading?: boolean; className?: string; }} props - Параметры компонента.
 * @prop {string} name - Название автомобиля.
 * @prop {string} imageUrl - URL картинки автомобиля.
 * @prop {boolean} [loading=false] - Флаг загрузки.
 * @prop {string} [className] - CSS-класс.
 */
export const ChooseCarNoVariantForm: React.FC<Props> = ({
  name,
  imageUrl,
  loading,
  className,
  items,
}) => {
  const { gearbox, color, selectedPlan } = useCarOptions(items);

  const { descrption } = getCarDetails(gearbox, color, items, [], selectedPlan);

  return (
    <div className={cn("flex flex-1 w-full", className)}>
      <div className="flex flex-1 relative w-1/2">
        <img
          src={imageUrl}
          alt="No image"
          className="relative mt-[100px] transition-all z-10 duration-300 p-5 w-[500px] h-[260px]"
        />
      </div>

      <div className="w-1/2 bg-primary p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <div className="text-sm text-gray-300">
          <div className="mt-1 font-semibold">{descrption}</div>
        </div>

        <div className="flex">
          <Button
            disabled
            loading={loading}
            className="position h-[55px] border-2 bg-slate-800 border-slate-700 text-base rounded-3xl w-full mt-[274px] hover:bg-slate-800">
            Автомобиль будет доступен в ближайшее время
          </Button>
        </div>
      </div>
    </div>
  );
};
