const axios = require('axios')

module.exports = {
    handleCreate: (listingObj) => {
        if (listingObj) {
            return true
        } else {
            return false
        }
    },

    getUserFavorites: (user_id) => {
        if (user_id) {
            return {
                type: "GET_USER_FAVORITES",
                payload: ["someStuff", "moreStuff", "evenMoreStuff"]
            };
        } else {
            return {
                type: "GET_USER_FAVORITES",
                payload: []
            };
        }
    },

    handleDelete: (listingObj) => {
        if (listingObj) {
            return true
        } else {
            return false
        }
    },

    updateSearchTerm: (word) => {
        if (word) {
            return {
                type: "UPDATE_SEARCH_TERM",
                payload: word
            };
        } else {
            return {
                type: "UPDATE_SEARCH_TERM",
                payload: ''
            };
        }
    },

    testSwitchCase: (backgroundColor) => {
        if (backgroundColor === 'rgba(53, 138, 255') {
            return 'Electronics'
        } else if (backgroundColor === 'rgba(147, 74, 255') {
            return 'Home'
        } else if (backgroundColor === 'rgba(104, 208, 52') {
            return 'Sports'
        } else if (backgroundColor === 'rgba(151, 151, 151') {
            return 'Parts'
        } else if (backgroundColor === 'rgba(255, 127, 127') {
            return 'Free'
        } else if (backgroundColor === 'rgba(0, 255, 255, 0.68') {
            return 'Default'
        }
    },

    updateFilter: (filter) => {
        if (filter === 'Electronics') {
            return 'Electronics'
        } else if (filter === 'Home') {
            return 'Home'
        } else if (filter === 'Sports') {
            return 'Sports'
        } else if (filter === 'Parts') {
            return 'Parts'
        } else if (filter === 'Free') {
            return 'Free'
        }
    }

}