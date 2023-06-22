export class AccessToken {
    access_token!: string
    expires_in!: number
    token_type!: string 
    refresh_token!: string
}

export class JwtToken {
    aud!: string
    azp!: string
    exp!: number
    iat!: number
    iss!: string
    jti!: string
    kid!: string
    name!: string
    owner!: string
    region!: string
    scp!: string []
    sub!: string
    tenant!: string
    tier!: string
}