let url = "https://pokeapi.co/api/v2/pokemon/";
 let container = document.getElementById('contaiter');

async function fetchPokemonData(i) {
    let res = await fetch(url + i);
    let data = await res.json();
    return data;
   
}
function pokicard(pokemon) {
   
    let cardbox = document.createElement('div');
    cardbox.className = 'cardbox';

    const pokemonType = pokemon.types[0].type.name;
    
     let card = `
        <div class="innercard ${pokemonType}">
            <div class="frontcard ${pokemonType}">
                <h3>#${pokemon.id}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
                <h2 class="poki-name">${pokemon.name}</h2>
                <p class="type">${pokemon.types[0].type.name}</p>
            </div>
            <div class="backcard ${pokemonType}">
                <img class="back-img" src="${pokemon.sprites.back_default}" alt="${pokemon.name}" />
                <h2 class="poki-name">${pokemon.name}</h2>
                <p class="ability">Ability: ${pokemon.abilities[0].ability.name}</p>
            </div>
        </div>
    `;
    cardbox.innerHTML = card;
    container.appendChild(cardbox);
    return cardbox;

}

let typebtn = document.getElementById('typeBtn');
typebtn.addEventListener('click',() => {
    let allcard = document.querySelectorAll('.cardbox');
    typefilter = document.getElementById('type');
  allcard.forEach(function (card) {
    let type = card.querySelector('.type').textContent;
    if (type === typefilter.value) {
        card.style.display = 'block';
    } else {
        card.style.display = 'none';
    }

  });

})
let     search = document.getElementById('search');
search.addEventListener('keyup', async () => {
    let searchValue = search.value.toLowerCase();
    let allcard = document.querySelectorAll('.cardbox');
    
    allcard.forEach(function(card){
        let name = card.querySelector('.poki-name').textContent.toLowerCase();
        if(name.startsWith(searchValue)){
            card.style.display = 'block';
        }else{
            card.style.display = 'none';
        }
    })
});

async function allpokemon(){
    for(let i = 1 ; i < 181 ; i++){
       let poki = await fetchPokemonData(i);
        pokicard(poki);
    }
}




allpokemon();
