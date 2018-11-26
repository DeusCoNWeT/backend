const Joi = require('joi')
const validate=function validateComponent(compo){
    const schema ={
      name: Joi.string().required(),
      directory: Joi.string().required(),
      description: Joi.string().required(),
      version: Joi.string().required(),
      properties: Joi.object({
        name: Joi.string().required(),
        Type: Joi.string().required(),
        inPut:Joi.string().required(),
        outPut:Joi.string().required(),
        Default:Joi.string().required()
    })
    };
    return Joi.validate(compo,schema)
  }
  const validateGet=function validateComponent(compo){
    const schema ={
      name: Joi.string(),
      directory: Joi.string(),
      description: Joi.string(),
      version: Joi.string(),
      properties: Joi.object({
        name: Joi.string(),
        Type: Joi.string(),
        inPut:Joi.string(),
        outPut:Joi.string(),
        Default:Joi.string()
    })
    };
    return Joi.validate(compo,schema)
  }
  module.exports.validate=validate;
  module.exports.validateGet=validateGet;
