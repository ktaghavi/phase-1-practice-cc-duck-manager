fetch("http://localhost:3000/ducks")
    .then(r => r.json())
    .then (ducks => {
        ducks.forEach(renderDucks)
        populateDuck(ducks[0])
    })

const duckLikes = document.getElementById('duck-display-likes')
duckLikes.addEventListener('click', () => {
    duckLikes.textContent = parseInt(duckLikes.textContent) + 1 + " Likes"
})

function renderDucks (ducks) {
            const img = document.createElement('img')
            img.src = ducks['img_url']
            const duckPics = document.getElementById('duck-nav')
            duckPics.append(img)

            img.addEventListener('click', () => {
               populateDuck(ducks)
            })
    }

function populateDuck(ducks){
    const imgUrl = document.getElementById('duck-display-image')
    const duckName = document.getElementById('duck-display-name')

    duckName.textContent = ducks['name']
    imgUrl.src = ducks['img_url']
    imgUrl.alt = ducks['name']
    duckLikes.textContent = ducks['likes'] + " Likes"
}
const findForm = document.getElementById('new-duck-form')
findForm.addEventListener('submit', (e) => {
    e.preventDefault()
    newDuckInput()
})

function newDuckInput () {
    const newName = document.getElementById('new-name')
    const newUrl = document.getElementById('new-url')
    
    fetch("http://localhost:3000/ducks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },

  body: JSON.stringify({
    name: newName.value,
    img_url: newUrl.value,
    likes: '0'
})
  })
  .then(r => r.json())
  .then(data => renderDucks(data))
}