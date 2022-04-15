import dbConnect from '../../../util/mongo'
import Product from '../../../models/Product'
// import Order from '../../../models/Order'

const handler = async (req,res) =>{
    const { method } = req;

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
            try{
                const product = await Product.create(req.body)
                res.status(200).json(product)
            }catch(err){
                res.status(500).json(err)
            }
            break;
    }
}

export default handler;