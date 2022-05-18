export const getDataFromUri = async (Uri) => {
    console.log(Uri)
    try {
        const response = await fetch(Uri);
        const json = await response.json();
        return json;
    } catch (err) {
        console.log('Error:' + err);
    }

}