class Dive {
    constructor(id, name, skg, status) {
        this.id = id;
        this.name = name;
        this.skg = skg;
        this.status = {
            '1': { 'A': status, 'B': 'new', 'C': status, 'D': status },
            '3': { 'A': status, 'B': status, 'C': status, 'D': status },
            '5': { 'A': status, 'B': status, 'C': status, 'D': status },
            '7': { 'A': status, 'B': status, 'C': status, 'D': status },
            '10': { 'A': status, 'B': status, 'C': status, 'D': status }
        };
    }
}

export default Dive;
