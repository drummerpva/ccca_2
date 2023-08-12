import { Presenter } from './Presenter'

export class JsonPresenter implements Presenter {
  async present(data: any): Promise<any> {
    return data
  }
}
