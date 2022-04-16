import cookie from 'cookie'

const handler = (req,res) =>{
    switch(req.method){
        case "POST":
            if(username===process.env.ADMIN_USERNAME&&password===process.env.ADMIN_PASSWORD){
                res.setHeaders(
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
    }
}

export default handler;