export interface Presenter {
  present(data: any): Promise<any>
}
