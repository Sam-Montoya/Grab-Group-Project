const functions = require('./functions')

const GET_USER_FAVORITES = "GET_USER_FAVORITES";
const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';

describe("handleCreate", () => {
    test("handleCreate(listingObj) should return true", () => {
        expect(functions.handleCreate('listingObj')).toBeTruthy()
    })

    test("handleCreate() should return false", () => {
        expect(functions.handleCreate()).toBeFalsy()
    })
})

describe("getUserFavorites", () => {
    test("getUserFavorites should exist", () => {
        expect(functions.getUserFavorites).toBeTruthy();
    })

    test("getUserFavorites should return an action with a type and payload", () => {
        expect(functions.getUserFavorites("1414")).toEqual({
            type: "GET_USER_FAVORITES",
            payload: ["someStuff", "moreStuff", "evenMoreStuff"]
        })
    })
})

describe("handleDelete", () => {
    test("handleDelete(listingObj) should return true", () => {
        expect(functions.handleDelete('listingObj')).toBeTruthy()
    })

    test("handleDelete() should return false", () => {
        expect(functions.handleDelete()).toBeFalsy()
    })
})

describe("updateSearchTerm", () => {
    test("updateSearchTerm should exist", () => {
        expect(functions.updateSearchTerm).toBeTruthy();
    })

    test("updateSearchTerm with a word should return an action with a type and payload", () => {
        expect(functions.updateSearchTerm("HELLO")).toEqual({
            type: "UPDATE_SEARCH_TERM",
            payload: "HELLO"
        })
    })

    test("updateSearchTerm with an empty string should return an action with a type and payload", () => {
        expect(functions.updateSearchTerm("")).toEqual({
            type: "UPDATE_SEARCH_TERM",
            payload: ""
        })
    })
})

describe("testSwitchCase", () => {
    test("If backgroundColor('rgba(53, 138, 255') should return 'Electronics'", () => {
        expect(functions.testSwitchCase('rgba(53, 138, 255')).toEqual('Electronics')
    })
    test("If backgroundColor('rgba(147, 74, 255') should return 'Home'", () => {
        expect(functions.testSwitchCase('rgba(147, 74, 255')).toEqual('Home')
    })
    test("If backgroundColor('rgba(104, 208, 52') should return 'Sports'", () => {
        expect(functions.testSwitchCase('rgba(104, 208, 52')).toEqual('Sports')
    })
    test("If backgroundColor('rgba(151, 151, 151') should return 'Parts'", () => {
        expect(functions.testSwitchCase('rgba(151, 151, 151')).toEqual('Parts')
    })
    test("If backgroundColor('rgba(255, 127, 127') should return 'Free'", () => {
        expect(functions.testSwitchCase('rgba(255, 127, 127')).toEqual('Free')
    })
    test("If backgroundColor('rgba(0, 255, 255, 0.68') should return 'Default'", () => {
        expect(functions.testSwitchCase('rgba(0, 255, 255, 0.68')).toEqual('Default')
    })
})

describe("updateFilter", () => {
    test("If updateFilter('Electronics') should return 'Electronics'", () => {
        expect(functions.updateFilter('Electronics')).toEqual('Electronics')
    })
    test("If updateFilter('Home') should return 'Home'", () => {
        expect(functions.updateFilter('Home')).toEqual('Home')
    })
    test("If updateFilter('Sports') should return 'Sports'", () => {
        expect(functions.updateFilter('Sports')).toEqual('Sports')
    })
    test("If updateFilter('Parts') should return 'Parts'", () => {
        expect(functions.updateFilter('Parts')).toEqual('Parts')
    })
    test("If updateFilter('Free') should return 'Free'", () => {
        expect(functions.updateFilter('Free')).toEqual('Free')
    })
})