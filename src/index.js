// Deliverables
// On page load, render a list of already registered dogs in the tbl. You can fetch these dogs from http://localhost:3000/dogs.
// The dog should be put on the tbl as a tbl row. The HTML might look something like this <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
// Make a dog editbl. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
// On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
// Once the form is submitted, the tbl should reflect the updated dog information. There are many ways to do this. You could search for the tbl fields you need to edit 
// and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the tbl. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.

document.addEventListener('DOMContentLoaded', () => {

    const tbl = document.querySelector("tbody#table-body")
    const form = document.querySelector('#dog-form')

    fetchDogs()


    function fetchDogs(){
        // debugger
        tbl.innerHTML = ""
        fetch("http://localhost:3000/dogs")
        .then(res => res.json())
        .then(dogs => dogs.forEach(dog => appendDog(dog)))
    }

    function fetchDogs2(){
        // debugger
        tbl.innerHTML = ""
        fetch("http://localhost:3000/dogs")
        .then(res => res.json())
        .then(console.log)
        // .then(dogs => dogs.forEach(dog => appendDog(dog)))
    }

    function appendDog(dog){
        const tr = ce('tr')

        const td1 = ce('td')
        const td2 = ce('td')
        const td3 = ce('td')
        const td4 = ce('td')
        const btn = ce('button')

        td1.innerText = dog.name
        td2.innerText = dog.breed
        td3.innerText = dog.sex
        btn.innerText = 'Edit'

        btn.addEventListener('click', () => {
            populateForm(dog)
        })
        
        td4.append(btn)
        tr.append(td1, td2, td3, td4)
        tbl.append(tr)
    }

    function populateForm(dog) {
        form[0].value = dog.name
        form[1].value = dog.breed
        form[2].value = dog.sex

        form.addEventListener("submit", () => {
            event.preventDefault()
            /* Doesn't work for some reason. revisit 
                Error: Doesn't wait for fetch request to complete before calling .then aka rerendering table*/
            // configObj = {
            //     method: "PATCH",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         "name": form[0].value,
            //         "breed": form[1].value,
            //         "sex": form[2].value
            //     })
            // }
            // fetch(`http://localhost:3000/dogs/${id}`, configObj)
            // .then(fetchDogs())

            editDog(dog.id)


        })
    }
    async function editDog(id){
        // debugger
        configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": form[0].value,
                "breed": form[1].value,
                "sex": form[2].value
            })
        }
        
        const prom = await  fetch(`http://localhost:3000/dogs/${id}`, configObj)
        fetchDogs()
                    
    }

    function ce(ele){
        return document.createElement(ele)
    }
})