import { useState, ChangeEvent } from 'react';

export function useForm<T>(initialState: T) {
    const [values, setValues] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        
        if (errors[name as keyof T]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }
    };

    return { values, errors, setValues, setErrors, handleChange };
}