import Autocomplete from './Autocomplete';
import usStates from './us-states';
import './main.css';


// US States
const data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation
}));
new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  }
});


function getUserNames(results) {
  return results.items.map(({login, id}) => {
    return {
        text: login,
        value: id
    };
  });
}
// Github Users
new Autocomplete(document.getElementById('gh-user'), {
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
  data: 'https://api.github.com/search/users',
  mapResults: getUserNames
});
