export interface StationsApi {
  stations: {
    info: {
      name: string
      code: string
      stopTrains: number[]
    }
  }[]
}
