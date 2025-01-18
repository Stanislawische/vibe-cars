
import React from "react";
import { ClearButton, ErrorText, RequiredSymbol } from "..";
import { Input } from "../../ui";
import { cn } from "@/shared/lib/utils";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = ({
    name,
    label,
    required,
    className,
    ...props
}) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, "",);
    };

    return (
        <div className={cn(className)}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}
            <div className="relative">
                <Input
                    className="h-10 text-md font-bold text-black bg-secondary"
                    {...register(name)}
                    {...props}
                />

                {value && <ClearButton onClick={onClickClear}/>}
            </div>

            {errorText && (
                <ErrorText text={errorText} className="mt-2 " />
            )}
        </div>
    );
};
