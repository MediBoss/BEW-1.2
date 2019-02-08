// Funtion used to populate a field
module.exports = field => {
    return function(next) {
        this.populate(field);
        next();
    }
}
