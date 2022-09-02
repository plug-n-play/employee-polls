const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");

describe("_saveQuestion tests", () => {
  it("should return error for incorrect parameters", async () => {
    const response = await _saveQuestion({
      optionOneText: "option one test content",
      optionTwoText: "option two test content",
      author: null,
    }).catch(error => error);
    expect(response).toBe("Please provide optionOneText, optionTwoText, and author");
  });

  it("should return true for correct parameters", async () => {
    const response = await _saveQuestion({
      optionOneText: "option one test content",
      optionTwoText: "option two test content",
      author: "tylermcginnis",
    });

    expect(response).toBeTruthy();
  });
});

describe("_saveQuestionAnswer tests", () => {
  it("should return error for incorrect parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "tylermcginnis",
      qid: "loxhs1bqm25b708cmbf3g",
      answer: null
    }).catch(error => error);
    expect(response).toBe("Please provide authedUser, qid, and answer");
  })

  it("should return truthy response for correct parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "tylermcginnis",
      qid: "loxhs1bqm25b708cmbf3g",
      answer: "optionOne"
    });

    expect(response).toBeTruthy();
  });
});
