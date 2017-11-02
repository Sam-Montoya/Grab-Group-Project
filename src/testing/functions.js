const axios = require('axios')

module.exports = {
    returnTwo: function(){
        return 2
    }, 

    handleCreate: (listingObj) => {
        if(listingObj){
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
}
    
}