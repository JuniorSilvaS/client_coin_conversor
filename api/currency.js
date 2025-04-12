import axios from "axios";
const url = 'https://src-currency-conversor.onrender.com';

const getAllContries = async () => {
    try {
        const response = await axios.get(
            `${url}/api/countries/get/all`
        );
        return response.data;
    } catch (e) {
        console.log(e);
    };
};

const convertCurrency = async (currencyToConvert, currency, value) => {
    try {
        const response = await axios.post(`${url}/api/countries/convert`, {
            currency: currency,
            currencyToConvert: currencyToConvert,
            money: value
        });
        return response.data;
    }
    catch (e) {
        console.log(e.response.status);
    };
};

const login = async (email, password) => {
    try {
        const response = await axios.post(`${url}/api/user/login`, {
            email,
            password
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (e) {
        console.log(e);
        console.log('Login failed:', e.response?.data || e.message);
    }
};
const getProfileUser = async () => {
    try {
        const response = await axios.get(`${url}/api/user/profile`, {
            withCredentials: true
        });
        return response.data;
    } catch (e) {
        console.log(e);
        console.log('Login failed:', e.response?.data || e.message);
    }
};


async function register(name, email, password) {
    try {
        const res = await axios.post(`${url}/api/user/createUser`, {
            name,
            email,
            password,
        });
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};

async function profile() {
    try {
        const response = await axios.get(`${url}/api/user/profile`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error.response?.data || 'Something went wrong';
    }
};

async function editProfile(email, password, avatar, name) {
    try {
        const response = await axios.put(
            `${url}/api/user/editprofile`,
            {
                email,
                password,
                avatar,
                name
            },
            {
                withCredentials: true // so cookies (like token) get sent
            }
        )

        return response.data
    } catch (e) {
        console.error('Update failed:', e.response?.data || e.message)
        throw e
    }
}

async function allCurrenciesList () {
    try {
        const response = await axios.get(
            `${url}/api/countries/getAllCurrencies`
        );
        
        return response.data;

    }catch(e) {
        console.log(e);
    };
};

export const currency = {
    getAllContries,
    convertCurrency,
    login,
    getProfileUser,
    register,
    profile,
    editProfile,
    allCurrenciesList
};