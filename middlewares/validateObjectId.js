const mongoose=require('mongoose');
var status = require('../middlewares/statusCodes.js');

module.exports = function(req,res,next){
    
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    status.codes("400_Id", res, req.method, "The paremeter 'id' is not valid", req.url);
  }else{ next();}

 
}