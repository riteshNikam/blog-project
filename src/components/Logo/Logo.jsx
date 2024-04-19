const Logo = (
    { 
        width = "100px",
        textColor = "",
        className = "",
    }
    ) => {
    return (
        <>
            <div className={`font-bold text-xl ${ textColor } ${ className }`}>Logo</div>
        </>
    )
}

export default Logo;