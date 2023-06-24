//Profile page
const signOutBtn = document.getElementById("signoutbtn");
const displaySection = document.getElementById('display');
const signupLogin = document.querySelector('.signup');

signupLogin.addEventListener('click', async () => {
    window.location.href = './index.html';
});

//Onloading Page to display User Data to UI
window.addEventListener("load", async () => {
    await loadPage();
    await checkToken() 
});

//Page Loading when the data is present in local storage
async function loadPage(){
    setTimeout(() => {
        let data = JSON.parse(localStorage.getItem("userData"));
        // console.log(data);
        displaySection.innerHTML = `
        <div class="profile-name">
            Full Name :  ${data.username}
        </div>
        <div class="profile-email">
            Email :  ${data.email}
        </div>
        <div class="profile-password">
            Password :  ${data.password}
        </div>
        `
    }, 300); 
}

//Logging out from Profile page to SignUp page and deleting all data
signOutBtn.addEventListener('click', async () => {
    await logout();
})

//Logout Functionality
//Removing all data after logout
async function logout() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userData")
    setTimeout(() => {
        window.location.href="./index.html";
    }, 1000)
}

//Restricted to Login to page if only Access Token is provided
async function checkToken(){
    setTimeout(() => {
        if(localStorage.getItem("accessToken") && !localStorage.getItem("userData")){
            window.location.href = "./index.html";
        }
    }, 1500);
}