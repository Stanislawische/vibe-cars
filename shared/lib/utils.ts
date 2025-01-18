import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Утилита для слияния нескольких имен классов.
 * Это обертка над `clsx` и `twMerge`, которая упрощает
 * использование имен Tailwind-классов в сочетании с
 * другими именами классов или утилитами имен классов.
 *
 * @param inputs - Любое количество строк с именами классов или утилит имен классов.
 * @returns Одиночная строка с именем класса, которую можно использовать в свойстве `className`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
