const ButtonIcon = ({
    icon,
    title,
    className,
}: {
    icon?: React.ReactNode;
    title: string;
    className?: string;
}) => {
    return (
        <button
            className={`${className} bg-button flex gap-1 items-center text-white px-3 rounded text-sm font-semibold duration-200 transition-all hover:bg-button-hover cursor-pointer`}
        >
            {icon}
            {title}
        </button>
    );
};
export default ButtonIcon;
