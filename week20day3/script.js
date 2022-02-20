const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numberEl = document.getElementById('number')
const symbolsEl = document.getElementById('symbols')
const generate = document.getElementById('generate')
const clipboard = document.getElementById('clipboard')


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getrRandomNumber,
    symbol: getRandomSymbols
}


clipboard.addEventListener('click', () => {
    const textarea =document.createElement('textarea')
    const password = resultEl.innerHTML

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('password copied to clipboard')
})

generate.addEventListener('click', () => {
    const length = + lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper =  uppercaseEl.checked
    const hasNumber  = numberEl.checked
    const hasSymbols = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbols, length)
})

function generatePassword(lower, upper, number, symbol, lenght) {
    console.log(lower, upper)
    let generatePassword = ''
    const typesCount = lower + upper + number + symbol;
    const typeArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if(typesCount === 0) {
        return '';
    }

    for(let i=0; i<lenght; i+=typesCount) {
        typeArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatePassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatePassword.slice(0, lenght)

    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getrRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols() {
    const symbols = '!@#$%^&*()<>?|}{[],.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}