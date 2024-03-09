import axios from "axios"
import toast from "react-hot-toast";



export async function apiGetRecipes(pageNum,  nameSearch, tagIdSearch, categoryIdSearch) {
  console.log( {"pageNum":pageNum,"nameSearch":nameSearch, "tagIdSearch":tagIdSearch,"categoryIdSearch":categoryIdSearch});
    let token = localStorage.getItem("token")
    try {
      const data = await axios.get(`https://upskilling-egypt.com:443/api/v1/Recipe/`,
      {
          params: {
            pageNumber:pageNum,
            pageSize:5,
            name:nameSearch,
            tagId:tagIdSearch,
            categoryId:categoryIdSearch,
          }
      },        { headers: { Authorization: token } })
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
        toast.error(error.response.message||"There's a mistake.")
      }
    }



export async function apiDeleteRecipe(id) {
    let token = localStorage.getItem("token")
    try {
      const data = await axios.delete(`https://upskilling-egypt.com:443/api/v1/Recipe/${id}`,
        { headers: { Authorization: token } })
        toast("Deleted", { icon: "😟" });
console.log(data);
        return data
    } catch (error) {
        console.log(error);
        toast.error(error.response.message||"There's a mistake.")
      }
    }


    // ===============================
  