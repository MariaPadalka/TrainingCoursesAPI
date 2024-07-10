import bodyParser from 'body-parser';

export default (app) => {
  // Middleware
  app.use(bodyParser.json());
};
