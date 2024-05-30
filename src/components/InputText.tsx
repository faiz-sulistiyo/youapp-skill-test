import React, { InputHTMLAttributes, SyntheticEvent } from "react";

interface IInputTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
}

const InputText: React.FC<IInputTextProps> = ({ value, onChange, className, ...rest }) => {
    const handleOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value);
    };

    return <input value={value} className={`${className} bg-white focus-within:outline-none p-4.5 text-sm font-medium bg-opacity-5 rounded-lg`} onChange={handleOnChange} {...rest} />;
};

export default InputText;
