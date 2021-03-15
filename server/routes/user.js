const express = require('express');
const router = express.Router();
const _ = require('lodash');

var { User } = require('../models/User');
var { authenticate } = require('../middleware/authenticate');

// POST /users
router.post('', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.get('/users-list', (req, res) => {
    console.log("\n\n\n calling users list")
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < User.countDocuments()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    User.find().limit(limit).skip(startIndex).then((users) => {
        results.users = users
        console.log("result::::", results)
        res.json(results)
    }).catch((e) => {
        res.status(400).send(e);
    });

});

router.put('/:user_id', (req, res) => {
    var userId = mongoose.Types.ObjectId(req.query.user_id);
    if(req.body.user_name != null || req.body.user_name != undefined){
        User.update({_id: userId},{user_name: req.body.user_name}).then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((e) => {
            res.status(400).send(e);
        });
    }else{
        res.send({message: 'Required parameter not sent!'});
    }
});

router.get('/me', authenticate, (req, res) => {
    res.send(req.user);
});

router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});


module.exports = router;