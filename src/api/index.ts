import express from 'express';
import cors from 'cors';
import { authMiddleware } from '../middlewares/authMiddleware';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';
import { databaseMiddleware } from '../middlewares/databaseMiddleware';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { createRateLimiter } from './apiRateLimiter';
import { languageMiddleware } from '../middlewares/languageMiddleware';
import authSocial from './auth/authSocial';
import setupSwaggerUI from './apiDocumentation';
import path from 'path';


const app = express();

// Enables CORS
app.use(cors({ origin: true }));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
});


// Initializes and adds the database middleware.
app.use(databaseMiddleware);

// Sets the current language of the request
app.use(languageMiddleware);

// Configures the authentication middleware
// to set the currentUser to the requests
app.use(authMiddleware);

// Setup the Documentation
setupSwaggerUI(app);

// Default rate limiter
const defaultRateLimiter = createRateLimiter({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'errors.429',
});
app.use(defaultRateLimiter);

// Enables Helmet, a set of tools to
// increase security.
app.use(helmet());

// Parses the body of POST/PUT request
// to JSON
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      const url = (<any>req).originalUrl;
      if (url.startsWith('/api/plan/stripe/webhook')) {
        // Stripe Webhook needs the body raw in order
        // to validate the request
        (<any>req).rawBody = buf.toString();
      }
    },
  }),
);

// Configure the Entity routes
const routes = express.Router();

// Enable Passport for Social Sign-in
authSocial(app, routes);

require('./auditLog').default(routes);
require('./auth').default(routes);
require('./plan').default(routes);
require('./tenant').default(routes);
require('./file').default(routes);
require('./user').default(routes);
require('./settings').default(routes);
require('./categoria').default(routes);
require('./categoriaItem').default(routes);

// Loads the Tenant if the :tenantId param is passed
routes.param('tenantId', tenantMiddleware);

// Add the routes to the /api endpoint
app.use('/api', routes);



// let https = require('https');
// let https = require('https');
let https = require('http');
const fs = require('fs');

let sslServer;


sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../../cert/',  'privada25294.key')),
  cert: fs.readFileSync(path.join(__dirname, '../../cert/', 'certificado25294.pem'))
}, app)


export default sslServer;
/*

Tabelas:
  
  - landing: 
    Campos:
      titulo
      logo - upload de arquivos
      background wide
      background mobile

  - medias sociais
    Campos:
      url
      icone - Select no front com o fontawessome

  *
  - Sobre
    Campos:
      titulo e desc para:
      horário de funcionamento
      endereço
      fale conosco
      sobre


  - Sliders
    ordem
    imagem - upload
    texto alternativo

  - Categorias
    Titulo
    1 - n 
    CategoriaItem
      Titulo 
      Desc
      Preco
      
  - PrecosBackground
*/