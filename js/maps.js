const profile = JSON.parse(localStorage.getItem('profile'))

if (profile === undefined || profile === null) {
    window.location.href = `login.html`;
}


const direction = JSON.parse(localStorage.getItem('directions'))


var geocoder
var map
var positions


function initMap() {
    geocoder = new google.maps.Geocoder();
    navigator.geolocation.getCurrentPosition(successLocation)


}


const successLocation = (pos) => {


    const divMap = document.getElementById('div-map')
    divMap.innerHTML = ''
    const divComponent = document.createElement('div')
    divComponent.className = "col-12"
    const divMapComponent = document.createElement('div')
    divMapComponent.id = "map"
    let address = document.getElementById('inputDirection');
    address.disabled = false

    divComponent.appendChild(divMapComponent)
    divMap.appendChild(divComponent)

    const currentLocationMarker = {lat: pos.coords.latitude, lng: pos.coords.longitude};
    map = new google.maps.Map(divMapComponent, {
        zoom: 4,
        center: currentLocationMarker
    });

    positions = JSON.parse(localStorage.getItem('geoData'))

    if (positions !== null && positions.length > 0)
        positions.forEach(pos => {


            let newRow = document.createElement("tr");
            newRow.className = "table-success"
            let newCellDirection = document.createElement("td")
            let newCellLat = document.createElement("td");
            let newCellLong = document.createElement("td")

            newCellDirection.innerHTML = pos.address
            newCellLong.innerHTML = pos.lng
            newCellLat.innerHTML = pos.lat
            newRow.appendChild(newCellDirection)
            newRow.appendChild(newCellLat)
            newRow.appendChild(newCellLong)
            document.getElementById("rows").appendChild(newRow);


            const marker = new google.maps.Marker({
                map: map,
                position: {lat: pos.lat, lng: pos.lng},
            });
        })
    else
        positions = []


}

const getCodeAddress = () => {
    let address = document.getElementById('inputDirection').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == 'OK') {


            positions.push({
                address: address,
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            })

            localStorage.setItem('geoData', JSON.stringify(positions))


            const direction = document.getElementById("inputDirection")
            const btnApplySearchDirection = document.getElementById("btnApplySearchDirection")

            let newRow = document.createElement("tr");
            newRow.className = "table-success"
            let newCellDirection = document.createElement("td")
            let newCellLat = document.createElement("td");
            let newCellLong = document.createElement("td")

            newCellDirection.innerHTML = address
            newCellLong.innerHTML = results[0].geometry.location.lng()
            newCellLat.innerHTML = results[0].geometry.location.lat()
            newRow.appendChild(newCellDirection)
            newRow.appendChild(newCellLat)
            newRow.appendChild(newCellLong)
            document.getElementById("rows").appendChild(newRow);


            direction.value = ''
            btnApplySearchDirection.disabled = true
            map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

const enableButtonSearchDirection = () => {
    const direction = document.getElementById("inputDirection").value

    const btnApplySearchDirection = document.getElementById("btnApplySearchDirection")
    btnApplySearchDirection.disabled = direction === ''
}


