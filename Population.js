class Population {
    constructor(unitNumber, mutationRate) {
        this.population = [];
        this.mutationRate = mutationRate;
        for(let i = 0; i < unitNumber; i++) {
            this.population[i] = new Bird(width / 2, height / 2, 20);
        }
        this.best = null;
    }

    nextGeneration() {
        let matingPool = [];

        let maxFitness = 1;
        for(let dna of this.population) {
            if(dna.fitness > maxFitness) {
                maxFitness = dna.fitness;
            }
        }

        for(let i = 0; i < this.population.length; i++) {
            const fitness = this.population[i].fitness / maxFitness;
            const n = Math.floor(fitness * 100);
            for(let j = 0; j < n; j++) {
                matingPool.push(this.population[i]);
            }
        }

        for(let i = 0; i < this.population.length; i++) {
            const a = Math.floor(Math.random() * matingPool.length);
            const b = Math.floor(Math.random() * matingPool.length);

            const parentA = matingPool[a];
            const parentB = matingPool[b];

            const child = this.crossover(parentA, parentB);
            child.mutate(this.mutationRate);

            this.population[i] = child;
        }
    }

    findBest() {
        this.best = this.population[0];
        for(let i = 1; i < this.population.length; i++) {
            if(this.population[i].fitness > this.best.fitness) {
                this.best = this.population[i];
            }
        }
    }

    crossover(a, b) {
        const child = new Bird(width / 2, height / 2, 20);
        const midpoint = Math.floor(Math.random() * a.brain.layers.length);

        for(let i = 0; i < child.brain.layers.length; i++) {
            if(i < midpoint) {
                child.brain.layers[i].weights = a.brain.layers[i].weights;
                child.brain.layers[i].bias = a.brain.layers[i].bias;
            } else {
                child.brain.layers[i].weights = b.brain.layers[i].weights;
                child.brain.layers[i].bias = b.brain.layers[i].bias; 
            }
        }
        return child;
    }

    birdsAlive() {
        let aliveCount = 0;
        for(let dna of this.population) {
            if(!dna.isDead) {
                aliveCount++;
            }
        }
        return aliveCount;
    }
}