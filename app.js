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

// (async () => {
//   try {
//     await db.mongoose.connect(
//       'mongodb+srv://tigo:james1991@cluster0.q4in0.mongodb.net/grades?retryWrites=true&w=majority',
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log('Conectado no MongoDB');
//     console.log(process.env.PORT);
//   } catch (error) {
//     console.log('Erro ao conectar no MongoDB');
//   }
// })();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(gradeRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {});
