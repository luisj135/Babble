/** 
 * @module Clients 
 * @namespace 
 **/

/**
 * @constructor
 * @alias module:Clients
 * @classdesc Represents all of the clients in a room, with a convience method
 *            for broadcasting a translated message to all of them.
 */
var Clients = function(){
  // Instance Variables
  this._name = "";
  this._clients = [];
  this._client_names = [];
}

/**
 * Access and modify the Client List's name. If called without an argument, it
 * will return the Client List's current name. If called with an argument, it
 * will set the Client List's name to the provided string, and return the newly
 * set name.
 *
 * @method name
 * @param {String} new_name A string to set the Client List's name to
 * @throws {Error} If new_name is provided, it must be a string
 * @returns {String} The Client List's name
 */
Clients.prototype.name = function(new_name){

}

/**
 * Adds a new client to the room.
 *
 * @method insert
 * @param {Client} The Client to add
 */
Clients.prototype.insert = function(new_client){

}

/**
 * Removes a client from the room.
 *
 * @method remove
 * @param {Client} The Client to remove
 * @returns {Boolean} True if the Client was removed, False otherwise
 */
Clients.prototype.remove = function(leaving_client){

}

/**
 * Checks whether the provided Client(s) are in the room. Can either check for
 * a single Client, or an Array of Client objects.
 *
 * @method contains
 * @param {Client or Client[]} Client or Client objects to look for
 * @returns {Boolean} True if all provided Client objects are in the room, False otherwise
 */
Clients.prototype.contains = function(subset){

}

/**
 * Returns the size of the room - the number of Client objects in the room.
 *
 * @method size
 * @return {Number} Number of Client objects in the room
 */
Clients.prototype.size = function(){

}
 
/**
 * Translates the provided message and sends the translation and provided 
 * aciton, in appropriate media, to all clients in the list.
 *
 * If ignore_clients is provided, than the provided message and action will not
 * be translated and emitted to any Client objects in the Clients list that are
 * also in the ignore_clients list.
 *
 * If output_media is provided, it will determine which media to translate to
 * and broadcast. Otherwise, the output_media properties of clients in the 
 * list will be used to determine which media to output to each client.
 *
 * Refer to Client#emit for notes on available output_media and their
 * associated behaviors.
 *
 * @method broadcast 
 * @param {String} action The Socket.IO action to broadcast
 * @param {String} msg The string to translate and broadcast
 * @param {String} from_lang Language code for the language that msg is 
 *                           currently in
 * @param {Client[]} ignore_clients List of Client objects to not emit a 
 *                                  broadcast to
 * @param {String[]} [output_media] If provided, this will override the 
 *                                  output_media of the clients for this
 *                                  broadcast
 */
Clients.prototype.broadcast = function(params){

}

module.exports = Clients