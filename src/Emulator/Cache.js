class Cache {
    constructor(blockSize, MC) {
        this.blockSize = blockSize;
        this.hits = 0;
        this.misses = 0;
        this.MC = MC; 
        this.blocks = Array.from({ length: blockSize }, () => ({
            address: null,
            priority: 0,
            data: null,
            type: null,
        }));
    }
    getData() {
        return this.blocks;
    }
    initializeCache() {
        for (let i = 0; i < this.blockSize; i++) {
            let memData = this.MC.getData()[i] || null;
            let codeData = this.MC.code[i] || null;

            this.blocks[i] = {
                address: i,
                priority: 0,
                data: memData ?? codeData,
                type: memData ? "data" : "code",
            };
        }
    }



    checkCache(address, iscode) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].address === address) {
                if ((iscode && this.blocks[i].type === "code") || (!iscode && this.blocks[i].type === "data")) {
                    return { hit: true, index: i };
                }
            }
        }
        return { hit: false, index: -1 };
    }

    updateCache(address, iscode) {
        let randomIndex = Math.floor(Math.random() * this.blockSize);
            this.blocks[randomIndex] =  { 
                address: address,
                priority: 0,
                data: iscode ? this.MC.code[address] : this.MC.data[address],
                type: iscode ? "code" : "data",
            }  ;

        for (let i = 1; i < 10; i++) { 
            let currentAddress = address + i;
           // if (currentAddress >= 100) break; // Prevent out-of-bounds access
    
            let data = iscode ? this.MC.code[currentAddress] : this.MC.data[currentAddress];
    
            let cacheResult = this.checkCache(currentAddress,iscode);
            if (cacheResult.hit) {
                this.blocks[cacheResult.index].data = data; // Update existing entry
            } else {
                
                    let Index = (randomIndex +i) % this.blockSize ;
                    console.log(Index);
                    this.blocks[Index] =  { 
                        address: currentAddress,
                        priority: 0,
                        data: data,
                        type: iscode ? "code" : "data",
                    }  ;
                    
                
            }
        }
    }
    
/*
    updatePriorities() {
        this.blocks.forEach(block => block.priority--);
    }

    searchMemoryAddress(type, address) {
        const foundBlock = this.blocks.find(block => block.address === address && block.type === type);

        if (foundBlock) {
            foundBlock.priority += 2;
            this.hits++;
        } else {
            this.misses++;
        }

        this.updatePriorities();
        return foundBlock || null;
    }

    getLeastPriorityBlockIndex() {
        let minIndex = 0;
        let minPriority = Infinity;

        this.blocks.forEach((block, index) => {
            if (block.priority < minPriority) {
                minPriority = block.priority;
                minIndex = index;
            }
        });

        return minIndex;
    }

    getMaxPriority() {
        return Math.max(...this.blocks.map(block => block.priority), 0);
    }

    writeBack(data, address) {
        if (address !== null && this.MC) {
            this.MC.setRam(address);
            this.MC.setRim(data);
            this.MC.write();
        }
    }

    replaceLRU(address, data, type) {
        let minIndex = this.getLeastPriorityBlockIndex();
        const maxPriority = this.getMaxPriority();

        this.blocks[minIndex] = {
            address: address,
            priority: maxPriority + 1,
            data: data,
            type: type,
        };
    }*/
}

export default Cache;