"use strict";
var expect = require('chai').expect;
var Client = require('../classes/client');
var Clients = require('../classes/clients');

// Setup a dummy Socket with a dummy emit method
var Socket = function(){
    this.emitted = "";
    this.action = "";

};

Socket.prototype.emit = function(action, msg){
    this.emitted = msg;
    this.action = action;
};

var sockets = [];
var client_objs = [];


describe("Client", function(){

  describe("name()", function(){
    it("should exist", function(){
      var client = new Client();
      expect(client).to.have.property('name');
    });
    it("should return an empty string if no name is passed to the constructor", function(){
      var client = new Client();
      expect(client.name()).to.be.a('string');
      expect(client.name()).to.empty;
    });
    it("should return a string provided to it via the constructor", function(){
      var client = new Client({name: "Bob"});
      expect(client.name()).to.equal("Bob");
    });
    it("should be able to set the name to a string", function(){
      var client = new Client();
      client.name('Bob');
      expect(client.name()).to.equal("Bob");
    });
  });

  describe("from_lang()", function(){
    it("should exist", function(){
      var client = new Client();
      expect(client).to.have.property('from_lang');
    });
    it("should return an empty string if no from_lang is passed to the constructor", function(){
      var client = new Client();
      expect(client.from_lang()).to.be.a('string');
      expect(client.from_lang()).to.empty;
    });
    it("should return a string provided to it via the constructor", function(){
      var client = new Client({from_lang: "en"});
      expect(client.from_lang()).to.equal("en");
    });
    it("should be able to set the from_lang to a string", function(){
      var client = new Client();
      client.from_lang('en');
      expect(client.from_lang()).to.equal("en");
    });
  });

  describe("to_lang()", function(){
    it("should exist", function(){
      var client = new Client();
      expect(client).to.have.property('to_lang');
    });
    it("should return an empty string if no to_lang is passed to the constructor", function(){
      var client = new Client();
      expect(client.to_lang()).to.be.a('string');
      expect(client.to_lang()).to.empty;
    });
    it("should return a string provided to it via the constructor", function(){
      var client = new Client({to_lang: "en"});
      expect(client.to_lang()).to.equal("en");
    });
    it("should be able to set the to_lang to a string", function(){
      var client = new Client();
      client.to_lang('en');
      expect(client.to_lang()).to.equal("en");
    });
  });

  describe("socket()", function(){
    it("should exist", function(){
      var client = new Client();
      expect(client).to.have.property('socket');
    });
    it("should return null if no socket is passed to the constructor", function(){
      var client = new Client();
      expect(client.socket()).to.be.null;
    });
    it("should throw an error if a socket is provided to the constructor that has no 'emit' method", function(){
      expect(function(){new Client({socket: new Object()})}).to.throw(Error);
    });
  });

  describe("output_media()", function(){
    it("should exist", function(){
      var client = new Client();
      expect(client).to.have.property('output_media');
    });
    it("should return an empty array if no output_media are passed to the constructor", function(){
      var client = new Client();
      expect(client.output_media()).to.be.an('Array');
      expect(client.output_media()).to.empty;
    });
    it("should return an array provided to it via the constructor", function(){
      var client = new Client({output_media: ["text"]});
      expect(client.output_media()).to.deep.equal(["text"]);
      expect(function(){new Client({output_media: "text"})}).to.throw(Error);
    });
    it("should be able to set the output_media to an array and only an array", function(){
      var client = new Client();
      client.output_media(["text", "audio"]);
      expect(client.output_media()).to.deep.equal(["text", "audio"]);
      expect(function(){client.output_media("text")}).to.throw(Error);
    });
  });


  describe("emit()", function(){
    it("should exist", function(){
      var client = new Client();
      expect(client).to.have.property('emit');
    });
    it("should throw an error if no socket is set", function(){
      var client = new Client();
      expect(function(){client.emit({msg: 'dummy', from_lang: 'en'})}).to.throw(Error);
    });
    it("should call the instance's socket.emit() method with whatever arguments are provided", function(done){
      sockets[0] = new Socket();
      sockets[0].real_emit = sockets[0].emit;
      sockets[0].emit = function(action, msg){
        sockets[0].real_emit(action, msg);
        done();
      };
      client_objs[0] = new Client({socket: sockets[0], to_lang: 'en', output_media: ['text']});
      client_objs[0].emit({action: 'new message', msg: 'Hi', from_lang: 'en'});
    });
    it("socket[0].emitted should be what was provided above", function(){
      expect(sockets[0].emitted).to.equal('Hi');
    });
    it("should emit a message using the provided action", function(){
      expect(sockets[0].action).to.equal('new message');
    });
    it("should fetch the correct translation for 'Hi' in Spanish", function(done){
      client_objs[0].to_lang('es');
      sockets[0].emit = function(action, msg){
        sockets[0].real_emit(action, msg);
        done();
      };
      client_objs[0].emit({msg: 'Hello', from_lang: 'en'});
    });
    it("fetched translation should have a 'text' property equa to 'Hola'", function(){
      expect(sockets[0].emitted).to.have.property('text');
      expect(sockets[0].emitted.text).to.equal('Hola');
    });
  });
});

describe('Clients', function(){
  describe("name()", function(){
    it("should exist", function(){
      var clients = new Clients();
      expect(clients).to.have.property('name');
    });
    it("should return an empty string if no name is passed to the constructor", function(){
      var clients = new Clients();
      expect(clients.name).to.be.a('string');
      expect(clients.name).to.empty;
    });
    it("should return a string provided to it via the constructor", function(){
      var clients = new Clients({name: "International Discussion"});
      expect(clients.name).to.equal("International Discussion");
    });
    it("should be able to set the name to a string", function(){
      var clients = new Clients();
      clients.name("International Discussion");
      expect(clients.name).to.equal("International Discussion");
    });
  });

  describe("broadcast()", function(){
    it("should exist", function(){
      var clients = new Clients();
      expect(clients).to.have.property('broadcast');
    });
    it("should be able to add Client objects to it", function(){
      var client1 = new Client();
      var client2 = new Client();
      var clients = new Clients();
      expect(clients.insert(client1)).to.not.throw(Error);
      clients.insert(client2);
      expect(clients.contains([client1, client2])).to.be.true;
    });
    it("should send a message to all Client objects in the Clients list if ignore_clients is not provided", function(){
      var socket1 = new Socket();
      var socket2 = new Socket();
      var client1 = new Client({socket: socket1, to_lang: "es", output_media: ["text"]});
      var client2 = new Client({socket: socket2, to_lang: "fr", output_media: ["text"]});
      var clients = new Clients();
      clients.insert(client1);
      clients.insert(client2);
      clients.broadcast({action: 'new message', msg: 'Hello', from_lang: 'en'});
      expect(socket1.emitted).to.equal('hola');
      expect(socket2.emitted).to.equal('Salut');
    });
    it("should not send a message to all Client objects provided in an ignore_clients list", function(){
      var socket1 = new Socket();
      var socket2 = new Socket();
      var socket3 = new Socket();
      var client1 = new Client({socket: socket1, to_lang: "es", output_media: ["text"]});
      var client2 = new Client({socket: socket2, to_lang: "fr", output_media: ["text"]});
      var client3 = new Client({socket: socket3, to_lang: "ja", output_media: ["text"]});
      var clients = new Clients();
      clients.insert(client1);
      clients.insert(client2);
      clients.insert(client3);
      clients.broadcast({action: 'new message', msg: 'Hello', from_lang: 'en', ignore_clients: [client2, client3]});
      expect(socket1.emitted).to.equal('hola');
      expect(socket2.emitted).to.be.empty;
      expect(socket3.emitted).to.be.empty;
    });

  });
});
