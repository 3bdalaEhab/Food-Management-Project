import { useForm } from "react-hook-form";
import FillRecipes from "../../../SharedModule/components/FillRecipes/FillRecipes";
import { apiShowCategories } from "../../../categoriesModule/components/CategoriesList/apiCategories";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCreateNewRecipe, apiGetItem, apiTag, apiUpdateRecipeItem, appendToFormData } from "./apiAddAndUpdateRecipe";
import noData from "../../../assets/nodata.png"

export default function AddAndUpdateRecipe() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tagList, setTagList] = useState([]);
  const navigate = useNavigate();
  const [imageUpdate, setImageUpdate] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [dataItemUpdate, setDataItemUpdate] = useState({});
  const [categoryNameInUpdate, setCategoryNameInUpdate] = useState("");

 
async function getDataItemUpdate() {
  const data = await apiGetItem(id)
  if (data) {
    setDataItemUpdate(data);
  setCategoryNameInUpdate(data.category[0].name);
  handleFormValues(data);
  }
}

  useEffect(() => {
    if (id !== "-" ) {
      getDataItemUpdate()   
     }
  }, [categories,tagList]);

  function handleFormValues(data) {
    setValue("name", data.name);
    setValue("price", data.price);
    setValue("categoriesIds", data.category[0].id);
    setValue("tagId", data.tag.id);
    setValue("description", data.description);
    setValue("recipeImage", data.imagePath);
  }

  function handleImage(e) {
    setImageUpdate(URL.createObjectURL(e.target.files[0]));
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
      const { data } = await apiShowCategories(1,"");
      console.log(data);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
    getTags();
  }, []);

  async function addNewItemInRecipesList(formData) {
    try {
      let data = await apiCreateNewRecipe(formData);
      if (data) {
        navigate("/dashboard/RecipesList");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function updateItemInRecipesList(formData) {
    try {
      let data = await apiUpdateRecipeItem({ formData, id });
      if (data) {
        navigate("/dashboard/RecipesList");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const onSubmit = (values) => {
    setIsLoading(true);
    let formData = appendToFormData(values);
    if (id === "-") {
      addNewItemInRecipesList(formData);
    } else {
      updateItemInRecipesList(formData);
    }
  };

  return (
    <>
      <FillRecipes navigateTo={"/dashboard/RecipesList"} name={"Fill"} buttonName={"All Recipes"} />
      <div className="w-100  my-5">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-75 d-flex flex-column gap-3">
          <div className="flex-column">
            <div className="input-group bd has-validation">
              <input
                placeholder="Recipe Name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 12,
                    message: "Name must be at most 12 characters"
                  },
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                type="text"
                className="form-control bg-light"
              />
            </div>
            {errors.name && <div className="mt-1 py-1 alert alert-danger">{errors.name.message}</div>}
          </div>
          <div className="flex-column">
            <div className="input-group bd has-validation">
              <div className="w-100 input">
                <select
                  {...register("categoriesIds", { required: "Category is required" })}
                  className="form-select"
                >
                  <option >{dataItemUpdate?.category ? categoryNameInUpdate: "Category"}</option>
                  {categories?.map((cat, indx) => <option key={indx} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
            </div>
            {errors.categoriesIds && <div className="mt-1 py-1 alert alert-danger">{errors.categoriesIds.message}</div>}
          </div>
          <div className="flex-column">
            <div className="input-group bd has-validation">
              <input
                placeholder="Recipe Price"
                {...register("price", {
                  required: "Price is required",
                  maxLength: { value: 4, message: "Price must be at most 4000 Number" },
                  minLength: { value: 1, message: "Price must be at least 1 Number" },
                })}
                type="number"
                className="form-control bg-light"
              />
            </div>
            {errors.price && <div className="mt-1 py-1 alert alert-danger">{errors.price.message}</div>}
          </div>
          <div className="flex-column">
            <div className="input-group bd has-validation">
              <div className="w-100 input">
                <select
                  {...register("tagId", { required: "Tag is required" })}
                  className="form-select"
                >
                  <option >{dataItemUpdate?.tag?.name ? dataItemUpdate?.tag?.name : "Tag"}</option>
                  {tagList?.map((tag, indx) => <option key={indx} value={tag.id}>{tag.name}</option>)}
                </select>
              </div>
            </div>
            {errors.tagId && errors.tagId.type === "required" && <div className="mt-1 py-1 alert alert-danger">Tag is required</div>}
          </div>
          <div className="flex-column">
            <div className="input-group bd has-validation">
              <textarea
                rows={5}
                placeholder="Description"
                {...register("description",{
                  maxLength:{
                    value:500,
                    message:"Description must be at most 500 characters"
                }})}
                type="text"
                className="form-control bg-light"
              ></textarea>
            </div>
            {errors.description && <div className="mt-1 py-1 alert alert-danger">{errors.description.message}</div>}

          </div>
          <div className="file-upload text-center fillImage rounded-4 p-2 py-5 ">
            <div className="image-upload-wrap  overflow-hidden">
              {imageUpdate || dataItemUpdate.imagePath ?<img className="userImage m-3" src={imageUpdate || `https://upskilling-egypt.com/${dataItemUpdate.imagePath}  `} alt="RecipeImage" /> 
               :  <img className="userImage m-3 mx-auto" src={noData} alt="RecipeImage." /> }
              <div className="drag-text mx-auto ">
                <input
                  {...register("recipeImage")}
                  onChange={(e) => handleImage(e)}
                  className="file-upload-input  "
                  type='file'
                />
                <h5>Drag & Drop or <span className="text-success">Choose a Item Image</span> to Upload</h5>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-center gap-3">
            <button className={`btn px-3 border-0 text-white bg-btn py-2 rounded-3 ${isLoading ? "noClickInButtonAgain" : ""}`}>
              {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : `${ id === "-"  ? "Save" : "Update"}`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
