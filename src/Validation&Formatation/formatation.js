import { Dayjs } from 'dayjs';

export function unformatCPF(cpf) {
    cpf = cpf.replace(/[\s.-]*/igm, '');
    
    return cpf;
}

export function maskCPF(cpf) {

    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  
    return cpf;
}

export function maskMoney(money) {

    let moneyFormatted = money.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

    return moneyFormatted;
}


export function formatarDataDia(data) {

    let dia = data[2];
    let mes = data[1];
    let ano = data[0];

    if(dia <= 9) dia = '0' + dia;
    if(mes < 9) mes = '0' + mes;

    return (dia + '/' + mes + '/' + ano) 
}

export function formatarDataHora(data) {

    let hora = data[3];
    let min = data[4];

    if(hora < 9) hora = '0' + hora;

    if ( hora <= 12 ) {
        return (hora + ':' + min)
    }

    return (hora + ':' + min)
}

export function maskCell(num) {
    num = "+" + num;
    // num = num.replace(/\D/g,'')
    num = num.replace(/(\d{2})(\d{2})/,"$1($2)")
    num = num.replace(/(\d)(\d{4})$/,"$1-$2")

    return num;

}

export function unformatCell(num) {
    
    num = num.replace(/[^\w\s]/gi, '');
    num = num.replace(/\s+/g, '');

    return num;
}

export function getDateTime() {
    const date = new Date().toLocaleString();

    return (date.substring(6, 10) + "-" + date.substring(3, 5) + "-" + date.substring(0, 2)+"T"+date.substring(11, 19));
}