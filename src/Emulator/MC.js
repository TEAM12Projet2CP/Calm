import { Register } from "./Register.js";
import Cache from "./Cache.js"; // 

class MC {
  constructor() {
    this.rim = new Register();
    this.ram = new Register();
    this.stack = new Array(100); // Stack size
    this.data = new Array(100);

    this.code = new Array(100);
    
    this.cache = new Cache(60, MC); 
    this.cache.MC=this;
   // this.cache.initializeCache();

    // Performance metrics
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.totalAccesses = 0;
    this.resultMatrix = []; // Matrix to store results
  }



  setcode(code) {
    this.code = code;
  }

  setRim(val) {
    this.rim = val;
  }

  setRam(adr) {
    this.ram = adr;
  }

  getRam() {
    return this.ram;
  }

  getRim() {
    return this.rim;
  }

  read(iscode) {
   
    let address = parseInt(this.ram, 2);
    this.totalAccesses++;
   

    let cacheResult = this.cache.checkCache(address, iscode);
  
    
    if (cacheResult.hit) {
      this.cacheHits++;
      this.rim = this.cache.blocks[cacheResult.index].data;
      console.log(`the content ${this.cache.MC.data[address]}`);
      console.log(`the content ${this.cache.MC.code[address]}`);
    } else {
      this.cacheMisses++;
      this.rim = iscode ? this.code[address] : this.data[address];
      console.log(`Cache miss. Loading from memory: ${this.rim}`);
      if (this.rim !== undefined) {
        const replacedIndex = this.cache.getLeastPriorityBlockIndex();
        console.log(`Replacing cache block at index: ${replacedIndex}`);
        if(!iscode){this.cache.replaceLRU(address, this.rim, "data");}
      }
    }

  
    this.getPerformanceMetrics();
    this.displayPerformance();
  }

  write() {
    let address = parseInt(this.ram, 2);
    let value = this.rim;
   
    console.log(`Writing value: ${value} to address: ${address}`);
    let cacheResult = this.cache.checkCache(address, false);
    console.log(`Cache check result:`, cacheResult);
    
    if (cacheResult.hit) {
     
      this.cache.blocks[cacheResult.index].data = value;
      this.cache.blocks[cacheResult.index].priority++; // Increase priority
      console.log(`Cache hit. Updated cache block.`);
    } else {
     
      const replacedIndex = this.cache.getLeastPriorityBlockIndex();
      console.log(`Cache miss. Replacing block at index: ${replacedIndex}`);
      let replacedBlock = this.cache.blocks[replacedIndex];
      if (replacedBlock.address !== null) {
        console.log(`Writing back data to memory from replaced block.`);
        this.cache.writeBack(replacedBlock.data, replacedBlock.address);
      }
      this.cache.replaceLRU(address, value, "data");
    }
  }

  getPerformanceMetrics() {
    let hitRate = this.totalAccesses > 0 ? (this.cacheHits / this.totalAccesses) * 100 : 0;
    let missRate = this.totalAccesses > 0 ? (this.cacheMisses / this.totalAccesses) * 100 : 0;
   
    return {
      cacheHits: this.cacheHits,
      cacheMisses: this.cacheMisses,
      totalAccesses: this.totalAccesses,
      hitRate: hitRate.toFixed(2) + "%",
      missRate: missRate.toFixed(2) + "%",
      resultMatrix: this.resultMatrix
    };
  }

  displayPerformance() {
    let metrics = this.getPerformanceMetrics();
    console.log("Performance Metrics:");
    console.log(`Cache Hits: ${metrics.cacheHits}`);
    console.log(`Cache Misses: ${metrics.cacheMisses}`);
    console.log(`Hit Rate: ${metrics.hitRate}`);
    console.log(`Miss Rate: ${metrics.missRate}`);
    console.log("Result Matrix:");
    console.table(metrics.resultMatrix);
  }

  popval() {
    this.rim = this.stack.pop();
  }

  pushval() {
    this.stack.push(this.rim);
  }

  getData() {
    return this.data;
  }

  getstack() {
    return this.stack;
  }
}

export default MC;
