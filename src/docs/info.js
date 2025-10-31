
import __dirname from "../utils/utils.js";
import config from "../config/config.js";
export const info= {
    definition:{
        openapi:'3.0.1',
        info:{
            title:"Documentación de API de adopción.",
            version:"1.0.0",
            description:"Esta documentación abarca la creación, obtención, modificación y eliminación de usuarios."
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}`
            }
        ]
    },
    apis:[
        `./docs/**/*.yaml`,
        `./docs/**/*.yml`
    ]
}