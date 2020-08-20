export default class Search {
    constructor(query) {
        this.query = query
    }

    async getResults() {
        try {
            const res = await (await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`)).json()
            this.result = res.recipes

            // console.log(this.result)
        } catch (err) {
            alert(err)
        }

    }
}