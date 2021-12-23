var userID;


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user.uid);
        userID = user.uid;

        var username = document.getElementById("username")
        firebase.firestore().collection("users").doc(user.uid).get()
            .then((snapshot) => {
                var currentUser = snapshot.data()
                console.log(currentUser);
                username.innerHTML = currentUser.username;
                 getCard();


            }).catch((er) => {
                console.log("Error", er);
            })



    }
})


var storage = firebase.storage();

// let addCard = (e) => {
//     console.log(e);
//     e.preventDefault();
//     var restaurantName = document.getElementById("restaurantName").value;
//     var dish = document.getElementById("dish").value;
//     var price = document.getElementById("price").value;

//     var Description = document.getElementById("description").value;

//     var imageFile = document.getElementById("imageFile");
//     var imageKey = imageFile.files[0];

//     var imagesRef = storage.ref().child('images/' + imageKey.name);
//     var uploadTask = imagesRef.put(imageKey);


//     uploadTask.snapshot.ref.getDownloadURL()
//         .then((url) => {
//             console.log("Image Added", url);

//             firebase.firestore().collection("ADDCARD").add({
//                     restaurantName: restaurantName,
//                     dish: dish,
//                     price: price,
//                     Description: Description,
//                     uid: userID,
//                     image: url
//                 })
//                 .then(function() {
//                     console.log(userID);
//                     // console.log("Object url", url);
//                     console.log("Data Added");
//                     getCard();
//                     // getTodo(userID);
//                 })
//                 .catch(function(error) {
//                     console.log(error);
//                 })



//         })
//         .catch((er) => {
//             console.log(er);
//         })







//     console.log(imageKey);
//     console.log(restaurantName);
//     console.log(Description);



// }
var cardArray = []

// .where("uid" , "==" , uid)
//   .get()

let getCard = () => {
    firebase.firestore().collection("ADDCARD")
        .get()
        .then((quarrySnapshot) => {
            document.getElementById("disPlayCard").innerHTML = "";
            quarrySnapshot.forEach(doc => {
                console.log("doc", doc.data());
                var dataObj = doc.data();
                document.getElementById("disPlayCard").innerHTML += `
            
                <div class="col col-sm-12 col-md-3">
                    <div class="card">
                        <img src="${dataObj.image}" class="card-img-top" alt="..." height="300px" width="300px" >
                        <div class="card-body">
                            <p class="card-text">${dataObj.dish}</p>
                            <p class="card-text">${dataObj.Catorgory}</p>

                            <p class="card-text">${dataObj.dishType}</p>
                            <p class="card-text">${dataObj.price}</p>
                            <a href="#" id = ${doc.id} class='btn btn-primary'> Order  </a>
                        </div>
                    </div>
                </div>
        

            `;

            })

        })
}


var navbar = document.querySelector(".navbar");
console.log(navbar);
window.onscroll = function() {
    if (document.documentElement.scrollTop > 20) {
        navbar.classList.add("scrool")

    } else {
        navbar.classList.remove("scrool")

    }
}