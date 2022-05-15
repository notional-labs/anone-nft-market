const Description = ({ nft }) => {
    return (
        <div
            style={{
                padding: '0 25em',
                color: '#ffffff',
            }}
        >
            <p
                style={{
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}
            >
                Description
            </p>
            <p
                style={{
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}
            >
                {nft.metaData.description}
            </p>
        </div>
    )
}

export default Description