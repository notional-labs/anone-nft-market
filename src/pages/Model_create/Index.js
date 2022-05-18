import Forms from "./form/Forms"

const style = {
    container: {
        color: '#F2F1F1',
        position: 'relative',
        zIndex: 0   
    },
}

const ModelCreate = ({account}) => {
    return (
        <div
            style={style.container}
        >
            <Forms
                account={account}
            />
        </div>
    )
}

export default ModelCreate