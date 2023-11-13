import { IFilm } from "../models/film.interface";
import { IPerson } from "../models/person.interface";
import { IStarship } from "../models/starship.interface";
import { IVehicle } from "../models/vehicle.interface";

export function getIdFromModel( model: IPerson | IVehicle| IStarship| IFilm) {
    const { url } = model;
    const id = url.split('/').filter(x => !!x).slice(-1)[0];
    return  id;
}

// get name of the model
export function getModelName(model: IPerson | IStarship | IVehicle| IFilm ) {
    if('title' in model)
        return model.title;
    return model.name;
}