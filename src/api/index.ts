const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export default async function apiCall(
  url: string,
  params?: Record<string, any>
) {
  let response = await fetch(`${BASE_URL}${url}`, params);
  return await response.json();
}
