export async function getCollection<T>(resource: string): Promise<{results: T[]}> {
    return (await fetch(`https://swapi.dev/api/${resource}`)).json();
};


export async function getSingleByUrl<T>(url: string): Promise<T> {
    return (await fetch(url)).json();
}
