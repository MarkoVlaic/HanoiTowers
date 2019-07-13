let tower;
let storage;
let selected;

let saveBtn;

const diskHeight = 20;
const maxDiskSpan = 0.5; // Maximum percentage of the window portion for a given rod that a disk can take 

const endDate = new Date("Aug 3, 2019 23:59:59");

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(30);
    
    saveBtn = createButton('Save');
    saveBtn.position(20, 20);
    saveBtn.mousePressed(() => storage.save(tower));

    storage = new Storage();
    tower = storage.get() || new Tower(20);

    selected = null;
}

function draw() {

    if(endDate.getTime() - new Date().getTime() <= 0) {
        background(209, 81, 59);
        textSize(width/10);
        textAlign(CENTER);
        text('CALL ME DADDY!', width/2, height/2);

        return;
    }
    
    // Flip the coordinate system
    scale(1, -1);
    translate(0, -height);
    
    rectMode(CENTER);

    background(30);
    drawGrid();
    drawTower();
    drawMoves();
    drawCountdown();

    if(selected != null) {
        moveSelected();
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

function moveSelected() {
    let rod = tower.rods[selected];
    if(rod.length != 0) {
        const size = rod[rod.length - 1].size;
        //console.log(size);
        const width = getWidth(size);
        // console.log(width);

        rectMode(CORNER);
        rect(mouseX, mouseY, width, diskHeight);
        rectMode(CENTER);
    }
}

function drawMoves() {
    scale(1, -1);
    translate(0, -height);

    const score = `Moves: ${tower.moves}`;
    const x = windowWidth/2;
    const y = 30;

    fill(117, 122, 130);
    textSize(width/75);
    textAlign(CENTER);
    text(score, x, y);
}

function drawCountdown() {
    const diff = endDate.getTime() - new Date().getTime(); 

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const countdown = `${days} days ${hours} hours ${minutes} minutes left`;
    const x = windowWidth * 5/6;
    const y = 30;

    text(countdown, x, y);
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
