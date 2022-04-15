import dbConnect from '../../../util/mongo'
import Order from '../../../models/Order'

const handler = async (req,res) =>{
    const { method, query:{id} } = req;

    dbConnect()

    switch(method){
        case "GET":
            try{
                const orders = await Order.findById(id)
                res.status(200).json(orders)
            }catch(err){
                res.status(500).json(err)
                console.log(err)
            }
            break;
        case "PUT":
            try{
                const order = await Order.create(req.body)
                res.status(200).json(order)
            }catch(err){
                res.status(500).json(err)
            }
            break;
        case "DELETE":
            try{
                const order = await Order.FindByIdAndDelete(id)
                res.status(200).json(`Order with id ${id} has been deleted successfully!`)
            }catch(err){
                res.status(500).json(err)
            }
            break;
    }
}

export default handler;