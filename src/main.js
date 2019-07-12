let tower;
let selected;

const diskHeight = 20;
const maxDiskSpan = 0.5; // Maximum percentage of the window portion for a given rod that a disk can take 

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(30);

    tower = new Tower(20);
    selected = null;
}

function draw() {
    
    // Flip the coordinate system
    scale(1, -1);
    translate(0, -height);
    
    rectMode(CENTER);

    background(30);
    drawGrid();
    drawTower();

    if(selected != null) {
        scale(1, -1);
        translate(0, -height);
        let rod = tower.rods[selected];
        if(rod.length != 0) {
            const size = rod[rod.length - 1].size;
            console.log(size);
            //console.log(size);
            const width = getWidth(size);
            // console.log(width);

            rectMode(CORNER);
            rect(mouseX, mouseY, width, diskHeight);
            rectMode(CENTER);
        }
    }
}

function drawGrid() {
    stroke(50);
    strokeWeight(3);

    for(let i=0;i<3;i++) {
        let x = Math.floor((i+1)/3 * windowWidth);

        line(x, 0, x, windowHeight);
    }

    strokeWeight(1);
}

function drawTower() {
    for(let i=0;i<3;i++) {
        drawRod(i, tower.rods[i]);
    }
}

function drawRod(index, rod) {
    const start = index/3 * windowWidth;
    const end = (index+1)/3 * windowWidth;
    const midX = (start+end)/2 ;

    fill(224, 7, 54);
    const range = (selected == index)? rod.length - 1 : rod.length;
    //const range = rod.length - 1;

    for(let i=0;i<range;i++) {
        const y1 = i * diskHeight;
        const y2 = (i+1) * diskHeight;

        const midY = Math.floor( (y1+y2)/2 );

        //fill(Math.random() * 255);
        const width = getWidth(rod[i].size);
        rect(midX, midY, width/2, diskHeight);
    }

    //if(index != 2)rect(mid-10, 20, mid+10, 40);
}

function getWidth(size) {
    const perc = size / tower.disks;
    const width = Math.floor( perc * windowWidth * maxDiskSpan);
    return width;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
    if(selected == null) {
        selected = selectRod();
    } else {
        const next = selectRod();

        if(selected != next)tower.move(selected, next);
        selected = null;
    }
}

function selectRod() {
    // I tried to do this the smart way but its 4am and my brain is as heated as my computer so there's a bunch of ifs

    const perc = mouseX/windowWidth;

    if(perc <= 1/3) return 0;
    else if(perc > 1/3 && perc <= 2/3)return 1;
    
    return 2;
}