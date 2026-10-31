export interface CountList {
  [key: string]: number
}

function countBy (arr: (string | number)[]): CountList {

  return arr.reduce((acc: CountList, item) => {

    acc[item] = acc[item] ? acc[item] + 1 : 1

    return acc
  }, {})

}

export default countBy
