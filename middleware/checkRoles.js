module.exports = (roles)=>{
    return (req,res,next)=>{
        try{
        if(req.session.user != undefined){ 
          const user_role= req.session.user.role_user;           
          let hasRole = false;
          roles.forEach(element => {
            if(element == user_role){
               hasRole = true;
               console.log(element)
               next()
            }
          });
          if(!hasRole){
              return res.render('error')
          }
        }
        else{return res.render('error')}
        } catch(e){
            console.log(e)
            return res.render('error')
        }
        
    }
}