import { Strings } from "./resources/Strings";

export const checkIfInputsAreValid = (email:string, password:string) => {
    let regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let regexForPass = /^(?=.*[A-Z])(?=.*\W)(?!.* ).{8,15}$/;

    if (regexForEmail.test(email) && regexForPass.test(password)) {
        return true;
    } else {
        return false
    }
}
