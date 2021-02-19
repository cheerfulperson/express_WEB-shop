const createError = require('http-errors');

module.exports = (roles)=>{
    return (req,res,next)=>{
        try{
        if(req.session.user != undefined){ 
          const user_role= req.session.user.role_user;           
          let hasRole = false;
          roles.forEach(element => {
            if(element == user_role){
               hasRole = true; next();
            }
          });
          if(!hasRole) next(createError(404));  
        } else next(createError(404)); //Просто создал обработчик который отправляет ошибку 404
        } catch(e){
            console.log(e)
            next(createError(404));
        }
        
    }
}