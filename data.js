export function getResults({query, numOfResults, dataSource, mapResults}) {
    const Url = `${dataSource}?q=${query}&per_page=${numOfResults}`;
    return new Promise((resolve, reject) => {
        $.ajax({
            url: Url,
            type: "GET",
            async: false,
            success:  result => {
              resolve(mapResults(result));
            },
            error: function(error) {
              reject(error);
            }
          }) 
    })
    
}

