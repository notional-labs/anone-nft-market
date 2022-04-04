import Header from "../header/Header";

const style = {
    container: {
        position: 'relative',
        zIndex: 2
    }
}

const Profile = ({}) => {
    return (
        <div
            style={style.container}
        >
            <Header/>
        </div>
    )
}

export default Profile