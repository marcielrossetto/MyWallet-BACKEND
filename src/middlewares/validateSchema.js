const validateSchema = (schema) => {
  return (req, res, next) => {
    console.log('Corpo da requisição:', req.body);
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(422).send({ errors });
    }
    next();
  };
};

export { validateSchema };