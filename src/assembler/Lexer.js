import { Assembler } from './Assembler.js';
import { Errorcalm } from './Errorcalm.js';
import { SemanticAnalysis } from './SemanticAnalysis.js';

export class Lexer {
  static Errors = [];

  static isValidString(str) {
    // Check if the string contains any special characters
    if (/[^a-zA-Z0-9_]/.test(str)) {
      return false;
    } else {
      // Check if the string begins with a number
      if (/^\d/.test(str)) {
        return false;
      } else {
        // Check if the string is in the excluded list
        if (Assembler.excludedStrings.includes(str)) {
          return false;
        } else {
          // If none of the above conditions are met, the string is valid
          return true;
        }
      }
    }
  }

  constructor(code, line) {
    this.LexicalList = code.match(/([a-zA-Z0-9]+\d*(?:[a-zA-Z0-9]+)?)(:?)|\*|,|\+,,|\~|,|\|,|\!|,|\@|,|\#|,|\$|,|\-|,|\%|,|\^|,|\&|,|\*|,|\(|,|\)|,|\_|,|\=|,|\+|,|\[|,|\]|,|\{|,|\}|,|\;|,|\:|,|\'|,|\"|,|\,|,|\.|,|\<|,|\>|,|\?|,|\\|/g).filter(function (t) {
      return t.length > 0;
    }).flatMap((t, index) => {
      if (isNaN(t)) {
        switch (t) {
          case 'R1':
          case 'R2':
          case 'R3':
          case 'R4':
          case 'ACC':
          case 'BR':
          case 'IDR':
          case 'SR':
          case 'R1R':
          case 'R2R':
          case 'R3R':
          case 'ACCR':
          case 'R1L':
          case 'R2L':
          case 'R3L':
          case 'ACCL':
            return [{
              type: 'REGISTER',
              value: t
            }];
          case 'RET':
          case 'PUSHA':
          case 'POPA':
            return [{
              type: 'INST0',
              value: t
            }];
          case 'NEG':
          case 'NOT':
          case 'SHL':
          case 'SHR':
          case 'READ':
            
          case 'PUSH':
          case 'POP':
          case 'ROR':
          case 'ROL':
          case 'CALL':
          case 'BE':
          case 'BNE':
          case 'BS':
          case 'BI':
          case 'BIE':
          case 'BSE':
          case 'BRI':
            return [{
              type: 'INST1',
              value: t
            }];
          case 'NAND':
          case 'CMP':
          case 'MOV':
          case 'ADD':
          case 'SUB':
          case 'MUL':
              case 'WRITE':
          case 'DIV':
          case 'AND':
          case 'OR':
          case 'XOR':
          case 'NOR':
            return [{
              type: 'INST2',
              value: t
            }];
          case '*':
          case ',':
          case '+':
          case '-':
            return [{
              type: 'SPECIAL CHARACTER',
              value: t
            }];
          case 'LABEL':
            return [{
              type: 'LABEL'
            }];
            default:
              if (t.endsWith(':')) {
                let labelText = t.slice(0, -1).trim(); // Extract label text
            
                return [
                  { type: 'LABEL' },
                  { type: 'TEXT', value: labelText },
                  { type: 'NUMBER', value: line.toString() }
                ];
              } 
              else if (Lexer.isValidString(t)) {
                return [{ type: 'TEXT', value: t }];
              } else {
              Lexer.Errors.push(new Errorcalm("Invalid string", "LEXER", line));
              Errorcalm.set_LexicalError(new Errorcalm("Invalid string", "LEXER", line));
              return [];
            }
        }
      } else {
        return [{
          type: 'NUMBER',
          value: t
        }];
      }
    });

    // Flatten the array of arrays into a single array
    let lexlist = this.LexicalList.flat();
    lexlist.forEach((element, index, lexlist) => {
      if (element.type == 'NUMBER') {
        if (lexlist[index - 1].value == '-' && lexlist[index - 1].type == 'SPECIAL CHARACTER') {
          console.log('-' + element.value);
          lexlist.splice(index - 1, 1);
          if (parseInt('-' + element.value, 10) < -32768) {
            Lexer.Errors.push(new Errorcalm("Number out of range", "LEXER", line));
            Errorcalm.set_LexicalError(new Errorcalm("Number out of range", "LEXER", line));
          } else {
            lexlist[index - 1] = {
              type: 'NUMBER',
              value: `-${element.value}`
            };
          }
        }
      }
    });
    this.LexicalList = lexlist;
  }
}