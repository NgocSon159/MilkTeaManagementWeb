import * as bcrypt from "bcrypt"
export class hashUtil {
    hashPassword(pass: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt);
        return hash;
    }
}