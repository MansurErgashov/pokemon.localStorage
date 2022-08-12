// select element HTML
const elPokemonList = document.querySelector('.pakemon__box-list')
const elPokemonTemp = document.querySelector('.pakemon__template').content
const elPokemonCount = document.querySelector('.count')
const elPokemonForm = document.querySelector('.pakemon__box-form')
const elFormName = document.querySelector('.pakemon__box-form-input')
const elFormHeight = document.querySelector('#height')
const elFormWeight = document.querySelector('#weight')
const elFormSelect = document.querySelector('#pakemon__select')
const elFormSorting = document.querySelector('#pakemon__sort')
const elBookmarkWrapper = document.querySelector('.bookmark-box')
const elBookmarkTemp = document.querySelector('.bookmark__template').content
const elBookmarkList = document.querySelector('.bookmark__list')


const pakemonsArray = pokemons.splice(0, 10)


let bookmarkedPokemon = []


// normalizedArray
const normalizedPokemons = pakemonsArray.map( function(item) {
    return {
        id: item.id,
        name: item.name.toString(),
        type: item.type,
        img: item.img,
        height: item.height,
        weight: item.weight
    }
})


//render pokemons 
function renderPokemon(array, wrapper) {

    elPokemonList.innerHTML = ''

    const pokemonFragment = document.createDocumentFragment();

    elPokemonCount.textContent = array.length;
    
    array.forEach(item => {
        const newTemplate = elPokemonTemp.cloneNode(true)

        const newItem = newTemplate.querySelector('.pakemon__box-list-item');
        
        newTemplate.querySelector('.pakemon__box-item-img').src = item.img,
        newTemplate.querySelector('.pakemon__box-item-heading').textContent = item.name,
        newTemplate.querySelector('.type').textContent = item.type,
        newTemplate.querySelector('.height').textContent = item.height,
        newTemplate.querySelector('.weight').textContent = item.weight,
        newTemplate.querySelector('.pakemon__box-item-bookmark').dataset.bookmarkId = item.id
        

        pokemonFragment.append(newItem)
        
    });
    wrapper.appendChild(pokemonFragment)
}

renderPokemon(normalizedPokemons, elPokemonList)

//  Get types
const typesArray = [];
function getTypes() {

    const typesFragment = document.createDocumentFragment();

    const typePokemons = normalizedPokemons.forEach(item => {
        const types = item.type

        types.forEach(item => {
            let typeArray = typesArray.includes(item)

            if(!typeArray) {
                typesArray.push(item) 
            }
        })
    })

}
getTypes()


// render Types
function renderTypes(array, wrapper) {

    const selectFragment = document.createDocumentFragment();

    array.sort().forEach(item => {
        
        const newOption = document.createElement('option')
        newOption.textContent = item
        newOption.value = item 
        selectFragment.appendChild(newOption)
    })
    wrapper.appendChild(selectFragment)
}
renderTypes(typesArray, elFormSelect)

let = SearchNameArray = []

//Form search btn
elPokemonForm.addEventListener('submit', function(event) {
    event.preventDefault();


    const searchName = elFormName.value.trim();
    const formWeight = elFormWeight.value.trim();
    const formHeight = elFormHeight.value.trim();
    const formSelect = elFormSelect.value.trim();
    

    
    let isTrue 

    const filteredPokemon = normalizedPokemons.filter( item => {

        let selectValue = item.type.includes(formSelect)

        if(formSelect == "all") isTrue = true
        else  isTrue = selectValue

        let validation = formWeight <= item.weight && formHeight <= item.height && isTrue

        return validation
    })


let userName = []

function userReg(array) {
    array.forEach(item => {

        let pattern = RegExp(`${searchName}`, `gi`);

        if(item.name.match(pattern)) {
            userName.push(item)
        }
    })
    renderPokemon(userName, elPokemonList)
}
userReg(filteredPokemon)

})

// Bookmark
if(JSON.parse(localStorage.getItem('obj')).length > 0) {
    JSON.parse(localStorage.getItem('obj')).forEach(item => {
        bookmarkedPokemon.push(item)
    }) 
    renderBookmarks(bookmarkedPokemon)
}

elPokemonList.addEventListener("click", function (evt) { 
    let currentBookmarkId = evt.target.dataset.bookmarkId;


    if (currentBookmarkId) {
        let foundPokemon = normalizedPokemons.find(function(item) {
            return item.id == currentBookmarkId
        })
        
        if(bookmarkedPokemon.length == 0) {
            bookmarkedPokemon.unshift(foundPokemon)
        }else{
            let isPokemonInArray = bookmarkedPokemon.find(function(item) {
                return item.name == foundPokemon.name
            }) 
            
            if (!isPokemonInArray) {
                bookmarkedPokemon.unshift(foundPokemon)
            }
        }
    
        localStorage.setItem('obj', JSON.stringify(bookmarkedPokemon))
        
        renderBookmarks(JSON.parse(localStorage.getItem('obj')))
    }
})




function renderBookmarks(arrayOfMovies) {
    elBookmarkList.innerHTML = null
    
    let fragment = document.createDocumentFragment();
    
    for (const item of arrayOfMovies) {
        let bookmarkItem = elBookmarkTemp.cloneNode(true);
        
        bookmarkItem.querySelector(".bookmark-box__title").textContent = item.name;
        bookmarkItem.querySelector(".bookmark-box__removebtn").dataset.bookmarkedId = item.id;
        
        fragment.appendChild(bookmarkItem);
    }
    
    elBookmarkList.appendChild(fragment)
}

elBookmarkList.addEventListener("click", function (evt) {
    let bookmarkedPkemonId = evt.target.dataset.bookmarkedId
    
    if (bookmarkedPkemonId) {
        let foundBookmarkedPokemon = bookmarkedPokemon.findIndex(function(item) {
            return item.id == bookmarkedPkemonId
        })
        console.log(bookmarkedPokemon);
        bookmarkedPokemon.splice(foundBookmarkedPokemon, 1);
        localStorage.setItem('obj', JSON.stringify(bookmarkedPokemon))
        
    }
    renderBookmarks(JSON.parse(localStorage.getItem('obj')));
})





