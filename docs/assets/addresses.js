
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

}

class Addresses {
    constructor(geojson) {
        this.geojson = geojson
        this.features = geojson.features.map(feature => new Feature(feature))
        //this.geojson.features=undefined
        this.jobs = this.generateJobsArray()
    }

    getPeople() {
        return this.features.reduce((acc, cur) => acc.concat(cur.getPeople()), []);
    }

    generateJobsArray() {
        const jobs = new Set()
        console.log(this.getPeople())
        for(const person of this.getPeople()) {
            jobs.add(person.job)
        }
        return jobs
    }

    filterByJob(job) {
        const addresses = new Set()
        for(const person of this.getPeople()) {
            if (person.job === job) {
                addresses.add(person.feature)
            }
        }
        const geojson = Object.assign({}, this.geojson)
        geojson.features = Array.from(addresses)
        return geojson
    }
}

export default Addresses