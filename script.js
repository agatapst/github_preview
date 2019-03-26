var loginElement = document.getElementById("login");
var btnSearch = document.getElementById("search");
var listOfRepos = document.getElementById("listOfRepos");
var languagesChartCanvas = document.getElementById('myChart');
var mainContent = document.getElementById('mainContent')
var newline = "\r\n";
var languageCount = {};
var listOfLanguages = document.getElementById("listOfLanguages");
var languagesChart;

function addRepoToList(repoName, repoLanguage, repoDesc) {
    var li = document.createElement("li");
    var nameHeader = document.createElement("h3");
    var languageSpan = document.createElement("span");
    var descParagraph = document.createElement("p");
    nameHeader.innerHTML = repoName;
    languageSpan.innerHTML = repoLanguage;
    descParagraph.innerHTML = repoDesc;
    li.appendChild(nameHeader);
    li.appendChild(languageSpan);
    li.appendChild(descParagraph);
    listOfRepos.appendChild(li);
}

function countLanguages(language) {
    if(languageCount[language] === undefined) {
        languageCount[language] = 0;
    }
    languageCount[language]++;
}

function addLanguageToList(languageName, languageCount) {
    var tr = document.createElement("tr");
    var languageTd = document.createElement("td");
    var countTd = document.createElement("td");
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
}

function createLanguagesChart() {
    var ctx = languagesChartCanvas.getContext('2d');
    languagesChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(languageCount),
            datasets: [{
                label: '# of projects with a given programming language',
                data: Object.values(languageCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(265, 159, 64, 0.5)',
                    'rgba(255, 159, 90, 0.5)',
                    'rgba(255, 11, 64, 0.5)',
                    'rgba(200, 130, 64, 0.5)',
                    'rgba(125, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(265, 159, 90, 1)',
                    'rgba(255, 11, 64, 1)',
                    'rgba(200, 130, 64, 1)',
                    'rgba(125, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
}

btnSearch.addEventListener("click", function(){
    fetch("https://api.github.com/users/" + loginElement.value + "/repos")
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(function(repos) {
        reset();
        mainContent.classList.remove('is-hidden');
        repos.forEach(function(repo) {
            addRepoToList(repo.name, repo.language, repo.description);
            countLanguages(repo.language);
        });
        let languagesNames = Object.keys(languageCount);
        languagesNames.forEach(function(language) {
            console.log(language + " - " + languageCount[language]);
            addLanguageToList(language, languageCount[language]);
        });
        createLanguagesChart()
    })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
        alert("Username not valid. :( Try another one. ")
    })
});

