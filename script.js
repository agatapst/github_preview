var loginElement = document.getElementById("login");
var btnSearch = document.getElementById("search");
var listOfRepos = document.getElementById("listOfRepos");
var newline = "\r\n";
var languageCount = {}

function addRepoToList(repoName, repoLanguage, repoDesc) {
    var li = document.createElement("li");
    var name = document.createElement("h3");
    var language = document.createElement("span");
    var desc = document.createElement("p");
    name.innerHTML = repoName;
    language.innerHTML = repoLanguage;
    desc.innerHTML = repoDesc;
    li.appendChild(name);
    li.appendChild(language);
    li.appendChild(desc);
    listOfRepos.appendChild(li);
}

function countLanguages(language) {
    if(languageCount[language] === undefined) {
        languageCount[language] = 0;
    }
    languageCount[language]++;
}

btnSearch.addEventListener("click", function(){
    fetch("https://api.github.com/users/" + loginElement.value + "/repos")
    .then(function(response) {
      return response.json();
    })
    .then(function(repos) {
        listOfRepos.innerHTML = "";
        languageCount = {};
        repos.forEach(function(repo) {
            addRepoToList(repo.name, repo.language, repo.description);
            countLanguages(repo.language);
        });
        console.log(languageCount);
    });
});
