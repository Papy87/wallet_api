/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { HeaderApiKeyStrategy } from './strategy/auth_api_key.strategy';


@Module({
    imports: [
        PassportModule,
    ],
    providers: [AuthService, HeaderApiKeyStrategy],
    exports: [AuthService],
})
export class AuthModule { }