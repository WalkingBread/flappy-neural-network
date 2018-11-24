class Bird {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.yV = 0;
        this.fitness = 0;
        this.isDead = false;

        this.brain = NeuralNetwork.createNeuralNetwork({
            inputNodes: 5,
            layers: [
                NeuralNetwork.createLayer({
                    nodes: 10,
                    activationFunction: 'sigmoid'
                }),
                NeuralNetwork.createLayer({
                    nodes: 10,
                    activationFunction: 'sigmoid'
                }),
                NeuralNetwork.createLayer({
                    nodes: 2,
                    activationFunction: 'sigmoid'
                })
            ],
            learningRate: 0.01
        });;

        this.texture = new Image();
        this.texture.src = './resources/NuN.png';
    }

    think() {
        const closest_pillar = (function() {
            for(let pillar of pillars) {
                if(!pillar.bird_passed) {
                    return pillar;
                }
            }
        })();

        const pillar_x = closest_pillar.x;
        const upper_pillar = closest_pillar.upper_pillar;
        const lower_pillar = closest_pillar.lower_pillar;
        const bird_to_pillar_distance = pillar_x - this.x;

        const prediction = this.brain.predict([
            pillar_x, 
            upper_pillar, 
            lower_pillar, 
            bird_to_pillar_distance, 
            this.y
        ]);

        if(prediction[0] > prediction[1]) {
            this.jump();
        }
    }

    jump() {
        this.yV = -10;
    }

    update() {
        this.y += this.yV;

        if(this.yV <= 15) {
            this.yV += gravity;
        }

        for(let pillar of pillars) {
            if(this.x + this.r > pillar.x && 
               this.x - this.r < pillar.x + pillar.w
            ) {
                if(this.y - this.r <= pillar.upper_pillar ||
                   this.y + this.r >= pillar.lower_pillar
                ) {
                    this.isDead = true;
                } else {
                    if(!pillar.bird_passed) {
                        pillar.bird_passed = true;
                    }
                }
            } 
        }

        if(this.y - this.r < 0) {
            this.isDead = true;
        } else if(this.y + this.r > height) {
            this.y = height - this.r;
            this.isDead = true;
        }

        this.fitness = distance_covered;
    }

    show() {
        const ix = this.x - this.r;
        const iy = this.y - this.r;
        ctx.drawImage(this.texture, ix, iy, this.r * 2, this.r * 2);
    }

    mutate(mutationRate) {
        for(let layer of this.brain.layers) {
            if(Math.random() < mutationRate) {
                layer.weights.random(-1, 1);
                layer.bias.random(-1, 1);
            }
        }
    }
}