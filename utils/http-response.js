const HttpStatus = {
    OK:200,
    CREATED:201,
    BAD_REQUEST:400,
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    NOT_FOUND:404,
    INTERNAL_SERV_ERR:500
}
class HttpResponse {
    Ok(res, data){
        return res.status(HttpStatus.OK).json({
            status:HttpStatus.OK,
            data:data
        })
    }
    Created(res, data){
        return res.status(HttpStatus.CREATED).json({
            status:HttpStatus.CREATED,
            data:data
        })
    }
    NotFound(res, error){
        return res.status(HttpStatus.NOT_FOUND).json({
            status:HttpStatus.NOT_FOUND,
            message:error.message,
            data:error.name
        })
    }
    BadRequest(res, error){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status:HttpStatus.BAD_REQUEST,
            message:error.message,
            data:error.name
        })
    }
    Unauthorized(res, error){
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status:HttpStatus.UNAUTHORIZED,
            message:error.message,
            data:error.name
        })
    }
    Forbidden(res, error){
        return res.status(HttpStatus.FORBIDDEN).json({
            status:HttpStatus.FORBIDDEN,
            message:error.message,
            data:error.name
        })
    }
    ServerErr(res, error){
        return res.status(HttpStatus.INTERNAL_SERV_ERR).json({
            status:HttpStatus.INTERNAL_SERV_ERR,
            message:error.message,
            data:error.name
        })
    }
    CustomErr(res, error){
        return res.status(error.status).json({
            status:error.status,
            message:error.message,
            data:error.name
        })
    }
}
export const httpResponse = new HttpResponse();