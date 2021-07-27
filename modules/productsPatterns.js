const 
    fs = require('fs'),
    path = require('path');

function getPatternFromLocation(pathName, pat){
    let files = fs.readdirSync(path.join(__dirname, '..', '/jsonPatterns/productPatterns'), 'utf-8'),
        isHere = false;
    for (let i = 0; i < files.length; i++) {
        if(files[i] == pat)isHere = true;
    }
    if(isHere){
        try {
            return JSON.parse(fs.readFileSync(pathName, "utf-8"))
        } catch (error) {
            console.error(error);
        }
    }
}
class Patterns {
    description = {};
    constructor(patName){
        this.patName = patName +  ".json";
        this.patterns = {
            defoldPattern:  getPatternFromLocation(path.join(__dirname, '..', '/jsonPatterns/productPatterns/', this.patName), this.patName),
            patternForCompare: getPatternFromLocation(path.join(__dirname, '..', '/jsonPatterns/compareProductsPatterns/', this.patName), this.patName)   
        };
    }

    join() { // Функция соеденения шаблна и данных из базы данных
        function doJoin(pattern, description, depth) { // Функция замыкания
            for (let key in pattern) { // Проход по свойствам обЪекта
                if (description[key] != undefined) {
                    if (key != "description" && key != "generalInformation" && depth == undefined) { // Заполнение основной информации   
                        pattern[key] = description[key];
                    } else if (typeof pattern[key] == 'object') {
                        if (pattern[key].data == null && typeof pattern[key].data == 'object') pattern[key].data = description[key];
                        doJoin(pattern[key], description[key], depth = 1); // Рекурсивный вызов по прохождения каждого значения в обЪекте
                    }
                }
            }
            return pattern;
        }
        return doJoin(this.patterns.defoldPattern, this.description);
    }
    compare(el, form) {
        for (let key in form) {
            if (el[key] != undefined) {
                let elValue = el[key];
                if (Array.isArray(form[key]) && form[key] != false) {
                    let isChecked = false,
                        isCheckedRange = false,
                        isCheckedNumber = false,
                        isNotObject = false;
                    for (let i = 0; i < form[key].length; i++) {
                        const element = form[key][i];
                        if (typeof element == 'object') {
                            if (element.min == null) element.min = 0;
                            if (element.max == null) element.max = Infinity;
                            if (elValue >= element.min && elValue <= element.max) isCheckedRange = true;
                        } else if (!isNaN(element)) {
                            if (element == elValue) isCheckedNumber = true;
                        } else if (isNaN(element)) {
                            isNotObject = true;
                            if (element.toLocaleLowerCase() == elValue.toLocaleLowerCase()) isChecked = true;
                        }
                    }
                    if (!isNotObject && isCheckedNumber == false && isCheckedRange == false) return false;
                    if (isNotObject && isChecked == false) return false;
                } else {
                    if (this.compare(el[key], form[key]) == false) return false;
                }
            }
        }
        return true;
    }
}


module.exports = Patterns;