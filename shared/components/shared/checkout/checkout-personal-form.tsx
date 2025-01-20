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
                    label="Имя"
                    type="text"
                    placeholder="Введите Ваше имя"
                    required
                />
                <FormInput
                    name="lastName"
                    label="Фамилия"
                    type="text"
                    placeholder="Введите Вашу фамилию"
                    required
                />
                <FormInput
                    name="email"
                    label="E-Mail"
                    placeholder="Введите Ваш E-Mail"
                    type="email"
                    required
                />
                <FormInput
                    name="phone"
                    type="tel"
                    label="Номер телефона"
                    placeholder="Введите Ваш номер телефона"
                    required
                />
            </div>
        </ZincBlock>
    );
};
 