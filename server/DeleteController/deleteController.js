/**
 * This controller holds all the delete requests
 */

module.exports =  {
    // This sets the column owner_delete to True making it invisible for the owner but not for the client
    deleteOwnerChat(DB, request, response){
        
    },
    // This sets the column owner_delete to True making it invisible for the owner but not for the client
    deleteClientChat(DB, request, response){

    },
    // Removes the listing from your favorites
    removeFromFavorites(DB, request, response){
        DB.remove_favorite(request.params.auth_id).then(res => {
            response.status(200).send('Favorite has been deleted');
        });
    },
    // Removes a listing from the DB
    removeListing(DB, request, response){
        DB.delete_chat_and_listing(request.params.listing_id).then(res => {
            response.status(200).send('Listing has been deleted.');
        });
    }
}