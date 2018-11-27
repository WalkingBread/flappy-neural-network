var ctx, width, height;

var population;
var pillars = [];
var game_speed = 10;
var distance_covered = 0;
var record = 0;

const background_color = '#3d4044';

const gravity = 0.5;

window.onload = () => {
    const canvas = document.querySelector(".canvas");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    init_game();

    const clear_screen = () => {
        ctx.fillStyle = background_color;
        ctx.fillRect(0, 0, width, height);
    }

    const frame = () => {
        clear_screen();

        for(let pillar of pillars) {
            pillar.update();
            pillar.show();
        }
        
        for(let bird of this.population.population) {
            if(!bird.isDead) {
                bird.think();
                bird.update();
                bird.show();
            }
        }

        population.findBest();

        if(distance_covered > record) {
            record = distance_covered;
        }

        distance_covered += game_speed;

        if(population.birdsAlive() === 0) {
            init_game();
        }

        game_info();

        requestAnimationFrame(frame);
    }
    frame();
}

function init_game() {
    pillars = [];
    pillars.push(new Pillar());

    if(!population) {
        population = new Population(1000, 0.005);
    } else {
        population.nextGeneration();
    }

    distance_covered = 0;
}

function game_info() {
    ctx.fillStyle = '#000';
    ctx.font = '40px Arial';
    if(population.best) {
        ctx.fillText("best fitness: " + population.best.fitness, 20, 50);
    }
    ctx.fillText("record: " + record, 20, 100);
    ctx.fillText("birds alive: " + population.birdsAlive(), 20, 150);
}