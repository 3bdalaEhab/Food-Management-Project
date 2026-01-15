import axios from "axios";
import toast from "react-hot-toast";



export function appendToFormData(values) {
    let recipeForm = new FormData();
    recipeForm.append('name', values.name);
    recipeForm.append('price', values.price);
    recipeForm.append('categoriesIds', values.categoriesIds);
    recipeForm.append('tagId', values.tagId);
    recipeForm.append('description', values.description);
    recipeForm.append('recipeImage', values.recipeImage[0]);  
    return recipeForm;
  }


 export async function apiCreateNewRecipe(formData) {
    let token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(`https://upskilling-egypt.com:3006/api/v1/Recipe/`, formData, { headers: { Authorization: token } });
      console.log(data);
      toast.success(data.message);
      console.log(data);
      return data
    } catch (error) {
        toast.error(error?.response?.data?.message||"There's a mistake.")
      console.log(error);
    }
  }
  

export async function apiUpdateRecipeItem({formData,id}) {

    let token = localStorage.getItem("token");
    try {
      const { data } = await axios.put(`https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`, formData, { headers: { Authorization: token } });
      console.log(data);
      toast("Updated", { icon: "😊" });
      localStorage.removeItem("item")
      return data
    } catch (error) {
        toast.error(error?.response?.data?.message||"There's a mistake.")
      console.log(error);
    }
  }



 export async function apiTag() {
    let token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(`https://upskilling-egypt.com:3006/api/v1/tag/`, { headers: { Authorization: token } });
      return data
    } catch (error) {
      console.log(error);
    }
  }




 export async function apiGetItem(id) {
    let token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`, { headers: { Authorization: token } });
     return data
    } catch (error) {
      console.log(error);
    }
  }
