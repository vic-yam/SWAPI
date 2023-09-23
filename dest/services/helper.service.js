export function getIdFromModel(model) {
    const { url } = model;
    const id = url.split('/').filter(x => !!x).slice(-1)[0];
    return id;
}
// get name of the model
export function getModelName(model) {
    if ('title' in model)
        return model.title;
    return model.name;
}
