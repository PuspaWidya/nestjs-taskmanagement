import * as bcrypt from 'bcrypt';


export async function hashingPass(password){
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

export async function comparePass (password, hash){
    return  await bcrypt.compare(password, hash);
}
