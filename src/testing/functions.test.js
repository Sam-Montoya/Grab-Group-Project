const functions = require('./functions')

const GET_USER_FAVORITES = "GET_USER_FAVORITES";

describe("returnTwo", () => {
    test("returnTwo() should return 2", () => {
        expect(functions.returnTwo()).toEqual(2)
    })
})

describe("handleCreate", () => {
    test ("handleCreate(listingObj) should return true", () => {
        expect(functions.handleCreate('listingObj')).toBeTruthy()
    })

    test ("handleCreate() should return false", () => {
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