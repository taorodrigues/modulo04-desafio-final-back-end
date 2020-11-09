import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import { gradeModel } from '../models/gradeModel.js';

const create = async (req, res) => {
  const grade = new gradeModel(req.body);
  console.log('Create Body' + req.body);
  try {
    await grade.save();
    res.send(grade);
    //res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  console.log(name);
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  const grades = await gradeModel.find(condition);

  try {
    res.send(grades);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  const gradeRecovered = await gradeModel.findOne({ _id: id });

  console.log(JSON.stringify(gradeRecovered));
  try {
    res.send(gradeRecovered);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  console.log('Update Body' + req.body);
  const id = req.params.id;
  console.log('Id para Update: ' + id);

  try {
    const gradeUpdated = await gradeModel.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    console.log(JSON.stringify(gradeUpdated));
    res.send(gradeUpdated);
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const gradeDeleted = await gradeModel.findOneAndDelete({ _id: id });
    res.send(gradeDeleted);
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    await gradeModel.deleteMany({});
    res.send('All Grades were deleted.');
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
