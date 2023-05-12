/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';


@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
    HeaderAPIKeyStrategy,
    'api-key',
) {
    constructor(private authService: AuthService, configService: ConfigService) {
        const headerKeyApiKey = configService.get<string>('HEADER_KEY_API_KEY') || '';
        super({ header: headerKeyApiKey, prefix: '' }, true, async (apiKey, done) => {
            if (this.authService.validateApiKey(apiKey)) {
                done(null, true);
            }
            done(new UnauthorizedException(), null);
        });
    }
}
