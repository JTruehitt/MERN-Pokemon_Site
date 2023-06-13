// function to handle all errors consistently
const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.statusCode && err.message) {
    res.status(err.statusCode).json({ Error: err.message });
  } else {
    res.status(500).json({ Error: 'Internal Server Error' });
  }
};

export default errorHandler;
