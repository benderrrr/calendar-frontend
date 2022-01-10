export enum httpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

const initHeader: HeadersInit = new Headers({'Content-Type': 'application/json'})

export const request = async (url: string, method: httpMethod, body?: any, headers?: Headers) => {
  try {
    const newHeaders: HeadersInit = headers || initHeader;
    if (body) {
      body = JSON.stringify(body);
    }
    const response = await fetch(url, {method, body, headers: newHeaders});
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'request error');
    }
    return data;
  } catch (e) {
    console.warn(e);
  }
}