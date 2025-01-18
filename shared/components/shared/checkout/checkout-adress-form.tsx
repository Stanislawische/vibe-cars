'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ZincBlock } from "../zinc-block";
import { Input } from "../../ui";
import { FormInput, FormTextarea } from "../form";

interface Props {
    className?: string;
}

/**
 * Компонент формы для ввода адреса доставки.
 *
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительный CSS-класс для элемента.
 *
 * @returns {React.ReactElement} - Возвращает компонент блока с полем для ввода адреса и текстовой областью для комментариев.
 */

export const CheckoutAdressForm: React.FC<Props> = ({ className }) => {
    return (
        <ZincBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">

                <FormInput
                    name="address"
                    placeholder="Адрес доставки"
                />

                <FormTextarea
                    name="comment"
                    rows={5}
                    placeholder="Комментарий к заказу"
                />
            </div>
        </ZincBlock>
    );
};
