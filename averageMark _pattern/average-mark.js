const caluculateMark = (name, mark) => {
    if(mark <= 60) {
        return `${name} Grade is F`;
    }
    else if(mark <= 70) {
        return `${name} Grade is D`;
    }
    else if(mark <= 80) {
        return `${name} Grade is C`;
    }
    else if(mark <= 90) {
        return `${name} Grade is B`;
    }
    else {
        return `${name} Grade is A`;
    }
}


console.log(caluculateMark('Tom', 89))