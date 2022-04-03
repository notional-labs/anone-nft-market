const Button = ({ clickFunction, style, text, type, ref, className }) => {

    const handleClick = ({ }) => {
        clickFunction()
    }

    return (
        <div>
            {
                type === 'function' ? (
                    <button 
                        style={style} 
                        onClick={handleClick}
                        className={`${className || ''}`}
                    >
                        {text}
                    </button>
                ) : (
                    <a 
                        href={ref}
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <button 
                            style={style}
                            className={`${className || ''}`}
                        >
                            {text}
                        </button>
                    </a>
                )
            }
        </div>
    )
}

export default Button