function Storage() {
    this.storage = window.localStorage;

    // Saves a tower instance to memory
    this.save = function(tower) {
        tower.rods.forEach((rod, i) => {
            const key = i.toString();
            const value = rod.map(b => b.size).join(' ');
            this.storage.setItem(key, value);
        });

        this.storage.setItem('moves', tower.moves);
    };

    // Gets the latest tower instance from memory if there was any 
    // Returns null if nothing is saved in memory
    this.get = function() {
        let tower = new Tower(20);
        
        for(let i=0;i<3;i++) {
            let rod = this.storage.getItem(i.toString());
            if(rod === null) return null;
            rod = rod.split(' ').map(e => new Block(parseInt(e)));
            tower.rods[i] = rod;
        }

        tower.moves = this.storage.getItem('moves');
        return tower;
    };

}