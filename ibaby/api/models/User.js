/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝
    // ╚═╝╚═╝

    email: {
      type: 'string',
      unique: true,
      required: true,
      isEmail: true,
      example: 'toto@gmail.com'
    },
    name: {
      type: 'string',
      required: true,
      example: 'Doe'
    },
    firstName: {
      type: 'string',
      required: true,
      example: 'John'
    },
    dateOfBirth: {
      type: 'number',
      isBefore: new Date()
    },
    sex: {
      type: 'string',
      isIn: ['male', 'female']
    },
    password: {
      type: 'string',
      required: true
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗  ║╣ ║║║╠╩╗║╣  ║║╚═╗  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗  ╩
    // ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    team: {
      model: 'team'
    },
    userMatch: {
      model: 'userMatch'
    },
    reservations: {
      collection: 'reservation',
      via: 'user'
    }

  }
};
