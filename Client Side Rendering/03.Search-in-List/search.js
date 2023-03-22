import { html, render } from "./node_modules/lit-html/lit-html.js";
import {towns} from './towns.js';

const cardTemplate = (towns) => html `
<ul>
${towns.map(town => html `<li id=${town}>${town}</li>`)}
</ul> `

const renderTownsComponent = (towns) => {
   cardTemplate(towns);
   const rootElement = document.getElementById('towns');
   render(cardTemplate(towns), rootElement);
}

renderTownsComponent(towns);

document.querySelector('button').addEventListener('click', search);

const searchTowns = (towns, text) => {
   return towns.filter((town) => {
      if (town.includes(text)) {
         const match = document.getElementById(`${town}`);
         match.setAttribute('class', 'active');
         return town; 
      }
   })
}

function search() {
   const text = document.getElementById('searchText').value;
   const result = searchTowns(towns, text);
   const resultHTML = document.getElementById('result');
   resultHTML.textContent = `${result.length} matches found`
}
