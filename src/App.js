import React,{useState,useEffect} from "react";
import Recipe from "./Recipe";

const App =()=>{
  const App_ID="aa2b37c5"
  const App_key="ce32218b30de948fbd0c89bd946ab342"

  const[recipes,setRecipes]=useState([])
  const[search, setSearch]=useState("");
  const[query, setQuery]=useState('fish');

  useEffect(()=>{
    getRecipes();
  },[]);


  const getRecipes= async()=>{
    console.log(query)
    // console.log(`https://api.edamam.com/search?q=query&app_id=${App_ID}&app_key=${App_key}`)
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_key}`);
    const data= await response.json();
    setRecipes(data.hits);
    console.log(data);
  };

  const updatesearch = e =>{
    setSearch(e.target.value);
    

  }

  const getsearch = e =>{
    e.preventdefault();
    console.log(search)
    setQuery(search);

  }

  return(
    <div>
      <div>
        <form onSubmit={getsearch}>
          <input type='text' value={search} onChange={updatesearch}/>
          <button type="submit">search</button>
        </form>
        {recipes.map(recipe=>(
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          images={recipe.recipe.image}
          />
        ))}
      </div>
    </div>

  )
}

export default App;