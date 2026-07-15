const Loading = () => {
    return (
        <div className="h-[70vh] flex flex-col justify-center items-center gap-4 text-(--textBaseColor)">
            <div className="w-10 h-10 rounded-full border-4 border-(--colorVariantBlue)/30 border-t-(--colorVariantBlue) animate-spin" />
            <small className="text-(--textBaseColor)/60">Carregando...</small>
        </div>
    );
};

export default Loading;
