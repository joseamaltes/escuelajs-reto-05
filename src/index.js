const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';



const loadData = async (par) => {
  
  let res = await fetch(par);
  let response = await res.json();
  const characters = response.results;
   localStorage.setItem('next_fetch', JSON.stringify(response.info.next));
        let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    ` 
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
     $app.appendChild(newItem);};

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
loadData(API);
if(JSON.parse(localStorage.getItem('next_fetch')) != ""){
  loadData(JSON.parse(localStorage.getItem('next_fetch')))
   console.log(JSON.parse(localStorage.getItem('next_fetch')));

 } else {
   localStorage.clear(); 
   console.log( 'Ya no hay mas personajes');
   intersectionObserver.disconnect();
 }; 
       }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);