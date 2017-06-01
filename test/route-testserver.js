const express = require('express'),
  bodyParser = require('body-parser'),
  app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const routes = express.Router();

// router.get('/',function(req,res){
//   res.json({"error" : false, "message" : "Hello !"});
// });

// routes.post('/add', (req, res) => {
// res.json({ error: false, message:
//  'success', data: req.body.num1 + req.body.num2 });
// });

routes.route('/user/signup', (req, res) => {
  res.json({ error: false, message: 'User created!' });
});

routes.route('/user/signin', (req, res) => {
  res.json({ error: false, message: 'User Signed in!' });
});

routes.route('user/signout', (req, res) => {
  res.json({ error: false, message: 'User Signed out' });
});

routes.route('/group', (req, res) => {
  res.json({ error: false, message: 'Group created' });
});

routes.route('/group/groupId/user', (req, res) => {
  res.json({ error: false, message: 'User added' });
});
app.use('/', routes);

app.listen(3000, () => {
  console.log('I am listening at PORT 3000');
});
