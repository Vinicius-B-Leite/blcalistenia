
export const SerieSchema = {
    name: "Serie",
    properties: {
        _id: 'int',
        serie: 'int',
        rep: 'int',
        rest: 'double',
        exercise: 'string' //id of exercise(name)
    },
    primaryKey: '_id'
};
