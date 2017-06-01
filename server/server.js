import express from 'express';
import bodyParser from 'body-parser';
import routes from './routesconfig/routes';


const app = express();
const port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Welcome to Post IT!');
});

app.use('/', routes);
app.listen(port);
console.log(`listening on ${port}`);
