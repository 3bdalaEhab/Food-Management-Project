import { useEffect, useState } from "react";
import { Watch } from "react-loader-spinner";
import Header from "../../../SharedModule/components/Header/Header";
import HeaderTable from "../../../SharedModule/components/HeaderTable/HeaderTable";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { apiDeleteRecipe, apiGetRecipes } from "./apiRecipesList";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AlertDelete from "../../../SharedModule/components/AlertDelete/AlertDelete";
import noDataImage from "../../../assets/nodata.png"
import AlertView from "../../../SharedModule/components/AlertView/AlertView";
import { apiTag } from "../AddRecipe/apiAddAndUpdateRecipe";
import { apiShowCategories } from "../../../categoriesModule/components/CategoriesList/apiCategories";
import { apiAddFavoriteList } from "../../../UserModule/components/FavoriteList/apiFavorite";
import AlertAddAndDeleteRecipes from "../../../UserModule/components/FavoriteList/AlertAddAndDeleteRecipes";
import { handleJwtToken } from "../../../SharedModule/components/JwtToken/JwtToken";
import Pagination from "../../../SharedModule/components/Pagination/Pagination";

export default function RecipesList() {
  const [isLoading, setIsLoading] = useState(true)
  const [recipesList, setRecipesList] = useState([])
  const [categoryId, setCategoryId] = useState("")
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [showView, setShowView] = useState(false);
  const [detailsRecipe, setDetailsRecipe] = useState(null)
  const [nameSearch, setNameSearch] = useState("")
  const [tagIdSearch, setTagIdSearch] = useState("")
  const [categoryIdSearch, setCategoryIdSearch] = useState("")
  const [recipeId, setRecipeId] = useState(null)
  const [jwtDecode, setJwtDecode] = useState({})
  const [pagesArray, setPagesArray] = useState([])
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0)

  const handleCloseViewAlert = () => setShowView(false);
  const handleShowViewAlert = () => setShowView(true);

  async function getRecipes(pageNum) {
    console.log(nameSearch);
    const { data } = await apiGetRecipes(pageNum, nameSearch, tagIdSearch, categoryIdSearch);
    setRecipesList(data?.data);
    setTotalNumberOfPages(data?.totalNumberOfPages);
    setIsLoading(false);
    setPagesArray(Array(data?.totalNumberOfPages).fill().map((_, i) => i + 1));
  }

  useEffect(() => {
    getRecipes(1);
  }, [nameSearch, tagIdSearch, categoryIdSearch]);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDeleteAlert = () => setShowDelete(false);
  const handleShowDeleteAlert = () => setShowDelete(true);

  async function deleteRecipes() {
    const { data } = await apiDeleteRecipe(categoryId);
    if (data) {
      handleCloseDeleteAlert();
      // Update data after deletion
      getRecipes(1);
    }
  }

  function addNewItem() {
    navigate("/dashboard/AddAndUpdateRecipe/-")
  }

  function goToFavorite() {
    navigate("/dashboard/FavoriteList")
  }

  async function getTags() {
    try {
      const data = await apiTag();
      setTagList(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategories() {
    try {
      const { data } = await apiShowCategories(1, "");
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
    getTags();
  }, []);

  function getNameValue(value) {
    setNameSearch(value.target.value)
  }

  function getTagIdValue(value) {
    setTagIdSearch(value.target.value)
  }

  function getCategoryIdValue(value) {
    setCategoryIdSearch(value.target.value)
  }

  const [showAlertSure, setShowAlertSure] = useState(false);
  const handleCloseAlertSure = () => setShowAlertSure(false);
  const handleShowAlertSure = () => setShowAlertSure(true);

  async function addFavoriteList() {
    const data = await apiAddFavoriteList(recipeId)
    if (data) {
      handleCloseAlertSure();
      // Update data after adding to favorite list
      getRecipes(1);
    }
  }

  useEffect(() => {
    const jwtToken = handleJwtToken()
    setJwtDecode(jwtToken)
  }, [])

  return (
    <>
      <Header imag={5} word={"items"} paragraph={"You can now add your items that any user can order it from the Application and you can edit"} title={"Recipes"} />
      <HeaderTable
        Title={"Recipe Table Details"}
        ButtonTitle={jwtDecode?.userGroup === "SuperAdmin" ? "Add New Item" : "Go To FavoriteList"}
        ButtonFunction={jwtDecode?.userGroup === "SuperAdmin" ? addNewItem : goToFavorite}
      />
      <div className="row my-3 mt-5 gap-2 justify-content-center">
        <div className="col-md-7"><input onChange={getNameValue} type="text" className="form-control" placeholder="Search By Name" /></div>
        <div className="col-md-2 "><select onChange={getTagIdValue} className="form-control " aria-label="Floating label select example">
          <option value={""}  >Search By Tag</option>
          {tagList?.map((tag) => <option value={tag.id} key={tag.id}>{tag.name}</option>)}
        </select>
        </div>
        {jwtDecode?.userGroup === "SuperAdmin" ? <div className="col-md-2"><select onChange={getCategoryIdValue} className="form-control " >
          <option value={""} >Search By Category</option>
          {categories?.map((cat) => <option value={cat.id} key={cat.id}>{cat.name}</option>)}
        </select></div> : ""}
      </div>
      {isLoading ? (
        <div className='h3 vh-100 mt-5 d-flex justify-content-center pt-5 '>
          <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <div className="container-fluid d-flex justify-content-center m-0 p-0">
            {recipesList.length > 0 ? (
              <div className="table-responsive w-100  ">
                <table className=' w-100 table text-center'>
                  <thead className='  rounded-4 p-4 '>
                    <tr>
                      <th>Item Name</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Tag</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody >
                    {recipesList.map((item) => (
                      <tr key={item.id} >
                        <td >{item.name}</td>
                        <td >{item.imagePath ? <div> <img className='userImage' src={`https://upskilling-egypt.com/${item.imagePath}`} alt='item' /> </div> : <div> <img className='userImage' src={noDataImage} alt='onData' /> </div>}</td>
                        <td >{item.price}</td>
                        <td >{item?.description?.split("").slice(0, 4)}{item.description.length > 15 ? "...." : ""}</td>
                        <td >{item.tag.name}</td>
                        <td >{item?.category[0]?.name}</td>
                        <td >
                          <div className='d-flex justify-content-center align-items-center gap-3 '>
                            <button onClick={() => {
                              setDetailsRecipe(item)
                              handleShowViewAlert()
                            }} className="dropdown-item updateAndDelete ">
                              <i className="fa-solid fa-eye me-1 text-success"></i>View
                            </button>
                            {jwtDecode?.userGroup === "SuperAdmin" ? (
                              <>
                                <Link to={`/dashboard/AddAndUpdateRecipe/${item.id}`} className="dropdown-item updateAndDelete ">
                                  <i className="fa-solid fa-pen-to-square me-1 text-success"></i>Update
                                </Link>
                                <button onClick={() => {
                                  handleShowDeleteAlert()
                                  setCategoryId(item?.id)
                                }} className="dropdown-item updateAndDelete ">
                                  <i className="fa-solid fa-trash-can me-1 text-danger"></i>Delete
                                </button>
                              </>
                            ) : (
                              <button onClick={() => {
                                setRecipeId(item?.id)
                                handleShowAlertSure()
                              }} className="dropdown-item updateAndDelete  d-flex justify-content-center align-items-center">
                                <div className="h4 mt-2 me-2">
                                  <i className="text-danger fa-solid fa-heart"></i>
                                </div>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoData world={"No Data !"} />
            )}
          </div>
          {totalNumberOfPages > 1 && (
            <div className=" my-3 mx-auto text-center d-flex justify-content-center">
              <Pagination   totalNumberOfPages={totalNumberOfPages} anyFunction={getRecipes} pagesArray={pagesArray} nameSearch={nameSearch} tagIdSearch={tagIdSearch} categoryIdSearch={categoryIdSearch}/>
            </div>
          )}
        </>
      )}
      <Modal show={showDelete} onHide={handleCloseDeleteAlert} centered>
        <Link onClick={handleCloseDeleteAlert} className="ms-auto m-2 text-danger h4 fa-regular fa-circle-xmark"></Link>
        <AlertDelete world={"Delete This Item ?"} functionDelete={deleteRecipes} />
      </Modal>
      <Modal show={showView} onHide={handleCloseViewAlert} centered>
        <Link onClick={handleCloseViewAlert} className="ms-auto m-2 text-danger h4 fa-regular fa-circle-xmark"></Link>
        < AlertView detailsRecipe={detailsRecipe} />
      </Modal>
      <Modal show={showAlertSure} onHide={handleCloseAlertSure} centered>
        <Link onClick={handleCloseAlertSure} className="ms-auto m-2 text-danger h4 fa-regular fa-circle-xmark"></Link>
        < AlertAddAndDeleteRecipes AnyFunction={addFavoriteList} title={"Are you sure to add it to favoriteList ? 😍"} />
      </Modal>
    </>
  );
}
