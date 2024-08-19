import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body
} from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { AuthService } from "./auth.service";
import { SignInDTO } from "./auth.dto";

@Controller('auth')

export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('signup')
    async signUp(@Body() body: Prisma.UserCreateInput) {
        return await this.authService.signUp(body);
    }

    @Post('signin')
    async signInWithEmail(@Body() body: SignInDTO) {
        return await this.authService.signInWithEmail(body);
    }

}