import dbConnect from '../../../util/mongo'
import Product from '../../../models/Product'

const handler = async (req,res) =>{
    const { method, query:{id} } = req;

    dbConnect()

    switch(method){
        case "GET":
            try{
                const products = await Product.findById(id)
                res.status(200).json(products)
            }catch(err){
                res.status(500).json(err)
                console.log(err)
            }
            break;
        case "PUT":
            try{
                const product = await Product.findByIdAndUpdate(id,req.body,{
                    new:true
                })
                res.status(200).json(product)
            }catch(err){
                res.status(500).json(err)
            }
            break;
        case "DELETE":
            try{
                const product = await Product.findByIdAndDelete(id)
                res.status(200).json(`Product with id ${id} has been deleted successfully!`)
            }catch(err){
                console.log(err)
                res.status(500).json(err)
            }
            break;
    }
}

export default handler;