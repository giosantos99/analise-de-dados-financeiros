import countBy from './countBy.js';

type TransacaoValor = Transacao & { valor: number }

function filtrarValor (transacao: Transacao) : transacao is TransacaoValor {
  return transacao.valor !== null
}

class Estatisticas {

  private transacoes: Transacao[];
  total;
  pagamento;
  status;
  semana;

  constructor (transacoes: Transacao[]) {
    this.transacoes = transacoes
    this.total = this.setTotal()
    this.pagamento = this.setPagamento()
    this.status = this.setStatus()
    this.semana = this.setSemana()
  }

  private setTotal () {

    const reduceFn = (acc: number, transacao: TransacaoValor) => acc + transacao.valor

    return this.transacoes
      ?.filter(filtrarValor)
      ?.reduce(reduceFn, 0)
  }

  private setPagamento () {
    const pagamentos = this.transacoes.map(({ pagamento }) => pagamento)

    return countBy(pagamentos)
  }

  private setStatus () {

    const status = this.transacoes.map(({ status }) => status)

    return countBy(status)
  }

  private setSemana () {
    const semanas = {
      0: 'Domingo',
      1: 'Segunda-feira',
      2: 'Terça-feira',
      3: 'Quarta-feira',
      4: 'Quinta-feira',
      5: 'Sexta-feira',
      6: 'Sábado'
    }

    type AcumuladorSemanas = Record<string, number>
    type MaiorSemana = { semana: string, total: number }

    const total_semanas = this.transacoes.reduce((acc: AcumuladorSemanas, transacao) => {

      const dia_semana = transacao.data.getDay()

      const key = semanas[dia_semana as keyof typeof semanas]

      if (key) acc[key] = (acc[key] || 0) + 1

      return acc
    }, {})

    return Object
      .entries(total_semanas)
      .reduce<MaiorSemana | null>((acc, [semana, total]) => {
        if (!acc || total > acc.total) return { semana, total }

        return acc
      }, null)
      ?.semana
  }

}

export default Estatisticas
