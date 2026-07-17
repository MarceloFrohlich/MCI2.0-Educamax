const ErroCampo: React.FC<{ erro?: string }> = ({ erro }) => {
    if (!erro) return null

    return <p className="text-sm text-red-600 mt-1">{erro}</p>
}

export default ErroCampo
