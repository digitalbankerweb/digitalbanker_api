

const middleware = async function(req,res,next){

    req.middleware = "patrick";
    next()

}

module.exports.middleware = middleware;