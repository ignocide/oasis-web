import { action, observable } from 'mobx'

class Search {
    @observable query: string = '';

    constructor(isServer: boolean, initialData: any) {
        this.query = initialData.query || ''
    }


}
export default Search;