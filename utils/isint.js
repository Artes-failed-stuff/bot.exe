module.exports = number => !(isNaN(number) || number == "" || number <= 0 || !Number.isInteger(number - 1));