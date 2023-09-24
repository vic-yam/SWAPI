import { getCachedCollection, getCachedSingle, getCachedSingleByUrl } from "./cache.service.js";

export async function getCollection<T>(resource: string): Promise<{results: T[]}> {
    return getCachedCollection<T>(resource);
};

export async function getSingle<T>(resource: string, id: number): Promise<T> {
    return getCachedSingle<T>(resource, id);
}

export async function getSingleByUrl<T>(url: string): Promise<T> {
    return getCachedSingleByUrl<T>(url);
}
