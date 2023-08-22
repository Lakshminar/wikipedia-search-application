let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");


function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //Div Container-result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);
    // Anchor Title - result -title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";

    resultItemEl.appendChild(resultTitleEl);

    //Title break
    let titleBreakEl = document.createElement("br");

    resultItemEl.appendChild(titleBreakEl);
    // Anchor URl -- result-url

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;

    resultItemEl.appendChild(urlEl);

    // line break El 
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);
    // Paragraph Description  -- line description

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;

    resultItemEl.appendChild(descriptionEl);

}


function displayResults(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }

}

function searchWikipedia(event) {

    if (event.key === "Enter") {

        searchResultsEl.textContent = "";
        spinner.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);