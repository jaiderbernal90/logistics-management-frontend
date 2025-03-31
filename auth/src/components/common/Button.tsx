interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const Button = ({
    type = 'button',
    onClick,
    disabled = false,
    loading = false,
    children,
    className = ''
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn-primary ${className}`}
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
};