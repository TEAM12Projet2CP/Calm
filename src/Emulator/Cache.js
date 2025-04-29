class Cache {
    constructor(blockSize, MC) {
        this.blockSize = blockSize;
      
        this.MC = MC; 
        this.blocks = Array.from({ length: blockSize }, () => ({
            address: null,
            priority: 0,
            data: null,
   
        }));
    }
 
    // initializeCache() {
    //     for (let i = 0; i < this.blockSize; i++) {
         
    //         this.blocks[i] = {
    //             address: i,
    //             priority: 0,
    //             data:0,
    //             type: memData ? "data" : "code",
    //         };
    //     }
    // }

    getData() {
        return this.blocks;
    }

    checkCache(address, iscode) {
        console.log(`Checking cache for address: ${address}`);
        for (let i = 0; i < this.blockSize; i++) {  
            if (this.blocks[i].address === address) {
                    return { hit: true, index: i }
        }}
        return { hit: false, index: -1 };
    }

    updatePriorities() {
        this.blocks.forEach(block => block.priority--);
    }

    searchMemoryAddress(type, address) {
        const foundBlock = this.blocks.find(block => block.address === address );

        if (foundBlock) {
            foundBlock.priority += 2;
          
        } else {
           
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

    // writeBack(data, address) {
    //     if (address !== null && this.MC) {
    //         this.MC.setRam(address);
    //         this.MC.setRim(data);
    //         //this.MC.write();
    //     }
    // }

    replaceLRU(address, data) {
        let minIndex = this.getLeastPriorityBlockIndex();
        const maxPriority = this.getMaxPriority();

        this.blocks[minIndex] = {
            address: address,
            priority: maxPriority + 1,
            data: data,
           
        };
      

    }
    
}

export default Cache;
