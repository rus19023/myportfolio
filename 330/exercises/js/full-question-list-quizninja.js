const quiz = JSON.stringify([
  { name: "Superman", realName: "Clark Kent" },
  { name: "Wonder Woman", realName: "Diana Prince" },
  { name: "Batman", realName: "Bruce Wayne" },
  { name: "Flash", realName: "Barry Allen" },
  { name: "Cyborg", realName: "Victor Stone" },
  { name: "IronMan", realName: "Tony Stark" },
  { name: "Catwoman", realName: "Selena Kyle" },
  { name: "Riddler", realName: "Edward Nygma" },
  { name: "SpiderMan", realName: "Peter Parker" },
  { name: "Green Goblin", realName: "Norman Osborne" },
  { name: "Penquin", realName: "Oswald Cobblepot" },
  { name: "Scarecrow", realName: "Dr Jonathan Crane" },
  { name: "Dr Manhattan", realName: "Jonathan Osterman" },
  { name: "Rorschach", realName: "Walter Kovacs" },
  { name: "Gambit", realName: "Remy LeBeau" },
  { name: "Wolverine", realName: "James Logan" },
  { name: "Mystique", realName: "Raven Darkholme" },
  { name: "Magneto", realName: "Max Eisenhardt" },
  { name: "Professor X", realName: "Charles Xavier" },
  { name: "Phoenix", realName: "Jean Gray" },
  { name: "NightCrawler", realName: "Kurt Wagner" },
  { name: "Beast", realName: "Hank McCoy" },
  { name: "Storm", realName: "Ororo Munroe" },
  { name: "Rogue", realName: "Anna Marie DAncanto" },
  { name: "The Hulk",realName: "Bruce Banner" },
  { name: "Spider-man",realName: "Peter Parker" },
  { name: "Cyclops",realName: "Scott Summers" }
]);

console.log(quiz);

// View Object
const view = {
  score: document.querySelector("#score strong"),
  question: document.getElementById("question"),
  result: document.getElementById("result"),
  info: document.getElementById("info"),
  start: document.getElementById("start"),
  response: document.querySelector("#response"),
  show(element) {
    element.style.display = "block";
  },

  hide(element) {
    element.style.display = "none";
  },

  render(target, content, attributes) {
    for (const key in attributes) {
      target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content;
  },

  setup() {
    this.show(this.question);
    this.show(this.response);
    this.show(this.result);
    this.hide(this.start);
    this.render(this.score, game.score);
    this.render(this.result, "");
    this.render(this.info, "");
    this.resetForm();
  },

  resetForm() {
    this.response.answer.value = "";
    this.response.answer.focus();
  },

  teardown() {
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  },
};

const game = {
  start(quiz) {
    this.score = 0;
    this.questions = [...quiz];
    view.setup();
    this.ask();

    // main game loop
    for (const question of this.questions) {
      this.question = question;
      this.ask();
    }
    // end of main game loop
    this.gameOver();
  },

  ask(name) {
    if (this.questions.length > 0) {
      this.question = this.questions.pop();
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question, question);
    } else {
      this.gameOver();
    }
  },

  check(event) {
    event.preventDefault();
    const response = view.response.answer.value;
    const answer = this.question.realName;
    if (response === answer) {
      view.render(view.result, "Correct!", { class: "correct" });
      this.score++;
      view.render(view.score, this.score);
    } else {
      view.render(view.result, `Wrong! The correct answer was ${answer}`, {
        class: "wrong",
      });
    }
    view.resetForm();
    this.ask();
  },
  gameOver() {
    view.render(
      view.info,
      `Game Over! You scored ${this.score} point${this.score !== 1 ? "s" : ""}`
    );
    view.show(view.start);
    view.teardown();
  },
};
game.start(quiz);
view.start.addEventListener("click", () => game.start(quiz), false);
view.response.addEventListener("submit", (event) => game.check(event), false);
view.hide(view.response);
