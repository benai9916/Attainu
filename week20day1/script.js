let url = "https://opentdb.com/api.php?amount=10&type=multiple"
let category;
let globalIndex = 0
let recorderAns= []
let question = []

const getQuestion = async () => {
    const data = await fetch(url)
    .then((res) => {
        return res.json()
    })

    return await data
}


const displayQuiz = async (index) => {
    let data;
    let ans;

    if (question.length === 0) {
        data = await getQuestion();

        data.results.map((itm) => {
            ans = itm.incorrect_answers
            ans.splice(Math.floor(Math.round() * 4), 0, itm.correct_answer)
            question.push({
                question: itm.question,
                answers: ans,
                correct_answer: itm.correct_answer
            })
        })
    }

    
    if(globalIndex === 0) {
        document.querySelector(".prev").style.display = "none"
        document.querySelector(".next").style.display = "inline"
        document.querySelector(".restart").style.display = "none"
    } else {
        document.querySelector(".prev").style.display = "inline"
    }

    if(globalIndex === 9) {
        document.querySelector(".prev").style.display = "none"
        document.querySelector(".next").style.display = "none"
        document.querySelector(".restart").style.display = "inline"
    }

    document.querySelector(".question_no").innerHTML = "Question " + (index + 1) + ':'
    document.querySelector(".question").innerHTML = question[index].question

    document.querySelector(".q1").value = question[index].answers[0]
    document.querySelector(".q1_lable").innerHTML = question[index].answers[0]

    document.querySelector(".q2").value = question[index].answers[1]
    document.querySelector(".q2_lable").innerHTML = question[index].answers[1]

    document.querySelector(".q3").value = question[index].answers[2]
    document.querySelector(".q3_lable").innerHTML = question[index].answers[2]

    document.querySelector(".q4").value = question[index].answers[3]
    document.querySelector(".q4_lable").innerHTML = question[index].answers[3]
}

const handleCheckedAns = () => {
    if (recorderAns[globalIndex] === undefined) {
        for(let i=0; i< document.mainForm.quiz.length; i++) {
            if(document.mainForm.quiz[i].checked === true) {
                document.mainForm.quiz[i].checked = false
            }
        }
    } else {
        for(let i=0; i< document.mainForm.quiz.length; i++) {
            if(document.mainForm.quiz[i].value === recorderAns[globalIndex]) {
                document.mainForm.quiz[i].checked = true
            }
        }
    }
}

const prev = () => {
    if(globalIndex != 0) {
        globalIndex -= 1
    }

    displayQuiz(globalIndex)
    handleCheckedAns()
}

const next = () => {
    if(globalIndex >= 0 && globalIndex < 9) {
        globalIndex += 1
    }

    displayQuiz(globalIndex)
    handleCheckedAns()
}

document.mainForm.onclick = () => {
    let answer = document.mainForm.quiz.value;
    if(answer !== "") {
        recorderAns.splice(globalIndex, 1, answer)
    }

    if(globalIndex === 9) {
        checkGivenAnswer()
    }
}

const restart = () => {
    globalIndex = 0
    recorderAns = []

    document.mainForm.style.display = "block"
    document.querySelector(".question").style.display = "block"

    displayQuiz(0)
}

const checkGivenAnswer = () => {
    let count = 0
    for(let i =0; i< 10; i++) {
        if(question[i].correct_answer === recorderAns[i]) {
            count += 1
        }
    }

    document.mainForm.style.display = "none"
    document.querySelector(".question").style.display = "none"
    document.querySelector(".question_no").innerHTML = `You got ${count} out of 10 question right !!`
}

displayQuiz(0)
