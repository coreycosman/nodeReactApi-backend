module.exports = (res, id) => {
  return res.status(500).json({
    errors: [
      {
        id,
        errMessage: "server error: please try again later"
      }
    ]
  });
};
