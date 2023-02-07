function randomNumbers(cantidad) {
  let arrayNumbers = []

  for (let i = 0; i < cantidad; i++) {
    let randomNumber = Math.floor(Math.random() * 1001)
    arrayNumbers.push(randomNumber)
  }

  let countArrayNumbers = {}
  arrayNumbers.forEach((element) => {
    countArrayNumbers[element] = (countArrayNumbers[element] || 0) + 1
  })
  return countArrayNumbers
}

function generarRandoms(req, res) {
  const cant = req.query.cant ? req.query.cant : 100000000
  res.send(randomNumbers(cant))
}

module.exports = { generarRandoms }
