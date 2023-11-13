import { getCollection, getSingleByUrl } from "./services/dal.service.js";
import { IPerson } from "./models/person.interface.js";
import { createElementList, createPlanetElement } from "./services/element.service.js";
import { getIdFromModel } from "./services/helper.service.js";
import { IStarship } from "./models/starship.interface.js";
import { IFilm } from "./models/film.interface.js";
import { IVehicle } from "./models/vehicle.interface.js";
import { IPlanet } from "./models/planet.interface.js";

(async () => {
    // get the people collection
    const { results: people } = await getCollection<IPerson>('people');

    const peopleList = document.querySelector('.people-list') as HTMLElement;
    const vehiclesList = document.querySelector('.vehicles-list') as HTMLElement;
    const starshipsList = document.querySelector('.starships-list') as HTMLElement;
    const filmsList = document.querySelector('.films-list') as HTMLElement;
    const homeworld = document.querySelector('.homeworld') as HTMLElement;

    console.log(people);

    // populate the data in the people list
    peopleList.querySelector('.list-group')?.remove();
    const personList: HTMLDivElement = createElementList(people);
    peopleList.appendChild(personList);

    peopleList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', async function () {
            starshipsList.querySelectorAll('.list-group')?.forEach(el => el.remove());
            filmsList.querySelectorAll('.list-group')?.forEach(el => el.remove());
            vehiclesList.querySelectorAll('.list-group')?.forEach(el => el.remove());
            homeworld.querySelectorAll('.homeworld-name')?.forEach(el => el.remove());

            const person = people.find(p => getIdFromModel(p) === this.id) as IPerson;
            console.log(person);

            // populate the data in the starships list
            
            const starshipsPromises = person.starships.map(getSingleByUrl<IStarship>);
            const starships = await Promise.all(starshipsPromises);
            const starshipsListElement = createElementList(starships);
            starshipsList.appendChild(starshipsListElement);

            // populate the data in the films list
            
            const filmsPromises = person.films.map(getSingleByUrl<IFilm>);
            const films = await Promise.all(filmsPromises);
            const filmsListElement = createElementList(films);
            filmsList.appendChild(filmsListElement);

            // populate the data in the vehicles list
            
            const vehiclesPromises = person.vehicles.map(getSingleByUrl<IVehicle>);
            const vehicles = await Promise.all(vehiclesPromises);
            const vehiclesListElement = createElementList(vehicles);
            vehiclesList.appendChild(vehiclesListElement);


            const planet:IPlanet = await getSingleByUrl<IPlanet>(person.homeworld);
            homeworld.appendChild(createPlanetElement(planet));
        });
    });

    // populate the data in the vehicle list
    vehiclesList.querySelector('.list-group')?.remove();


})();