import axios from "axios";
import toast from "react-hot-toast";



export async function apiGetFavoriteList() {
    let token = localStorage.getItem("token");
    try {
        const { data } = await axios.get(`https://upskilling-egypt.com:3006/api/v1/userRecipe/`, { headers: { Authorization: token } });
        return data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message||"There's a mistake.");
    }
}

export async function apiAddFavoriteList(recipeId) {
    let id = { recipeId }
    let token = localStorage.getItem("token");
    try {
        const { data } = await axios.post(`https://upskilling-egypt.com:3006/api/v1/userRecipe/`, id, { headers: { Authorization: token } }
        );
        console.log(data);
        toast.success("Added To FavoriteList");
        return data;
    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message||"There's a mistake.");
    }
}
export async function apiDeleteFromFavoriteList(recipeId) {
    let token = localStorage.getItem("token");
    try {
        const { data } = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/userRecipe/${recipeId}`, { headers: { Authorization: token } }
        );
        console.log(data);
        toast.success("Deleted From FavoriteList");
        return data;
    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message||"There's a mistake.");
    }
}
