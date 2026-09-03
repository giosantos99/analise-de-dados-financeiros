import { CountList } from './Modules/countBy.js'
import Estatisticas from './Modules/Estatisticas.js'
import fetchData from './Modules/fetchData.js'
import normalizarTransacao from './Modules/normalizarTransacao.js'

async function handleData () {
  const data = await fetchData<TransacaoAPI[]>('https://api.origamid.dev/json/transacoes.json?')

  if (!data) return

  const transacoes = data.map(normalizarTransacao)

  preencherTabela(transacoes)
  preencherEstatisticas(transacoes)

}

function preencherLista (lista: CountList, containerId: string): void {
  const containerElement = document.getElementById(containerId)

  if (containerElement) {

    Object.entries(lista).forEach(([key, value]) =>
      containerElement.innerHTML += `
        <p>${key }: ${value}</p>
      `
    )
  }
}

function preencherEstatisticas (transacoes: Transacao[]): void {
  const data = new Estatisticas(transacoes)

  preencherLista(data.pagamento, 'pagamento')
  preencherLista(data.status, 'status')

  const totalElement = document.querySelector<HTMLElement>('#total span')

  if (totalElement) {
    const total = data.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    totalElement.innerText = total
  }

  const diaElement = document.querySelector<HTMLElement>('#dia span')

  if (diaElement) diaElement.innerText = data.semana + ''

}

function preencherTabela (transacaoes: Transacao[]): void {

  const tabela = document.querySelector('#transacoes tbody')

  if (!tabela) return

  transacaoes.forEach(transacao => {
    tabela.innerHTML += `
      <tr>
        <td>${transacao.nome}</td>
        <td>${transacao.email}</td>
        <td>R$ ${transacao.moeda}</td>
        <td>${transacao.pagamento}</td>
        <td>${transacao.status}</td>
      </tr>
    `
  })
}

handleData()