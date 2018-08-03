

$( document ).ready(function() {

  var myUid;
  var indexval = "0";
  var itemdataRef ;
  var imagesArray = new Array();
  var las = 0;
  
  var userid = document.getElementById("userid");
  var genderup,categoryup,styleup,brandup,sizeup;
  var storageRef = firebase.storage().ref();
  var fi = document.getElementById("file");

  document.getElementById('file').addEventListener('change', handleFileSelect, false);
  document.getElementById('file').disabled = true;
    
  // checking if any user is signed in 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById('file').disabled = false;
          myUid = user.uid;
        
        $("#list").html("");
        
        $(".login-cover").hide();
        $(".signup-cover").hide();
        $(".forgotpassword-cover").hide();
        $("#listitem").hide();
        $("#uploadlistitem").hide();
        $("#list").show();

        
          var dialog = document.querySelector('#loginDialog');
          if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
          }
          dialog.close(); 
      
          var firebaseHeadingRef = firebase.database().ref().child("Users");
          var democard = document.getElementById("infocard");
          var firebasedataRef = firebase.database().ref().child("Users").child(myUid);

          firebasedataRef.once('value').then(function(snapshot) {
            // counting number of items entered by user
            las = snapshot.numChildren();
          });

          firebasedataRef.on('child_added',snap=>{

            var gender = snap.child("Gender").val();
            var category = snap.child("Category").val();
            var style = snap.child("Style").val();
            var brand = snap.child("Brand").val();
            var size = snap.child("Size").val();
            var infopiclink = snap.child("Infoimage0").val();
            

            var randomid = "item"+snap.key;
            var itemindex = snap.key;
            
            // appending list item dynamically
            $("#list").append('<div class="mdl-cell mdl-cell--4-col"><div class="demo-card-square mdl-card mdl-shadow--2dp"><div class="mdl-card__title mdl-card--expand"><img class="infopic" id='+randomid+' /><h2 class="mdl-card__title-text"> </h2></div><div class="mdl-card__supporting-text"> <table><thead><tr><th>Gender</th><td>'+gender+'</td></tr><tr><th>Category</th><td>'+category+'</td></tr><tr><th>Style</th><td>'+style+'</td></tr><tr><th>Brand</th><td>'+brand+'</td></tr><tr><th>Size</th><td>'+size+'</td></tr></thead></table></div><div class="mdl-card__actions mdl-card--border"><a id='+itemindex+' class="listbutton mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">UPDATE DETAILS</a></div></div></div>');
            
            $('#'+randomid).attr("src", infopiclink);
      
          
      });
    } else 
    {
            // No user is signed in.
            $(".login-cover").show();

            var dialog = document.querySelector('#loginDialog');
                if (! dialog.showModal) {
                  dialogPolyfill.registerDialog(dialog);
                }
                dialog.showModal();
    }
  });

  // whenever logout button in header onClickListener      
  $("#logoutBtn").click(function(){

          firebase.auth().signOut().then(function() {
              // Sign-out successful.
              $("#loginBtn").show();
              $("#loginProgress").hide();
          }).catch(function(error) {
              // An error happened.
              alert(error.message);
              
          });
  });

  // logout button in navigation drawer onClickListener  
  $("#drawerLogout").click(function(){

      firebase.auth().signOut().then(function() {
          // Sign-out successful.
          $("#loginBtn").show();
          $("#loginProgress").hide();
        }).catch(function(error) {
          // An error happened.
          alert(error.message);
          
        });
  });
    

  // login button onClickListener
  $("#loginBtn").click(function(){

          var email = $("#loginEmail").val();
          var password = $("#loginPassword").val();
          
          
          if(email!= ""&&password!=""){
              $("#loginProgress").show();
              $("#loginBtn").show();
              firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
                            
                            
              $("#loginError").show().text(errorMessage);
              $("#loginProgress").hide();
              $("#loginBtn").show();
                  
    
              });
                
          }    
  });
    
    
  // list item  onClickListener
  $(document).on('click', '.listbutton', function () {
    
    // getting indexvalue of clicked item
    indexval = $(this).attr('id');
    $("#list").hide();
    $("#listitem").show();

    // getting firebase reference 
    itemdataRef = firebase.database().ref().child("Users").child(myUid).child(indexval);

    itemdataRef.once('value').then(function(snap) {
        
        // getting values from firebase
        genderup = snap.child("Gender").val();
        categoryup = snap.child("Category").val();
        styleup = snap.child("Style").val();
        brandup = snap.child("Brand").val();
        sizeup = snap.child("Size").val();
        var infopiclinkval = snap.child("Infoimage0").val();
    
        $('#infopicval').attr("src", infopiclinkval);

        if(genderup==="Male"){
          $("#male").css('background-color', '#6200EE');
          $("#male").css('border', 'none');
          $("#male").css('color', 'white');
        }else if(genderup=="Female"){
          $("#female").css('background-color', '#6200EE');
          $("#female").css('border', 'none');
          $("#female").css('color', 'white');
        }

        if(categoryup=="Top"){
          $("#top").css('background-color', '#6200EE');
          $("#top").css('border', 'none');
          $("#top").css('color', 'white');
        }else if(categoryup=="Bottom"){
          $("#bottom").css('background-color', '#6200EE');
          $("#bottom").css('border', 'none');
          $("#bottom").css('color', 'white');
        }else if(categoryup=="Accessories"){
          $("#accessories").css('background-color', '#6200EE'); 
          $("#accessories").css('border', 'none'); 
          $("#accessories").css('color', 'white'); 
        }else if(categoryup=="Footwear"){
          $("#footwear").css('background-color', '#6200EE'); 
          $("#footwear").css('border', 'none'); 
          $("#footwear").css('color', 'white'); 
        }

        if(styleup=="Formal"){
          $("#formal").css('background-color', '#6200EE');  
          $("#formal").css('border', 'none');  
          $("#formal").css('color', 'white');
        }else if(styleup=="Casual"){
          $("#casual").css('background-color', '#6200EE');  
          $("#casual").css('border', 'none');  
          $("#casual").css('color', 'white'); 
        }else if(styleup=="Party"){
          $("#party").css('background-color', '#6200EE');  
          $("#party").css('border', 'none');  
          $("#party").css('color', 'white'); 
        }else if(styleup=="Special"){
          $("#special").css('background-color', '#6200EE');  
          $("#special").css('border', 'none');  
          $("#special").css('color', 'white'); 
        }

        if(brandup=="Levis"){
          $("#levis").css('background-color', '#6200EE');
          $("#levis").css('border', 'none');
          $("#levis").css('color', 'white'); 
        }else if(brandup=="Denim"){
          $("#denim").css('background-color', '#6200EE'); 
          $("#denim").css('border', 'none'); 
          $("#denim").css('color', 'white'); 
        }

        if(sizeup=="XS"){
          $("#xs").css('background-color', '#6200EE');  
          $("#xs").css('border', 'none');  
          $("#xs").css('color', 'white'); 
        }else if(sizeup=="S"){
          $("#s").css('background-color', '#6200EE');  
          $("#s").css('border', 'none');  
          $("#s").css('color', 'white'); 
        }else if(sizeup=="M"){
          $("#m").css('background-color', '#6200EE');  
          $("#m").css('border', 'none');  
          $("#m").css('color', 'white'); 
        }else if(sizeup=="L"){
          $("#l").css('background-color', '#6200EE');  
          $("#l").css('border', 'none');  
          $("#l").css('color', 'white'); 
        }else if(sizeup=="XL"){
          $("#xl").css('background-color', '#6200EE');  
          $("#xl").css('border', 'none');  
          $("#xl").css('color', 'white'); 
        }else if(sizeup=="XXL"){
          $("#xxl").css('background-color', '#6200EE');  
          $("#xxl").css('border', 'none');  
          $("#xxl").css('color', 'white'); 
        }

      });

  });

        
        
  $('#male').click(function(){
          $("#male").css('background-color', '#6200EE');
          $("#male").css('border', 'none');
          $("#male").css('color', 'white');

          $("#female").css('background-color', 'white');
          $("#female").css('border', '1px solid black');
          $("#female").css('color', 'black');

          genderup="Male";
  });

  $('#female').click(function(){
    $("#female").css('background-color', '#6200EE');
    $("#female").css('border', 'none');
    $("#female").css('color', 'white');

    $("#male").css('background-color', 'white');
    $("#male").css('border', '1px solid black');
    $("#male").css('color', 'black');

    genderup="Female";
  });


  $('#top').click(function(){ 

    $("#top").css('background-color', '#6200EE'); 
    $("#top").css('border', 'none'); 
    $("#top").css('color', 'white'); 
    
    $("#accessories").css('background-color', 'white'); 
    $("#accessories").css('border', '1px solid black'); 
    $("#accessories").css('color', 'black'); 
    
    $("#bottom").css('background-color', 'white'); 
    $("#bottom").css('border', '1px solid black'); 
    $("#bottom").css('color', 'black'); 
    
    $("#footwear").css('background-color', 'white'); 
    $("#footwear").css('border', '1px solid black'); 
    $("#footwear").css('color', 'black'); 
    
    categoryup="Top"; 
    
  }); 

  $('#accessories').click(function(){ 

    $("#accessories").css('background-color', '#6200EE'); 
    $("#accessories").css('border', 'none'); 
    $("#accessories").css('color', 'white'); 
    
    $("#top").css('background-color', 'white'); 
    $("#top").css('border', '1px solid black'); 
    $("#top").css('color', 'black'); 
    
    $("#bottom").css('background-color', 'white'); 
    $("#bottom").css('border', '1px solid black'); 
    $("#bottom").css('color', 'black'); 
    
    $("#footwear").css('background-color', 'white'); 
    $("#footwear").css('border', '1px solid black'); 
    $("#footwear").css('color', 'black'); 
    
    categoryup="Accessories"; 
    
  }); 


  $('#bottom').click(function(){ 

    $("#bottom").css('background-color', '#6200EE'); 
    $("#bottom").css('border', 'none'); 
    $("#bottom").css('color', 'white'); 
    
    $("#top").css('background-color', 'white'); 
    $("#top").css('border', '1px solid black'); 
    $("#top").css('color', 'black'); 
    
    $("#accessories").css('background-color', 'white'); 
    $("#accessories").css('border', '1px solid black'); 
    $("#accessories").css('color', 'black'); 
    
    $("#footwear").css('background-color', 'white'); 
    $("#footwear").css('border', '1px solid black'); 
    $("#footwear").css('color', 'black'); 
    
    categoryup="Bottom"; 
    
  }); 

  $('#footwear').click(function(){ 

    $("#footwear").css('background-color', '#6200EE'); 
    $("#footwear").css('border', 'none'); 
    $("#footwear").css('color', 'white'); 
    
    $("#top").css('background-color', 'white'); 
    $("#top").css('border', '1px solid black'); 
    $("#top").css('color', 'black'); 
    
    $("#accessories").css('background-color', 'white'); 
    $("#accessories").css('border', '1px solid black'); 
    $("#accessories").css('color', 'black'); 
    
    $("#bottom").css('background-color', 'white'); 
    $("#bottom").css('border', '1px solid black'); 
    $("#bottom").css('color', 'black'); 
    
    categoryup="Footwear"; 
    
  }); 
      
       

  $('#formal').click(function(){  



    $("#formal").css('background-color', '#6200EE');  
    
    $("#formal").css('border', 'none');  
    
    $("#formal").css('color', 'white');  
    
    $("#casual").css('background-color', 'white');  
    
    $("#casual").css('border', '1px solid black');  
    
    $("#casual").css('color', 'black');  
    
    $("#party").css('background-color', 'white');  
    
    $("#party").css('border', '1px solid black');  
    
    $("#party").css('color', 'black');  
    
    $("#special").css('background-color', 'white');  
    
    $("#special").css('border', '1px solid black');  
    
    $("#special").css('color', 'black');  
    
    styleup="Formal";  
    
  });  
    
    
  $('#casual').click(function(){  
  
    
    
  
  $("#casual").css('background-color', '#6200EE');  
  
  $("#casual").css('border', 'none');  
  
  $("#casual").css('color', 'white');  
  
  $("#formal").css('background-color', 'white');  
  
  $("#formal").css('border', '1px solid black');  
  
  $("#formal").css('color', 'black');  
  
  $("#party").css('background-color', 'white');  
  
  $("#party").css('border', '1px solid black');  
  
  $("#party").css('color', 'black');  
  
  $("#special").css('background-color', 'white');  
  
  $("#special").css('border', '1px solid black');  
  
  $("#special").css('color', 'black');  
  
  styleup="Casual";  
  
  });  
  
  
  $('#party').click(function(){  
  
    
    
  
  $("#party").css('background-color', '#6200EE');  
  
  $("#party").css('border', 'none');  
  
  $("#party").css('color', 'white');  
  
  $("#formal").css('background-color', 'white');  
  
  $("#formal").css('border', '1px solid black');  
  
  $("#formal").css('color', 'black');  
  
  $("#casual").css('background-color', 'white');  
  
  $("#casual").css('border', '1px solid black');  
  
  $("#casual").css('color', 'black');  
  
  $("#special").css('background-color', 'white');  
  
  $("#special").css('border', '1px solid black');  
  
  $("#special").css('color', 'black');  
  
  styleup="Party";  
  
  });  
  
  
  $('#special').click(function(){  
  
    
    
  
  $("#special").css('background-color', '#6200EE');  
  
  $("#special").css('border', 'none');  
  
  $("#special").css('color', 'white');  
  
  $("#formal").css('background-color', 'white');  
  
  $("#formal").css('border', '1px solid black');  
  
  $("#formal").css('color', 'black');  
  
  $("#casual").css('background-color', 'white');  
  
  $("#casual").css('border', '1px solid black');  
  
  $("#casual").css('color', 'black');  
  
  $("#party").css('background-color', 'white');  
  
  $("#party").css('border', '1px solid black');  
  
  $("#party").css('color', 'black');  
  
  styleup="Special";  
  
  }); 
  
  
  
  $('#levis').click(function(){ 

    $("#levis").css('background-color', '#6200EE'); 
    
    $("#levis").css('border', 'none'); 
    
    $("#levis").css('color', 'white'); 
    
      
      
    
    $("#denim").css('background-color', 'white'); 
    
    $("#denim").css('border', '1px solid black'); 
    
    $("#denim").css('color', 'black'); 
    
      
      
    
    brandup="Levis"; 
    
  }); 
    
    $('#denim').click(function(){ 
    
    $("#denim").css('background-color', '#6200EE'); 
    
    $("#denim").css('border', 'none'); 
    
    $("#denim").css('color', 'white'); 
    
      
      
    
    $("#levis").css('background-color', 'white'); 
    
    $("#levis").css('border', '1px solid black'); 
    
    $("#levis").css('color', 'black'); 
    
      
      
    
    brandup="Denim"; 
    
  }); 
    
                 
                 
                
                  
 

  $('#xs').click(function(){  

    $("#xs").css('background-color', '#6200EE');  
    
    $("#xs").css('border', 'none');  
    
    $("#xs").css('color', 'white');  
    
    $("#s").css('background-color', 'white');  
    
    $("#s").css('border', '1px solid black');  
    
    $("#s").css('color', 'black');  
    
    $("#m").css('background-color', 'white');  
    
    $("#m").css('border', '1px solid black');  
    
    $("#m").css('color', 'black');  
    
    $("#l").css('background-color', 'white');  
    
    $("#l").css('border', '1px solid black');  
    
    $("#l").css('color', 'black'); 
    
    $("#xl").css('background-color', 'white');  
    
    $("#xl").css('border', '1px solid black');  
    
    $("#xl").css('color', 'black'); 
    
    $("#xxl").css('background-color', 'white');  
    
    $("#xxl").css('border', '1px solid black');  
    
    $("#xxl").css('color', 'black');  
    
    sizeup="XS";  
    
  });  
  
  $('#s').click(function(){  
  
  $("#s").css('background-color', '#6200EE');  
  
  $("#s").css('border', 'none');  
  
  $("#s").css('color', 'white');  
  
  $("#xs").css('background-color', 'white');  
  
  $("#xs").css('border', '1px solid black');  
  
  $("#xs").css('color', 'black');  
  
  $("#m").css('background-color', 'white');  
  
  $("#m").css('border', '1px solid black');  
  
  $("#m").css('color', 'black');  
  
  $("#l").css('background-color', 'white');  
  
  $("#l").css('border', '1px solid black');  
  
  $("#l").css('color', 'black');  
  
  $("#xl").css('background-color', 'white');  
  
  $("#xl").css('border', '1px solid black');  
  
  $("#xl").css('color', 'black'); 
  
  $("#xxl").css('background-color', 'white');  
  
  $("#xxl").css('border', '1px solid black');  
  
  $("#xxl").css('color', 'black'); 
  
  sizeup="S";  
  
  });  
  
  $('#m').click(function(){  
  
  $("#m").css('background-color', '#6200EE');  
  
  $("#m").css('border', 'none');  
  
  $("#m").css('color', 'white');  
  
  $("#xs").css('background-color', 'white');  
  
  $("#xs").css('border', '1px solid black');  
  
  $("#xs").css('color', 'black');  
  
  $("#s").css('background-color', 'white');  
  
  $("#s").css('border', '1px solid black');  
  
  $("#s").css('color', 'black');  
  
  $("#l").css('background-color', 'white');  
  
  $("#l").css('border', '1px solid black');  
  
  $("#l").css('color', 'black');  
  
  $("#xl").css('background-color', 'white');  
  
  $("#xl").css('border', '1px solid black');  
  
  $("#xl").css('color', 'black'); 
  
  $("#xxl").css('background-color', 'white');  
  
  $("#xxl").css('border', '1px solid black');  
  
  $("#xxl").css('color', 'black'); 
  
  sizeup="M";  
  
  });  
  
  $('#l').click(function(){  
  
  $("#l").css('background-color', '#6200EE');  
  
  $("#l").css('border', 'none');  
  
  $("#l").css('color', 'white');  
  
  $("#xs").css('background-color', 'white');  
  
  $("#xs").css('border', '1px solid black');  
  
  $("#xs").css('color', 'black');  
  
  $("#s").css('background-color', 'white');  
  
  $("#s").css('border', '1px solid black');  
  
  $("#s").css('color', 'black');  
  
  $("#m").css('background-color', 'white');  
  
  $("#m").css('border', '1px solid black');  
  
  $("#m").css('color', 'black');  
  
  $("#xl").css('background-color', 'white');  
  
  $("#xl").css('border', '1px solid black');  
  
  $("#xl").css('color', 'black'); 
  
  $("#xxl").css('background-color', 'white');  
  
  $("#xxl").css('border', '1px solid black');  
  
  $("#xxl").css('color', 'black'); 
  
  sizeup="L";  
  
  });  
  
 
  $('#xl').click(function(){  
  
  $("#xl").css('background-color', '#6200EE');  
  
  $("#xl").css('border', 'none');  
  
  $("#xl").css('color', 'white');  
  
  $("#xs").css('background-color', 'white');  
  
  $("#xs").css('border', '1px solid black');  
  
  $("#xs").css('color', 'black');  
  
  $("#s").css('background-color', 'white');  
  
  $("#s").css('border', '1px solid black');  
  
  $("#s").css('color', 'black');  
  
  $("#m").css('background-color', 'white');  
  
  $("#m").css('border', '1px solid black');  
  
  $("#m").css('color', 'black');  
  
  $("#l").css('background-color', 'white');  
  
  $("#l").css('border', '1px solid black');  
  
  $("#l").css('color', 'black'); 
  
  $("#xxl").css('background-color', 'white');  
  
  $("#xxl").css('border', '1px solid black');  
  
  $("#xxl").css('color', 'black'); 
  
  sizeup="XL";  
  
  });  
  
 
  $('#xxl').click(function(){  
  
  $("#xxl").css('background-color', '#6200EE');  
  
  $("#xxl").css('border', 'none');  
  
  $("#xxl").css('color', 'white');  
  
  $("#xs").css('background-color', 'white');  
  
  $("#xs").css('border', '1px solid black');  
  
  $("#xs").css('color', 'black');  
  
  $("#s").css('background-color', 'white');  
  
  $("#s").css('border', '1px solid black');  
  
  $("#s").css('color', 'black');  
  
  $("#m").css('background-color', 'white');  
  
  $("#m").css('border', '1px solid black');  
  
  $("#m").css('color', 'black');  
  
  $("#l").css('background-color', 'white');  
  
  $("#l").css('border', '1px solid black');  
  
  $("#l").css('color', 'black'); 
  
  $("#xl").css('background-color', 'white');  
  
  $("#xl").css('border', '1px solid black');  
  
  $("#xl").css('color', 'black'); 
  
  sizeup="XXL";  
  
  });  
  
   

  $('#upload-male').click(function(){ 

    $("#upload-male").css('background-color', '#6200EE'); 
    
    $("#upload-male").css('border', 'none'); 
    
    $("#upload-male").css('color', 'white'); 
    
     
     
    
    $("#upload-female").css('background-color', 'white'); 
    
    $("#upload-female").css('border', '1px solid black'); 
    
    $("#upload-female").css('color', 'black'); 
    
     
     
    
    genderup="Male"; 
    
  }); 
    
     
     
    
    $('#upload-female').click(function(){ 
    
    $("#upload-female").css('background-color', '#6200EE'); 
    
    $("#upload-female").css('border', 'none'); 
    
    $("#upload-female").css('color', 'white'); 
    
     
     
    
    $("#upload-male").css('background-color', 'white'); 
    
    $("#upload-male").css('border', '1px solid black'); 
    
    $("#upload-male").css('color', 'black'); 
    
     
     
    
    genderup="Female"; 
    
    }); 
    
     
     
     
    
    $('#upload-top').click(function(){  
    
     
     
    
    $("#upload-top").css('background-color', '#6200EE');  
    
    $("#upload-top").css('border', 'none');  
    
    $("#upload-top").css('color', 'white');  
    
    $("#upload-accessories").css('background-color', 'white');  
    
    $("#upload-accessories").css('border', '1px solid black');  
    
    $("#upload-accessories").css('color', 'black');  
    
    $("#upload-bottom").css('background-color', 'white');  
    
    $("#upload-bottom").css('border', '1px solid black');  
    
    $("#upload-bottom").css('color', 'black');  
    
    $("#upload-footwear").css('background-color', 'white');  
    
    $("#upload-footwear").css('border', '1px solid black');  
    
    $("#upload-footwear").css('color', 'black');  
    
    categoryup="Top";  
    
    });  
    
     
     
    
    $('#upload-accessories').click(function(){  
    
     
     
    
    $("#upload-accessories").css('background-color', '#6200EE');  
    
    $("#upload-accessories").css('border', 'none');  
    
    $("#upload-accessories").css('color', 'white');  
    
    $("#upload-top").css('background-color', 'white');  
    
    $("#upload-top").css('border', '1px solid black');  
    
    $("#upload-top").css('color', 'black');  
    
    $("#upload-bottom").css('background-color', 'white');  
    
    $("#upload-bottom").css('border', '1px solid black');  
    
    $("#upload-bottom").css('color', 'black');  
    
    $("#upload-footwear").css('background-color', 'white');  
    
    $("#upload-footwear").css('border', '1px solid black');  
    
    $("#upload-footwear").css('color', 'black');  
    
    categoryup="Accessories";  
    
    });  
    
     
     
     
    
    $('#upload-bottom').click(function(){  
    
     
     
    
    $("#upload-bottom").css('background-color', '#6200EE');  
    
    $("#upload-bottom").css('border', 'none');  
    
    $("#upload-bottom").css('color', 'white');  
    
    $("#upload-top").css('background-color', 'white');  
    
    $("#upload-top").css('border', '1px solid black');  
    
    $("#upload-top").css('color', 'black');  
    
    $("#upload-accessories").css('background-color', 'white');  
    
    $("#upload-accessories").css('border', '1px solid black');  
    
    $("#upload-accessories").css('color', 'black');  
    
    $("#upload-footwear").css('background-color', 'white');  
    
    $("#upload-footwear").css('border', '1px solid black');  
    
    $("#upload-footwear").css('color', 'black');  
    
    categoryup="Bottom";  
    
    });  
    
     
     
    
    $('#upload-footwear').click(function(){  
    
     
     
    
    $("#upload-footwear").css('background-color', '#6200EE');  
    
    $("#upload-footwear").css('border', 'none');  
    
    $("#upload-footwear").css('color', 'white');  
    
    $("#upload-top").css('background-color', 'white');  
    
    $("#upload-top").css('border', '1px solid black');  
    
    $("#upload-top").css('color', 'black');  
    
    $("#upload-accessories").css('background-color', 'white');  
    
    $("#upload-accessories").css('border', '1px solid black');  
    
    $("#upload-accessories").css('color', 'black');  
    
    $("#upload-bottom").css('background-color', 'white');  
    
    $("#upload-bottom").css('border', '1px solid black');  
    
    $("#upload-bottom").css('color', 'black');  
    
    categoryup="Footwear";  
    
    });  
    
     
     
    
    $('#upload-formal').click(function(){  
    
     
     
    
     
     
    
    $("#upload-formal").css('background-color', '#6200EE');  
    
    $("#upload-formal").css('border', 'none');  
    
    $("#upload-formal").css('color', 'white');  
    
    $("#upload-casual").css('background-color', 'white');  
    
    $("#upload-casual").css('border', '1px solid black');  
    
    $("#upload-casual").css('color', 'black');  
    
    $("#upload-party").css('background-color', 'white');  
    
    $("#upload-party").css('border', '1px solid black');  
    
    $("#upload-party").css('color', 'black');  
    
    $("#upload-special").css('background-color', 'white');  
    
    $("#upload-special").css('border', '1px solid black');  
    
    $("#upload-special").css('color', 'black');  
    
    styleup="Formal";  
    
    });  
    
    $('#upload-casual').click(function(){  
    
    $("#upload-casual").css('background-color', '#6200EE');  
    
    $("#upload-casual").css('border', 'none');  
    
    $("#upload-casual").css('color', 'white');  
    
    $("#upload-formal").css('background-color', 'white');  
    
    $("#upload-formal").css('border', '1px solid black');  
    
    $("#upload-formal").css('color', 'black');  
    
    $("#upload-party").css('background-color', 'white');  
    
    $("#upload-party").css('border', '1px solid black');  
    
    $("#upload-party").css('color', 'black');  
    
    $("#upload-special").css('background-color', 'white');  
    
    $("#upload-special").css('border', '1px solid black');  
    
    $("#upload-special").css('color', 'black');  
    
    styleup="Casual";  
    
    });  
    
    $('#upload-party').click(function(){  
    
    $("#upload-party").css('background-color', '#6200EE');  
    
    $("#upload-party").css('border', 'none');  
    
    $("#upload-party").css('color', 'white');  
    
    $("#upload-formal").css('background-color', 'white');  
    
    $("#upload-formal").css('border', '1px solid black');  
    
    $("#upload-formal").css('color', 'black');  
    
    $("#upload-casual").css('background-color', 'white');  
    
    $("#upload-casual").css('border', '1px solid black');  
    
    $("#upload-casual").css('color', 'black');  
    
    $("#upload-special").css('background-color', 'white');  
    
    $("#upload-special").css('border', '1px solid black');  
    
    $("#upload-special").css('color', 'black');  
    
    styleup="Party";  
    
    });  
    
    $('#upload-special').click(function(){  
    
    $("#upload-special").css('background-color', '#6200EE');  
    
    $("#upload-special").css('border', 'none');  
    
    $("#upload-special").css('color', 'white');  
    
    $("#upload-formal").css('background-color', 'white');  
    
    $("#upload-formal").css('border', '1px solid black');  
    
    $("#upload-formal").css('color', 'black');  
    
    $("#upload-casual").css('background-color', 'white');  
    
    $("#upload-casual").css('border', '1px solid black');  
    
    $("#upload-casual").css('color', 'black');  
    
    $("#upload-party").css('background-color', 'white');  
    
    $("#upload-party").css('border', '1px solid black');  
    
    $("#upload-party").css('color', 'black');  
    
    styleup="Special";  
    
    });  
    
    $('#upload-levis').click(function(){  
    
     
     
    
    $("#upload-levis").css('background-color', '#6200EE');  
    
    $("#upload-levis").css('border', 'none');  
    
    $("#upload-levis").css('color', 'white');  
    
    $("#upload-denim").css('background-color', 'white');  
    
    $("#upload-denim").css('border', '1px solid black');  
    
    $("#upload-denim").css('color', 'black');  
    
    brandup="Levis";  
    
    });  
    
    $('#upload-denim').click(function(){  
    
    $("#upload-denim").css('background-color', '#6200EE');  
    
    $("#upload-denim").css('border', 'none');  
    
    $("#upload-denim").css('color', 'white');  
    
    $("#upload-levis").css('background-color', 'white');  
    
    $("#upload-levis").css('border', '1px solid black');  
    
    $("#upload-levis").css('color', 'black');  
    
    brandup="Denim";  
    
    });  
    
     
     
    
    $('#upload-xs').click(function(){  

      $("#upload-xs").css('background-color', '#6200EE');  
      
      $("#upload-xs").css('border', 'none');  
      
      $("#upload-xs").css('color', 'white');  
      
      $("#upload-s").css('background-color', 'white');  
      
      $("#upload-s").css('border', '1px solid black');  
      
      $("#upload-s").css('color', 'black');   
      
      $("#upload-m").css('background-color', 'white');  
      
      $("#upload-m").css('border', '1px solid black');  
      
      $("#upload-m").css('color', 'black');  
      
      $("#upload-l").css('background-color', 'white');  
      
      $("#upload-l").css('border', '1px solid black');  
      
      $("#upload-l").css('color', 'black');  
      
      $("#upload-xl").css('background-color', 'white');  
      
      $("#upload-xl").css('border', '1px solid black');  
      
      $("#upload-xl").css('color', 'black');  
      
      $("#upload-xxl").css('background-color', 'white');  
      
      $("#upload-xxl").css('border', '1px solid black');  
      
      $("#upload-xxl").css('color', 'black');  
      
      sizeup="XS";  
      
      });  
      
      $('#upload-s').click(function(){  
      
      $("#upload-s").css('background-color', '#6200EE');  
      
      $("#upload-s").css('border', 'none');  
      
      $("#upload-s").css('color', 'white');  
      
      $("#upload-xs").css('background-color', 'white');  
      
      $("#upload-xs").css('border', '1px solid black');  
      
      $("#upload-xs").css('color', 'black');  
      $("#upload-m").css('background-color', 'white');  
      
      $("#upload-m").css('border', '1px solid black');  
      
      $("#upload-m").css('color', 'black'); 
      
      $("#upload-l").css('background-color', 'white');  
      
      $("#upload-l").css('border', '1px solid black');  
      
      $("#upload-l").css('color', 'black');  
      
      $("#upload-xl").css('background-color', 'white');  
      
      $("#upload-xl").css('border', '1px solid black');  
      
      $("#upload-xl").css('color', 'black');  
      
      $("#upload-xxl").css('background-color', 'white');  
      
      $("#upload-xxl").css('border', '1px solid black');  
      
      $("#upload-xxl").css('color', 'black');  
      
      sizeup="S";  
      
      });  
      
      $('#upload-m').click(function(){  
      
      $("#upload-m").css('background-color', '#6200EE');  
      
      $("#upload-m").css('border', 'none');  
      
      $("#upload-m").css('color', 'white');  
      
      $("#upload-xs").css('background-color', 'white');  
      
      $("#upload-xs").css('border', '1px solid black');  
      
      $("#upload-xs").css('color', 'black');  
      
      $("#upload-s").css('background-color', 'white');  
      
      $("#upload-s").css('border', '1px solid black');  
      
      $("#upload-s").css('color', 'black');  
      
      $("#upload-l").css('background-color', 'white');  
      
      $("#upload-l").css('border', '1px solid black');  
      
      $("#upload-l").css('color', 'black');  
      
      $("#upload-xl").css('background-color', 'white');  
      
      $("#upload-xl").css('border', '1px solid black');  
      
      $("#upload-xl").css('color', 'black');  
      
      $("#upload-xxl").css('background-color', 'white');  
      
      $("#upload-xxl").css('border', '1px solid black');  
      
      $("#upload-xxl").css('color', 'black');  
      
      sizeup="M";  
      
      });  
      
      $('#upload-l').click(function(){  
      
      $("#upload-l").css('background-color', '#6200EE');  
      
      $("#upload-l").css('border', 'none');  
      
      $("#upload-l").css('color', 'white');  
      
      $("#upload-xs").css('background-color', 'white');  
      
      $("#upload-xs").css('border', '1px solid black');  
      
      $("#upload-xs").css('color', 'black');  
      
      $("#upload-s").css('background-color', 'white');  
      
      $("#upload-s").css('border', '1px solid black');  
      
      $("#upload-s").css('color', 'black');  
      
      $("#upload-m").css('background-color', 'white');  
      
      $("#upload-m").css('border', '1px solid black');  
      
      $("#upload-m").css('color', 'black');  
     
      $("#upload-xl").css('background-color', 'white');  
      
      $("#upload-xl").css('border', '1px solid black');  
      
      $("#upload-xl").css('color', 'black');  
      
      $("#upload-xxl").css('background-color', 'white');  
      
      $("#upload-xxl").css('border', '1px solid black');  
      
      $("#upload-xxl").css('color', 'black');  
      
      sizeup="L";  
      
      });  
      
      $('#upload-xl').click(function(){  
      
      $("#upload-xl").css('background-color', '#6200EE');  
      
      $("#upload-xl").css('border', 'none');  
      
      $("#upload-xl").css('color', 'white');  
      
      $("#upload-xs").css('background-color', 'white');  
      
      $("#upload-xs").css('border', '1px solid black');  
      
      $("#upload-xs").css('color', 'black');  
      
      $("#upload-s").css('background-color', 'white');  
      
      $("#upload-s").css('border', '1px solid black');  
      
      $("#upload-s").css('color', 'black');  
      
      $("#upload-m").css('background-color', 'white');  
      
      $("#upload-m").css('border', '1px solid black');  
      
      $("#upload-m").css('color', 'black');  
      
      $("#upload-l").css('background-color', 'white');  
      
      $("#upload-l").css('border', '1px solid black');  
      
      $("#upload-l").css('color', 'black'); 
      
      $("#upload-xxl").css('background-color', 'white');  
      
      $("#upload-xxl").css('border', '1px solid black');  
      
      $("#upload-xxl").css('color', 'black');  
      
      sizeup="XL";  
      
      });  
      
      $('#upload-xxl').click(function(){  
      
      $("#upload-xxl").css('background-color', '#6200EE');  
      
      $("#upload-xxl").css('border', 'none');  
      
      $("#upload-xxl").css('color', 'white');  
      
      $("#upload-xs").css('background-color', 'white');  
      
      $("#upload-xs").css('border', '1px solid black');  
      
      $("#upload-xs").css('color', 'black');  
      
      $("#upload-s").css('background-color', 'white');  
      
      $("#upload-s").css('border', '1px solid black');  
      
      $("#upload-s").css('color', 'black');  
      
      $("#upload-m").css('background-color', 'white');  
      
      $("#upload-m").css('border', '1px solid black');  
      
      $("#upload-m").css('color', 'black');  
      
      $("#upload-l").css('background-color', 'white');  
      
      $("#upload-l").css('border', '1px solid black');  
      
      $("#upload-l").css('color', 'black');  
      
      $("#upload-xl").css('background-color', 'white');  
      
      $("#upload-xl").css('border', '1px solid black');  
      
      $("#upload-xl").css('color', 'black');  
      
      sizeup="XXL";  
      
      });  
      
        
    
     
  
   




      // updating details
    $('#updatebtn').click(function(){

      itemdataRef.child("Gender").set(genderup);
      itemdataRef.child("Category").set(categoryup);
      itemdataRef.child("Brand").set(brandup);
      itemdataRef.child("Style").set(styleup);
      itemdataRef.child("Size").set(sizeup);

      $("#listitem").hide();
      $("#list").show();


    location.reload();

    });

    //when cross icon is clicked
    $("#goback").click(function(){

      $("#listitem").hide();
      $("#list").show();

      $("#male").css('background-color', 'white');
      $("#male").css('border', '1px solid black');
      $("#male").css('color', 'black');

      $("#female").css('background-color', 'white');
      $("#female").css('border', '1px solid black');
      $("#female").css('color', 'black');

      $("#top").css('background-color', 'white'); 
      $("#top").css('border', '1px solid black'); 
      $("#top").css('color', 'black'); 

      $("#bottom").css('background-color', 'white'); 
      $("#bottom").css('border', '1px solid black'); 
      $("#bottom").css('color', 'black'); 

      $("#accessories").css('background-color', 'white'); 
      $("#accessories").css('border', '1px solid black'); 
      $("#accessories").css('color', 'black'); 

      $("#footwear").css('background-color', 'white'); 
      $("#footwear").css('border', '1px solid black'); 
      $("#footwear").css('color', 'black'); 

      $("#formal").css('background-color', 'white'); 
      $("#formal").css('border', '1px solid black'); 
      $("#formal").css('color', 'black'); 

      $("#casual").css('background-color', 'white'); 
      $("#casual").css('border', '1px solid black'); 
      $("#casual").css('color', 'black'); 

      $("#party").css('background-color', 'white'); 
      $("#party").css('border', '1px solid black'); 
      $("#party").css('color', 'black');
      
      $("#special").css('background-color', 'white'); 
      $("#special").css('border', '1px solid black'); 
      $("#special").css('color', 'black'); 

      $("#levis").css('background-color', 'white'); 
      $("#levis").css('border', '1px solid black'); 
      $("#levis").css('color', 'black'); 

      $("#denim").css('background-color', 'white'); 
      $("#denim").css('border', '1px solid black'); 
      $("#denim").css('color', 'black'); 

      $("#s").css('background-color', 'white'); 
      $("#s").css('border', '1px solid black'); 
      $("#s").css('color', 'black'); 

      $("#xs").css('background-color', 'white'); 
      $("#xs").css('border', '1px solid black'); 
      $("#xs").css('color', 'black'); 

      $("#m").css('background-color', 'white'); 
      $("#m").css('border', '1px solid black'); 
      $("#m").css('color', 'black'); 

      $("#l").css('background-color', 'white'); 
      $("#l").css('border', '1px solid black'); 
      $("#l").css('color', 'black'); 

      $("#xl").css('background-color', 'white'); 
      $("#xl").css('border', '1px solid black'); 
      $("#xl").css('color', 'black'); 

      $("#xxl").css('background-color', 'white'); 
      $("#xxl").css('border', '1px solid black'); 
      $("#xxl").css('color', 'black'); 

      

    });

    $("#upload-goback").click(function(){

      imagesArray=[];
      $("#listpics").empty();
      
      $(".imguploadbg").show();

      $("#uploadlistitem").hide();
      $("#listitem").hide();
      $("#list").show();

      $("#male").css('background-color', 'white');
      $("#male").css('border', '1px solid black');
      $("#male").css('color', 'black');

      $("#female").css('background-color', 'white');
      $("#female").css('border', '1px solid black');
      $("#female").css('color', 'black');

      $("#top").css('background-color', 'white'); 
      $("#top").css('border', '1px solid black'); 
      $("#top").css('color', 'black'); 

      $("#bottom").css('background-color', 'white'); 
      $("#bottom").css('border', '1px solid black'); 
      $("#bottom").css('color', 'black'); 

      $("#accessories").css('background-color', 'white'); 
      $("#accessories").css('border', '1px solid black'); 
      $("#accessories").css('color', 'black'); 

      $("#footwear").css('background-color', 'white'); 
      $("#footwear").css('border', '1px solid black'); 
      $("#footwear").css('color', 'black'); 

      $("#formal").css('background-color', 'white'); 
      $("#formal").css('border', '1px solid black'); 
      $("#formal").css('color', 'black'); 

      $("#casual").css('background-color', 'white'); 
      $("#casual").css('border', '1px solid black'); 
      $("#casual").css('color', 'black'); 

      $("#party").css('background-color', 'white'); 
      $("#party").css('border', '1px solid black'); 
      $("#party").css('color', 'black');
      
      $("#special").css('background-color', 'white'); 
      $("#special").css('border', '1px solid black'); 
      $("#special").css('color', 'black'); 

      $("#levis").css('background-color', 'white'); 
      $("#levis").css('border', '1px solid black'); 
      $("#levis").css('color', 'black'); 

      $("#denim").css('background-color', 'white'); 
      $("#denim").css('border', '1px solid black'); 
      $("#denim").css('color', 'black'); 

      $("#s").css('background-color', 'white'); 
      $("#s").css('border', '1px solid black'); 
      $("#s").css('color', 'black'); 

      $("#xs").css('background-color', 'white'); 
      $("#xs").css('border', '1px solid black'); 
      $("#xs").css('color', 'black'); 

      $("#m").css('background-color', 'white'); 
      $("#m").css('border', '1px solid black'); 
      $("#m").css('color', 'black'); 

      $("#l").css('background-color', 'white'); 
      $("#l").css('border', '1px solid black'); 
      $("#l").css('color', 'black'); 

      $("#xl").css('background-color', 'white'); 
      $("#xl").css('border', '1px solid black'); 
      $("#xl").css('color', 'black'); 

      $("#xxl").css('background-color', 'white'); 
      $("#xxl").css('border', '1px solid black'); 
      $("#xxl").css('color', 'black'); 

      

    });    
    
   


$('#btnSignup').click(function(){

   $(".signup-cover").show();
   $(".login-cover").hide();
   $(".signupHide").show();
  // $('.forogotpassword-cover').hide();


   var signindialog = document.querySelector('#loginDialog');
    if (! signindialog.showModal) {
      dialogPolyfill.registerDialog(signindialog);
    }
     signindialog.close(); 
    

    var signupdialog = document.querySelector('#signupDialog');
        if (! signupdialog.showModal) {
          dialogPolyfill.registerDialog(signupdialog);
        }
         signupdialog.showModal();
});
   


$('#btnSignin').click(function(){

 //  alert("btnsignin");

 $(".login-cover").show();
  $(".signup-cover").hide();
  //$('.forogotpassword-cover').hide();

  var dialog = document.querySelector('#loginDialog');
  if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
   dialog.showModal(); 

   var signupdialog = document.querySelector('#signupDialog');
        if (! signupdialog.showModal) {
          dialogPolyfill.registerDialog(signupdialog);
        }
         signupdialog.close();

});




$('#forogotpassword').click(function(){


  $('.forogotpassword-cover').show();
 // $(".signup-cover").hide();
  $(".login-cover").hide();

  $("#listitem").hide();

  $("#uploadlistitem").hide();
  $("#list").hide();



  
  var forgotpassworddialog = document.querySelector('#forgotpasswordDialog');
  if (! forgotpassworddialog.showModal) {
    dialogPolyfill.registerDialog(forgotpassworddialog);
  }
  forgotpassworddialog.showModal();

  var signindialog = document.querySelector('#loginDialog');
   if (! signindialog.showModal) {
     dialogPolyfill.registerDialog(signindialog);
   }
    signindialog.close(); 
   

});



$('#backlogin').click(function(){

  $(".login-cover").show();
  $('.forogotpassword-cover').hide();
  $(".signup-cover").hide();
  
  var signindialog = document.querySelector('#loginDialog');
  if (! signindialog.showModal) {
    dialogPolyfill.registerDialog(signindialog);
  }
   signindialog.showModal(); 

  var forgotpassworddialog = document.querySelector('#forgotpasswordDialog');
  if (! forgotpassworddialog.showModal) {
    dialogPolyfill.registerDialog(forgotpassworddialog);
  }
 forgotpassworddialog.close();

 
   
});

    
    
$("#resetpasswordBtn").click(function(){

      var email = $("#forgotpasswordEmail").val();
      var auth = firebase.auth();
            
      if(email!= ""){
          $("#resetProgress").show();
          auth.sendPasswordResetEmail(email).then(function() {
            $("#forgotpasswordError").show().text("We have sent you instructions to reset your password");
            $("#resetProgress").hide();
          }).catch(function(error) {
            $("#resetProgress").hide();

            var errorCode = error.code;
            var errorMessage = error.message;
            $("#forgotpasswordError").show().text(errorMessage);

          });

             
      }    
  });





  $("#signupBtn").click(
    function(){
        var email = $("#signupEmail").val();
        var password = $("#signupPassword").val();
        var repassword = $("#signupRePassword").val();
        
        
        if(email!= ""&&password!=""&&repassword!=""){


          if(password!=repassword){
            $("#signupError").show().text("Passwords doesn't match. Enter again");
            $("#signupPassword").text("");
            $("#signupRePassword").text("");
          }else{
            $("#signupProgress").show();
            $("#signupBtn").show();

            firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
              
              $("#signupError").show().text("User Created Successfully. Login to continue.");
              $(".signupHide").hide();
              $("#signupProgress").hide();
              
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              $("#signupError").show().text(errorMessage);
                
              $("#signupProgress").hide();
              $("#signupBtn").show();
            });
          }

            
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                              
                
               
                
  
});
               
        }    
    });


        
    $("#uploadBtn").click(function(){

          $("#list").hide();
          $("#listitem").hide();
          $("#uploadlistitem").show();

    
        });

        $("#drawerupload").click(function(){
              $("#list").hide();
              $("#listitem").hide();
              $("#uploadlistitem").show();
    
        
            });

        


        $('#upload-updatebtn').click(function(){

          itemdataRef = firebase.database().ref().child("Users").child(myUid).child(las);

          itemdataRef.child("Gender").set(genderup);
          itemdataRef.child("Category").set(categoryup);
          itemdataRef.child("Brand").set(brandup);
          itemdataRef.child("Style").set(styleup);
          itemdataRef.child("Size").set(sizeup);

          var j=0;
          for(j=0;j<imagesArray.length;j++){
            itemdataRef.child("Infoimage"+j).set(imagesArray[j]);
          }

          imagesArray=[];

          $("#listpics").empty();
          
          $(".imguploadbg").show();

          $("#uploadlistitem").hide();
          $("#list").show();


       location.reload();

        });
   

        function handleFileSelect(evt) {
          evt.stopPropagation();
          evt.preventDefault();
    
            var fileslist = new Array();
            var i;
            var file;
            var picid,one,two,three;

            

            for(i=0;i<fi.files.length;i++){
                file = evt.target.files[i];
                fileslist[i]=file.name;
            picid = "uploadedpic"+i;
            
         var metadata = {
            'contentType': file.type
          };
    
    
        // Push to child path.
          // [START oncomplete]
          storageRef.child(myUid).child(fileslist[i]).put(file, metadata).then(function(snapshot) {
            console.log('Uploaded', snapshot.totalBytes, 'bytes.');
            console.log('File metadata:', snapshot.metadata);
            // Let's get a download URL for the file.
            snapshot.ref.getDownloadURL().then(function(url) {
              console.log('File available at', url);
              // [START_EXCLUDE]
            //  document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
            
    
            $("#listpics").append('<div class="uploadedImg"><img src='+url+'></div>');

            imagesArray.push(url);
    
              // [END_EXCLUDE]
            });
          }).catch(function(error) {
            // [START onfailure]
            console.error('Upload failed:', error);
            // [END onfailure]
          });
          // [END oncomplete]
        }

        $(".imguploadbg").css('display','none');
    
        }

    });















