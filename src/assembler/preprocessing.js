/* eslint-disable import/no-anonymous-default-export */

class preprocessing{
    static keyWords = ['MACRO', 'ENDM', 'START', 'END']
    static DataKeyword = ['SDATA', 'ENDS']
    constructor(){
        this.MACROS = []
        this.macroKeyWord = new Set()
        this.labelSymbolList = []
        this.dataSegment = []
    }

    getDataSegment(code){
        const n = code.length
        for(let i = 0; i < n ; i++){

            if(code[i] === 'SDATA'){
                i += 1
                let endOfSeg = false
                while(!endOfSeg){
                    if(code[i] === 'ENDS'){
                        endOfSeg = true
                        continue
                    }
                    if(i === n){
                        //error segment not closed
                        return
                    }
                    this.dataSegment.push(code[i++])
                }
                break
            }
        }
        console.log('data: ', this.dataSegment)
    }
    // remove static from all methods below, cuz we are acting on objects
    static removeComments(code){  //removes comments from all code as well as empty lines
        console.log(typeof(code))
        code = code.toUpperCase().split('\n')
        
        const output = []
        const n = code.length

        for(let i = 0; i < n; i++){
            let temp = code[i].split('//')
            if(temp[0] === '' || temp[0].trim(' ','') === ''){
                continue
            }
            
            if(temp.length === 1){

                output.push(temp[0].trim())
                continue
            }

            output.push(temp[0].trim())
        }
        return output
    }
    // we suppose the code is given to use as 
    extractMacro(input /*it should be the whole code  */){
        // input is the whole code which we divided into an array of strings
        let curLine = 0
        let n = input.length
        while(curLine < n && input[curLine] !== 'START' ){
            let line = input[curLine].match(/([a-zA-Z_][a-zA-Z0-9_]*|[,:])/g)
            if(line[0] === 'MACRO'){
                let macroClosed = false
                this.macroKeyWord.add(line[1])
                let macroHolder = {keyWord: line[1], instruction: line.slice(1), body : []}
                curLine += 1
                // this whole thing must be foxed later
                while(!macroClosed){
                    if(!input[curLine]){
                        console.log("not closed, and main function not declared")
                        return
                    }
                    if(input[curLine] === 'START'){
                        console.log("code starts and macro not closed")
                        return
                    }
                    if(input[curLine] === 'ENDM'){
                        macroClosed = true
                        continue
                    }
                    line = input[curLine++].match(/([a-zA-Z_][a-zA-Z0-9_]*|[,:])/g)
                    macroHolder.body.push(line)
                }
                this.MACROS.push(macroHolder)
            }

            curLine += 1 // move to next line
        }
        this.MACROS.forEach(macro => console.log(macro))
    }
    // this method should remove extra text from top as well as macros and start / end keywords?
    replaceMacro(input /*it should be also the whole code */){
        let output = [] // new code will be returned here
        let curLine = 0
        let endOfCode = false
        while(input[curLine] !== 'START'){
            curLine += 1
            if(!input[curLine]){
                // throw error
                return
            }
        }
        curLine += 1
        while(!endOfCode){
            if(!input[curLine]){
                // throw error and quit
                return {error: "this thing doesn't work"}
            }
            if(input[curLine] === 'END'){
                endOfCode = true
                continue
            }
           let line = input[curLine++].match(/([a-zA-Z_][a-zA-Z0-9_]*:?|,)/g)
           
            if(line[0][line[0].length - 1] === ':'){
                if(this.macroKeyWord.has(line[1])){
                    // expand macro
                    // replaceMacro(line,output) // pushes directly in the output code
                    output.push( ...this.expandMacro(line,line[1],true))
                    //output.push('this is a macro')
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
            return ["error here"]
        }
            //there is no label, direct matching
            for(let i = newLine.length - 1; i >= 1; i--){
                
                body = body.map(inst => inst.replace(expandedMacroTemplate.instruction[i], newLine[i]))
        
            }
        return body
    }
    // no errors are handled here
    // no spaces allowed between labelName and :
    detectLabels(code /* */){
        let n = code.length
        for(let i = 0; i < n; i++){
            let line = code[i].match(/([a-zA-Z_][a-zA-Z0-9_]*:?|,)/g)
            if(line[0][line[0].length - 1] === ":"){
                if(line[0].length === 1){
                    // throw error
                    console.log("error, empty label")
                    return
                }
                this.labelSymbolList.push({label: line[0].slice(0,-1), line: i + 1})
            }
        }
        console.log(this.labelSymbolList)
    }

    removeAndReplaceLabels(code){
        // replace labels with their line numbers I guess
        let n = code.length
        let output = []
        for(let i = 0; i < n; i++){
            //check in each line if there is a use of the label, if definition, we remove it, if use, replace with line number
        }
    }

}


export default { preprocessing }