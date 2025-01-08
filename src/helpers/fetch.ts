export default async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error)
    throw error;
  }
}
