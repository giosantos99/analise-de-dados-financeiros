import moedaParaNumero from './moedaParaNumero.js'
import stringToDate from './stringToDate.js'

declare global {

  type TransacaoPagamento = 'Cartão de Crédito' | 'Boleto'
  type TransacaoStatus = 'Paga' | 'Aguardando pagamento' | 'Recusada pela operadora de cartão' | 'Estornada'

  interface TransacaoAPI {
    Nome: string,
    ID: number,
    Data: string,
    Status: TransacaoStatus,
    Email: string,
    ['Valor (R$)']: string,
    ['Cliente Novo']: number,
    ['Forma de Pagamento']: TransacaoPagamento
  }

  interface Transacao {
    nome: string,
    id: number,
    data: Date,
    status: TransacaoStatus,
    email: string,
    moeda: string,
    valor: number | null,
    novo: boolean,
    pagamento: TransacaoPagamento
  }

}

function normalizarTransacao (transacao: TransacaoAPI): Transacao {

  return {
    nome: transacao.Nome,
    id: transacao.ID,
    data: stringToDate(transacao.Data),
    status: transacao.Status,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor: moedaParaNumero(transacao["Valor (R$)"]),
    novo: Boolean(transacao["Cliente Novo"]),
    pagamento: transacao["Forma de Pagamento"]
  }

}

export default normalizarTransacao
