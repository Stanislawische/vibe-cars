import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import React from "react";

interface Props {
  onClick?: VoidFunction;
  className?: string;
}

/**
 * Маленькая кнопка очистки, которую можно использовать внутри поля ввода или другого элемента
 *
 * @example
 * import { ClearButton } from "@/shared/components/shared/clear-button";
 *
 * <input type="text" value="Hello world" />
 * <ClearButton onClick={() => setInputValue("")} />
 */
export const ClearButton: React.FC<Props> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer",
        className
      )}>
      <X className="h-5 w-5" color="#555" />
    </button>
  );
};
