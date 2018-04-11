//TODO:
//Try to make page not reload after editing Contact details, so edit change is seen in real time.
//There's a bug where after deleting the only contact in the Address Book, and then clicking
//on "Clear Contact List", the confirm dialog still pops up to ask whether to clear your contacts
var clearContactListID = document.getElementById("clearContactList");
var contacts = JSON.parse(localStorage.getItem("addressBookLocalStorage"));

function clearContactList() {

    if(contacts !== null){
        var confirmation = confirm("Are you sure you want to clear your contacts?");
        if(confirmation) {
            localStorage.clear("addressBookLocalStorage");
            alert("Address Book is now empty!");
            location.reload();
        }
    } else {
        alert("Contact List is empty!");
    }
    
}

clearContactListID.addEventListener("click", clearContactList);

if(contacts !== null) {
    //Loop that iterates the array of saved contacts stored in the localStorage.
    //The contacts are dynamically updated to the page as part of an ordered list
    //Each Contact is contained in an HTML <details> tag, with the Contact name being the <summary>, and every
    //other Contact details (including the Contact name) being a child of the <details> tag with the <p> tag.
    for(let i = 0; i < contacts.length; i++) {
        var list = document.getElementById("list");
        var listItem = document.createElement("li");

        list.style.marginLeft = "64px";
        list.style.marginTop = "64px";

        listItem.style.fontFamily = "Georgia";
        listItem.style.fontSize = "16px";
        listItem.style.marginBottom = "16px";

        var details = document.createElement("details");
        var summary = document.createElement("summary");
        var deleteContactButton = document.createElement("button");
        
        summary.style.display = "inline-block";

        deleteContactButton.style.margin = "4px";
        deleteContactButton.setAttribute("type", "button");
        var deleteContactButtonText = document.createTextNode("Delete Contact");
        deleteContactButton.appendChild(deleteContactButtonText);
        
        //Creation of paragraph tag for each Contact details
        var contactNameP = document.createElement("p");
        var nickNameP = document.createElement("p");
        var phoneNumberP = document.createElement("p");
        var addressP = document.createElement("p");
        var emailP = document.createElement("p");
        var genderP = document.createElement("p");

        //Creation of Text Nodes to be appended to each relevant paragragh tag above.
        //Text Node for Contact Name
        var contactName = contacts[i].fullName;
        var contactNameSpan = document.createElement("span");
        var contactNameSpanTextNode = document.createTextNode("Name: ");
        contactNameSpan.appendChild(contactNameSpanTextNode);
        //Text Node for Contact Name (to be shown in <summary> tag of <details>)
        var contactNameTextNodeForSummary = document.createTextNode(contactName);
        //Text Node for Contact Name (to be shown in <p> tag of <details>)
        var contactNameTextNodeForDetails = document.createTextNode(contactName);
        

        //Text Node for Contact Nick Name
        var contactNickName = contacts[i].nickName;
        var nickNameSpan = document.createElement("span");
        var nickNameSpanTextNode = document.createTextNode("Nick Name: ");
        nickNameSpan.appendChild(nickNameSpanTextNode);
        var nickNameTextNode = document.createTextNode(contactNickName);

        //Text Node for Contact Phone Number
        var contactPhoneNumber = contacts[i].phoneNumber;
        var phoneNumberSpan = document.createElement("span");
        var phoneNumberSpanTextNode = document.createTextNode("Phone Number: ");
        phoneNumberSpan.appendChild(phoneNumberSpanTextNode);
        var phoneNumberTextNode = document.createTextNode(contactPhoneNumber);

        //Text Node for Contact Home Address
        var contactAddress = contacts[i].homeAddress;
        var addressSpan = document.createElement("span");
        var addressSpanTextNode = document.createTextNode("Home Address: ");
        addressSpan.appendChild(addressSpanTextNode);
        var addressTextNode = document.createTextNode(contactAddress);

        //Text Node for Contact Email
        var contactEmail = contacts[i].email;
        var emailSpan = document.createElement("span");
        var emailSpanTextNode = document.createTextNode("Email: ");
        emailSpan.appendChild(emailSpanTextNode);
        var emailTextNode = document.createTextNode(contactEmail);

        //Text Node for Contact Gender
        var contactGender = contacts[i].gender;
        var genderSpan = document.createElement("span");
        var genderSpanTextNode = document.createTextNode("Gender: ");
        genderSpan.appendChild(genderSpanTextNode);
        var genderTextNode = document.createTextNode(contactGender);

        //Appeding Text Nodes to relevant Paragraph tag.
        contactNameP.appendChild(contactNameSpan);
        contactNameP.appendChild(contactNameTextNodeForDetails);
        nickNameP.appendChild(nickNameSpan);
        nickNameP.appendChild(nickNameTextNode);       
        phoneNumberP.appendChild(phoneNumberSpan);
        phoneNumberP.appendChild(phoneNumberTextNode);
        addressP.appendChild(addressSpan);
        addressP.appendChild(addressTextNode);
        emailP.appendChild(emailSpan);
        emailP.appendChild(emailTextNode);
        genderP.appendChild(genderSpan);
        genderP.appendChild(genderTextNode);

        //Edit Name
        contactNameSpan.onclick=function() {
            var newName = prompt("Enter New Name:", contacts[i].fullName);
            newName.trim();

            if(newName == "") {
                alert("Name cannot be empty");
                return;
            }
            if(newName !== null) {
                contacts[i].fullName = newName;
                localStorage.setItem("addressBookLocalStorage", JSON.stringify(contacts));
                location.reload();
            }
        };

        //Edit Nick Name
        nickNameSpan.onclick=function() {
            var newNickName = prompt("Enter New Nick Name:", contacts[i].nickName);
            newNickName.trim();

            if(newNickName !== null) {
                contacts[i].nickName = newNickName;
                localStorage.setItem("addressBookLocalStorage", JSON.stringify(contacts));
                location.reload();
            }
        };

        //Edit Phone Number
        phoneNumberSpan.onclick=function() {
            var newPhoneNumber = prompt("Enter New Number:", contacts[i].phoneNumber);
            newPhoneNumber.trim();

            if(isNaN(newPhoneNumber)) {
                alert("Invalid Phone Number");
                return false;
            }

            if(newPhoneNumber !== null) {
                contacts[i].phoneNumber = newPhoneNumber;
                localStorage.setItem("addressBookLocalStorage", JSON.stringify(contacts));
                location.reload();
            }
        };

        //Edit Home Address
        addressSpan.onclick=function() {
            var newAddress = prompt("Enter New Address:", contacts[i].homeAddress);
            newAddress.trim();

            if(newAddress !== null) {
                contacts[i].homeAddress = newAddress;
                localStorage.setItem("addressBookLocalStorage", JSON.stringify(contacts));
                location.reload();
            }
        };

        //Edit Email
        emailSpan.onclick=function() {
            var newEmail = prompt("Enter New Email Address:", contacts[i].email);
            newEmail.trim();
            //Let there be a regex to validate email input?
            if(newEmail !== null) {
                contacts[i].email = newEmail;
                localStorage.setItem("addressBookLocalStorage", JSON.stringify(contacts));
                location.reload();
            }
        };

        //Edit Gender
        genderSpan.onclick=function() {
            var currentGender = contacts[i].gender;
            var confirmation;
            if(currentGender === "Male") {
                confirmation =  confirm("Are you sure you want to change " + contacts[i].fullName + 
                                            "'s gender to 'Female'?");
                if(confirmation) {
                    contacts[i].gender = "Female";
                    localStorage.setItem("addressBookLocalStorage", JSON.stringify(contacts));
                    location.reload();
                }
            }

            if(currentGender === "Female") {
                confirmation =  confirm("Are you sure you want to change " + contacts[i].fullName + 
                                            "'s gender to 'Male'?");
                if(confirmation) {
                    contacts[i].gender = "Male";
                    localStorage.setItem("addressBookLocalStorage", JSON.stringify(contacts));
                    location.reload();
                }
            }
        };
           
        //Delete a Contact
        deleteContactButton.onclick=function(){
            var confirmation = confirm("Are you sure you want to the delete " + "'" + contacts[i].fullName + "'" + " from your Address Book?");

            if(confirmation) {
                contacts.splice(i, 1);
                localStorage.setItem("addressBookLocalStorage", JSON.stringify(contacts));
                location.reload();
            }
        };
        
        //Text View that informs on how to edit the details of a Contact.
        var editInfoP = document.createElement("p");
        var editInfoPTextNode = document.createTextNode("To edit contact details, click the label of the field to be changed");
        editInfoP.appendChild(editInfoPTextNode);
        editInfoP.style.fontSize = "14px";
        editInfoP.style.margin = "8px 0 0 0";
        editInfoP.style.color = "red";

        summary.appendChild(contactNameTextNodeForSummary);

        //Appeding all children element of <details>
        details.appendChild(summary);
        details.appendChild(editInfoP);
        details.appendChild(contactNameP);
        details.appendChild(nickNameP);
        details.appendChild(phoneNumberP);
        details.appendChild(addressP);
        details.appendChild(emailP);
        details.appendChild(genderP);
        details.appendChild(deleteContactButton);

        //Necessary appending to ordered list (of saved contacts)
        listItem.appendChild(details);
        list.appendChild(listItem);
    }
}