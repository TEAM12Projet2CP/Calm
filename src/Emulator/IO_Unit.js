class IOUnit {
        constructor() {
          // Buffer with 50 slots, initially empty
          this.buffer = new Array(50).fill(null).map(() => ({ value: null, filled: false }));
      
          this.ioController = {
            status: "idle",
            transferInProgress: false,
          };
          this.delimiter = "#"; //
        }
        writeToBuffer(value) {
          this.buffer.fill(0); // Reset buffer
      
          if (typeof value === "number" || (!isNaN(value) && value.trim() !== "")) {
              // Store the numeric string as characters, then delimiter
              const strVal = value.toString();
              for (let i = 0; i < strVal.length && i < this.buffer.length - 1; i++) {
                  this.buffer[i] = strVal[i];
              }
              if (strVal.length < this.buffer.length) {
                  this.buffer[strVal.length] = '#';
              }
              console.log(`Stored numeric value: ${value} (Hex: ${Number(value).toString(16).toUpperCase()}) with delimiter in buffer`);
          } else {
              // It's a string input — store each char + delimiter
              for (let i = 0; i < value.length && i < this.buffer.length - 1; i++) {
                  this.buffer[i] = value[i];
              }
              if (value.length < this.buffer.length) {
                  this.buffer[value.length] = '#';
              }
              console.log(`Stored string value: "${value}" with delimiter in buffer`);
          }
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
        readFromBuffer(startIndex = 0) {
          let endIndex = this.buffer.indexOf('#', startIndex); // Look for delimiter
          if (endIndex === -1) endIndex = this.buffer.length; // If no delimiter, go till end
      
          // Extract chars from buffer and convert to string
          const extracted = this.buffer
              .slice(startIndex, endIndex)
              .map(char => typeof char === "string" ? char : String.fromCharCode(char))
              .join("")
              .trim();
      
          // Determine if it's a number or a string
          if (/^\d+$/.test(extracted)) {
              const num = parseInt(extracted, 10);
              console.log(`Buffer content interpreted as decimal: ${num}`);
              return num;
          } else {
              console.log(`Buffer content interpreted as string: "${extracted}"`);
              return extracted;
          }
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
