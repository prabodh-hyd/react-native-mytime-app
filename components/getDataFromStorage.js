
export const getDatafromLocalStorage = async () => {
    try {
        const value = await AsyncStorage.getItem('user');
        const parsedvalue = JSON.parse(value);
       
        if (parsedvalue !== null) {
            setUser(parsedvalue.toLowerCase());
        }
    } catch (e) {
        console.log(e);
    }
};