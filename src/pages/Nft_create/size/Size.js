import { useState } from "react"
import Button from "../../../components/buttons/Button"
import { PlusOutlined } from '@ant-design/icons'

const style = {
    button: {
        backgroundColor: 'transparent',
        border: 'solid 1px #00FFA3',
        padding: '1em',
        color: '#00FFA3',
        cursor: 'pointer'
    },
    buttonText: {
        color: '#00FFA3'
    },
    container: {
        display: 'flex',
        justifyContent: 'start'
    }
}

const Size = ({wrapSetSize}) => {
    const [sizes, setSizes] = useState([])
    const [show, setShow] = useState([false])
    const [size, setSize] = useState('')

    const handClickShow = () => {
        setShow(true)
    }

    return (
        <div
            style={style.container}
        >
            {
                show && (
                    <div>

                    </div>
                )
            }
            <Button
                text={(
                    <div>
                        <PlusOutlined />
                        <span
                            style={{
                                marginLeft: '0.5em'
                            }}
                        >
                            More
                        </span>
                    </div>
                )}
                style={style.button}
                type={'function'}
                clickFunction={handClickShow}
            />
        </div>
    )
}

export default Size