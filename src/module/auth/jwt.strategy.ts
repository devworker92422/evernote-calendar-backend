import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from "../prisma/prisma.service";
import { AUTH_401_ERROR } from "src/const/message";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService
    ) {
        super({
            secretOrKey: config.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { id } = payload;
        const user = await this.prisma.user.findFirst({
            where: { id }
        });
        if (!user)
            throw new UnauthorizedException(AUTH_401_ERROR);
        return user;
    }
}