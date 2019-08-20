import Assessment from "../src/assessment";

// Feel free to rewrite this test suite. This is provided as guidance.
describe("The Assessment", () => {
  let a;
  beforeEach(() => (a = new Assessment()));
  it("should have 30 questions", () => {
    expect(a.questions).toHaveLength(30);
  });
  it("should not show the same answer twice", () => {
    let answers = a.questions.reduce((acc, cv) => acc.concat(cv.answers), []);
    let answerSet = new Set(answers);
    expect(answerSet.size).toBe(60);
  });

  it("should match each dimension to the other dimensions exactly 2 times", () => {
    let answerPairs = a.questions
      .map(q => q.answers.map(a => a.dimension).sort())
      .sort();
    console.log(answerPairs);
  });

  it("should provide ipsative questions (two possible answers)", () => {
    a.questions.forEach(q => expect(q.answers).toHaveLength(2));
    expect(a.questions.filter(el => el.answers.length !== 2)).toHaveLength(0);
  });
  describe("when completed", () => {
    let a;
    beforeEach(() => {
      a = new Assessment();
      let q = a.getNextQuestion();
      while (q) {
        a.saveAnswer(q, 0); // Choose the first answer in the answers array
        q = a.getNextQuestion();
      }
    });
    it("should provide the results as an object", () => {
      expect(a.result).toBeInstanceOf(Object);
    });
    it("should represent the results based on 6 dimensions", () => {
      const expected = [
        "Collaborative",
        "Integrity",
        "Result",
        "Detail",
        "Adaptive",
        "Customer"
      ];
      expect(Object.keys(a.result)).toEqual(expect.arrayContaining(expected));
    });
  });
});
