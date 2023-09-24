// store in cache
export async function getCachedCollection<T>(resource: string): Promise<{ results: T[] }> {
    const cache = localStorage.getItem(resource);
    if (cache) {
        return JSON.parse(cache);
    }
    const data: { results: T[] } = await (await fetch(`https://swapi.dev/api/${resource}`)).json();
    localStorage.setItem(resource, JSON.stringify(data));
    return Promise.resolve(data);
};

export async function getCachedSingle<T>(resource: string, id: number): Promise<T> {
    const cache = localStorage.getItem(`${resource}/${id}`);
    if (cache) {
        return JSON.parse(cache);
    }
    const data: T = await (await fetch(`https://swapi.dev/api/${resource}/${id}`)).json();
    localStorage.setItem(`${resource}/${id}`, JSON.stringify(data));
    return Promise.resolve(data);
}
export async function getCachedSingleByUrl<T>(url: string): Promise<T> {
    const cache = localStorage.getItem(url);
    if (cache) {
        return JSON.parse(cache);
    }
    const data: T = await (await fetch(url)).json();
    localStorage.setItem(url, JSON.stringify(data));
    return Promise.resolve(data);
}
