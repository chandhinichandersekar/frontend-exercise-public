import { isArray, isString, debounce } from 'lodash';
import { getResults as getResultsData } from '../data';
import keyEvents from './keyEvents';

export default class Autocomplete {
  
  constructor(rootEl, options = {}) {
    options = Object.assign({ numOfResults: 10, data: [] }, options);
    Object.assign(this, { rootEl, options });
    this.searchDebounce = null;
    this.init(rootEl.id);
  }

  onQueryChange(query) {
    // Get data for the dropdown
    if (this.searchDebounce) {
      this.searchDebounce.cancel();
    }
    this.searchDebounce = debounce(() => {
      this.getResults(query, this.options.data).then(results => {
        this.updateDropdown(results);
      });
    }, 500);
    this.searchDebounce();
  }

  /**
   * Given an array and a query, return a filtered array based on the query.d
   */
  getResults(query, data) {
    return new Promise ((resolve, reject) => {
      if (!query) {
        resolve([])
      }
      else if (isArray(data)) {
        let results = data.filter((item) => {
          return item.text.toLowerCase().includes(query.toLowerCase());
        });
        results = results.slice(0, this.options.numOfResults);
        resolve(results);
      }
      else if(isString(data)) {
        getResultsData({query, numOfResults: this.options.numOfResults, dataSource: this.options.data, mapResults: this.options.mapResults}).then(results => {
          resolve(results);
       }, err => {
         alert('error searching');
       })
      }
    })
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach(({ text, value }) => {
      const el = document.createElement('li');
      el.setAttribute("value", value);
      Object.assign(el, {
        className: 'result',
        textContent: text
      });
      // Pass the value to the onSelect callback
      var focus;
      el.addEventListener('click', () => {
        const { onSelect } = this.options;
        if (typeof onSelect === 'function') onSelect(value);
      });

      fragment.appendChild(el);
    });
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
    });

    inputEl.addEventListener('input', event =>
      this.onQueryChange(event.target.value));

    return inputEl;
  }

  init(id) {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)


    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl, { className: 'results' });
    this.rootEl.appendChild(this.listEl);

    keyEvents({id, onSelectEnterForAPICalls: this.options.onSelect, onSelectEnterForDataArray: this.options.onSelect });
  }
}
