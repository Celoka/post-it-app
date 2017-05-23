let express = require("express"),
 app = express(),
 firebase = require ("firebase"),
 port = process.env.PORT|| 8080,
 bodyParser = require('body-parser'),
 router = express.Router();

var config = {
    apiKey: "AIzaSyAxE27GJgpO5FCHhp6iTOu_s0UWTgkopVI",
    authDomain: "post-it-aa825.firebaseapp.com",
    databaseURL: "https://post-it-aa825.firebaseio.com",
    projectId: "post-it-aa825",
    storageBucket: "post-it-aa825.appspot.com",
    messagingSenderId: "310778448957"
  };
firebase.initializeApp(config);
let myDataBase = firebase.database();
let userRef = myDataBase.ref("users");

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
	next();
});
app.get('/', function(req, res) {
	res.send('Welcome to Post IT!');
});
let apiRouter = express.Router();
apiRouter.use(function(req, res, next){
	console.log("Welcome to Post it!")
	next();
});

apiRouter.route('/users/signup')
    .post(function(req, res) {
    	let user = {};
    	user.username = req.body.username;
    	user.password = req.body.password;
        user.email = req.body.email;
        userRef.push({
        	username: req.body.username,
        	password: req.body.password,
        	email: req.body.email
        }, function(err) {
        	if (err) {
        		res.send(err)
        	} else {
        		res.json({message: "User created."})
        	}
        });
        	
    });
app.use('/api', apiRouter);
app.listen(port);
console.log('Talk to me on '+ port);