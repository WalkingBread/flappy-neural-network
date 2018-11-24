class Pillar {
    constructor() {
        this.height = Math.floor((Math.random() * (300 - 200)) + 200);

        const upper_bound = 150;
        const lower_bound = height - (200 + this.height);

        this.upper_pillar = Math.floor((Math.random() * ((height - lower_bound) - upper_bound + 1)) + upper_bound);
        this.lower_pillar = this.upper_pillar + this.height;

        this.x = width;
        this.w = 100;

        this.pushed_next = false;
        this.bird_passed = false;
    }

    update() {
        this.x -= game_speed;

        if(this.x + this.w < 0) {
            pillars.splice(pillars.indexOf(this), 1);
        }

        if(this.x <= width - width / 3 && !this.pushed_next) {
            pillars.push(new Pillar());
            this.pushed_next = true; 
        }
    }

    show() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, 0, this.w, this.upper_pillar);
        ctx.fillRect(this.x, this.lower_pillar, this.w, height);
    }
}
