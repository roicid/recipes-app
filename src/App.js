import React, {useEffect , useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () =>  {

  const API_ID = "4c8500c5";
  const API_KEY= "7fa1d51ac469fba0607a8e675225c308";
  //const exampleRequest =  `https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
  
  const [recipes , setRecipes]  = useState([]);

  const [search , setSearch] = useState("") ; 

  const [query , setQuery] = useState("chicken");



  useEffect(() => {
  
    getRecipes();
    } , [query]);  

    const getRecipes = async () => {
      const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`);
      const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    }; 

    const updateSearch = e => {
        setSearch(e.target.value);
        
        ;
    };

    const getSearch = e => {
      e.preventDefault() ;
      setQuery(search);
      setSearch('') ; // esto hace q luego de apretar buscar , se ponga en blanco el buscador;
    }

  return ( 
    <div className="App">
     <form onSubmit= {getSearch} className="search-form" >
        <input className="search-bar" type= "text" value={search} onChange={updateSearch} />
        <button className="search-buttom" type="submit">  search </button>
        </form>
<div className= "recipes">
        {recipes.map(recipe=> (
             
             <Recipe  
               key= {recipe.recipe.label}
               title = {recipe.recipe.label}
               calories= {recipe.recipe.calories}
               image = {recipe.recipe.image}
               ingredients = {recipe.recipe.ingredients}
             />

        ))}

        </div>

       
    </div>
  );
}

export default App;
