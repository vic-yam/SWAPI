import { getIdFromModel, getModelName } from "./helper.service.js";
export function createButtonElement(element) {
    const btn = document.createElement('button');
    btn.classList.add('list-group-item');
    btn.classList.add('list-group-item-action');
    btn.innerText = getModelName(element);
    const id = getIdFromModel(element);
    btn.id = id;
    btn.addEventListener('click', function () {
        var _a;
        this.classList.add('active');
        (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll('button').forEach(btn => {
            if (btn !== this) {
                btn.classList.remove('active');
            }
        });
    });
    if ('eye_color' in element) {
        const icon = document.createElement('i');
        icon.classList.add('bi');
        icon.classList.add('bi-eye-fill');
        icon.style.color = element.eye_color;
        icon.style.paddingLeft = '2rem';
        btn.appendChild(icon);
    }
    if ('gender' in element) {
        const icon = document.createElement('i');
        icon.classList.add('bi');
        if (element.gender === 'male')
            icon.classList.add('bi-person-standing');
        if (element.gender === 'female')
            icon.classList.add('bi-person-standing-dress');
        icon.style.paddingLeft = '2rem';
        btn.appendChild(icon);
    }
    return btn;
}
export function createElementList(elements) {
    const div = document.createElement('div');
    div.classList.add('list-group');
    elements.forEach(element => {
        const btn = createButtonElement(element);
        div.appendChild(btn);
    });
    return div;
}
export function createPlanetElement(planet) {
    const div = document.createElement('div');
    div.classList.add('homeworld-name');
    div.appendChild(document.createTextNode(planet.name));
    return div;
}
