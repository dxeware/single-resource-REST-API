"use strict";

angular.module('shoppingListApp')
  .service( 'StoreListService', StoreListService);

// Generic ListService that contains store
// list and methods for adding, removing, etc.
function StoreListService( $http, $q) {
  var shoppingList = [];
  var deferred = $q.defer();

  var service = {
    list: shoppingList,
    addItem: addItem,
    deleteItem: deleteItem,
    updateItem: updateItem,
  };

  // Add an entry to the store's list
  function addItem( entry ) {
    $http.post( storelist_url, entry ).then(
      function(response) {
        console.log("POST success");
        console.log(response);
        deferred.resolve(response);
      },
      function(error) {
        console.log("POST error");
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  // Delete an item from the store's list via id
  function deleteItem( id ) {
    $http.delete( storelist_url + '/' + id ).then(
      function(response) {
        console.log(response);
        deferred.resolve(response);
      },
      function(error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }


  // Update an item in the store's list via id
  function updateItem( id, entry ) {
    $http.put( storelist_url + '/' + id, entry ).then(
      function(response) {
        console.log(response);
        deferred.resolve(response);
      },
      function(error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  return service;

}
