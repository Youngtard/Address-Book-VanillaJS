//Contact Constructor
function Contact (fullName, nickName, phoneNumber, homeAddress, email, gender) {
    this.fullName = fullName;
    this.nickName = nickName;
    this.phoneNumber = phoneNumber;
    this.homeAddress = homeAddress;
    this.email = email;
    this.gender = gender;
}

function saveContact() {
    var fullName = document.getElementById("fullName").value;
    var nickName = document.getElementById("nickName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var homeAddress = document.getElementById("homeAddress").value;
    var email = document.getElementById("emailAddress").value;
    var gender;

    //Handles when no Gender is checked
    if(document.querySelector('input[name="Gender"]:checked') == null){
        gender = "";
    } else {
        gender = document.querySelector('input[name="Gender"]:checked').value;
    }

    fullName.trim();
    nickName.trim();
    phoneNumber.trim();
    homeAddress.trim();
    email.trim();

    if(isNaN(phoneNumber)){
        alert("Invalid Phone Number");
        return false;

    //Handles saving a contact as a Contact object, and putting the object in an array.
    //The array is made up of created Contact objects.
    //The array is then stored in localStorage.
    } else {
        var contact = new Contact(fullName, nickName, phoneNumber, homeAddress, email, gender);

        //First time a contact is saved into Address Book.
        if(JSON.parse(localStorage.getItem("addressBookLocalStorage")) == null) {
            var contactArray = [];
            contactArray.push(contact);
            localStorage.setItem("addressBookLocalStorage", JSON.stringify(contactArray));            
        //Subsequent times a contact is saved.
        } else {
            var currentContactArray = JSON.parse(localStorage.getItem("addressBookLocalStorage"));
            currentContactArray.push(contact);
            localStorage.setItem("addressBookLocalStorage", JSON.stringify(currentContactArray));
        }

        alert("Contact successfully saved");
        return true;        
    }
}