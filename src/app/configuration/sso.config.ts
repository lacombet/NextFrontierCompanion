export class ssoConfig {
    client_id!: string;
    base_uri!: string;
    authorize!: {
        callback_uri: string;
        scopes: string[];
    };
    token!: {
        endpoint: string;
        typical_payload: {
            aud: string;
            iss: string;
            exp: number;
        };
    };
}