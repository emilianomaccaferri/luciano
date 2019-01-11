'use strict'

const EventEmitter = require('events');

class Handler extends EventEmitter {

  constructor(data){

    super();
    this.data;

  }

  async handle(data){

    /*

      200:a         = on
      200:s         = off
      200:0|1       = status request fullfilled
      500:a|s|0|1   = error

    */

    var args = data.split(":");

    if(args.length == 0)
      return this.emit('bad-data');

    switch(args[0]){

      case "200":

        // ok good

        if(args[1] == "a")
          return this.emit('isOn')

        if(args[1] == "s")
          return this.emit('isOff')

        return this.emit('status', args[1]);

      break;

      case "500":

        // ok not good

      break;

    }

  }

}

module.exports = Handler;
