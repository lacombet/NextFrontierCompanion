export class Character {
    /**
     * The character’s ID
    */
    id?: number

    /**
     * The character’s alliance ID
    */
    alliance_id?: number

    /**
     * The character’s birthday
    */
    birthday!: string

    /**
     * The character’s bloodline ID
    */
    bloodline_id!: number

    /**
     * The character’s corporation ID
    */
    corporation_id!: number

    /**
     * The character’s description
    */
    description?: string

    /**
     * The character’s faction ID
    */
    faction_id?: number

    /**
     * The character’s gender
    */
    gender!: string

    /**
     * The character’s name
    */
    name!: string

    /**
     * The character’s race ID
    */
    race_id!: number

    /**
     * The security status of the character
     * Maximum: 10
     * Minimum: -10
    */
    security_status?: number

    /**
     * The individual title of the character
    */
    title?: string
}