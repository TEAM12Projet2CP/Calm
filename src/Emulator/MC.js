import { Register } from "./Register.js";
import Cache from "./Cache.js"; // 
import IOUnit from "./IO_Unit.js";  // 🔥 Import IOUnit

class MC {
  constructor() {
    this.rim = new Register();
    this.ram = new Register();
    this.stack = new Array(100); // Stack size
    this.data = new Array(100);

    this.code = new Array(100);
    
    this.cache= new Cache(50, MC); 
    this.ioUnit = new IOUnit();  // ✅ Add IOUnit instance
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
   
   

    let cacheResult = this.cache.checkCache(address, iscode);
  
    
    if (cacheResult.hit) {
      this.rim = this.cache.blocks[cacheResult.index].data;
      
     
    } else {
      this.rim = iscode ? this.code[address] : this.data[address];
      
      if (this.rim !== undefined) {
  
         if(!iscode)
        this.cache.replaceLRU(address, this.rim);
      }
    }
  }

  write() {
    
    let address = parseInt(this.ram, 2);
    let value = this.rim;
   
    
    let cacheResult = this.cache.checkCache(address, false);
    
    
    if (cacheResult.hit) {
     
      this.cache.blocks[cacheResult.index].data = value;
      this.cache.blocks[cacheResult.index].priority++; // Increase priority
      
    } else {
     
      this.cache.replaceLRU(address, value);
    }
    this.data[address]=this.rim;
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
  getIOUnit() {  // ✅ Helper method to get IOUnit
    return this.ioUnit;
}
readMC(i)
{
    return this.data[i];
}
getCache()
{
    return this.cache;
}
}

export default MC;
