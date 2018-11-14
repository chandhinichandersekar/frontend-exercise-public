# Solution Docs
## Enhancements Made
- The component is enhanced to take in any HTTP endpoint as a datasource and retrieve search results from the respective endpoint.
- This is achieved by changing just the endpoint and the mapping function inside index.js.
- The component is completely reusable, so mutiple instances of the components can be present.
-  The "States" example that uses a data array also continues to function as expected.
- The Autocomplete component is also used to hit "GitHub users API" to fetch the user names and IDs, to reeplicate the example provided.
- Few Lodash functions are used, like the "debounce" function. This was used to avoid too many API calls as and when the user was typing in every character. The debounce function helps to avoid this situation by calling the API after the user finishes typing (by setting an interval of 500).
- Both mouse and keyboard can be used to navigate through the search list and select an option. (I did read material UI Autocomplete docs. and verified if my app and their app had the same selection behavior using mouse and keyboard).

## APIs USED
- "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" is included in the script section to use JQuery methods to handle HTTP requests ($ajax).
- Jquery is also used to handle the key board events (move up and down the results generated and press enter key to select a search result).
- 'https://api.github.com/search/users' is used as an example data source to fetch GitHub user names and their associated IDs.

## Improvements
- Write tests to test every function and get full test coverage of the code.
- Make code more organized and readable by creating small helper functions wherever possible. For example, make functions like handleDataArray(), handleAPI() that would have all the code corresonding to each one respectively.
- Make scrolling available on keypress.
- Clear the input field once the user selects an option.
- Make changes to the UI to make the app look more attractive.

<!-- You can include documentation, additional setup instructions, notes etc. here -->
