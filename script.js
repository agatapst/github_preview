var loginElement = document.getElementById("login");
var btnSearch = document.getElementById("search");
var listOfRepos = document.getElementById("listOfRepos");
var newline = "\r\n";
var languageCount = {};
var listOfLanguages = document.getElementById("listOfLanguages");

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
}

btnSearch.addEventListener("click", function(){
    fetch("https://api.github.com/users/" + loginElement.value + "/repos")
    .then(function(response) {
      return response.json();
    })
    .then(function(repos) {
        reset();
        repos.forEach(function(repo) {
            addRepoToList(repo.name, repo.language, repo.description);
            countLanguages(repo.language);
        });
        let languagesNames = Object.keys(languageCount);
        languagesNames.forEach(function(language) {
            console.log(language + " - " + languageCount[language]);
            addLanguageToList(language, languageCount[language]); 
        });
    });
});
