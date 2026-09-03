function stringToDate (texto: string): Date {

  const [data, hora] = texto.split(' ')

  const [dia, mes, ano] = data.split('/').map(Number)
  const [hr, min] = hora.split(':').map(Number)

  return new Date(ano, mes - 1, dia, hr, min)
}

export default stringToDate