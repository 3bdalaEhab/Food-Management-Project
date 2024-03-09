import axios from "axios";

export async function ForgotPassEmail(values) {
    try {
        let { data } = await axios.post("https://upskilling-egypt.com:443/api/v1/Users/Reset/Request", values);
        return data
    } catch (error) {
        console.log(error);

    }
}
