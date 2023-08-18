// import icons from '../img/icons.svg';
// console.log(icons);
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';

// const recipeContainer=document.querySelector('.recipe');
 
const controlRecipes=async function()
{
    try{
        const id=window.location.hash.slice(1);
        // console.log(id);

        if(!id){
          return;  
        }
        recipeView.renderSpinner();

        // 0. UPDATE RESULTS VIEW TO MARK SELECTED SEARCH RESULT
        resultsView.update(model.getsearchResultsPage());

        // 1) Updating bookmarks view
        bookmarksView.update(model.state.bookmarks);
         // 2. LOADING RECIPE
        await  model.loadRecipe(id);
          // const recipe=model.state.recipe;

        // 3. RENDERING RECIPE
        recipeView.render(model.state.recipe);
    }
    catch(error){
        recipeView.renderError(`We couldn not find that recipe.Please try another one!!😦😦`);
    }

};

const controlSearchResults=async function(){
  try{
    resultsView.renderSpinner();
    // 1.) GET SEARCH QUERY 
    const query=searchView.getQuery();
    if(!query)
    {
      return;
    }
    // 2.) LOAD SEARCH RESULTS
    await model.loadSearchResults(query);

    // 3.) RENDER SEARH RESULTS
    resultsView.render(model.getsearchResultsPage());

    // 4.) RENDER INITIAL PAGINATION
    paginationView.render(model.state.search);
  }catch(error)
  {
    console.log(error);
  }
}

const controlPagination=function(goToPage){ 

  // 3.) RENDER NEW RESULTS
  resultsView.render(model.getsearchResultsPage(goToPage));

  // 4.) RENDER INITIAL PAGINATION
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

// const controlAddBookmark = function () {
//   // 1) Add/remove bookmark
//   if 
//   (!model.state.recipe.bookmarked) {model.addBookmark(model.state.recipe);}
//   else {model.deleteBookmark(model.state.recipe.id);}

//   // 2) Update recipe view
//   recipeView.update(model.state.recipe);

//   // 3) Render bookmarks
//   bookmarksView.render(model.state.bookmarks);
// };

// const controlBookmarks = function () {
//   bookmarksView.render(model.state.bookmarks);
// };

// const controlAddRecipe = async function (newRecipe) {
//   try {
//     // Show loading spinner
//     addRecipeView.renderSpinner();

//     // Upload the new recipe data
//     await model.uploadRecipe(newRecipe);
//     console.log(model.state.recipe);

//     // Render recipe
//     recipeView.render(model.state.recipe);

//     // Success message
//     addRecipeView.renderMessage();

//     // Render bookmark view
//     bookmarksView.render(model.state.bookmarks);

//     // Change ID in URL
//     window.history.pushState(null, '', `#${model.state.recipe.id}`);

//     // Close form window
//     setTimeout(function () {
//       addRecipeView.toggleWindow();
//     }, MODAL_CLOSE_SEC * 1000);
//   } catch (err) {
//     console.error('💥', err);
//     addRecipeView.renderError(err.message);
//   }
// };


// const init=function(){
//      bookmarksView.addHandlerRender(controlBookmarks);
//      recipeView.addHandlerRender(controlRecipes);
//      recipeView.addHandlerUpdateServings(controlServings);
//      recipeView.addHandlerAddBookmark(controlAddBookmark);
//      searchView.addHandlerSearch(controlSearchResults);
//      paginationView.addHandlerClick(controlPagination);
//      addRecipeView.addHandlerUpload(controlAddRecipe);
// };
// init();



 


 