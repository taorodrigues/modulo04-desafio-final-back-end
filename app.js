import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { gradeRouter } from './routes/gradeRouter.js';
import { db } from './models/index.js';

(async () => {
  console.log('Tentando conectar no banco');
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Conectado no MongoDB');
  } catch (error) {
    console.log('Erro ao conectar no banco');
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var allowedDomains = [
  'https://frontend-gradesapi.herokuapp.com',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// app.use(
//   cors({
//     origin: 'http://localhost:3000', //colocar aqui a url do meu site
//   })
// );
// app.use((req, res, next) => {
//   //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
//   res.header('Access-Control-Allow-Origin', '*');
//   //Quais são os métodos que a conexão pode realizar na API
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   app.use(cors());
//   next();
// });

app.use(gradeRouter);
app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {});
