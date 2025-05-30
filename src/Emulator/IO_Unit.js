import { generalPurposeRegister } from "./Register.js";

class IOUnit {
  constructor() {
    this.buffer = new Array(50).fill(0); // Each slot holds a character or ASCII code
    this.ioController = {
      status: "idle",
      transferInProgress: false,
    };
    this.delimiter = "#";
  }

  // Clear the buffer by setting each slot to 0
  emptyBuffer() {
    this.buffer.fill(0);
  }

  // Writes a character (from ASCII value) to the buffer at a specific index
  writeASCIIToBuffer(asciiValue, index) {
    if (index >= 0 && index < this.buffer.length) {
      this.buffer[index] = String.fromCharCode(asciiValue);
    } else {
      console.error("Index out of bounds");
    }
  }

  // Converts the character at the given index to its ASCII value
  convertCharToASCII(index) {
    if (index >= 0 && index < this.buffer.length) {
      const char = this.buffer[index];
      const asciiValue = char ? char.charCodeAt(0) : 0;
      return asciiValue;
    } else {
      console.error("Index out of bounds");
      return null;
    }
  }

  // Write string or number (as characters) to buffer with delimiter
  writeToBuffer1(value) {
    this.emptyBuffer(); // Reset buffer

    const strVal = value.toString();
    for (let i = 0; i < strVal.length && i < this.buffer.length - 1; i++) {
      this.buffer[i] = strVal[i];
    }

    if (strVal.length < this.buffer.length) {
      this.buffer[strVal.length] = this.delimiter;
    }
  }

  // Write a single character to a specific index
  writeToBuffer(index, value) {
    if (index < 0 || index >= this.buffer.length) {
      console.error(`Invalid index: ${index}. Must be between 0 and ${this.buffer.length - 1}`);
      return;
    }

    this.buffer[index] = value;
  }

  // Read full buffer until the delimiter or end
  readFromBuffer1(startIndex = 0) {
    let endIndex = this.buffer.indexOf(this.delimiter, startIndex);
    if (endIndex === -1) endIndex = this.buffer.length;

    const extracted = this.buffer
      .slice(startIndex, endIndex)
      .map(char => typeof char === "string" ? char : String.fromCharCode(char))
      .join("")
      .trim();

    if (/^\d+$/.test(extracted)) {
      const num = parseInt(extracted, 10);
      return num;
    } else {
      return extracted;
    }
  }

  // Read entire buffer content (ignore 0s)
  readFromBuffer() {
    const bufferString = this.buffer
      .filter(char => char !== 0 && char !== null && char !== undefined)
      .join("");
    return bufferString;
  }

  displayBuffer() {
  }
}

export default IOUnit;
