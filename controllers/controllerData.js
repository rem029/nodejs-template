const dataGetAll = (req = Request(), res = Response) => {
  res.status(200).send('from get all');
};

const dataGetById = (req = Request(), res = Response) => {
  res.status(200).send('from get by id');
};

const dataAdd = (req = Request(), res = Response) => {
  res.status(200).send('from add data');
};

const dataUpdateById = (req = Request(), res = Response) => {
  res.status(200).send('from update by id');
};

const dataDeleteAll = (req = Request(), res = Response) => {
  res.status(200).send('from delete all');
};

const dataDeleteById = (req = Request(), res = Response) => {
  res.status(200).send('from delete by id');
};

module.exports = {
  dataGetAll,
  dataGetById,
  dataAdd,
  dataUpdateById,
  dataDeleteAll,
  dataDeleteById,
};
