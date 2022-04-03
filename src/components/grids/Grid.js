
const Grid = ({lists, numberOfColumn, rowGap, colGap}) => {

    const style = {
        container: {
            display: 'grid',
            gridTemplateColumns: `repeat(${numberOfColumn}, 1fr)`,
            rowGap: `${rowGap}px`,
            columnGap: `${colGap}px`
        }
    }

    return (
        <div
            style={style.container}
        >
            {lists.map(item => item)}
        </div>
    )
}

export default Grid