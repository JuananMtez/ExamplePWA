const profile = JSON.parse(localStorage.getItem('profile'))

if (profile === undefined || profile === null) {
    window.location.href = `login.html`;
}


const getStatus = () => {
    navigator.getBattery()
        .then(battery => {
            console.log(battery)
            const div = document.getElementById('progressBattery')
            div.innerHTML = ''
            const divProgress = document.createElement('div')
            divProgress.className = 'progress'
            const divProgressValue = document.createElement('div')

            if (battery.level > 0.75)
                divProgressValue.className = 'progress-bar bg-success progress-bar-striped progress-bar-animated'
            else if (battery.level > 0.5)
                divProgressValue.className = 'progress-bar bg-info progress-bar-striped progress-bar-animated'
            else if (battery.level > 0.25)
                divProgressValue.className = 'progress-bar bg-warning progress-bar-striped progress-bar-animated'
            else if (battery.level > 0)
                divProgressValue.className = 'progress-bar bg-danger progress-bar-striped progress-bar-animated'


            level = (battery.level * 100).toString() + '%'
            divProgressValue.style = `width: ${level}`
            divProgressValue.setAttribute('aria-valuenow', level)
            divProgressValue.setAttribute('aria-valuemin', "0")
            divProgressValue.setAttribute('aria-valuemax', "100")
            divProgressValue.innerHTML = level


            divProgress.appendChild(divProgressValue)
            div.appendChild(divProgress)

            const currentLevel = document.getElementById('current_level')
            currentLevel.innerHTML = level

            const charging = document.getElementById('charging')
            charging.innerHTML = battery.charging ? 'Yes' : 'No'

            const timeToCharge = document.getElementById('time_to_charge')
            timeToCharge.innerHTML = battery.chargingTime + ' seconds'

            const timeToDischarge = document.getElementById('time_to_discharge')
            timeToDischarge.innerHTML = battery.dischargingTime + ' seconds'


            battery.addEventListener('levelchange', () => {
                getStatus()
            });

            battery.addEventListener('chargingchange', () => {
                getStatus()
            });

            battery.addEventListener('chargingtimechange', () => {
                getStatus()
            });

            battery.addEventListener('dischargingtimechange', () => {
                getStatus()
            });
        })
}

getStatus()


