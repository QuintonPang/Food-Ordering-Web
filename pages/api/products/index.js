import dbConnect from '../../../util/mongo'
import Product from '../../../models/Product'

const handler = async (req,res) =>{
    const { method, cookies } = req;

    const myCookie = cookies?.token || ''
    const admin = myCookie===process.env.TOKEN?true:false

    dbConnect()

    switch(method){
        case "GET":
            try{
                const products = await Product.find()
                res.status(200).json(products)
            }catch(err){
                res.status(500).json(err)
                console.log(err)
            }
            break;
        case "POST":
            if (!admin) return res.status(401).json("Not authenticated")

            try{
                const product = await Product.create(req.body)
                res.status(200).json(product)
            }catch(err){
                console.log(err)
                res.status(500).json(err)
            }
            break;
    }
}

export default handler;