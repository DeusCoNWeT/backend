const Joi = require('joi')
const validate=function validateComponent(compo){
    const schema ={
      name: Joi.string().required(),
      directory: Joi.string().required(),
      description: Joi.string().required(),
      version: Joi.string().required()
    };
    return Joi.validate(compo,schema)
  }
  const validateGet=function validateComponent(compo){
    const schema ={
      name: Joi.string(),
      directory: Joi.string(),
      description: Joi.string(),
      version: Joi.string()
    };
    return Joi.validate(compo,schema)
  }
  module.exports.validate=validate;
  module.exports.validateGet=validateGet;
