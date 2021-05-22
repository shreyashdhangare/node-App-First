console.log("Client style js is loaded");



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherform.addEventListener('submit',(event) =>{
    event.preventDefault() 
    const location = search.value
    
    messageOne.textContent = 'Loading' 
    messageTwo.textContent = 'Loading'

    fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }
        
        messageOne.textContent = data.Location 
        messageTwo.textContent = data.Forecast
        })
    })
})



