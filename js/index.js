// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
// Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
        .then(resp => resp.json())
        .then(data => {
            function create(el){return document.createElement(el)}
            function select(el){return document.querySelector(el)}
            const monsterList = select("div#monster-container")
            data.forEach(monster => {
                displayMonsters(monster)
        })

            function displayMonsters (data){
                const monsterCard = create("card")
                const name = create("h1")
                const age = create('h4')
                const description = create('p')
                name.textContent = data.name
                age.textContent = data.age
                description.textContent = data.description
                monsterCard.append(name, age, description)
                monsterList.append(monsterCard)
            }
            
            function submitNewMonster() {
                const createMonster = select('#create-monster')
                const form = create('form')
                const inputName = create('input')
                const inputAge = create('input')
                const inputDescription = create('input')
                const submit = create("input")
                inputName.placeholder = "Name"
                inputAge.placeholder = "Age"
                inputDescription.placeholder = "Description"
                submit.type = "submit"
                form.addEventListener("submit", handleSubmit)
                createMonster.append(form)
                form.append(inputName, inputAge, inputDescription, submit)
            }

            function appendNewMonster(e){
                const newMonster = create('card')
                const newName = create('h1')
                const newAge = create('h4')
                const newDesc = create("p")
                newName.textContent = e.target[0].value
                newAge.textContent = e.target[1].value
                newDesc.textContent = e.target[2].value
                newMonster.append(newName, newAge, newDesc)
                monsterList.append(newMonster)
            }

            function handleSubmit(e) {
                e.preventDefault()
                appendNewMonster(e)
            }

            submitNewMonster()
        })
})