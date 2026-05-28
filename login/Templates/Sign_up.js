
// document.addEventListener("click",interest_array)



function interest_array(){
    
    const interest=[]
    const checkboxs=document.querySelectorAll(".checkboxs")
    checkboxs.forEach(element => {
        if (element.checked){
            const id = element.id;
            const label = document.querySelector(`label[for="${id}"]`);
            if (label) {
                interest.push(label.innerHTML);
            }
        }
    });
    console.log(interest);
}
