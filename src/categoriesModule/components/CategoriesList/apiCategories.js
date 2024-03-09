import axios from "axios";
import toast from "react-hot-toast";

// ?=============================Add Categories====================================>>
export async function apiAddCategories(data) {
    let token = localStorage.getItem("token")
    try {
        const response = await axios.post(`https://upskilling-egypt.com:443/api/v1/Category/`, data,
            { headers: { Authorization: token } })
        toast.success(response.statusText)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message||"There's a mistake.")
    }
}

// ?=============================Show Categories====================================>>
export async function apiShowCategories(pageNumber,name) {
    let token = localStorage.getItem("token")
    try {
        const data = await axios.get(`https://upskilling-egypt.com:443/api/v1/Category/?pageSize=${5}&pageNumber=${pageNumber}&name=${name}`,
            { headers: { Authorization: token } })
        return data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message||"There's a mistake.")
    }
}

// !=============================Delete Categories====================================>>
export async function apiDeleteCategories(categoryId) {
    let token = localStorage.getItem("token");
    try {
        const { data } = await axios.delete(`https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`, {
            headers: { Authorization: token }
        });
        toast("Deleted", { icon: "😟" });
        return data

    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message||"There's a mistake.")
    }
}

// !=============================Update Categories====================================>>
export async function apiUpdateCategories(categoryData, categoryId) {
    let token = localStorage.getItem("token")
    try {
        const data = await axios.put(`https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`, categoryData,
            { headers: { Authorization: token } })
        toast("Updated", { icon: "😊" });
        return data

    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message||"There's a mistake.")
    }
}
