const Btn = (
    { 
        children, 
        type = 'button', 
        bgColor = 'bg-blue-600', 
        textColor = 'text-white',
        textFont = 'font-medium',
        textSize = 'text-lg',
        className = '',
        ...props
    }
) => {
    return (
        <>
            <button className={`${ bgColor } ${ textColor } ${ className } ${ textFont } ${ textSize } px-4 py-2 rounded-lg`} { ...props }>
                { children }
            </button>
        </>
    )
}

export default Btn