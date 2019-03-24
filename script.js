var loginElement = document.getElementById("login");
var btnSearch = document.getElementById("search");
var listOfRepos = document.getElementById("listOfRepos");
var newline = "\r\n";
var languageCount = {"JavaScript": 0, "HTML": 0}

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

btnSearch.addEventListener("click", function(){
    fetch("https://api.github.com/users/" + loginElement.value + "/repos")
    .then(function(response) {
      return response.json();
    })
    .then(function(repos) {
        listOfRepos.innerHTML = "";
        repos.forEach(function(repo) {
            addRepoToList(repo.name, repo.language, repo.description);
        });
        repos.forEach(function(repo) {
            languageCount[repo.language]++;
        });
        console.log(languageCount);
    });
}); 
