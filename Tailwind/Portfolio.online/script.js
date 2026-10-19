// let title = document.querySelector('#title');
// title.textContent = "This is the continuation of the DOM Manipulation"

// let title2 = document.querySelector('#title2')
// title2.textContent = "You are lying, Hellow World3"

// let neww = document.querySelector('.highlight');

// neww.textContent  = "Wakyi gu h) ooo blaah"

// function HandleClick(){
//     alert("You have clicked a button")
// }

const button = document.querySelector("#btn");
const para = document.querySelector('#pd');
const para2 = document.querySelector('#message');
const title = document.querySelector('#title');
const button1 = document.querySelector('#changeBtn');
const button2 = document.querySelector('toggleBtn');



button.addEventListener('click', () => {
    alert("you just clicked a button")
    para.textContent = "Yayy you clicked!"
})

button1.addEventListener('click', () =>{
    title.textContent = "Bye bye"
})


button1.addEventListener('click', () =>{
    para2.textContent = " "
    button2.textContent  = "Hide Content"
    
})

