import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, fs, collection, getDocs } from "../database/firebase.js";

const loginform = document.querySelector("#login-form");

loginform.addEventListener("submit", (e) => {
    e.preventDefault();

    const loginemail = document.querySelector("#login-email").value;
    const loginpass = document.querySelector("#login-password").value;
    console.log(loginemail, loginpass);

    signInWithEmailAndPassword(auth, loginemail, loginpass)
        .then((userCredential) => {
            loginform.reset();
            const loginuser = userCredential.user;
            console.log("Ha ingresado a su cuenta");
            console.log(loginuser);
        })
        .catch((error) => {
            console.log("El usuario no se pudo registrar", error)
        })
});

const signupform = document.querySelector("#signup-form");

signupform.addEventListener("submit", (e) => {
    e.preventDefault();

    const signupemail = document.querySelector("#signup-password").value;
    const signuppass = document.querySelector("#signup-password").value;
    const signupconfirmpass = document.querySelector("#signup-confirmpassword").value;
    console.log(usersu, loginsu);

    if(signuppass == signupconfirmpass){
        createUserWithEmailAndPassword(auth, usersu, loginsu)
        .then((userCredential) => {
            signupform.reset();
            const usersu = userCredential.user;
            console.log("Usuario registrado");
            console.log(usersu);
        })
        .catch((error) => {
            console.log("El usuario no se pudo registrar", error)
        })
    } else{
        console.log("Las contraseñas no son idénticas.")
    }
});

const logout = document.querySelector('#logout')

logout.addEventListener("click", (e) => {
    e.preventDefault();

    signOut(auth)
        .then(() => {
            console.log("Se ha cerrado sesión");
        })
        .catch((error) => {
            console.log("El usuario no se pudo registrar", error)
        })
});

const postList = document.querySelector('.posts');
const setupPosts = data => {
    if(data){
        let html = '';
        data.forEach((doc) => {
            const post = doc.data();
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5>${post.title}</5>
                    <p>${post.desc}</p>
                </li>
            `;
            html += li;
        });
        postList.innerHTML = html;
    } else{
        postList.innerHTML = '<p class="text-center">Ingresa a tu cuenta para ver información </p> '
    }
};

onAuthStateChanged(auth, async (user) => {
    if(user){

        const docu = await getDocs(collection(fs, 'posts'));
        setupPosts(docu);
    }
    else{
        console.log('SignOut');
        postList.innerHTML = '<p class="text-center">Ingresa a tu cuenta para ver información </p> '
    }
});

