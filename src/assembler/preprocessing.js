/* eslint-disable no-loop-func */
import { FuncInterface } from './Assembler.js'
import {Errorcalm} from './Errorcalm.js'
export class preprocessing{
    //this should include all reserved words, or if there is a global object serving the same purpose
    static reservedWords = new Set(['R1', 'R2', 'R3', 'R4', 'ACC', 'BR', 'IDR', 'SR', 'R1R', 'R2R', 'R3R', 'ACCR', 'R1L', 'R2L', 'R3L', 'ACCL'
                                        , 'PUSHA', 'POPA', 'RET', 'NEG', 'NOT', 'SHL', 'SHR', 'READ', 'WRITE', 'PUSH', 'POP', 'ROR', 'ROL', 'CALL', 'BE', 'BNE', 'BS', 'BI', 'BIE', 'BSE', 'BRI'
                                        , 'NAND', 'CMP', 'MOV', 'ADD', 'SUB', 'MUL', 'DIV', 'AND', 'OR', 'XOR', 'NOR', 'MACRO', 'ENDM', 'START', 'END','SDATA', 'ENDS'])
    static macroKeyWords = ['MACRO', 'ENDM']
    static DataKeyword = ['SDATA', 'ENDS']

    constructor(){
        this.MACROS = []
        this.macroKeyWord = new Set()
        this.labelSymbolList = []
        this.dataSegment = []
        this.errors = []
        this.varList = []
        this.data = []
    }

    getDataSegment(code){
        const n = code.length
        let i = 0
        while( i < n && code[i].toUpperCase() !== 'START'){
            if(code[i].toUpperCase() === 'SDATA'){
                i += 1
                let endOfSeg = false
                while(!endOfSeg){
                    
                    if(i === n){
                        console.log("no end of data segment")
                        //error segment not closed
                        this.errors.push(new Errorcalm("Data segment not closed", "PREPROCESSING", i))
                        return
                    }
                    if(code[i].toUpperCase() === 'ENDS'){
                        endOfSeg = true
                        continue
                    }

                    this.dataSegment.push(code[i++])
                }
                break
            }
            i += 1
        }
    }

    // allocate space in memory, to get addresses of variables
    allocateData(){
        if(this.dataSegment.length === 0){
            // no data segment, no need to allocate
            console.log("no data")
            return
        }
        // here, we first should decide whether we compact the memory or not, so we either work from 0 or from the end of stack segment at @ = 256
        let curAddress = 0
        let n = this.dataSegment.length
        for(let i = 0; i < n; i++){
            let line = this.dataSegment[i].split(' ')
            // we want to get an array in this form [label, length, value(s)]
            //                               for example [X, db, 15]
            if(line.length < 3){
                // throw error, wrong variable declaration
                this.errors.push(new Errorcalm("Wrong variable declaration", "PREPROCESSING", i))
                return
            }
            if(this.varList.includes(line[0].toUpperCase())){
                // throw error, variable already declared
                this.errors.push(new Errorcalm("Variable already declared", "PREPROCESSING", i))
                return
            }
            if(!isNaN(Number(line[0][0]))){
                // throw error, variable name cannot start with a number
                this.errors.push(new Errorcalm("Variable name cannot start with a number", "PREPROCESSING", i))
                return
            }

            let varHolder = {}
            // assign the name of the var to the corresponding object
            varHolder.label = false
            varHolder.linedeclared = i
            varHolder.name = line[0].toUpperCase()
            varHolder.address ??= curAddress
            this.varList.push(varHolder)
            if(!(['DB', 'DW']).includes(line[1].toUpperCase())){
                // throw error, wrong variable length declaration
                this.errors.push(new Errorcalm("Wrong variable type", "PREPROCESSING", i))
                return
            }
            let length = line[1].toUpperCase() === 'DB' ? 0 : 1 // data on one byte or on two bytes if line[0] === 'DW'
            varHolder.length = length
            let value = line.filter((_,index) => index >= 2).join(" ").match(/"[^"]*"|[^,]+/g)

            console.log(value)
            // parsing value(s) of the variable
            // we should include the number of bytes to calculate the current address

            //console.log(value)
            value = value.map((val,index) => {
                curAddress += length === 1 ? 2 : 1
                // we should check if we have numbers or strings
                if(!isNaN(Number(val)) && val.trim() !== ''){

                    // verify size of number compared to length of space allocated for it
                    //but before, make sure it falls within range 8 / 16 bits I'll verify that later
                    val = Number(val)
                    if(length === 1){
                        if(val <= Math.abs(Math.pow(2,16))){
                            // use 2s complement instead of this expression
                            console.log(val)
                            val = FuncInterface.decimalTobinByte(val,16)
                            
                            return [String(val).substring(0,Math.floor(val.length / 2)), String(val).substring(Math.floor(val.length / 2))]
                        } else {
                            this.errors.push(new Errorcalm("value out of bounds", "PREPROCESSING", index))
                            return null
                        }
                    } else {
                        if(val <= Math.abs(Math.pow(2,8))){
                            // use 2s complement instead of this expression
                            return FuncInterface.decimalTobinByte(val,8)
                        } else {
                            this.errors.push(new Errorcalm("value out of bounds", "PREPROCESSING", index))
                            return null
                        }  
                    }
                } else{
                    if (val[0] !== '"' || val[val.length - 1] !== '"') {
                        // throw error, string not closed
                        this.errors.push(new Errorcalm("String must be unclosed within in a pair of \"\"", "PREPROCESSING", index))
                        return null;
                        
                    }
                    // we have a string I guess, we convert to ascii and we pad when we write binary string in the memory
                    if(length === 0){
                       return val.split('').filter(char => char !== '"').map(char => char.charCodeAt(0).toString(2).padStart(8,'0'))
                    } 
                    //ascii characters are positive integers between 0 and 255
                    
                    return val.split('').filter(char => char !== '"').map(char => ['00000000', char.charCodeAt(0).toString(2).padStart(8,'0')]).flat()
                }
            }).flat() // flatten to get a 1 dimensional array just in case if we have a string in the object
            //we have to work on this
            this.data.push(...value)
         }
        console.log(this.data)
        
    }
    // we suppose the code is given to use as 
    extractMacro(input /*it should be the whole code  */){
        // input is the whole code which we divided into an array of strings
        let curLine = 0
        let n = input.length
        // we allow macro declaration only before code starts
        while(curLine < n && input[curLine] !== 'START' ){
            // tokenize each line to get components of each line {instructions, labels, operands...}
            let line = input[curLine].match(/([a-zA-Z_][a-zA-Z0-9_]*|[,:])/g)
            if(line[0] === 'ENDM'){
                // throw error, macro not declared
                this.errors.push(new Errorcalm("Macro not declared", "PREPROCESSING", curLine))
                return
            }
            if(line[0] === 'MACRO'){
                let macroClosed = false
                if(line.length < 2){
                    // throw error, no macro name provided
                    this.errors.push(new Errorcalm("No macro name provided", "PREPROCESSING", curLine))
                    return
                }

                if(preprocessing.reservedWords.has(line[1])){
                    // a macro instruction cannot be a reserved word
                    this.errors.push(new Errorcalm("Macro instruction cannot be a reserved word (register or instruction)", "PREPROCESSING", curLine))
                    return
                }

                if([',',':','/','\\','.'].includes(line[1])){
                    // macro name cannot be a special character
                    this.errors.push(new Errorcalm("Macro name cannot be a special character", "PREPROCESSING", curLine))
                    return
                }

                if(!isNaN(Number(line[1][0]))){
                    // macro name cannot start with a number or be a number
                    this.errors.push(new Errorcalm("Macro name cannot start with a number or be a number", "PREPROCESSING", curLine))
                    return
                }

                if(this.macroKeyWord.has(line[1])){
                    // macro already declared
                    this.errors.push(new Errorcalm("Macro already declared", "PREPROCESSING", curLine))
                    return
                }

                this.macroKeyWord.add(line[1])
                let macroHolder = {keyWord: line[1], instruction: line.slice(1), body : []}
                curLine += 1
                // now we extract the body of the macro and store it in the macroHolder, we also handle possible errors

                while(!macroClosed){
                    if(!input[curLine]){
                        // console.log("not closed, and main function not declared") 
                        // end of code without any end of macro or beginning of code
                        this.errors.push(new Errorcalm("Macro not closed", "PREPROCESSING", curLine))
                        return
                    }

                    if(input[curLine] === 'START'){
                        // code starts and macro not closed
                        this.errors.push(new Errorcalm("Macro not closed", "PREPROCESSING", curLine))
                        return
                    }

                    if(input[curLine] === 'ENDM'){
                        // if we reach the end skip this iteration,loop will be quit also in the next condition checking
                        macroClosed = true
                        continue
                    }

                    // making sure no sort of label is declared inside a macro
                    line = input[curLine++].match(/[a-zA-Z_][a-zA-Z0-9_*]*|[,:+-]|\d+/g)
                    if(line[0] === 'MACRO'){
                        // throw error, no macros allowed inside a macro
                        this.errors.push(new Errorcalm("No macros allowed inside a macro", "PREPROCESSING", curLine))
                        return
                    }

                    if(line[0][line[0].length - 1] === ':'){
                        // throw error, no labels allowed inside a macro
                        this.errors.push(new Errorcalm("No labels allowed inside a macro", "PREPROCESSING", curLine))
                        return
                    }
                    macroHolder.body.push(line)
                }
                this.MACROS.push(macroHolder)
            }

            curLine += 1 // move to next line
        }
        //this.MACROS.forEach(macro => console.log("that's a macro: ",macro))
    }


    // this method should remove extra text from top as well as macros and start / end keywords?
    // this comment shouldn't be here


    replaceMacro(input /*it should be also the whole code */){
        let output = [] // new code will be returned here
        let curLine = 0
        let endOfCode = false
        while(input[curLine] !== 'START'){
            curLine += 1
            if(!input[curLine]){
                // throw error
                this.errors.push(new Errorcalm("no START keyword detected", "PREPROCESSING", curLine))
                return
            }
        }
        curLine += 1
        while(!endOfCode){
            if(!input[curLine]){
                // throw error and quit
                this.errors.push(new Errorcalm("no END keyword detected", "PREPROCESSING", curLine))
                //console.log("does'nt work")
                return {error: "this thing doesn't work"}
            }
            if(input[curLine] === 'END'){
                endOfCode = true
                continue
            }
           let line = input[curLine++].match(/[a-zA-Z_][a-zA-Z0-9_*]*|[,:+-]|\d+/g)
           
            if(line[0][line[0].length - 1] === ':'){
                if(this.macroKeyWord.has(line[1])){
                    // expand macro
                    // replaceMacro(line,output) // pushes directly in the output code
                    output.push( ...this.expandMacro(line,line[1],true))
                    //output.push('this is a macro')
                } else {
                    output.push(input[curLine - 1])
                }
            } else if(this.macroKeyWord.has(line[0])){
                // replace again
                output.push( ...this.expandMacro(line,line[0]))
                //output.push('this is a macro')
            } else {
                output.push(input[curLine - 1])
            }
        }
        return output
    }


    expandMacro(line,keyWord,label = false){

        const [ expandedMacroTemplate ]= this.MACROS.filter(macro => macro.keyWord === keyWord)
        let   body  = expandedMacroTemplate.body.map(line => line.join(' '))
        let newLine = line
        // now we check the line, and replace args where needed
        if(label){
            // handle when there is a label
            // this will work the opposite way
            body[0] = line[0] + ' ' + body[0]
            newLine = line.filter(word => word[word.length - 1] !== ':')
        }
        if(newLine.length !== expandedMacroTemplate.instruction.length){
            //throw error, different number of args
            this.errors.push(new Errorcalm(`Different number of arguments for macro ${newLine[0][newLine.length - 1] === ':' ? newLine[1]: newLine[0]}`, "PREPROCESSING", newLine))
            return ["error here"]
        }
            //there is no label, direct matching
            for(let i = newLine.length - 1; i >= 1; i--){
                
                const wordToReplace = expandedMacroTemplate.instruction[i];
                const regex = new RegExp(`\\b${wordToReplace}\\*?\\b`, "g");
            
                body = body.map(inst => inst.replace(regex, newLine[i]));
        
            }
        return body
    }
    // no errors are handled here
    // no spaces allowed between labelName and :
    
    // detectLabels(code){
    //     console.log(code)
    //     let n = code.length
    //     for(let i = 0; i < n; i++){
    //         let line = code[i].match(/([a-zA-Z_][a-zA-Z0-9_]*:?|\d+|,)/g)
    //         if(line[0][line[0].length - 1] === ":"){
    //             if(line[0].length === 1){
    //                 // throw error
    //                 console.log("error, empty label")
    //                 return
    //             }

    //             if(preprocessing.reservedWords.has(line[0].slice(0,-1)) || this.macroKeyWord.has(line[0].slice(0,-1))){
    //                 // reserved word cannot be a label
    //                 this.errors.push(new Errorcalm("Reserved word cannot be a label", "PREPROCESSING", i))
    //                 console.log("reserved")
    //                 return
    //             }
    //             //label does not start with a number
    //             if(!isNaN(Number(line[0][0]))){
    //                 // label cannot start with a number
    //                 this.errors.push(new Errorcalm("Label cannot start with a number", "PREPROCESSING", i))
    //                 console.log("number")
    //                 return
    //             }

    //             this.labelSymbolList.push({label: line[0].slice(0,-1), line: i + 1})
    //         }
    //     }
    //     console.log(this.labelSymbolList)
    // }

    // removeAndReplaceLabels(code){
    //     // replace labels with their line numbers I guess
    //     let n = code.length
    //     let output = []
    //     for(let i = 0; i < n; i++){
    //         //check in each line if there is a use of the label, if definition, we remove it, if use, replace with line number
    //         let line = code[i].match(/([a-zA-Z_][a-zA-Z0-9_]*:?|\d+|,)/g)
    //         console.log(line)
    //         if(line[0][line[0].length - 1] === ":"){

    //             output.push(line.filter(word => word[word.length - 1] !== ':').join(' '))
    //         }
    //         else{
    //             output.push(line.join(' '))
    //         }
    //     }
    //     return output
    // }
    static preprocessor(code){
        const preprocessor = new preprocessing();
        let str = code
        try{
            
            preprocessor.getDataSegment(str)
            console.log(preprocessor.errors.length)
            console.log(preprocessor.errors)
            if(preprocessor.errors.length > 0){
                return {code: [], labels: [], data: [], varList: [], error: `Error: ${preprocessor.errors[0].message}\n${preprocessor.errors[0].type}`}
            }
            str = str.map(line => line.toUpperCase())
            preprocessor.allocateData()
            if(preprocessor.errors.length > 0){
                return {code: [], labels: [], data: [], varList: [], error: `Error: ${preprocessor.errors[preprocessor.errors.length - 1].message}\n${preprocessor.errors[preprocessor.errors.length - 1].type} in line ${preprocessor.errors[preprocessor.errors.length - 1].linenum} in data segment`}
            }
            preprocessor.extractMacro(str)
            
            if(preprocessor.errors.length > 0){
                return {code: [], labels: [], data: [], varList: [], error: `Error: ${preprocessor.errors[preprocessor.errors.length - 1].message}\n${preprocessor.errors[preprocessor.errors.length - 1].type} in line ${preprocessor.errors[preprocessor.errors.length - 1].linenum} in macro declaration`}
            }
            str = preprocessor.replaceMacro(str)
            if(preprocessor.errors.length > 0){
                return {code: [], labels: [], data: [], varList: [], error: `Error: ${preprocessor.errors[preprocessor.errors.length - 1].message}\n${preprocessor.errors[preprocessor.errors.length - 1].type} in line ${preprocessor.errors[preprocessor.errors.length - 1].linenum} in code segment`}
            }
            return {code: str || [], labels: preprocessor.labelSymbolList, data: preprocessor.data, varList: preprocessor.varList, error: ''}

        }catch(err){
            return {code: [], labels: [], data: [], varList: [], error: `Something went wrong, inner issue!`}
        }





            console.log("code 2 here:"+str)
            if(preprocessor.errors.length > 0){
                Errorcalm.printError(preprocessor.errors)
                // force exit
                return
            }
        // preprocessor.detectLabels(str)
        
        // console.log("code 2 here:"+str)
        // if(preprocessor.errors.length > 0){
        //     Errorcalm.printError(preprocessor.errors)
        //     // force exit
        //     return
        // }
        // str = preprocessor.removeAndReplaceLabels(str)

        console.log("code 4 here:"+str)



    }

}