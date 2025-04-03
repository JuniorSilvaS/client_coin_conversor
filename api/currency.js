import axios from "axios";
const url = 'http://localhost:4000';

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
            money : value
        });
        return response.data;
    }
    catch (e) {
        console.log(e);
    };
};

export const currency = {
    getAllContries,
    convertCurrency
};