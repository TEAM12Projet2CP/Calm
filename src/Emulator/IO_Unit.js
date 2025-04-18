import { generalPurposeRegister } from "./Register.js";

class IOUnit {
    constructor() {
      // Buffer with 50 slots, initially empty
      this.buffer = new Array(50).fill(null).map(() => ({ value: null, filled: false }));
  
      this.ioController = {
        status: "idle",
        transferInProgress: false,
      };
    }
  
    // Write data into the buffer
    writeToBuffer(index, value) {
      if (index < 0 || index >= this.buffer.length) {
        console.error(`Invalid index: ${index}. Must be between 0 and ${this.buffer.length - 1}`);
        return;
      }
    
      this.buffer[index].value = value;
      this.buffer[index].filled = true;
    
      console.log(`Value "${value}" written to buffer slot ${index}`);
    }
  
    // Read data while ignoring truly empty slots
    readFromBuffer() {
      const bufferString = this.buffer
        .filter(slot => slot.filled)  // Keep only filled slots
        .map(slot => slot.value)      // Extract values
        .join("");
  
      console.log(`Buffer content (excluding empty columns): "${bufferString}"`);
      return bufferString;
    }
  convertCharToASCII(index) {
    if (index >= 0 && index < this.buffer.length) {
      const asciiValue = this.buffer[index].toString().charCodeAt(0) || 0;
      console.log(`Character at index ${index}: ${this.buffer[index]}, ASCII: ${asciiValue}`);
      return asciiValue;
    } else {
      console.error("Index out of bounds");
      return null;
    }
  }
  writeASCIIToBuffer(asciiValue, index) {
    if (index >= 0 && index < this.buffer.length) {
      this.buffer[index] = String.fromCharCode(asciiValue);
      console.log(`Stored character '${this.buffer[index]}' at index ${index} from ASCII ${asciiValue}`);
    } else {
      console.error("Index out of bounds");
    }
  }
  emptyBuffer() {
    this.buffer.forEach(slot => {
      slot.value = 0;      // Reset value to 0
      slot.filled = false; // Mark as empty
    });
    
}
}
export default IOUnit;