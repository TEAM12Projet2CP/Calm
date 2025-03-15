import { Register } from "./Register.js";
import IOUnit from "./IO_Unit.js";  // 🔥 Import IOUnit

class MC {
    constructor() {
        this.rim = new Register();
        this.ram = new Register();
        this.mar = new Register();
        this.stack = new Array(100); // size à revoir
        this.data = new Array(100);
        this.code = new Array(100);
        this.ioUnit = new IOUnit();  // ✅ Add IOUnit instance
    }

    setcode(code) {
        this.code = code;
    }

    setRim(val) { // val in hexa
        this.rim = val;
    }

    setRam(adr) { // val in decimal
        this.ram = adr;
    }

    getRam() {
        return this.ram;
    }

    getRim() {
        return this.rim;
    }

    read(iscode) {
        if (iscode == true) {
            this.rim = this.code[parseInt(this.ram, 2)];
        } else {
            this.rim = this.data[parseInt(this.ram, 2)];
        }
    }

    write() {
        this.data[parseInt(this.ram, 2)] = this.rim;
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
}

export default MC;
