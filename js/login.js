
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service_worker.js', {scope: './'}).then(registration => {
        console.info('ServiceWorker registration: ', registration);
    }).catch(err => {
        console.error('ServiceWorker registration failed: ', err);
    });
}

localStorage.clear()

const disabledButton = () => {
    const firstName = document.getElementById('formFirstName').value
    const lastName = document.getElementById('formLastName').value
    const email = document.getElementById('formEmail').value
    const loginBtn = document.getElementById('loginBtn')

    loginBtn.disabled = firstName === '' || lastName === '' || email === '';

}




const onClickLogin = () => {
    const firstName = document.getElementById('formFirstName').value
    const lastName = document.getElementById('formLastName').value
    const email = document.getElementById('formEmail').value
    
    localStorage.setItem('profile', JSON.stringify({firstName: firstName, lastName: lastName, email: email}))
    window.location.href = `profile.html`;

}



