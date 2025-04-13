class IOUnit {
    constructor() {
        this.buffer = new Array(50).fill(0); // Buffer with 50 slots, initialized to 0
        this.ioController = {
            status: "idle",
            transferInProgress: false,
        };
        this.delimiter = "#"; // Chosen delimiter
    }

    // Method to write data to the buffer (adds a delimiter at the end)
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
    
    // Method to read data from the buffer (returns formatted string or decimal)
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

    // Method to display buffer contents
    displayBuffer() {
        console.log("Buffer Content:", this.buffer.map((char, index) => `[${index}]: ${char}`).join(" | "));
    }
}

export default IOUnit;
