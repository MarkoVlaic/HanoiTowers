function Renderer(tower) {
    this.tower = tower;

    this.canvas = document.getElementById('canvas');
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    this.render = function() {
        /*
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.fillRect(0, 0, this.width, this.height);*/

        // Draw the horizontal lines marking the rod boundaries
        /*for(let i=0;i<3;i++) {

        }*/

        let ctx = this.ctx;

        /*ctx.beginPath();
        ctx.moveTo(125, 125);
        ctx.lineTo(125, 45);
        ctx.lineTo(45, 125);
        ctx.closePath();
        ctx.stroke();*/

        this.line(0, 0, 100, 200);
    }

    this.line = function(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, x2);
        this.ctx.lineTo(x2, y2);
        this.ctx.moveTo(0, 0);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}