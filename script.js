//Sign Up page
const userName = document.getElementById('username');
const userEmail = document.getElementById('useremail');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password-check');
const submitBtn = document.getElementById('submit-btn');
const message = document.querySelector('.message')
const profileLogin = document.querySelector(".profile");

//To load the page if user is already logged in
window.addEventListener("load", async () => {
    await checkToken();
})

profileLogin.addEventListener('click', async () => {
    await checkToken();
});

//On clicking Submit button
submitBtn.addEventListener('click', async() => {
    let name = userName.value.trim('');
    let email = userEmail.value.trim('');
    if(name === "" || email === "" || password.value === "" || confirmPassword.value === ""){
        errorDisplay();
        return;
    }else{
        if(password.value !== confirmPassword.value){
            passwordError()
            return;
        }else{
            successDisplay()
        }
    }
    
    let userDetails = {
        username:userName.value,
        email : userEmail.value,
        password: password.value,
    }
    userEmail.value = "";
    password.value = "";
    confirmPassword.value = "";
    userName.value = "";
    await setUserDetails(userDetails);
    await checkToken();
});

//To Print Error Message in UI if invalid data
function errorDisplay(){
    message.innerHTML = '';
    let p = document.createElement('p');
    p.setAttribute('class', 'error');
    p.innerText = 'Error: All The fields are mandatory';
    message.appendChild(p);
    
}

//To Print Error Message in UI if valid  data
function successDisplay(){
    message.innerHTML = '';
    let p = document.createElement('p');
    p.setAttribute('class', 'success');
    p.innerText = 'Successfully Signed Up!';
    message.appendChild(p);
}

//To Print Error Message in UI if password and confirm password not machining
function passwordError(){
    message.innerHTML = '';
    let p = document.createElement('p');
    p.setAttribute('class', 'error');
    p.innerText = 'Confirm password is not matching to the above password';
    message.appendChild(p);
}

//Creating user access token 
function random16bit() {
    const charset = 'ABCDEFGHOJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let newToken = '';
    for(let i = 0; i < 16; i++){
        newToken += charset[Math.floor(Math.random()*charset.length)];
    }
    return newToken;
}

// Adding the user data to local storage to authenticate
async function setUserDetails(userDetails){
    let userData = JSON.stringify(userDetails);
    let accessToken = JSON.stringify(random16bit());
    setTimeout(() => {
        localStorage.setItem("userData", userData);
        localStorage.setItem("accessToken", accessToken);
    }, 1000)
}

//Authentication when only if both the data is provided
//Redirect to profile page
async function checkToken(){
    setTimeout(() => {
        if(localStorage.getItem("accessToken") && localStorage.getItem("userData")){
            window.location.href = "./profile.html";
        }
    }, 1500);
}