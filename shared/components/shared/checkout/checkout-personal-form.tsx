/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ZincBlock } from "../zinc-block";
import { Input } from "../../ui";
import { FormInput } from "../form";

interface Props {
    className?: string;
}

/**
 * Компонент формы для ввода персональных данных.
 *
 * @param {{ className?: string }} props - Параметры компонента.
 * @prop {string} [className] - CSS-класс для блока.
 *
 * @returns {ReactElement} Отрисовываемый блок.
 */
export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
    return (
        <ZincBlock title="2. Персональные данные" className={className}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput
                    name="firstName"
                    placeholder="Имя"
                />
                <FormInput
                    name="lastName"
                    placeholder="Фамилия"
                />
                <FormInput
                    name="email"
                    placeholder="E-Mail"
                />
                <FormInput
                    name="phone"
                    placeholder="Номер телефона"
                />
            </div>
        </ZincBlock>
    );
};
