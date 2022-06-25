const input = document.getElementById("input");
input.setAttribute("placeholder", "search word ...");
const btn = document.getElementById("btn");
const output = document.getElementById("output");
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
        output.innerHTML = "";
        output.innerHTML = data[0].meanings[0].partOfSpeech;
      };
      definition.onclick = (e) => {
        options.forEach((e) => {
          e.classList.remove("active");
        });
        e.target.classList.add("active");
        output.innerHTML = "";
        output.innerHTML = data[0].meanings[0].definitions[0].definition;
      };
      example.onclick = (e) => {
        options.forEach((e) => {
          e.classList.remove("active");
        });
        e.target.classList.add("active");
        output.innerHTML = "";
        output.innerHTML = data[0].meanings[0].definitions[0].example;
        if (!data[0].meanings[0].definitions[0].example) {
          output.innerHTML = "sorry,there is no example for this word.";
        }
      };
    })
    .catch(Error(error));
};

//definition= data[0].meanings[0].definitions[0].definition
