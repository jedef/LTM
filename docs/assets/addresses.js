
const allEntriesLabel="<tous>"

class Feature {
    constructor(obj) {
        Object.assign(this, obj)
        this.properties.PEOPLE.forEach(person => person.feature=this)
    }

    getPeople() {
        return this.properties.PEOPLE
    }

    getJobs() {
        jobs = new Set()
        for(const person of this.getPeople()) {
            jobs.add(person.job)
        }
        return jobs
    }

    getAddress() {
        return this.properties.RUE_OFF
    }

}

class Directory {
    construct_from_geojson(geojson) {
        this.features = geojson.features.map(feature => new Feature(feature))
        this.geojson_headers = geojson
        //this.geojson_headers.features=undefined
        this.people = this.features.reduce((acc, cur) => acc.concat(cur.getPeople()), [])
        this.jobs = this.generateJobsArray()
        this.addresses = this.generateAddressesArray()
    }

    constructor(directory, features, people) {
        console.log(directory)
        console.log(features)
        if(features === undefined) return this.construct_from_geojson(directory) //overloaded constructor
        this.features = features
        this.geojson_headers = directory.geojson_headers
        this.jobs = directory.jobs
        this.people = people
        this.addresses=directory.addresses
    }

    generateAddressesArray() {
        const addresses = new Set()
        for(const feature of this.features) {
            addresses.add(feature.getAddress())
        }
        return Array.from(addresses)
    }

    generateJobsArray() {
        const jobs = new Set()
        console.log(this.people)
        for(const person of this.people) {
            jobs.add(person.job)
        }
        return Array.from(jobs)
    }

    filterByJob(job) {
        if(job===allEntriesLabel) return this
        const filtered_features = new Set()
        const filtered_people = []
        for(const person of this.people) {
            if (person.job === job) {
                filtered_features.add(person.feature)
                filtered_people.push(person)
            }
        }
        console.log("Filtered jobs!")
        console.log(filtered_features)
        console.log(filtered_people)
        return new Directory(this, Array.from(filtered_features), filtered_people)
    }

    filterByAddress(address) {
        if(address===allEntriesLabel) return this
        console.log(address)
        console.log(globalThis.allEntriesLabel)
        const filtered_features = this.features.filter(feature => feature.getAddress() === address)
        const filtered_people = this.people.filter(person => person.feature.getAddress() === address)
        console.log("Filtered addresses!")
        console.log(filtered_features)
        console.log(filtered_people)
        return new Directory(this, filtered_features, filtered_people)
    }

    get geojson() {
        const geojson = Object.assign({}, this.geojson_headers)
        geojson.features = this.features
        return geojson
    }
}

export default Directory