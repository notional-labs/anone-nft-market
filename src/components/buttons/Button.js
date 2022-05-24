import { Link } from "react-router-dom"

const Button = ({ clickFunction, style, text, type, url, className, index, disabled }) => {

    const handleClick = ({ }) => {
        clickFunction()
    }

    return (
        <div
            key={index}
        >
            {
                type === 'function' ? (
                    <button
                        type='button'
                        style={style}
                        onClick={handleClick}
                        className={`${className || ''}`}
                        disabled={disabled}
                    >
                        {text}
                    </button>
                ) : type === 'href' ? (
                    <a
                        href={url}
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
                ) : type === 'link' ? (
                    <Link
                        to={`${url}`}
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
                    </Link>
                ) : (
                    <button
                        style={style}
                        className={`${className || ''}`}
                    >
                        {text}
                    </button>
                )
            }
        </div>
    )
}

export default Button