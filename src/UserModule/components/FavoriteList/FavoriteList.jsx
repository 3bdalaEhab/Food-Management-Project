import  { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import { apiDeleteFromFavoriteList, apiGetFavoriteList } from "./apiFavorite";
import { Watch } from "react-loader-spinner";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noData from "../../../assets/nodata.png";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertAddAndDeleteRecipes from "./AlertAddAndDeleteRecipes";

export default function FavoriteList() {
  const [showAlertSure, setShowAlertSure] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeId, setRecipeId] = useState(null);

  async function getFavoriteList() {
    try {
      const { data } = await apiGetFavoriteList();
      setFavoriteList(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching favorite list: ", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFavoriteList();
  }, []);

  async function deleteRecipesFromFavoriteList() {
    try {
      const data = await apiDeleteFromFavoriteList(recipeId);
      if (data) {
        handleCloseAlertSure();
        // Refresh favorite list after deletion
        getFavoriteList();
      }
    } catch (error) {
      console.error("Error deleting recipe from favorite list: ", error);
    }
  }

  const handleCloseAlertSure = () => setShowAlertSure(false);
  const handleShowAlertSure = () => setShowAlertSure(true);

  return (
    <>
      <Modal show={showAlertSure} onHide={handleCloseAlertSure} centered>
        <Link
          onClick={() => handleCloseAlertSure()}
          className="ms-auto m-2 text-danger h4 fa-regular fa-circle-xmark"
        ></Link>
        <AlertAddAndDeleteRecipes
          AnyFunction={deleteRecipesFromFavoriteList}
          title={"Are you sure to delete it from favoriteList ? 🙁"}
        />
      </Modal>
      <Header
        imag={5}
        word={"items"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        title={"Favorite"}
      />

      {isLoading ? (
        <div className="h3   vh-100 mt-5 d-flex justify-content-center pt-5 ">
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
      ) : favoriteList?.length > 0 ? (
        <div className=" d-flex flex-wrap  gap-4   justify-content-center  rounded-3 my-5  py-4   mx-auto">
          {favoriteList.map((favorite) => (
            <div key={favorite?.id} >
              <div className="card text-center position-relative  ">
                <span className=" container-heart position-absolute    heartInCard px-2 pt-2  d-flex align-items-center rounded-4">
                  <span
                    onClick={() => {
                      setRecipeId(favorite?.id);
                      handleShowAlertSure();
                    }}
                    className="h4"
                  >
                    <i className=" fa-solid text-success  fa-heart"></i>
                  </span>
                </span>
                <img
                  className=" bg-dark "
                  src={`${favorite?.recipe?.imagePath ? `https://upskilling-egypt.com/${favorite?.recipe?.imagePath}` : noData}`}
                  alt="Card image"
                />
                <div className="card-body">
                  <h5 className="card-title  fw-medium">
                    {" "}
                    {favorite?.recipe?.name}
                  </h5>
                  <p className="card-text lead">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
<div className="w-50 text-center mx-auto">
          <NoData world={"No Data !"} />
  
</div>      )}
    </>
  );
}
