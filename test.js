const request = require('request');

var req = {
    body : {'1':1}
};

request.post('http://127.0.0.1:80/api', { json: req.body }, (err, resp) => {        
    if (err) {
        console.log(err);
        res.body = {};
        return;
    }
    console.log(resp.body);
});