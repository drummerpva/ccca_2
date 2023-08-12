// Value Object
export class Cpf {
  value: string
  constructor(cpf: string) {
    if (!this.validate(cpf)) throw new Error('Invalid cpf')
    this.value = cpf
  }

  isValidLength(cpf: string) {
    return cpf.length === 11
  }

  removeNonDigits(cpf: string) {
    return cpf.replace(/\D/g, '').padStart(11, '0')
  }

  allDigitsTheSame(cpf: string) {
    return cpf.split('').every((digit) => digit === cpf[0])
  }

  calculateDigit(cpf: string, factor: number) {
    let total = 0
    for (const digit of cpf) {
      if (factor > 1) total += Number(digit) * factor--
    }
    const rest = total % 11
    return rest < 2 ? 0 : 11 - rest
  }

  validate(rawCpf: string): boolean {
    const cpf = this.removeNonDigits(rawCpf)
    if (!this.isValidLength(cpf)) return false
    if (this.allDigitsTheSame(cpf)) return false
    const digit1 = this.calculateDigit(cpf, 10)
    const digit2 = this.calculateDigit(cpf, 11)
    const actualCheckDigits = cpf.slice(-2)
    const calculatedCheckDigits = `${digit1}${digit2}`
    return actualCheckDigits === calculatedCheckDigits
  }
}
