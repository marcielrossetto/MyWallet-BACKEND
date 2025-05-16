import Joi from 'joi';

const transactionSchema = Joi.object({
  value: Joi.number().required().messages({
    'number.base': 'Valor deve ser um número',
    'any.required': 'Valor é obrigatório'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Descrição é obrigatória'
  }),
  type: Joi.string().valid('entrada', 'saida').required().messages({
    'any.only': 'Tipo deve ser "entrada" ou "saida"',
    'any.required': 'Tipo é obrigatório'
  })
});

export { transactionSchema };
