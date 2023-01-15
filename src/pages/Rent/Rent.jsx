import PropTypes from "prop-types";
import React from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
//My


const Rent = props => {

    //meta title
    document.title="store24h - Agente | Aluguel";

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Aluguel")}
                breadcrumbItem={props.t("Aluguel")}
            />
                <p>Você ainda não está fornecendo aluguel</p>
                <p>RENT é uma alternativa para ativações.</p>
                <p>O período mínimo de aluguel é de 4 horas.</p>
                <p>O período máximo de aluguel é de 7 dias. </p>
                <p>Você mesmo determina o período de aluguel necessário para seus cartões SIM nas configurações do programa cliente.</p>
                <p>Sua renda será de 50% até 75% do preço no site de nossos parceiros sms-activate.ru na seção "Aluguel", escolhendo o país de seus cartões SIM - https ://sms-activate.ru /ru/aluguel/</p>
                <p>Exemplo: o preço de um aluguel parcial para o serviço Vkontakte por 4 horas no site dos parceiros é de 24,61 rublos. Portanto, ao vender um aluguel de acordo com uma prioridade de 75%, sua renda será de 24,61 rublos. * 75% = 18,46 rublos.</p>
                <p>A variação da renda depende da prioridade da emissão dos números. Quanto mais baixos os ganhos que você escolher, maior será a prioridade de emissão de seus números.</p>
                <p>Existem dois tipos de aluguel:</p>
                <p>Aluguel Parcial são vendidos para diferentes usuários. Você pode decidir quais serviços vender para aluguel e quais serão vendidos para ativação. </p>
                <p>Aluguel total de um número para um usuário. </p>
                <p>Condições de venda de cartões SIM para aluguel: </p>
                <p>Você pode começar a usar a função de aluguel apenas dois meses depois de criar sua conta pessoal. Você precisa escrever para o suporte técnico.</p>
                <p>NOTA! É necessário manter os cartões SIM no equipamento durante todo o período de aluguer (não retire o cartão SIM se o aluguer estiver incompleto);</p>
                <p>Os cartões SIM da operadora Lycamobile da Rússia não são adequados para vender aluguel integral. Você pode usar o Lycamobile da Rússia para aluguel parcial. Não existem outras restrições aos operadores, tarifas e balanços. A principal condição é que o cartão SIM aceite SMS durante todo o período de aluguel.</p>
                <p>Para fornecer números para aluguel, você precisará congelar fundos no valor de 500 rublos para uma porta. Por exemplo, se você tiver um modem para 32 portas, mas quiser usar apenas 30 portas, o valor total da "retenção" (saldo irredutível) será de 15.000 rublos. (30 portas * 500 rublos). O saldo irredutível é definido automaticamente quando a porta é ativada para aluguel no programa cliente smshub. </p>
                <p>O dinheiro restante pode ser descongelado desde que não haja aluguel ativo tanto no porto quanto offline para todos os operadores de agentes (locais).</p>
                <p>O saldo irredutível é retirado integralmente como multa se mais de 50% dos números de uma conta pessoal (para todos os locais) estiverem offline por mais de 24 horas, desde que seja impossível estender o aluguel aos usuários às custas do agente (ou seja, quando o número não recebe SMS por um motivo ou outro). O valor máximo da multa é de 50% do valor irredutível.</p>
                <p>Se o número parar de funcionar durante o período de aluguel, notificaremos você no grupo de suporte técnico do Telegram. As notificações serão enviadas a cada hora. </p>
                <p>Você ainda não está fornecendo aluguel</p>
            </Container>
        </div>
        </React.Fragment>
    );
};

Rent.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Rent);