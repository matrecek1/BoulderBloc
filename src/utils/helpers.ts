import crypto from "crypto"

export const randomHexName = (size: number = 32) => crypto.randomBytes(size).toString('hex')