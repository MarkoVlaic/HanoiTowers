/*
/* Creates a new hanoi tower representation
/* @param disks {Int} Number of disks on a tower
*/
function Tower(disks) {
    // Rods is of type [[Block]]
    // The disk of the biggest size is located at index 0
    this.disks = disks;
    this.rods = new Array();

    for(let i=0;i<3;i++) {
        this.rods.push(new Array());
    }

    for(let i=disks;i>0;i--) {
        this.rods[0].push(new Block(i));
    }

    /*
    /* Moves a disk from the rod given by index from to the rod given by the index to
    /* @param from {Int}
    /* @param to {Int}
    /* 
    /*  Returns true on success and false on failure
    */
    this.move = function(from, to) {
        let fromRod = this.rods[from];
        let toRod = this.rods[to];
        // If the block we are trying to move is smaller than the rod 
        if(toRod.length == 0 || fromRod[fromRod.length - 1].size < toRod[toRod.length - 1].size) {
            let block = fromRod[fromRod.length - 1];
            fromRod.splice(fromRod.length - 1, 1);
            toRod.push(block);

            return true;
        }

        return false;
    }
}