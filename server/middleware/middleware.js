
import generateApiKey from 'generate-api-key';
import bcrypt from 'bcrypt';


export const generateKey = async (req,res,next) => {
    try{
        const key = generateApiKey();
        let hash;
        bcrypt.hash(key, saltRounds).then(h => hash = h).catch((err) => hash = NULL);


        if(hash){
            const user = {
                name: req.body.name,
                email: req.body.email,
                apikey: hash
            }
    
            req.user = user;
        }
        else throw new Error("Something Went Wrong");
    }
    catch(err){
        console.log(err);
        return err;
    }

    
}

export const verifyKey = async (req,res,next) => {
    const apiKey = req.headers['authentication'];
    
}