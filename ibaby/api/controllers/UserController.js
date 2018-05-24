/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
    login: async function (req, res) {
        var user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.notFound();
        }
        var result = bcrypt.compareSync(req.body.password, user.password);
        if (!result) {
            return res.notFound();
        }

        var token = jwt.sign({
            user: user.id
        }, sails.config.jwt.jwtSecret, {expiresIn: sails.config.jwt.jwtExpiresIn});
        return res.ok({token: token, firstName: user.firstName})
    },
    logout: function (req, res) {},
    register: async function (req, res) {
        console.log(req.body)
        if (_.isUndefined(req.body.email)) {
            return res.badRequest('Il est ou mon Email');
        }
        if (_.isUndefined(req.body.password)) {
            return res.badRequest('Il est ou mon Password');
        }
        if (_.isUndefined(req.body.name)) {
            return res.badRequest('Il est ou mon Nom');
        }
        if (_.isUndefined(req.body.firstName)) {
            return res.badRequest('Il est ou mon Prenom');
        }
        if (req.body.password.lenght < 10) {
            return res.badRequest("C'est quoi ce mot de passe de daube");
        }

        var user = await sails.helpers.createUser.with ({email: req.body.email, password: req.body.password, name: req.body.name, firstName: req.body.firstName}) 
        ;
        var token = jwt.sign({
            user: user.id
        }, sails.config.jwt.jwtSecret, {expiresIn: sails.config.jwt.jwtExpiresIn});
        return res.ok(token)
    }

};
