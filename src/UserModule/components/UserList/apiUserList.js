import axios from "axios"
import toast from "react-hot-toast";






export async function apiGetUsersList(pageNum, nameSearch, emailSearch, rolesSearch) {
  let token = localStorage.getItem("token");
  try {
    const data = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Users/`, {
      headers: { Authorization: token },
      params: {
        pageSize: 5,
        pageNumber: pageNum,
        userName: nameSearch,
        email: emailSearch,
        groups: rolesSearch,
      }
    });
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message||"There's a mistake.");
  }
}


export async function apiDeleteUsersList(id) {
  let token = localStorage.getItem("token")
  try {
    const { data } = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Users/${id}`,
      { headers: { Authorization: token } })
    toast.success(data?.message)
    return data
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message||"There's a mistake.")
  }
}
