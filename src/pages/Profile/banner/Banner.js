import { Image } from "antd"
import { useState } from "react"

const Banner = ({}) => {
    const [user, setUser] = useState(localStorage.getItem('account'))

    useEffect(() => {
        const storageAccount = localStorage.getItem('account')
        if (storageAccount !== '') {
            setUser(storageAccount)
        }
    }, [])

    return (
        <div>
            {
                user !== null && (
                    <div
                        style={{
                            backgroundImage: `url(${JSON.parse(user).user.banner_img})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}
                    >
                        
                    </div>
                )
            }
        </div>
    )
}

export default Banner