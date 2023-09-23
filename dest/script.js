var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCollection, getSingleByUrl } from "./services/dal.service.js";
import { createElementList, createPlanetElement } from "./services/element.service.js";
import { getIdFromModel } from "./services/helper.service.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // get the people collection
    const { results: people } = yield getCollection('people');
    const peopleList = document.querySelector('.people-list');
    const vehiclesList = document.querySelector('.vehicles-list');
    const starshipsList = document.querySelector('.starships-list');
    const filmsList = document.querySelector('.films-list');
    const homeworld = document.querySelector('.homeworld');
    console.log(people);
    // populate the data in the people list
    (_a = peopleList.querySelector('.list-group')) === null || _a === void 0 ? void 0 : _a.remove();
    const personList = createElementList(people);
    peopleList.appendChild(personList);
    peopleList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function () {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function* () {
                (_a = starshipsList.querySelectorAll('.list-group')) === null || _a === void 0 ? void 0 : _a.forEach(el => el.remove());
                (_b = filmsList.querySelectorAll('.list-group')) === null || _b === void 0 ? void 0 : _b.forEach(el => el.remove());
                (_c = vehiclesList.querySelectorAll('.list-group')) === null || _c === void 0 ? void 0 : _c.forEach(el => el.remove());
                (_d = homeworld.querySelectorAll('.homeworld-name')) === null || _d === void 0 ? void 0 : _d.forEach(el => el.remove());
                const person = people.find(p => getIdFromModel(p) === this.id);
                console.log(person);
                // populate the data in the starships list
                const starshipsPromises = person.starships.map((getSingleByUrl));
                const starships = yield Promise.all(starshipsPromises);
                const starshipsListElement = createElementList(starships);
                starshipsList.appendChild(starshipsListElement);
                // populate the data in the films list
                const filmsPromises = person.films.map((getSingleByUrl));
                const films = yield Promise.all(filmsPromises);
                const filmsListElement = createElementList(films);
                filmsList.appendChild(filmsListElement);
                // populate the data in the vehicles list
                const vehiclesPromises = person.vehicles.map((getSingleByUrl));
                const vehicles = yield Promise.all(vehiclesPromises);
                const vehiclesListElement = createElementList(vehicles);
                vehiclesList.appendChild(vehiclesListElement);
                const planet = yield getSingleByUrl(person.homeworld);
                homeworld.appendChild(createPlanetElement(planet));
            });
        });
    });
    // populate the data in the vehicle list
    (_b = vehiclesList.querySelector('.list-group')) === null || _b === void 0 ? void 0 : _b.remove();
}))();
