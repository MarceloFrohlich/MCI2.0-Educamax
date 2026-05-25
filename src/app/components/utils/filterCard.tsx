interface IFilterCardProps {
    title: React.ReactNode | string;

}

const FilterCard: React.FC<IFilterCardProps> = ({ title }) => {

    return (

        <div
            className="
                group
                relative
                overflow-hidden
                w-32
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
            "
        >

            <div
                className="
                    absolute
                    left-2
                    right-2
                    top-1/2
                    -translate-y-1/2
                    transition-all
                    duration-500
                    ease-out
                    group-hover:top-4
                    group-hover:translate-y-0
                    group-focus-within:top-4
                    group-focus-within:translate-y-0
                "
            >

                <div
                    className="
                        text-[#0E2B4A]
                        text-md
                        leading-5
                        transition-colors
                        duration-300
                        group-hover:text-(--textYellowColor)
                        group-focus-within:text-(--textYellowColor)
                    "
                >
                    {title}

                </div>

            </div>

            <div
                className="
                    absolute
                    left-2
                    right-2
                    bottom-6
                    opacity-0
                    translate-y-4
                    transition-all
                    duration-500
                    ease-out
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    group-focus-within:opacity-100
                    group-focus-within:translate-y-0
                "
            >

                <input
                    type="text"
                    placeholder="DIGITE AQUI"
                    className="
                        w-full
                        bg-transparent
                        border-b
                        border-amber-400
                        pb-2
                        outline-none
                        text-(--textYellowColor)
                        placeholder:text-amber-400
                        uppercase
                        tracking-wide
                    "
                />

            </div>

        </div>

    );

};

export default FilterCard;