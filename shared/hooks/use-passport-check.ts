
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { imageScheme } from "../components/shared/modals/auth-modal/forms/schemas";


interface ErrorType {
	passport_upload?: string;
}

type ReturnProps = {
    passport: File | undefined;
    passportError: ErrorType;
    passportChange: (Passport: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Возвращает объект с свойствами `imgFile`, `error`, `handleImgChange` и
 * `handleSubmit` для обработки загрузок изображений с валидацией.
 *
 * `imgFile` - текущий выбранный файл, или undefined, если файл не выбран.
 * `error` содержит любые ошибки валидации, с ключом, равным имени поля формы,
 * и значением, равным сообщению об ошибке.
 *
 * `handleImgChange` - функция, которая может быть передана в событие `onChange`
 * элемента `<input type="file" />`. Она будет валидировать выбранный файл и
 * обновлять состояние `imgFile` и `error` соответственно.
 *
 * `handleSubmit` - функция, которая может быть передана в событие `onSubmit`
 * элемента `<form>`. Она будет валидировать форму и вызывать callback `onSubmit`,
 * если форма валидна, или предотвращать отправку формы, если форма не валидна.
 *
 * @returns {{ imgFile: File | undefined, error: ErrorType, handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }}
 */
export const usePassportCheck = () : ReturnProps => {
    

    const [passport, setPassport] = React.useState<File | undefined>();
    const [passportError, setPassportError] = React.useState<ErrorType>({});


    const validateFile = (file: File, schema: any, field: keyof ErrorType) => {
        const result = schema.safeParse(file);
        if (!result.success) {
            setPassportError((prevError) => ({
                ...prevError,
                [field]: result.error.errors[0].message,
            }));
            return false;
        } else {
            setPassportError((prevError) => ({
                ...prevError,
                [field]: undefined,
            }));
            return true;
        }
    };

    const passportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const isValid = validateFile(file, imageScheme, 'passport_upload');
			if (isValid) setPassport(file);
		}
	};

    return { passport, passportError, passportChange };
}
