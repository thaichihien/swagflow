import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayLoad } from "../interfaces/jwt.payload";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env['ACCESS_SECRET']
        })
    }

    validate(payload : JwtPayLoad){
        return payload
    }
}