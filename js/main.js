const profile = JSON.parse(localStorage.getItem('profile'))

if (profile === undefined || profile === null) {
    window.location.href = `login.html?_ijt=bfopchqjauv0dnrpqa5nqaq920&_ij_reload=RELOAD_ON_CHANGE`;
}

document.getElementById("formFirstName").defaultValue = profile.firstName;
document.getElementById("formLastName").defaultValue = profile.lastName;
document.getElementById("formEmail").defaultValue = profile.email;

var numberCoffees = localStorage.getItem('coffees')


if (numberCoffees === null) {
    numberCoffees = 0
    localStorage.setItem('coffees', numberCoffees)
} else {
    let divImages = document.getElementById("listCoffees")
    for (let i = 0; i < numberCoffees; i++) {
        const divResponsive = document.createElement('div')
        divResponsive.className="col-lg-2 col-md-3 col-sm-4 col-6 top-distance"
        
        
        const img = document.createElement("img")
        img.src = 'asserts/coffee.gif'
        img.className="coffee"
        divResponsive.appendChild(img)
        divImages.appendChild(divResponsive)
    }

}


document.getElementById("numberCoffees").innerText = numberCoffees;

const isButtonChangeProfileEnable = () => {
    const firstName = document.getElementById('formFirstNameModal').value
    const lastName = document.getElementById('formLastNameModal').value
    const email = document.getElementById('formEmailModal').value
    const btnApplyModifyProfile = document.getElementById('btnApplyModifyProfile')

    btnApplyModifyProfile.disabled = firstName === '' || lastName === '' || email === '';

}


const applyModifyProfile = () => {
    const firstName = document.getElementById('formFirstNameModal').value
    const lastName = document.getElementById('formLastNameModal').value
    const email = document.getElementById('formEmailModal').value

    localStorage.setItem('profile', JSON.stringify({firstName: firstName, lastName: lastName, email: email}))
    location.reload()
    
}

const incrementCoffees = () => {
    numberCoffees++
    localStorage.setItem('coffees', numberCoffees)
    

    document.getElementById("numberCoffees").innerText = numberCoffees;
    let divImages = document.getElementById("listCoffees")
    const divResponsive = document.createElement('div')
    divResponsive.className="col-lg-2 col-md-3 col-sm-4 col-6 top-distance"


    const img = document.createElement("img")
    img.src = 'asserts/coffee.gif'
    img.className="coffee"
    divResponsive.appendChild(img)
    divImages.appendChild(divResponsive)
}

const resetCoffees = () => {
    numberCoffees = 0
    localStorage.setItem('coffees', numberCoffees)
    document.getElementById("numberCoffees").innerText = numberCoffees;

    let divImages = document.getElementById("listCoffees")
    divImages.innerHTML = ''
}

const logout = () => {
    localStorage.clear()
    window.location.href = `login.html?_ijt=bfopchqjauv0dnrpqa5nqaq920&_ij_reload=RELOAD_ON_CHANGE`;

}