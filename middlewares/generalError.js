var status = require('../middlewares/statusCodes.js')
const errorG=function(res,crud, err, component) {
    if (err) {
        status.codes("500", res, null, err, null)
        return false;
    } else if (!component) {
        status.codes("404", res, crud, err, "/components/:id")
        return false;
    }
    return true;
}
module.exports.errorG=errorG;