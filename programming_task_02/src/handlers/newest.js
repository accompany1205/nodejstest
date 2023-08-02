class Newest {
    static handle(...sources) {
        // Sort the sources array based on the timestamp property (assuming timestamp is a valid property in each source object)
        sources.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Return the item with the most recent timestamp (i.e., the first item after sorting)
        return sources[0];
    }
}

module.exports = Newest;