export function isValidCPF(cpf) {
    
    cpf = cpf.replace(/[\s.-]*/igm, '');
    var soma = 0;
    var resto = null;

    if (typeof cpf !== "string") {
        return false;
    }
    
    if ( !cpf || cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") {
        return false
    }
    

    for (var i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0

        if (resto != parseInt(cpf.substring(9, 10)) ) false
    }

    soma = 0

    for (var i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    }

    resto = (soma * 10) % 11

    if ((resto == 10) || (resto == 11))  resto = 0

    if (resto != parseInt(cpf.substring(10, 11) ) ) return false

    return true;
}


export function isValidName(name) {
    const regexEspecial = /[^a-zA-Z 0-9]+/g;
    const regexNum = /[0-9]/

    if(regexEspecial.test(name)) {

        return false;
    } else if(regexNum.test(name)) {

        return false;
    } else if(name === ''){

        return false;
    } else if(name.length < 6){

        return false;
    } else {

        return true;
    }
}


export function isValidEmail(email) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if(emailRegex.test(email)) {

        return true;
    } else {

        return false;
    }
}

export function isValidCell(num) {

    const cellRegex = /^[0-9]+$/;

    if(num.length == 11) {
        if(cellRegex.test(num)) {
            return true
        }
    } else {
        return false;
    }
}

export function isValidBitSorte(bitSorte) {

    const isInt = Number.isInteger(bitSorte);
    const isNeg = Math.sign(bitSorte) === 1 ? true : false;
    const isBig = bitSorte <= 20000 ? true : false;

    if(isInt && isNeg && isBig) {

        return true;
    } else {

        return false;
    }
}

export function isValidReason(reason) {
    
    const isNotBlank = reason.length > 0 ? true : false;

    return isNotBlank;
}

export function isValidIdProof(idProof) {

    const isNotBlank = idProof.length > 0 ? true : false;
    const hasMinNum = idProof.length > 10 ? true : false;

    if (isNotBlank && hasMinNum) {
        return true;
    } else {
        return false;
    }
}

export function isValidBank(bank) {

    const isNotBlank = bank.length > 0 ? true : false;
    const isBankValid = bank.toLowerCase() === 'PAGSEGURO' || bank.toLowerCase() === 'MERCADOPAGO' ? true : false;

    if(isNotBlank && isBankValid) {
        return true;

    } else {
        return false;
    }

}

export function isValidDate(date) {

    const isNotBlank = date.length > 0 ? true : false;

    return isNotBlank;
}