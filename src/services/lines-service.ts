import ky from 'ky'
import memoize from 'promise-memoize'
import urlJoin from 'url-join'

// Use proxy in development, or explicit URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || ''

export const getLinesAsync = memoize(async function () {
  const result = await ky(`${API_BASE_URL}/api/line`).json<any[]>()

  return result.map((item) => {
    return { text: item.name, id: item.id }
  })
})

export const getStationsAsync = memoize(async function (lineName: string) {
  if (!lineName) return []

  const result = await ky(urlJoin(`${API_BASE_URL}/api/line`, lineName)).json<any[]>()

  return result.map((item) => {
    return { text: item.name, id: item.code }
  })
})

export async function getTrainsAsync(line: string, station: string) {
  const result = await ky(urlJoin(`${API_BASE_URL}/api/line`, line, station)).json<
    Record<string, any>
  >()

  return result
}
