export const handleLogin = (e , email , password , role) => {
    e.preventDefault();
    try {
        if(!role || !password || !email){
            return alert("Please provide all fields")
        }
        console.log("Login" , e , email ,password , role);
    } catch (error) {
        console.log(error)
    }
};

export const handleRegister = (e, email , password , name , role , organisationName , hospitalName , website , address , phone) => {
    e.preventDefault();
    try {
        console.log("Register =>" , e, email , password , name , role , organisationName , hospitalName , website , address , phone)
    } catch (error) {
        console.log(error)
    }
};