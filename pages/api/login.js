import cookie from 'cookie'

const handler = (req,res) =>{
    console.log("dshuifhofhsdif"+process.env.TOKEN)
    switch(req.method){
        case "POST":
            if(JSON.parse(req.body).username===process.env.ADMIN_USERNAME&&JSON.parse(req.body).password===process.env.ADMIN_PASSWORD){
                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("token",process.env.TOKEN, { // name of token and token value
                        maxAge:60*60, // time of 1 hour
                        sameSite:"strict",
                        path:"/", // where to use cookie
                    }))
                res.status(200).json("Successful")
            }else{
                res.status(400).json("Wrong credentials!")
            }
            break;
    }
}

export default handler;