import React from 'react';

export function InputItem({
    reference,
    type,
    placeholder,
    onInput,
}: {
    reference: React.RefObject<HTMLInputElement>;
    type: string;
    placeholder: string;
    onInput?: () => void;
}) {
    return (
        <input
            ref={reference}
            type={type}
            className="form-control my-1"
            placeholder={placeholder}
            aria-label={placeholder}
            autoComplete="on"
            onInput={onInput}
        />
    );
}
