import Grid from "../../../components/grids/Grid"
import CollectionFilterCard from "../collection_filter_card/CollectionFilterCard"
import Button from "../../../components/buttons/Button"

const style = {
    card: {
        borderRadius: '10px',
        backgroundColor: '#7B61FF',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        fontSize: '20px',
        padding: '1em .5em'
    }
}

const FilterDisplay = ({ filterValue, wrapSetFilter }) => {

    const priceCard = (min, max) => {
        if (max === null && min !== null) {
            return (
                <div
                    style={style.card}
                >
                    {`AN1: > ${min}`}
                </div>
            )
        }
        else if (max !== null && min === null) {
            return (
                <div
                    style={style.card}
                >
                    {`AN1: < ${max}`}
                </div>
            )
        }
        else if (min !== null && max !== null) {
            return (
                <div
                    style={style.card}
                >
                    {`AN1: ${min} - ${max}`}
                </div>
            )
        }
        else {
            return undefined
        }
    }

    const clear = () => {
        wrapSetFilter({
            status: '',
            collections: [],
            priceMin: null,
            priceMax: null,
            traits: ''
        })
    }

    const getFilterList = () => {
        let list = []
        if(filterValue.priceMin !== null || filterValue.priceMax !== null) {
            list.push(priceCard(filterValue.priceMin, filterValue.priceMax))
        }
        filterValue.collections.forEach(collection => {
            const jsx = (
                <CollectionFilterCard
                    addr={collection}
                />
            )
            list.push(jsx)
        })
        if (list.length > 0) {
            list.push(
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        type={'function'}
                        style={{
                            backgroundColor: 'transparent',
                            color: '#00FFA3',
                            border: 0,
                            cursor: 'pointer',
                            fontSize: '20px',
                            marginBottom: 0
                        }}
                        clickFunction={clear}
                        text={'Clear All'}
                    />
                </div>
            )
        }
        return list
    }

    return (
        <div
            style={{
                marginBottom: '2rem'
            }}
        >
            <Grid
                lists={getFilterList()}
                numberOfColumn={5}
                rowGap={10}
                colGap={10}
            />
        </div>
    )
}

export default FilterDisplay