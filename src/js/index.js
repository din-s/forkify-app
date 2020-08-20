// Global app controller
import Search from './models/Search'
import Recipe from './models/Recipe'
import { DOM, renderLoader, clearLoader } from './views/base'
import * as serviceView from './views/searchView'


//App State
const state = {}

//searchController

const controlSearch = async () => {
    // 1.get input from view
    const query =serviceView.getInput() 

    if (query) {
        // 2. get the data from api and store to state
        state.search = new Search(query)

        // 3. Prepare UI for results
        renderLoader(DOM.targetResults)
        serviceView.clearInput()
        serviceView.clearResults()
        
        // 4. get results for search
        await state.search.getResults()

        // 5. dump to UI
        clearLoader()
        serviceView.renderRecipes(state.search.result)

    }
}

//Individual Recipe Controller

const recipe = new Recipe(47746)
recipe.getRecipe()

//Event that will call both model and view for search

    DOM.targetForm.addEventListener('submit', (e) => {
        e.preventDefault()
        controlSearch()
    })

    DOM.targetPagination.addEventListener('click',e=>{
        e.preventDefault()
        console.log(e.target)
    })



