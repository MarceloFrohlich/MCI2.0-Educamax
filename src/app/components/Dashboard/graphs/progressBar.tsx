interface IProgressBar {
    value: string,
    rotulo?: string
}

const ProgressBar: React.FC<IProgressBar> = ({ value, rotulo }) => {
    return (
        <div className="flex-1 mx-8">
            <div className="flex items-center gap-3">
                <div className="flex-1 h-3 rounded-full bg-white shadow-md overflow-hidden">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#112C46_0%,#3477DD_30%,#3477DD_60%,#112C46_100%)] shadow-[0_4px_14px_rgba(7,7,7,0.25)] transition-all duration-300 ease-in-out"
                        style={{ width: value }}
                    />
                </div>
                {rotulo && (
                    <small className="text-[10px] text-slate-500 whitespace-nowrap w-20">{rotulo}</small>
                )}
            </div>
        </div>
    )
}

export default ProgressBar
