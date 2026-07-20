'use client';

interface FilterOption {
    value: string;
    label: string;
}

interface IFilterCardProps {
    title: React.ReactNode;
    param: string;
    type?: 'text' | 'select' | 'date';
    placeholder?: string;
    options?: FilterOption[];
    value?: string;
    onChange: (param: string, value: string) => void;
}

const FilterCard: React.FC<IFilterCardProps> = ({
    title,
    param,
    type = 'text',
    placeholder = 'DIGITE AQUI',
    options,
    value = '',
    onChange,
}) => {
    const isActive = value.trim().length > 0;

    return (
        <div
            className={`
                group
                relative
                overflow-hidden
                w-46
                h-32
                rounded-[2rem]
                border-2
                border-white
                shadow-xl
                transition-all
                duration-500
                ease-out
                hover:bg-white
                focus-within:bg-white
                ${isActive ? 'bg-white' : ''}
            `}
        >
            {/* TITLE */}
            <div
                className={`
                    absolute
                    left-2
                    right-2
                    top-1/2
                    -translate-y-1/2
                    transition-all
                    text-center
                    duration-500
                    ease-out
                    ${isActive
                        ? 'top-4 translate-y-0'
                        : 'group-hover:top-4 group-hover:translate-y-0 group-focus-within:top-4 group-focus-within:translate-y-0'
                    }
                `}
            >
                <div
                    className={`
                        font-bold
                        text-md
                        leading-5
                        transition-colors
                        duration-300
                        ${
                            isActive
                                ? 'text-(--textYellowColor)'
                                : 'text-[#0E2B4A] group-hover:text-(--textYellowColor) group-focus-within:text-(--textYellowColor)'
                        }
                    `}
                >
                    {title}
                </div>
            </div>

            {/* INPUT / SELECT */}
            <div
                className={`
                    absolute
                    left-2
                    right-2
                    bottom-6
                    transition-all
                    duration-500
                    ease-out
                    ${isActive
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0'
                    }
                `}
            >
                {type === 'select' ? (
                    <select
                        value={value}
                        onChange={(e) =>
                            onChange(param, e.target.value)
                        }
                        className="
                            w-full
                            bg-transparent
                            border-b
                            border-amber-400
                            pb-2
                            outline-none
                            text-(--textYellowColor)
                        "
                    >
                        <option value="">Todos</option>

                        {options?.map((opt) => (
                            <option
                                key={opt.value}
                                value={opt.value}
                            >
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : type === 'date' ? (
                    <input
                        type="date"
                        value={value}
                        onChange={(e) =>
                            onChange(param, e.target.value)
                        }
                        className="
                            w-full
                            bg-transparent
                            border-b
                            border-amber-400
                            pb-2
                            outline-none
                            text-(--textYellowColor)
                        "
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                            onChange(param, e.target.value)
                        }
                        placeholder={placeholder}
                        className="
                            w-full
                            bg-transparent
                            border-b
                            border-amber-400
                            pb-2
                            outline-none
                            text-(--textYellowColor)
                            uppercase
                        "
                    />
                )}
            </div>
        </div>
    );
};

export default FilterCard;