import Dimensions from "./dimensions";

class Assessment {
  constructor() {
    this.questions = this.createQuestions();
    this.currentQuestion = -1;
    this.result = {};
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createQuestions() {
    let questions = [];
    let shuffled = Dimensions.map(el => ({
      ...el,
      answers: this.shuffle(el.answers)
    }));
    for (var i = 0; i < shuffled.length; i++) {
      for (var j = i + 1; j < shuffled.length; j++) {
        for (var q = 0; q < 2; q++) {
          questions.push({
            title: "Pick the answer that describes you best:",
            answers: this.shuffle([
              { text: shuffled[i].answers.pop(), dimension: shuffled[i].name },
              { text: shuffled[j].answers.pop(), dimension: shuffled[j].name }
            ])
          });
        }
      }
    }
    return this.shuffle(questions);
  }

  getNextQuestion() {
    return this.questions[++this.currentQuestion];
  }

  saveAnswer(question, answerIndex) {
    if (this.result[question.answers[answerIndex].dimension]) {
      this.result[question.answers[answerIndex].dimension] += 1;
    } else {
      this.result[question.answers[answerIndex].dimension] = 1;
    }
  }
}

export default Assessment;
