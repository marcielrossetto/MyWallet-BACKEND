import Joi from 'joi';

const signUpSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    'string.empty': 'Nome é obrigatório',
    'string.min': 'Nome deve ter pelo menos 3 caracteres'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'string.empty': 'Email é obrigatório'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Senha deve ter pelo menos 6 caracteres',
    'string.empty': 'Senha é obrigatória'
  }),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirmar senha deve ser igual à senha',
      'any.required': 'Confirmar senha é obrigatório'
    })
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export { signUpSchema, signInSchema };
