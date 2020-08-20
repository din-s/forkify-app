export default class Recipe {
    constructor(id) {
        this.id = id
    }

    async getRecipe() {
        try {
            const json = await (await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)).json()
            /**
             *  Sample response
            image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
            ingredients: (6) ["4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled", "1 3/4 (.44 ounce) teaspoons salt", "1 teaspoon (.11 ounce) instant yeast", "1/4 cup (2 ounces) olive oil (optional)", "1 3/4 cups (14 ounces) water, ice cold (40F)", "Semolina flour OR cornmeal for dusting"]
            publisher: "101 Cookbooks"
            publisher_url: "http://www.101cookbooks.com"
            recipe_id: "47746"
            social_rank: 100
            source_url: "http://www.101cookbooks.com/archives/001199.html"
            title: "Best Pizza Dough Ever"
             */
            this.title = json.recipe.title
            this.image = json.recipe.image_url
            this.publisher = json.recipe.publisher
            this.url = json.recipe.source_url
            this.ingredient = json.recipe.ingredient
            console.log(json.recipe)
        } catch (err) {
            console.log(err)
        }
    }
}

