export interface TrainsApi {
  /** iso date */
  update: string
  trains: {
    no: string
    pos: string
    direction: number
    nickname: any
    type: string
    displayType: string
    dest: string | { text: string }
    delayMinutes: number
    notice: any
  }[]
}
