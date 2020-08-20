import { DOM } from "./base";

export const getInput = () => DOM.targetInput.value

export const clearInput = () => {
    DOM.targetInput.value = ''
}

export const clearResults = () => {
    DOM.targetResultList.innerHTML = ''
    DOM.targetPagination.innerHTML=''
}


const trimExtraTitle=(title,limit =17)=>{
    const newTitle = []
    if(title.length <=limit){
        title.split().reduce((acc,cur)=>{
            if(acc + cur.length <= limit){
                newTitle.push(cur)
            }
            //to reduce
            return acc + cur.length
        })

        return `${newTitle.join('')}...`
    }
    return title
}
const renderRecipe = (recipe) => {
    /**
     * 
     * image_url: "http://forkify-api.herokuapp.com/images/chickentikkamasalac65c.jpg"
publisher: "The Pioneer Woman"
publisher_url: "http://thepioneerwoman.com"
recipe_id: "2fdcab"
social_rank: 99.99999999945585
source_url: "http://thepioneerwoman.com/cooking/2009/06/chicken-tikka-masala-by-pastor-ryan/"
title: "Pastor Ryan’s Chicken Tikka Masala"
     */
    const markUp = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${trimExtraTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `
    DOM.targetResultList.insertAdjacentHTML('beforeend', markUp)

}

export const renderButton = (page,type)=>{
    const button = `
    <button class="btn-inline results__btn--${type} data-goto=${type === 'prev' ? page -1 : page+1 }">
    <span>Page ${type === 'prev' ? page -1 : page+1 }</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `
    DOM.targetPagination.insertAdjacentHTML('beforeend',button) 
}

export const renderPagination = (page,totalRecipes,recipesPerPage)=>{
    const pages = Math.ceil(totalRecipes/recipesPerPage)
    console.log('pagination')
    if(page ===1 && pages>1){
        renderButton(page,'next')
    }else if(page < pages){
        renderButton(page,'prev')
        renderButton(page,'next')
    }else if (page === pages && pages > 1){
        renderButton(page,'prev')
    }

}

export const renderRecipes = (recipes, page=1, recipePerPage =10) => {
    const start = (page-1) * recipePerPage
    recipes.slice(start,start+recipePerPage).forEach(renderRecipe);

    renderPagination(page, recipes.length, recipePerPage)

}