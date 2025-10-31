import { adoptionService } from "../services/adoptionService.js";

class AdoptionController{
    constructor(adoptServ){
        this.adoptionServ= adoptServ;
    }
    
    adopt = async(req,res,next) =>{
        try {
            const {idUsr, idPet} = req.params;
            const response = await this.adoptionServ.adopt(idUsr,idPet);
            console.log(response);
            if(!response) res.status(500).send("No se pudo realizar la operación")
            res.status(200).send(response)
        } catch (error) {
            next(error);
        }
    }
}
export const adoptionController = new AdoptionController(adoptionService);