/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private configService: ConfigService) { }

    validateApiKey(headerApiKey: string) {
        const storedApiKey: string = this.configService.get<string>('API_KEY');
        let isAPIKey = false;
        if (storedApiKey === headerApiKey) {
            isAPIKey = true;
        }
        return isAPIKey
    }

}