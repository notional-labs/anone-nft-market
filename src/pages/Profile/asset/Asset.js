import { useEffect, useState } from "react"
import NftList from "../nft/NftList"
import Collection from "../collection/Collection"
import Button from "../../../components/buttons/Button"


const style = {
    container: {
        padding: '0 20em',
        position: 'relative',
        top: '-100px'
    },
    button: {
        border: 'solid 1px #00FFA3',
        fontSize: '32px',
        fontWeight: 'bold',
        width: '8em',
        cursor: 'pointer'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'start'
    },
    grid: {
        border: 'solid 1px #00FFA3',
        padding: '2em'
    }
}

const Asset = ({ account, type }) => {
    const [tabSelect, setTabSelect] = useState(1)

    useEffect(() => {
        setTabSelect(1)
    }, [type])

    const changeTab = (value) => {
        setTabSelect(value)
    }

    return (
        <div
            style={style.container}
        >
            <div
                style={style.buttonContainer}
            >
                <Button
                    type={'function'}
                    style={{
                        ...style.button,
                        backgroundColor: tabSelect === 1 ? '#00FFA3' : 'transparent',
                        color: tabSelect === 1 ? '#000000' : '#ffffff'
                    }}
                    clickFunction={() => {
                        changeTab(1)
                    }}
                    text={'NFT'}
                />
                {
                    type !== 'collection' && (
                        <Button
                            type={'function'}
                            style={{
                                ...style.button,
                                backgroundColor: tabSelect === 2 ? '#00FFA3' : 'transparent',
                                color: tabSelect === 2 ? '#000000' : '#ffffff'
                            }}
                            clickFunction={() => {
                                changeTab(2)
                            }}
                            text={'COLLECTIONS'}
                        />
                    )
                }
            </div>
            <div
                style={style.grid}
            >
                {
                    tabSelect === 1 ? (
                        <NftList />
                    ) : (
                        <Collection />
                    )
                }
            </div>
        </div>
    )
}

export default Asset