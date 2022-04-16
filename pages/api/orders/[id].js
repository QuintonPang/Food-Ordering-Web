import dbConnect from '../../../util/mongo'
import Order from '../../../models/Order'

const handler = async (req,res) =>{
    const { method, query:{id}, cookies } = req;

    dbConnect()

    const myCookie = cookies?.token || ''
    const admin = myCookie===process.env.TOKEN?true:false

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
            if (!admin) return res.status(401).json("Not authenticated")
            try{
                const order = await Order.findByIdAndUpdate(id,req.body,{
                    new:true, // return newest version
                })
                console.log(order)
                res.status(200).json(order)
            }catch(err){
                res.status(500).json(err)
            }
            break;
        case "DELETE":
            if (!admin) return res.status(401).json("Not authenticated")
            try{
                const order = await Order.findByIdAndDelete(id)
                res.status(200).json(`Order with id ${id} has been deleted successfully!`)
            }catch(err){
                res.status(500).json(err)
            }
            break;
    }
}

export default handler;