import { Presenter } from './Presenter'

export class CsvPresenter implements Presenter {
  async present(data: any): Promise<any> {
    const lines: string[] = []
    for (const row of data) {
      const line: string[] = []
      for (const key in row) {
        line.push(row[key])
      }
      lines.push(line.join(';'))
    }
    return lines.join('\n')
  }
}
