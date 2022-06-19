interface IApiCall {
  url: string
  method?: string
  body?: any
  headers?: any
}
export default async function apiCall(api: IApiCall) {
  const { url } = api
  try {
    const response = await fetch(url, {
      method: 'get',
      body: api.body,
      headers: api.headers,
    })
    return response.json()
  } catch (error) {
    Promise.reject(error)
  }
}
