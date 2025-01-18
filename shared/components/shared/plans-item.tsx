import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
    className?: string
    name: string
    price: number
    active?: boolean
    onClick?: () => void
}

export const PlansItem: React.FC<Props> = ({
    className,
    name,
    price,
    active,
    onClick,
    }) => {
    return <div className={cn(
        'flex items-center flex-col bg-slate-800 p-1 rounded-md w-26 h-11 text-center relative cursor-pointer shadow-md shadow-slate-700 ',
        { 'border border-secondary bg-slate-800': active },
         className
        )}
        onClick={onClick}>
            {active && <CircleCheck size={20} className="absolute top-2 right-2 text-secondary"/>}
            <span className="text-sm font-semibold">{name}</span>
            <span className="text-sm font-bold">{price} BYN</span>
        </div>
}