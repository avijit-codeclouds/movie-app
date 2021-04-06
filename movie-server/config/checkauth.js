const jwt=require ('jsonwebtoken');
module.exports=((req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded=jwt.verify(token,process.env.jwtSecret);
        req.userData=decoded;
        next();
    }
    catch(err){
        if(!req.headers.authorization){
            res.status(401).json({ message: "Token is required", success: false });
        }
        res.status(401).json({
            message: "Unauthorized", success: false   
        })
        }
})