document.getElementById("myForm").addEventListener("submit", function(event){
    event.preventDefault();  //preventing the form from submitting before we are done
 
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const error = document.getElementById("error");
 
    error.textContent="";
 
    if (name === "" || email==="" || message===""){
        error.textContent ="Please fill in all the fields";
        return;
    }
 
    const subject = "Message from " + name;
    const body = "Name: " + name + "\nEmail: " + email + "\nMessage: " + message;
 
    window.location.href = mailto:thembidedezna35@gmail.com subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)};
 
    alert("Form submitted successfully");
 
 
}
