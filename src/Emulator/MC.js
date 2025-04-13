import { Register } from "./Register.js"
import  Cache from "./Cache.js"; // Import the cache class
class MC {
    constructor(){
    this.rim=new Register()
    this.ram=new Register() 
    this.stack = new Array(100)//size à revoir
    this.data = new Array (100)
    this.code = new Array(100)  

    this.cache = new Cache(50,this)
    }
    setcode(code){
        this.code=code;
    }
    setRim (val){//val in hexa
    this.rim=val;
    }
    setRam (adr){//val in decimal
    this.ram=adr;
    }
    getRam(){
    return this.ram;
    }
    getRim (){
    return this.rim
    }
    read(iscode){
        
        // Check cache first
        let cacheResult = this.cache.checkCache(parseInt(this.ram,2),iscode);
        if (cacheResult.hit) {
            this.rim = this.cache.blocks[cacheResult.index].data;
            
            console.log(`Cache HIT: Address ${parseInt(this.ram,2)}`);
            return;
        }

        // Cache miss, fetch from memory
        console.log(`Cache MISS: Address ${parseInt(this.ram,2)}`);
        this.rim = iscode ? this.code[parseInt(this.ram,2)] : this.data[parseInt(this.ram,2)];


        // Update cache
        this.cache.updateCache(parseInt(this.ram,2),iscode);

    
    }

    write(){
        let address = parseInt(this.ram, 2);
        let value = this.rim;

        // Write to memory
        this.data[address] = value;

        // Update cache if present
        let cacheResult = this.cache.checkCache(address,false);
        if (cacheResult.hit) {
            this.cache.blocks[cacheResult.index].data = value;
        } else {
            if (this.cache.blocks.length >= this.cache.cacheSize) {
                let randomIndex = Math.floor(Math.random() * this.cache.cacheSize);
                
                this.cache.blocks[randomIndex] =  { 
                    address: address,
                    priority: 0,
                    data: value,
                    type: "data",
                }  ;
                
            } else {
                this.cache.blocks.push({ 
                    address: address,
                    priority: 0,
                    data: value,
                    type: "data", });
            }
            //this.cache.updateCache(address,false);
        }
    }
    popval(){
    this.rim=this.stack.pop();
    }
    pushval(){
    this.stack.push(this.rim);
    }
    getData(){
        return this.data;
    }
    getstack(){
        return this.stack;
    }
    getCache() {
        return this.cache;
    }
}
export default MC;