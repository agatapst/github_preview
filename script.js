const loginElement = document.getElementById("login");
const btnSearch = document.getElementById("search-button");
const listOfRepos = document.getElementById("list-of-repos");
const languagesChartCanvas = document.getElementById("my-chart");
const mainContent = document.getElementById("main-content");
const message = document.getElementById("message-alert");
const listOfLanguages = document.getElementById("list-of-languages");

let languageCount = {};
let languagesChart;

function addRepoToList(repo) {
    let li = document.createElement("li");
    let nameHeader = document.createElement("h3");
    let languageSpan = document.createElement("span");
    let descParagraph = document.createElement("p");
    nameHeader.innerHTML = repo.name;
    languageSpan.innerHTML = repo.language;
    descParagraph.innerHTML = repo.description;
    li.appendChild(nameHeader);
    li.appendChild(languageSpan);
    li.appendChild(descParagraph);
    listOfRepos.appendChild(li);
}

function countLanguages(language) {
    if(!languageCount[language]) {
        languageCount[language] = 0;
    }
    languageCount[language]++;
}

function addLanguageToList(languageName, languageCount) {
    let tr = document.createElement("tr");
    let languageTd = document.createElement("td");
    let countTd = document.createElement("td");
    languageTd.innerHTML = languageName;
    countTd.innerHTML = languageCount;
    tr.appendChild(languageTd);
    tr.appendChild(countTd);
    listOfLanguages.appendChild(tr);
}

function reset() {
    listOfRepos.innerHTML = "";
    listOfLanguages.innerHTML = "";
    languageCount = {};
    if(languagesChart) {
        languagesChart.destroy();
    }
    message.classList.add("is-hidden");
}

function createLanguagesChart() {
    let ctx = languagesChartCanvas.getContext("2d");
    languagesChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(languageCount),
            datasets: [{
                label: "# of projects with a given programming language",
                data: Object.values(languageCount),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(265, 159, 64, 0.5)",
                    "rgba(255, 159, 90, 0.5)",
                    "rgba(255, 11, 64, 0.5)",
                    "rgba(200, 130, 64, 0.5)",
                    "rgba(125, 159, 64, 0.5)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(265, 159, 90, 1)",
                    "rgba(255, 11, 64, 1)",
                    "rgba(200, 130, 64, 1)",
                    "rgba(125, 159, 64, 1)"
                ],
                borderWidth: 1
            }]
        }
    });
}

btnSearch.addEventListener("click", function() {
    fetch("https://api.github.com/users/" + loginElement.value + "/repos")
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .then(function(repos) {
        reset();
        mainContent.classList.remove("is-hidden");
        repos.forEach(function(repo) {
            addRepoToList(repo);
            countLanguages(repo.language);
        });
        let languagesNames = Object.keys(languageCount);
        languagesNames.forEach(function(language) {
            addLanguageToList(language, languageCount[language]);
        });
        createLanguagesChart()
    })
    .catch(function(error) {
        console.log("There has been a problem with your fetch operation: ", error.message);
        mainContent.classList.add("is-hidden");
        message.classList.remove("is-hidden")
    })
});
