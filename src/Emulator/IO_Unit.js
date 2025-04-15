import { generalPurposeRegister } from "./Register.js";

class IOUnit {
    constructor() {
        // Buffer: 4 registers, each holding 2 bytes (total 8 bytes)
        this.buffer = new Array(4).fill(null).map(() => new generalPurposeRegister());

        // I/O Controller: Manages data transfer and communication
        this.ioController = {
            busy: false,  // Indicates if an I/O operation is in progress
            sequencerSignal: null,  // Signal from sequencer
            ioInterfaceSignal: null // Signal from I/O interface
        };
    }
    writeToBuffer(registerIndex, value) {
        if (registerIndex < 0 || registerIndex >= 4) {
            throw new Error("Invalid register index");
        }
        this.buffer[registerIndex].setvalue(value);
        this.ioController.busy = true;
    }

   
    readFromBuffer(registerIndex) {
        if (registerIndex < 0 || registerIndex >= 4) {
            throw new Error("Invalid register index");
        }
        return this.buffer[registerIndex].getvalue();
    }
    displayValue() {
        console.log("I/O Buffer Contents:");
        this.buffer.forEach((reg, index) => {
            console.log(`Register ${index}: ${reg.getvalue()}`);
        });
    }
}

export default IOUnit;
