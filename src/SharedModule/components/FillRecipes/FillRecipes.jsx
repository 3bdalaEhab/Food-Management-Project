import { useNavigate } from "react-router-dom"

export default function FillRecipes({name,buttonName,navigateTo}) {
  const navigate = useNavigate()

  return <>
  <div className="FillRecipes-container rounded-3 p-2 p-sm-5 mt-3 d-flex flex-wrap justify-content-between align-items-center">
<div className="info ">
    <h4>{name} the <span className=" Recipes">Recipes</span> !</h4>
    <p>you can now fill the meals easily using the table and form ,<br/> click here and sill it with the table !</p>
    
    
</div>
<div className="button ">
    <button onClick={()=>navigate(`${navigateTo}`)} className="text-white btn bg-btn px-4">{buttonName} <i className=" ms-2 fa-solid fa-right-long"></i></button>
</div>



  </div>
  
  
  </>
}
 