import { Register } from "./Register.js"
class MC {
    constructor(){
    this.rim=new Register()
    this.ram=new Register() 
    this.stack = new Array(100)//size à revoir
    this.data = new Array (100)
    this.code = new Array(100)  

    this.cache = Array.from({ length: this.cacheSize }, () => ({ address: null, data: "00000000",iscode:false }));
    this.cacheSize = 50;
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

    checkCache(address) {
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i].address === address) {
                return { hit: true, index: i };
            }
        }
        return { hit: false, index: -1 };
    }

    read(iscode){
        
        // Check cache first
        let cacheResult = this.checkCache(parseInt(this.ram,2));
        if (cacheResult.hit && this.cache[cacheResult.index].iscode===iscode) {
            this.rim = this.cache[cacheResult.index].data;
            console.log(`Cache HIT: Address ${parseInt(this.ram,2)}`);
            return;
        }

        // Cache miss, fetch from memory
        console.log(`Cache MISS: Address ${parseInt(this.ram,2)}`);
        this.rim = iscode ? this.code[parseInt(this.ram,2)] : this.data[parseInt(this.ram,2)];


        // Update cache
        this.updateCache(parseInt(this.ram,2), this.rim,iscode);

    
    }

    write(){
        let address = parseInt(this.ram, 2);
        let value = this.rim;

        // Write to memory
        this.data[address] = value;

        // Update cache if present
        let cacheResult = this.checkCache(address);
        if (cacheResult.hit && this.cache[cacheResult.index].iscode==false) {
            this.cache[cacheResult.index].data = value;
        } else {
            this.updateCache(address, value,false);
        }
    }

    updateCache(address, data, iscode) {
        if (this.cache.length >= this.cacheSize) {
            let randomIndex = Math.floor(Math.random() * this.cacheSize);
            console.log(`Replacing cache entry at index ${randomIndex}`);
            this.cache[randomIndex] = { address, data, iscode };
        } else {
            this.cache.push({ address, data, iscode });
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