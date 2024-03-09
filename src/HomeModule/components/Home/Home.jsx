import Header from '../../../SharedModule/components/Header/Header'
import FillRecipes from '../../../SharedModule/components/FillRecipes/FillRecipes'
import { useEffect, useState } from 'react'
import { handleJwtToken } from '../../../SharedModule/components/JwtToken/JwtToken'

export default function Home() {


  const [jwtDecode, setJwtDecode] = useState({})
  console.log(jwtDecode);

  useEffect(() => {
    const jwtToken = handleJwtToken()
    setJwtDecode(jwtToken)
  }, [])


  return <>
  <Header  paragraph={"This is a welcoming screen for the entry of the application , you can now see the options"} word={jwtDecode?.userName} title={"Welcome"} imag={1} />
  {jwtDecode?.userGroup === "SuperAdmin"? <FillRecipes navigateTo={"AddAndUpdateRecipe/-"} buttonName={"Fill Recipes"} name={"Fill"}/>
: <FillRecipes navigateTo={"RecipesList"} buttonName={"All Recipes"} name={"Fill"}/>}
  </>
}
