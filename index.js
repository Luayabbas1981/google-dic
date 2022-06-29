const input = document.getElementById("input");
const inputDiv = document.querySelector(".input")
input.setAttribute("placeholder", "search a word ...");
const btn = document.getElementById("btn");
const output = document.getElementById("output");
const play = document.getElementById("play")
const options = document.querySelectorAll("#options div");
const definition = document.getElementById("definition");
const partOfSpeech = document.getElementById("part-of-speech");
const example = document.getElementById("example");

input.focus();

btn.onclick = (e) => {
  output.classList.remove("output");
  e.preventDefault();
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let value = input.value
      inputDiv.textContent= value
      input.value = "";
      output.innerHTML = "";
      options.forEach((e) => e.classList.remove("active"));
      definition.classList.add("active");
      output.classList.add("output");
      output.innerHTML = data[0].meanings[0].definitions[0].definition;

      partOfSpeech.onclick = (e) => {
        options.forEach((e) => {
          e.classList.remove("active");
        });
        e.target.classList.add("active");
        inputDiv.textContent= value
        output.innerHTML = "";
        output.innerHTML = data[0].meanings[0].partOfSpeech;
      };
      definition.onclick = (e) => {
        options.forEach((e) => {
          e.classList.remove("active");
        });
        e.target.classList.add("active");
        inputDiv.textContent= value
        output.innerHTML = "";
        output.innerHTML = data[0].meanings[0].definitions[0].definition;
      };
      example.onclick = (e) => {
        options.forEach((e) => {
          e.classList.remove("active");
        });
        e.target.classList.add("active");
        inputDiv.textContent= value
        output.innerHTML = "";
        output.innerHTML = data[0].meanings[0].definitions[0].example;
        if (!data[0].meanings[0].definitions[0].example) {
          output.innerHTML = "sorry,there is no example for this word.";
        }
      };
      play.onclick = (e) => {
        options.forEach((e) => {
          e.classList.remove("active");
        });
        e.target.classList.add("active");
        output.innerHTML = "";
        inputDiv.innerHTML= `<i class="fa-solid fa-volume-high"></i>`
        output.innerHTML = value ;
        function play() {
          const newAudio = new Audio(data[0].phonetics[0].audio);
          newAudio.play();
        }
        play()
      };
    })
   .catch(Error(error)); 
};


