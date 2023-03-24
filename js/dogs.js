const profile = JSON.parse(localStorage.getItem('profile'))

if (profile === undefined || profile === null) {
    window.location.href = `login.html`;
}


const initialImages = JSON.parse(localStorage.getItem('imgsDog'))

if (initialImages !== null && initialImages.length > 0) {
    const divDogImages = document.getElementById("dogs-images")

    initialImages.forEach(imgURL => {


        const divImage = document.createElement("div")
        divImage.className = "col-lg-2 col-md-3 col-sm-4 col-6 "
        const imgComponent = document.createElement("img")
        imgComponent.src = imgURL
        imgComponent.alt = imgURL
        imgComponent.className = 'img-shown'
        divImage.appendChild(imgComponent)
        divDogImages.appendChild(divImage)

    })
}

document.getElementById("div-spinner").style.visibility = "hidden"


    const searchDogsImages = () => {
    const spinner = document.getElementById("div-spinner")
    const number = document.getElementById("inputNumberDogs")
    const btnAmountImages = document.getElementById("btnSearchImagesDog")
    const divDogImages = document.getElementById("dogs-images")
    divDogImages.innerHTML = ''
    number.disabled = true
    btnAmountImages.disabled = true
    spinner.style.visibility = "visible"

    fetch(`https://shibe.online/api/shibes?count=${number.value}&urls=true&httpsUrls=true`,
        {
            method: 'GET'
        }
    ).then(response => {
        spinner.style.visibility = "hidden"
        number.disabled = false
        btnAmountImages.disabled = false
        response.json()
            .then(data => {

                localStorage.setItem('imgsDog', JSON.stringify(data))
                data.forEach(imgURL => {
                    const divImage = document.createElement("div")
                    divImage.className = "col-lg-2 col-md-3 col-sm-4 col-6 "
                    const imgComponent = document.createElement("img")
                    imgComponent.src = imgURL
                    imgComponent.alt = imgURL
                    imgComponent.className = 'img-shown'
                    divImage.appendChild(imgComponent)
                    divDogImages.appendChild(divImage)
                    number.value = ''
                    btnAmountImages.disabled = true

                })
            })
    })

}

const enableButtonSearchDogsImage = () => {
    const number = document.getElementById("inputNumberDogs").value
    const btnAmountImages = document.getElementById("btnSearchImagesDog")
    btnAmountImages.disabled = number <= 0 || number > 100

}
