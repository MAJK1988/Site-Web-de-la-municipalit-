var body = document.getElementsByTagName('body')[0];
var tbl = document.createElement('table');
tbl.id='tbl';
            tbl.style.width = '95%';
            tbl.style.marginLeft='auto';
            tbl.style.marginRight='auto';
            tbl.style.marginTop='10px';
            tbl.style.border='none';
            tbl.style.direction='rtl';
            tbl.setAttribute('border', '1');
var tbdy = document.createElement('tbody');
var div = document.createElement('div');

var tblSimilar = document.createElement('table');
tblSimilar.id='tbl';
            tblSimilar.style.width = '95%';
            tblSimilar.style.marginLeft='auto';
            tblSimilar.style.marginRight='auto';
            tblSimilar.style.marginTop='10px';
            tblSimilar.style.border='none';
            tblSimilar.style.direction='rtl';
            tblSimilar.setAttribute('border', '1');
var tbdySimilar = document.createElement('tbody');
var divSimilar = document.createElement('div');


// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx


function checkUserFullName(){
    var userSurname = document.getElementById("userFullName").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userFullNameError").style.display = "block";
    }else{
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserSurname(){
    var userSurname = document.getElementById("userSurname").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userSurnameError").style.display = "block";
    }else{
        document.getElementById("userSurnameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(userEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userEmailError").style.display = "block";
    }else{
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userPassword.value.match(userPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userPasswordError").style.display = "block";
    }else{
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio(){
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if(flag){
        document.getElementById("userBioError").style.display = "block";
    }else{
        document.getElementById("userBioError").style.display = "none";
    }
}
// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
    var userFullName = document.getElementById("userFullName").value;
    var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }else if(userSurname === ""){
        return checkUserSurname();
    }else if(checkUserEmailValid == null){
        return checkUserEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserPassword();
    }else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: userFullName,
                userSurname: userSurname,
                userEmail: userEmail,
                userPassword: userPassword,
                userUi:  user.uid,
            
            }
            firebaseRef.child(uid).set(userData);
            window.location.replace("welcome.html");
            swal('Your Account Created','Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function(){
                   
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
           
        });
    }
}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail(){
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userSIEmail.value.match(userSIEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userSIEmailError").style.display = "block";
    }else{
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword(){
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userSIPassword.value.match(userSIPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userSIPasswordError").style.display = "block";
    }else{
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn(){
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
 
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if(checkUserEmailValid == null){
        return checkUserSIEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserSIPassword();
    }else{
        console.log(userSIEmail, ' ',userSIPassword);
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            window.location.replace("welcome.html");
        
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
           console.log(error.code);
        });
    }
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
    //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if(user != null){
            uid = user.uid;
        }
        /*let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{

        })*/
    } else {
    //   No user is signed in.
    }
});

// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.replace("Login.html");
      
    }).catch(function(error) {
        // An error happened.
        console.log(error.message);
    });
}

function SearchNameFamilly(){

    JsonObject='[';
                 
                    var ExistName=false;
                    try{          
                        tbl.innerHTML = "";
                        tbdy.innerHTML ="";
                         
                        div.innerHTML ="";  }
                     catch{}
                   
    
                if (document.getElementById('name').value.length != 0 && 
                document.getElementById('Family').value.length != 0 && 
                document.getElementById('fathername').value.length != 0 ){
    
                var _name=document.getElementById('name').value.trim();
                var _family=document.getElementById('Family').value.trim();
                
                var fathername=document.getElementById('fathername').value.trim();
                
                var family_exist=false;
                
                var ref=firebase.database().ref('AkkarAlAtika/familyList').
                once('value',function(snapshot){
                    if (snapshot.child(_family).exists()){
                        var ref_family=firebase.database().ref('AkkarAlAtika/'+_family)
                        .once('value',function(snapshot){
                            console.log("repeat");
                            //console.log(Object.keys(snapshot.val()));
                            var keysLane=Object.keys(snapshot.val());
                            var lengthkeysLane=keysLane.length;
                            
    
                            var i=-1;
        
                            snapshot.forEach(function(snapFamily){
                                
                                       i++;
                                       console.log("repeat i");
                                       console.log(i);
                                
    
                               var keyID= Object.keys(snapFamily.val());
                               var lengthKeyId=keyID.length;
                               
                               var j=0;
                               for(j=0;j<lengthKeyId;j++){
                                  
                                   var getData=firebase.database().ref('AkkarAlAtika/'+keysLane[i]+'/'+keyID[j]).
                                   once('value',function(snapDataID){

                                    var lengthDivider= Object.keys(snapDataID.val()).length;
                                   
                                    DividerNumber=-1;
                                    snapDataID.forEach(function(snapBlock){
                                        var lengthBlock= Object.keys(snapBlock.val()).length; 
                                       

                                        DividerNumber++;//رقم مقسم
                                        var BlockNumber=-1;
                                        snapBlock.forEach(function(snapFloor){
                                            var lengthFloor= Object.keys(snapFloor.val()).length; 
                                        

                                            BlockNumber++;//رقم بلوك
                                            FloorNumber=-1;

                                            snapFloor.forEach(function(snapData){
                                                //console.log(snapData.val());
                                                
    
                                                
                                                let name=snapData.val().Name;
                                                let familyname=snapData.val().Family_name;
                                                let area=snapData.val().Area;
                                                let numberroom=snapData.val().NumberRoon;
                                                let NumberYearUnpaid=snapData.val().NumberYearUnpaid;
                                                let proprtyId=snapData.val().projectId;
                                                let Lanename=snapData.val().Lane;
                                                let dividernumber=snapData.val().divider;
                                                let blocknumber = snapData.val().block; 

                                                let floornumber=snapData.val().floor;
                                                let MatherName=snapData.val().MatherName;
                                                let fatherName=snapData.val().fatherName;
                                                let RecordNumber=snapData.val().RecordNumber;
                                                let Job=snapData.val().Job;
                                                let using=snapData.val().using;
                                                
                                                let tel03=snapData.val().tel03;
                                                let tel06=snapData.val().tel06;
                                                let lastyearpaid=snapData.val().lastyearpaid;
                                                let birthdate=snapData.val().birthdate;
                                                let numberoffamily=snapData.val().numberoffamily;

                                                let SearchName=name+" "+fatherName+" "+familyname;
                                                let DataName = _name + " " + fathername+" " + _family;
                                                let Used = snapData.val().Used;
                                                let classification = snapData.val().classification;
                                
                                                console.log(editDistance(SearchName, DataName))

                                                if (editDistance(SearchName, DataName)>=10){
                                                    ExistName=true;

                                                    ViewData(name, familyname, area, numberroom, NumberYearUnpaid, proprtyId
                                                        , Lanename, dividernumber, blocknumber, floornumber, MatherName, fatherName, RecordNumber,
                                                        Job, using, tel03, tel06, lastyearpaid, birthdate, numberoffamily, classification, Used
                                                    );

                                                }  
                                               

                                                if ((keysLane[keysLane.length-1]===Lanename) && !ExistName ){
                    
                                                if(  (FloorNumber==lengthFloor-1) &&
                                                    (BlockNumber== lengthBlock-1) && (DividerNumber==lengthDivider-1)
                                                    && (keyID[keyID.length-1]==proprtyId) ){
                                                        console.log('not exist');
                                                        var nessage=_name+' '+fathername+' '+_family+' '+'غير موجود';
                                                        MessageDiv(nessage, 'red')


                                                        
                                             

                                                
                                                    }        }                               
    
                                            });
                                        
                                        });
    
                                    });
    
                                   });
                               }
                               
                            });
    
                        });
                    }
                    else{//family not exist
                    }
                    console.log(family_exist);
    
               }).then(function(){
                   if (!ExistName){
                       //alert("الأسم غير متوفر في قاعدة البيانات");
                   }
               });
    
                }else{
                    document.getElementById('name').style.backgroundColor = "red";
                    document.getElementById('fathername').style.backgroundColor = "red";
                }
}
 
        // Read data
        function setInFirebaseDataBase(){

            var flag=false;
            if (document.getElementById("buildingtype").value.length != 0){

            if (document.getElementById("buildingtype").value === 'شقة') {

                if (document.getElementById("inhabited").value.length != 0)
                {
                if (document.getElementById("inhabited").value === 'غير مسكون') {
                    flag=true;
                } else {

                   flag= (document.getElementById("numberoffamily").value.length != 0 &&
                    document.getElementById("lastyearpaid").value.length != 0 &&
                    document.getElementById("numberofyearunpaid").value.length != 0 
                     );
                }
            }

            }
            else if (document.getElementById("buildingtype").value === 'كراج' ||
                document.getElementById("buildingtype").value === 'قبو') {

                flag = true;
            }
            else {
                if (document.getElementById("Used").value.length != 0) {

                if (document.getElementById("Used").value === 'غير مستعمل') {
                    flag = true;
                } else {

                    flag = (
                        document.getElementById("lastyearpaid").value.length != 0 &&
                        document.getElementById("numberofyearunpaid").value.length != 0
                    );
                }
            }
            }
        }
        


            
            if (flag&&
                document.getElementById('Lane').value.length != 0 &&
                document.getElementById('Lane').value != 'حدد أسم الحي' &&
                document.getElementById('name').value.length != 0 &&
                document.getElementById("fathername").value.length != 0 && 
                document.getElementById("Family").value !='حدد أسم العائلة' &&
                document.getElementById("mathername").value.length != 0 && 
                document.getElementById("Family").value.length != 0 &&
                
                
                document.getElementById("propertyid").value.length != 0 &&
                document.getElementById("divider").value.length != 0 &&
                document.getElementById("block").value.length != 0 &&
                document.getElementById("floor").value.length != 0 &&
                document.getElementById("area").value.length != 0 &&
                document.getElementById("chambrenumber").value.length != 0 &&

                document.getElementById("registrationno").value.length != 0 &&
                document.getElementById("birthdate").value.length != 0  &&
                document.getElementById("classification").value.length != 0
              
                

                 ){

            
        var _lane=document.getElementById("Lane").value;
                _lane = _lane.replaceAll('/','_')
        var _propertyid=document.getElementById("propertyid").value;
        var _divider=document.getElementById("divider").value;
        var _block=document.getElementById("block").value;
        var _floor=document.getElementById("floor").value;
        var area=document.getElementById("area").value;
        var number_room=document.getElementById("chambrenumber").value;
        var _using=document.getElementById("buildingtype").value;
        
        var recordNumber=document.getElementById("registrationno").value;
        var birthdate = document.getElementById("birthdate").value;

        var _name=document.getElementById("name").value;
        var fathername=document.getElementById("fathername").value;
        var mathername=document.getElementById("mathername").value;
        var family_name=document.getElementById("Family").value;
        var _job=document.getElementById("job").value;
        var _classification = document.getElementById("classification").value;
        
                 
                    if (document.getElementById("lastyearpaid").value.length !== 0){
                        lastyearpaid = document.getElementById("lastyearpaid").value;
                    } else { lastyearpaid ='--'}

                if (document.getElementById("numberoffamily").value.length != 0){
                    numberoffamily = document.getElementById("numberoffamily").value;
                    }
                    else{
                        numberoffamily ='--';
                    }
                if (document.getElementById("numberofyearunpaid").value.length !== 0){
                    number_year_unpaid = document.getElementById("numberofyearunpaid").value;
                }else{
                    number_year_unpaid ='--'
                }
               

                if (document.getElementById("tel06").value.length != 0) {
                    var tel06 = document.getElementById("tel06").value;
                }
                else {
                    var tel06 = "--"
                }
                if (document.getElementById("tel03").value.length != 0) {
                    var tel03 = document.getElementById("tel03").value;
                }
                else {
                    var tel03 = "--"
                }
        
        
       

                if (document.getElementById("inhabited").value !=='مسكون؟')
        {
            var used = document.getElementById("inhabited").value;
        } else {
                    var used = document.getElementById("Used").value;
        }

        
        console.log(_name.length)

        firebase.database().ref('/AkkarAlAtika'+'/laneList/'+_lane).set(_lane)
                                        .then(function(){

                                       firebase.database().ref('/AkkarAlAtika'+'/'+family_name+'/'+_lane+'/'+_propertyid).set(
                                          _propertyid
                                      ).then(function(){
                                          firebase.database().ref('/AkkarAlAtika'+'/familyList/'+family_name)
                                          .set(family_name).then(function(){
                                              firebase.database().ref('/AkkarAlAtika'+'/'+_lane+'propertyid'+'/'+_propertyid)
                                              .set(_propertyid).then(function(){
                                                firebase.database().ref('/AkkarAlAtika'+'/'+_lane+'propertyid'+'/name')
                                              .set(_lane).then(function(){
                                                firebase.database().ref('/AkkarAlAtika'+'/'+_lane+'/'+_propertyid+'/'
                                                +_block+'/'+_floor+'/'+_divider).set({
                                                    Name:_name,Family_name:family_name,Area:area,NumberRoon:number_room
                                                    , NumberYearUnpaid:number_year_unpaid,Lane:_lane,projectId:_propertyid, divider:_divider
                                                    , block:_block,floor:_floor,using:_using, fatherName:fathername,
                                                    MatherName:mathername, RecordNumber:recordNumber, Job:_job
                                                    ,tel03:tel03,tel06:tel06,numberoffamily:numberoffamily,lastyearpaid:lastyearpaid,
                                                    birthdate: birthdate, classification: _classification,Used:used
                                                }).then(function(){
                                                    console.log('data set');
                                                    alert('تم حفظ في قاعدة البيانات');
                                                    
                                                    
                                                    document.getElementById("chambrenumber").value='';
                                                    document.getElementById("buildingtype").value='';
                                                    document.getElementById("numberofyearunpaid").value='';
                                                    document.getElementById("name").value='';                                                   
                                                   document.getElementById("job").value='';

                                                   document.getElementById("numberoffamily").value='';
                                                   document.getElementById("lastyearpaid").value='';
                                                   document.getElementById("birthdate").value='';
                                                   document.getElementById("tel06").value='';
                                                   document.getElementById("tel03").value='';
                                                   document.getElementById('registrationno').style.backgroundColor = "white";
                                                   IntialView();

                                                })
                                              });
                                            });

                                          })
                                      });
                                    });   
            }
            else {             
            
    
                if (document.getElementById('registrationno').value.length == 0) {
                    document.getElementById('registrationno').style.backgroundColor = "red"
                }

                if (document.getElementById('numberofyearunpaid').value.length == 0) {
                    document.getElementById('numberofyearunpaid').style.backgroundColor = "red"
                }
                if (document.getElementById('buildingtype').value.length == 0) {
                    document.getElementById('buildingtype').style.backgroundColor = "red"
                }

                
                if (document.getElementById('chambrenumber').value.length == 0) {
                    document.getElementById('chambrenumber').style.backgroundColor = "red"
                }

                if (document.getElementById('area').value.length == 0) {
                    document.getElementById('area').style.backgroundColor = "red"
                }

                if (document.getElementById('floor').value.length == 0) {
                    document.getElementById('floor').style.backgroundColor = "red"
                }

                if (document.getElementById('block').value.length == 0) {
                    document.getElementById('block').style.backgroundColor = "red"
                }
                if (document.getElementById('divider').value.length == 0) {
                    document.getElementById('divider').style.backgroundColor = "red"
                }

                if (document.getElementById('propertyid').value.length == 0) {
                    document.getElementById('propertyid').style.backgroundColor = "red"
                }
                

                if (document.getElementById('numberoffamily').value.length == 0) {
                    document.getElementById('numberoffamily').style.backgroundColor = "red"
                }
                 if (document.getElementById('lastyearpaid').value.length == 0) {
                    document.getElementById('lastyearpaid').style.backgroundColor = "red"
                }
                if (document.getElementById('Family').value.length == 0) {
                    document.getElementById('Family').style.backgroundColor = "red"
                }
                if (document.getElementById('mathername').value.length == 0) {
                    document.getElementById('mathername').style.backgroundColor = "red"
                }
                
                if (document.getElementById('name').value.length == 0){
                document.getElementById('name').style.backgroundColor = "red"}
                if (document.getElementById('fathername').value.length == 0) {
                    document.getElementById('fathername').style.backgroundColor = "red"
                }

                alert("هناك نقص في البيانات");
            }
    }
// Search of family propriety in a lane
    function SearchFamilyLane(){
        JsonObject='[';
        try{          
            tbl.innerHTML = "";
            tbdy.innerHTML =""; }
         catch{}
                if (document.getElementById('Lane').value.length != 0 && 
            document.getElementById('Family').value.length != 0){

                var lane=document.getElementById('Lane').value.trim();
                var familyname=document.getElementById('Family').value.trim();

                var ref=firebase.database().ref('AkkarAlAtika/familyList').
                once('value',function(snapshot){
                    if (snapshot.child(familyname).exists()){
                        console.log('family  exist');
                        var ref_family=firebase.database().ref('AkkarAlAtika/'+familyname)
                    .once('value',function(snapshotFamily){

                        console.log(snapshotFamily.val())
                        if (snapshotFamily.child(lane).exists()){
                        console.log('there are family in lane');
                        

                           var getIdFamily=firebase.database().ref('AkkarAlAtika/'+familyname+'/'+lane).
                           once('value',function(snapshotFamilyID){
                            var keyID= Object.keys(snapshotFamilyID.val());
                            for (i=0;i<keyID.length;i++){
                                var getdata=firebase.database().ref('AkkarAlAtika/'+lane+'/'+keyID[i]).
                                once('value',function(snapshotDiveder){

                                    var keyIDBlock = Object.keys(snapshotDiveder.val());
                                    console.log(keyIDBlock);
                                    
                                    snapshotDiveder.forEach(function(snapshotBlock){
                                        var keyIDblock = Object.keys(snapshotBlock.val());
                                        console.log(keyIDblock);
                                        
                                        snapshotBlock.forEach(function(snapshotFloor){
                                            var keyIDfloor = Object.keys(snapshotFloor.val());
                                            console.log(keyIDfloor);
                                            
                                            snapshotFloor.forEach(function(snapData){
                                                
                                                if (snapData.val().Family_name===familyname){

                                                        
                                            let name=snapData.val().Name;
                                            let familyname=snapData.val().Family_name;
                                            let area=snapData.val().Area;
                                            let numberroom=snapData.val().NumberRoon;
                                            let NumberYearUnpaid=snapData.val().NumberYearUnpaid;
                                            let proprtyId=snapData.val().projectId;
                                            let Lanename=snapData.val().Lane;
                                            let dividernumber=snapData.val().divider;
                                            let blocknumber=snapData.val().block;
                                            let floornumber=snapData.val().floor;
                                            let MatherName=snapData.val().MatherName;
                                            let fatherName=snapData.val().fatherName;
                                            let RecordNumber=snapData.val().RecordNumber;
                                            let Job=snapData.val().Job;
                                            let using=snapData.val().using;
                                            
                                            let tel03=snapData.val().tel03;
                                            let tel06=snapData.val().tel06;
                                            let lastyearpaid=snapData.val().lastyearpaid;
                                            let birthdate=snapData.val().birthdate;
                                            let numberoffamily=snapData.val().numberoffamily;

                                                    let Used = snapData.val().Used;
                                                    let classification = snapData.val().classification;
                                            
                                            ViewData(name, familyname, area, numberroom, NumberYearUnpaid, proprtyId
                                           , Lanename, dividernumber, blocknumber, floornumber, MatherName, fatherName, RecordNumber,
                                                Job, using, tel03, tel06, lastyearpaid, birthdate, numberoffamily, classification, Used
                                            );
                                          }
                                            });
                                        });

                                    });
                                })
                            }
                           console.log(keyID)
                           })
                    }
                        else{
                            console.log('there aren t family in lane');
                            var Data=document.createElement("p");

                            alert('  عائلة  ' + familyname+'  ليس لها املاك في '+lane);
                            


                        }
                    });
                    }else{
                        console.log('family not exist');
                    }
                });




            }
    }
    // get families's name from firebase database
    function GetFamilyName(){
        
        var ref=firebase.database().ref('AkkarAlAtika/familyList').
                once('value',function(snapshot){
                    snapshot.forEach(function(snapDatafamily){
                      var NewOption=document.createElement("OPTION");
                      console.log(snapDatafamily.val());
                      FamiliesNames.push(snapDatafamily.val());
                      NewOption.innerHTML=snapDatafamily.val();
                      document.getElementById('Family').appendChild(NewOption);                        
                    });
                }).then(function(){
                    if (fromDataentry){
                         console.log(FamiliesNames.indexOf(FamilySlected));
                        
                         document.getElementById("Family").selectedIndex =(FamiliesNames.indexOf(FamilySlected)+1).toString();

                        }
                    });
    }

       // get families's name from firebase database
       var laneNames=[], FamiliesNames=[],fromDataentry=false,Laneslected="",FamilySlected="";
       function GetLaneName(){
       
        var ref=firebase.database().ref('AkkarAlAtika/laneList').
                once('value',function(snapshot){
                    snapshot.forEach(function(snapDatafamily){
                      var NewOption=document.createElement("OPTION");
                      laneNames.push(snapDatafamily.val());
                      console.log(snapDatafamily.val());
                      NewOption.innerHTML=snapDatafamily.val();
                      document.getElementById('Lane').appendChild(NewOption);                        
                    });
                    
                }).then(function(){
                    if (fromDataentry){
                         console.log(laneNames.indexOf(Laneslected));
                         document.getElementById("Lane").selectedIndex =(laneNames.indexOf(Laneslected)+1).toString();
                       

                        }
                    });
                
    }

   
    // search Proprety id 

    function SearchProprtyId(){
        JsonObject='[';
        try{          
            tbl.innerHTML = "";
            tbdy.innerHTML =""; }
         catch{}
    
        if (document.getElementById('propretyId').value.length!=0){
            var LaneNames;
            var PropretyID=document.getElementById('propretyId').value;
            var getlaneList=firebase.database().ref('AkkarAlAtika/laneList').once
            ('value',function(snapshot){
                //get names of lane
                LaneNames=Object.keys(snapshot.val());
               console.log(LaneNames);
               for (i=0;i<LaneNames.length;i++){
                
                   var getIdInLane= firebase.database().ref('AkkarAlAtika/'+LaneNames[i]+'propertyid').
                   once('value',function(snapshotID){
                   
                       

                       console.log(snapshotID.val());
                       if (snapshotID.child(PropretyID).exists()){
                                            
                          var NameLane =snapshotID.val().name;
                           
                          
                           var getDataProprety=firebase.database().ref('AkkarAlAtika/'+NameLane+'/'+PropretyID).
                           once('value',function(snapshotDivider){
                            snapshotDivider.forEach(function(snapshotBlock){
                                snapshotBlock.forEach(function(snapshotFloor){
                                    snapshotFloor.forEach(function(snapData){

                                         
                                    let name=snapData.val().Name;
                                    let familyname=snapData.val().Family_name;
                                    let area=snapData.val().Area;
                                    let numberroom=snapData.val().NumberRoon;
                                    let NumberYearUnpaid=snapData.val().NumberYearUnpaid;
                                    let proprtyId=snapData.val().projectId;
                                    let Lanename=snapData.val().Lane;
                                    let dividernumber=snapData.val().divider;
                                    let blocknumber=snapData.val().block;
                                    let floornumber=snapData.val().floor;
                                    let MatherName=snapData.val().MatherName;
                                    let fatherName=snapData.val().fatherName;
                                    let RecordNumber=snapData.val().RecordNumber;
                                    let Job=snapData.val().Job;
                                    let using=snapData.val().using;
                                    let tel03=snapData.val().tel03;
                                    let tel06=snapData.val().tel06;
                                    let lastyearpaid=snapData.val().lastyearpaid;
                                    let birthdate=snapData.val().birthdate;
                                    let numberoffamily=snapData.val().numberoffamily;
                                    let Used = snapData.val().Used;
                                    let classification = snapData.val().classification;
                                        ViewData(name, familyname, area, numberroom, NumberYearUnpaid, proprtyId
                                            , Lanename, dividernumber, blocknumber, floornumber, MatherName, fatherName, RecordNumber,
                                            Job, using, tel03, tel06, lastyearpaid, birthdate, numberoffamily, classification, Used
                                        );

                                    });

                                });

                            });

                              
                           });


                       }
                   });

               }
            });
            
        }
        else{
            document.getElementById('propretyId').style.backgroundColor = "red";
        }
    }


    //Search Area 

    function SearchByAreaInLane(){
        JsonObject='[';
        try{          
            tbl.innerHTML = "";
            tbdy.innerHTML =""; }
         catch{}

if (document.getElementById('Lane').value.length != 0 && 
document.getElementById('area').value.length != 0){

var lane=document.getElementById('Lane').value.trim();
var area=document.getElementById('area').value.trim();
   try{
   var getIdFamily=firebase.database().ref('AkkarAlAtika/'+lane+'propertyid').
   once('value',function(snapshotFamilyID){

    var keyID= Object.keys(snapshotFamilyID.val());

    for (i=0;i<keyID.length;i++){
        var getdata=firebase.database().ref('AkkarAlAtika/'+lane+'/'+keyID[i]).
        once('value',function(snapshotDiveder){
            snapshotDiveder.forEach(function(snapshotBlock){
                
                snapshotBlock.forEach(function(snapshotFloor){
                    
                    snapshotFloor.forEach(function(snapData){
                        
                        if (snapData.val().Area<area){

                    let name=snapData.val().Name;
                    let familyname=snapData.val().Family_name;
                    let area=snapData.val().Area;
                    let numberroom=snapData.val().NumberRoon;
                    let NumberYearUnpaid=snapData.val().NumberYearUnpaid;
                    let proprtyId=snapData.val().projectId;
                    let Lanename=snapData.val().Lane;
                    let dividernumber=snapData.val().divider;
                    let blocknumber=snapData.val().block;
                    let floornumber=snapData.val().floor;
                    let MatherName=snapData.val().MatherName;
                    let fatherName=snapData.val().fatherName;
                    let RecordNumber=snapData.val().RecordNumber;
                    let Job=snapData.val().Job;
                    let using=snapData.val().using;
                    let tel03=snapData.val().tel03;
                    let tel06=snapData.val().tel06;
                    let lastyearpaid=snapData.val().lastyearpaid;
                    let birthdate=snapData.val().birthdate;
                    let numberoffamily=snapData.val().numberoffamily;
                    let Used = snapData.val().Used;
                    let classification = snapData.val().classification;

                    ViewData(name, familyname, area, numberroom, NumberYearUnpaid, proprtyId
                                , Lanename, dividernumber, blocknumber, floornumber, MatherName, fatherName, RecordNumber,
                                Job, using, tel03, tel06, lastyearpaid, birthdate, numberoffamily, classification, Used
                        );
}
                    });
                });

            });

        })
    }
   console.log(keyID)
   });}
   catch{
       MessageDiv('no data', 'red');
   }
}
   }



    // Search in lane by number room

    function SearchRoomNumber(){
        JsonObject='[';
         try{          
            tbl.innerHTML = "";
            tbdy.innerHTML =""; }
         catch{}

        if (document.getElementById('Lane').value.length != 0 &&  
        document.getElementById('roomnumber').value.length != 0){
            var lane=document.getElementById('Lane').value.trim();
            var roomnumber=document.getElementById('roomnumber').value.trim();
             var getIdFamily=firebase.database().ref('AkkarAlAtika/'+lane+'propertyid').
             once('value',function(snapshotFamilyID){
               var keyID= Object.keys(snapshotFamilyID.val());
                 for (i=0;i<keyID.length;i++){
                  var getdata=firebase.database().ref('AkkarAlAtika/'+lane+'/'+keyID[i]).
                  once('value',function(snapshotDiveder){
                     snapshotDiveder.forEach(function(snapshotBlock){
                
                       snapshotBlock.forEach(function(snapshotFloor){
                    
                          snapshotFloor.forEach(function(snapData){
                        
                        if (snapData.val().NumberRoon<roomnumber){

                                
                            let name=snapData.val().Name;
                            let familyname=snapData.val().Family_name;
                            let area=snapData.val().Area;
                            let numberroom=snapData.val().NumberRoon;
                            let NumberYearUnpaid=snapData.val().NumberYearUnpaid;
                            let proprtyId=snapData.val().projectId;
                            let Lanename=snapData.val().Lane;
                            let dividernumber=snapData.val().divider;
                            let blocknumber=snapData.val().block;
                            let floornumber=snapData.val().floor;
                            let MatherName=snapData.val().MatherName;
                            let fatherName=snapData.val().fatherName;
                            let RecordNumber=snapData.val().RecordNumber;
                            let Job=snapData.val().Job;
                            let using=snapData.val().using;
                            let tel03=snapData.val().tel03;
                            let tel06=snapData.val().tel06;
                            let lastyearpaid=snapData.val().lastyearpaid;
                            let birthdate=snapData.val().birthdate;
                            let numberoffamily=snapData.val().numberoffamily;

                            let Used = snapData.val().Used;
                            let classification = snapData.val().classification;
                            ViewData(name, familyname, area, numberroom, NumberYearUnpaid, proprtyId
                                , Lanename, dividernumber, blocknumber, floornumber, MatherName, fatherName, RecordNumber,
                                Job, using, tel03, tel06, lastyearpaid, birthdate, numberoffamily, classification, Used
                            );
                    
                  
                            
            

                        }
                    });
                });

            });

        })
    }
   console.log(keyID)
   })



}

else{ 
document.getElementById('lane').style.backgroundColor = "red";
document.getElementById('roomnumber').style.backgroundColor = "red";

if(document.getElementById('roomnumber').value.length != 0)
{document.getElementById('roomnumber').style.backgroundColor = "#dde3e9"; }

if(document.getElementById('lane').value.length != 0)
{ document.getElementById('lane').style.backgroundColor = "#dde3e9";
}

}
    }

    // Search in lane by type
function SearchType(){
    JsonObject='[';
        try{          
            tbl.innerHTML = "";
            tbdy.innerHTML =""; }
         catch{}

if (document.getElementById('Lane').value.length != 0){

var lane=document.getElementById('Lane').value.trim();


   var getIdFamily=firebase.database().ref('AkkarAlAtika/'+lane+'propertyid').
   once('value',function(snapshotFamilyID){
       test = (snapshotFamilyID.exists());
      console.log( typeof snapshotFamilyID);
       if (snapshotFamilyID.exists()){
    var keyID= Object.keys(snapshotFamilyID.val());
    for (i=0;i<keyID.length;i++){
        var getdata=firebase.database().ref('AkkarAlAtika/'+lane+'/'+keyID[i]).
        once('value',function(snapshotBlock){
            if (snapshotBlock.exists()){
                snapshotBlock.forEach(function(snapshotFloor){
                snapshotFloor.forEach(function(snapshotDivider){  
                snapshotDivider.forEach(function(snapData){
                        
                        if (snapData.val().using!== 'سكن'){

                                
                            let name=snapData.val().Name;
                            let familyname=snapData.val().Family_name;
                            let area=snapData.val().Area;
                            let numberroom=snapData.val().NumberRoon;
                            let NumberYearUnpaid=snapData.val().NumberYearUnpaid;
                            let proprtyId=snapData.val().projectId;
                            let Lanename=snapData.val().Lane;
                            let dividernumber=snapData.val().divider;
                            let blocknumber=snapData.val().block;
                            let floornumber=snapData.val().floor;
                            let MatherName=snapData.val().MatherName;
                            let fatherName=snapData.val().fatherName;
                            let RecordNumber=snapData.val().RecordNumber;
                            let Job=snapData.val().Job;
                            let using=snapData.val().using;
                            let tel03=snapData.val().tel03;
                            let tel06=snapData.val().tel06;
                            let lastyearpaid=snapData.val().lastyearpaid;
                            let birthdate=snapData.val().birthdate;
                            let numberoffamily=snapData.val().numberoffamily;
                            let Used = snapData.val().Used;
                            let classification = snapData.val().classification;
                            ViewData(name, familyname, area, numberroom, NumberYearUnpaid, proprtyId
                                , Lanename, dividernumber, blocknumber, floornumber, MatherName, fatherName, RecordNumber,
                                Job, using, tel03, tel06, lastyearpaid, birthdate, numberoffamily, classification, Used
                            );
        
                            
                        }
                    });
                });

            });

        }
    }
        )
    }
   }
    else{
    console.log('no data in lane');
}
   console.log(keyID)
   })
}
else{ 
document.getElementById('lane').style.backgroundColor = "red";
}
    }


    function ShowDataList(name,familyname,area,numberroom,NumberYearUnpaid,
        proprtyId,Lanename,dividernumber,blocknumber,floornumber,MatherName, 
        fatherName, RecordNumber, Job, using, tel03,tel06,
        birthdate, lastyearpaid, numberoffamily  ){
            var header =document.createElement("h2");
            var Data=document.createElement("p");

            header.innerHTML=name+' '+fatherName+' '+familyname;
            
             var data =' يملك مبنى في حارة : '+ Lanename +', '+  'على عقار رقم: '+proprtyId+', '+' ومقسم : '+
             dividernumber+', '+ '  يسكن في بلوك رقم: '+blocknumber+', '+'طابق '+floornumber+', '+' عدد الغرف  '+numberroom+', '+'نوع البناء:   '+using +', '+'عدد السنين الغير مدفوعة: '+NumberYearUnpaid;
             
             Data.innerHTML=data;
           
             document.getElementById('mylist').appendChild(header);
             document.getElementById('mylist').appendChild(Data); 
            
            

             header.onclick = ()=>{
                
                var data_send= '{"UserData":[{"name":'+'"'+name+'"'+',"family":'+'"'+familyname+'"'+',"Lane":'+'"'+Lanename+'"'+
                ',"PropertyID":'+'"'+proprtyId+'"'+',"Divider":'+'"'+dividernumber+'"'+
                ',"block":'+'"'+blocknumber+'"'+',"floor":'+'"'+floornumber+'"'+',"NumberYearUnpaid":'+'"'+NumberYearUnpaid+'"'+
                ',"numberroom":'+'"'+numberroom+'"'+',"area":'+'"'+area+'"'+',"using":'+'"'+using+'"'+',"tel03":'+'"'+tel03+'"'+
                ',"tel06":'+'"'+tel06+'"'+',"RecordNumber":'+'"'+RecordNumber+'"'+',"MatherName":'+'"'+MatherName+'"'+
                ',"fatherName":'+'"'+fatherName+'"'+
                ',"Job":'+'"'+Job+'"'+',"birthdate":'+'"'+birthdate+'"'+
                ',"lastyearpaid":'+'"'+lastyearpaid+'"'+ ',"numberoffamily":'+'"'+numberoffamily+'"'+
                '}]}';
                
                window.sessionStorage.setItem('DataSend',JSON.stringify(data_send));
                if (_OperationType==='Search'){
                window.location = 'ShowDataName.html';
                 }
                 else if( _OperationType==='Edit'){
                window.location = 'DataEntry.html';
                 }

             
            } 
        }

    
        
// check if is in the operation is search or edit
var _OperationType;

         function ChekTypeOperation(){
              var OperationType = {
            getUserDataFromSession: function() {
                return  window.sessionStorage.getItem('OperationType');
            }   }
            
            if (OperationType.getUserDataFromSession()===null){
              _OperationType='Search';
            }
            else{
              _OperationType=OperationType.getUserDataFromSession();
            }
            console.log(_OperationType);
        }
// Check if the application log in or not
        function ChekAuth(){
              firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                console.log("log in");
               } else {
                console.log("log out");
                window.location.replace("Login.html");
                       }
                      });
     }


// Check if the application log in or not
function ChekAuthSign() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("log in");
            window.location.replace("welcome.html");
        } else {
            console.log("log out");
            
        }
    });
}

     function ChekDataToEdit(){
     var data = {
 getUserDataFromSession: function() {
     
     return  window.sessionStorage.getItem('DataSend');
 }  }
  console.log(data.getUserDataFromSession());
 userData=JSON.parse(JSON.parse(data.getUserDataFromSession()));
 
if (userData!==null ){

    firebase.database().ref('AkkarAlAtika/' + userData.UserData[0].Lane + '/' + userData.UserData[0].PropertyID
        + '/' + userData.UserData[0].block + '/' + userData.UserData[0].floor+'/'+
        userData.UserData[0].Divider.toString()).remove().then(function(){

            console.log('data removed');

        }).then(function () {



  
 console.log(userData.UserData[0].name);
 document.getElementById("name").value=userData.UserData[0].name;
 document.getElementById("fathername").value=userData.UserData[0].fatherName;
 document.getElementById("mathername").value=userData.UserData[0].MatherName;


//laneNames
fromDataentry=true;
Laneslected=userData.UserData[0].Lane;
    FamilySlected = userData.UserData[0].family; 

document.getElementById("classification").selectedIndex = userData.UserData[0].classification.toString();


document.getElementById("propertyid").value=userData.UserData[0].PropertyID;//Divider
    document.getElementById("divider").value = userData.UserData[0].Divider;

document.getElementById("block").value=userData.UserData[0].block;
document.getElementById("floor").value=userData.UserData[0].floor;
document.getElementById("area").value=userData.UserData[0].area;
document.getElementById("birthdate").value = userData.UserData[0].birthdate;
document.getElementById("tel06").value = userData.UserData[0].tel06;
document.getElementById("tel03").value = userData.UserData[0].tel03;

document.getElementById("chambrenumber").value=userData.UserData[0].numberroom;
document.getElementById("buildingtype").value=userData.UserData[0].using;
    document.getElementById("registrationno").value = userData.UserData[0].RecordNumber;
    document.getElementById("job").value = userData.UserData[0].Job;
    if (userData.UserData[0].using === 'شقة' && userData.UserData[0].Used === 'مسكون'){
        document.getElementById("numberoffamily").style.display = "block";
        document.getElementById("Textnumberoffamily").style.display = "block";

        document.getElementById("lastyearpaid").style.display = "block";
        document.getElementById("numberofyearunpaid").style.display = "block";
        document.getElementById("Textlastyearpaid").style.display = "block";
        document.getElementById("Textnumberofyearunpaid").style.display = "block";
        document.getElementById("Textinhabited").style.display = "block";
        document.getElementById("inhabited").style.display = "block";

        document.getElementById("inhabited").selectedIndex =2;


        document.getElementById("numberofyearunpaid").value = userData.UserData[0].NumberYearUnpaid;
        document.getElementById("numberoffamily").value = userData.UserData[0].numberoffamily;
        document.getElementById("lastyearpaid").value = userData.UserData[0].lastyearpaid;

    } else if (userData.UserData[0].using === 'شقة' && userData.UserData[0].Used !== 'غير مسكون'){
        document.getElementById("Textinhabited").style.display = "block";
        document.getElementById("inhabited").style.display = "block";
        document.getElementById("inhabited").selectedIndex = 1;
    }
    else if (userData.UserData[0].using !== 'شقة' ){
        if (userData.UserData[0].using !== 'قبو' && userData.UserData[0].Used !== 'مستعمل'){

            document.getElementById("lastyearpaid").style.display = "block";
            document.getElementById("numberofyearunpaid").style.display = "block";
            document.getElementById("Textlastyearpaid").style.display = "block";
            document.getElementById("Textnumberofyearunpaid").style.display = "block";
            document.getElementById("TextUsed").style.display = "block";
            document.getElementById("Used").style.display = "block";

            document.getElementById("Used").selectedIndex = 2;


            document.getElementById("numberofyearunpaid").value = userData.UserData[0].NumberYearUnpaid;
            document.getElementById("numberoffamily").value = userData.UserData[0].numberoffamily;
            document.getElementById("lastyearpaid").value = userData.UserData[0].lastyearpaid;
        } else{
            document.getElementById("TextUsed").style.display = "block";
            document.getElementById("Used").style.display = "block";

            document.getElementById("Used").selectedIndex = 1;

        }

    }
   


})}
}


function AddNewCellToTable( Name, Info, Lane,IdProprty,data_send){
   
    var group= document.createElement('div');
    group.innerHTML = "";
     group.className="list-group";
     group.id='group';
     group.style.padding = "5px 5px 5px 5px";
     group.style.direction='rtl';
     group.style.marginRight='10px'
   

     var a= document.createElement('a');
     a.className='ist-group-item list-group-item-action';


     
     var DivClass=document.createElement('div');
     DivClass.className='d-flex w-100 justify-content-between';

     var h=document.createElement('h5');
     
     var small=document.createElement('small');
     small.className='text-muted';
     var p=document.createElement("p");
     p.className='mb-1';
     
     var small1=document.createElement('small');
     small1.className='text-muted';
     h.innerHTML =Name;
     small.innerHTML =IdProprty;
     p.innerHTML=Info;
     small1.innerHTML =Lane;

     DivClass.appendChild(h);
     DivClass.appendChild(small);
     a.appendChild(DivClass);
     a.appendChild(p);a.appendChild(small1);
     group.appendChild(a);

     try{

     if (tbl.rows[tbl.tBodies[0].rows.length-1].cells.length >=3){
        var tr = document.createElement('tr');
     }else{
     var tr = tbl.rows[ tbl.rows.length - 1 ];}}
     catch{var tr = document.createElement('tr');}

     var td = document.createElement('td');
        td.appendChild(group)
        
        tr.appendChild(td)

       
    tbdy.appendChild(tr);
  
  tbl.appendChild(tbdy);
  body.appendChild(tbl)

  group.onclick = ()=>{
                
  
    
    window.sessionStorage.setItem('DataSend',JSON.stringify(data_send));
    if (_OperationType==='Search'){
    window.location = 'ShowDataName.html';
     }
     else if( _OperationType==='Edit'){
    window.location = 'DataEntry.html';
     }

 
} 
}


function gotoInsertOne(){
    sessionStorage.clear();
    window.location = 'DataEntry.html';
}


function editDistance(first, second) {
    // Calculates the similarity between two strings  
    // discuss at: http://phpjs.org/functions/similar_text

    if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
        return 0;
    }

    first += '';
    second += '';

    var pos1 = 0,
        pos2 = 0,
        max = 0,
        firstLength = first.length,
        secondLength = second.length,
        p, q, l, sum;

    max = 0;

    for (p = 0; p < firstLength; p++) {
        for (q = 0; q < secondLength; q++) {
            for (l = 0;
            (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++);
            if (l > max) {
                max = l;
                pos1 = p;
                pos2 = q;
            }
        }
    }

    sum = max;



    return sum;
   
  }

  function SetFamilyLane(NameFamily,_Type){
    
    try{          
        tbl.innerHTML = "";
        tbdy.innerHTML =""; 
        div.innerHTML =""; 
    }
     catch{}

      console.log(NameFamily);
    AddFamilyLaneToFirebase( NameFamily, _Type);

    var Search='familyList';
    if(_Type==='lane'){
        Search='laneList';
    }
        
    var ref=firebase.database().ref('AkkarAlAtika/'+Search).
            once('value',function(snapshot){
                snapshot.forEach(function(snapDatafamily){
                  
                  console.log(editDistance(NameFamily, snapDatafamily.val()));
                  
                     if(editDistance(NameFamily, snapDatafamily.val())>=5){

                        MessageDiv(NameFamily+' '+ 'موجود في قاعدة البيانات','red');
                    }else if (editDistance(NameFamily, snapDatafamily.val())>=3 && 
                  editDistance(NameFamily, snapDatafamily.val())<=4){
                      console.log( editDistance(NameFamily, snapDatafamily.val()));
                       AddFamilyLaneToFirebase(snapDatafamily.val(), _Type);}


                
                                        
                });
            }).then(function(){
                
                });
}

function AddFamilyLaneToFirebase( Name, Type){
   var group=document.createElement("p");
   group.style.textAlign='center';
   group.innerHTML=Name;


     try{

     if (tbl.rows[tbl.tBodies[0].rows.length-1].cells.length >=3){
        var tr = document.createElement('tr');
     }else{
     var tr = tbl.rows[ tbl.rows.length - 1 ];}}
     catch{var tr = document.createElement('tr');}

     

     var td = document.createElement('td');
        td.appendChild(group)
        
        tr.appendChild(td)

       
    tbdy.appendChild(tr);
  
  tbl.appendChild(tbdy);
  body.appendChild(tbl);

  group.onclick = ()=>{
                
    if (Type==='family'){
        firebase.database().ref('/AkkarAlAtika'+'/familyList/'+Name)
        .set(Name).then(function(){

            MessageDiv('تم حفظ'+' '+ Name+' '+ 'في قاعدة البيانات', 'blue');
            

        });
     }
     else if(Type==='lane'){
        firebase.database().ref('/AkkarAlAtika'+'/laneList/'+Name).set(Name).then(function(){
            MessageDiv('تم حفظ'+' '+ Name+' '+ 'في قاعدة البيانات', 'blue');
        });
     }

 
} 
}


function MessageDiv(_message, color){

    div.style.marginRight='50px';
    div.style.marginTop='50px';
    div.style.marginBottom='50px';

    var message=document.createElement("p");
    message.style.textAlign='right';
    
    message.style.color=color;
    message.innerHTML=_message;
    div.appendChild(message);
    body.appendChild(div);

}


function CheckInternetConnection(){
    var ifConnected = window.navigator.onLine;
if (!ifConnected) {
    MessageDiv('no internet connection', 'red')
    
} 
return ifConnected;}


var JsonObject;
function SetDataInJsonObject(data_json){
    if (JsonObject.length<17){
    JsonObject+=data_json;}
    else{JsonObject+=','+data_json;}
    console.log(JsonObject);
    console.log(JSON.parse(JsonObject+"]"));
    var dtatata=JSON.parse(JsonObject+"]");
}

function GoToSearch(PageName){
    window.sessionStorage.setItem('OperationType','Search');
    window.location = PageName+'.html';
}
function GoToEdit(PageName){
    window.sessionStorage.setItem('OperationType','Edit');
    window.location = PageName+'.html';
}

function gotoPrint(){
    //,JSON.stringify(JsonObject+"]"
    window.sessionStorage.setItem('DataHello',JSON.stringify(JsonObject+"]"));
   
    window.location ="HtmlPrint.html";
}

function checkType(){
        
    if ((document.getElementById("buildingtype").value === 'شقة' && 
    document.getElementById("inhabited").value === 'غير مسكون') || 
        (document.getElementById("Used").value === 'غير مستعمل' && 
        document.getElementById("buildingtype").value !== 'شقة' )){
        document.getElementById("numberoffamily").style.display = "none";
        document.getElementById("lastyearpaid").style.display = "none";
        document.getElementById("numberofyearunpaid").style.display = "none";
        document.getElementById("Textnumberoffamily").style.display = "none";
        document.getElementById("Textlastyearpaid").style.display = "none";
        document.getElementById("Textnumberofyearunpaid").style.display = "none";
    } 
    else if (document.getElementById("buildingtype").value === 'شقة' &&
             document.getElementById("inhabited").value === 'مسكون'){

        document.getElementById("numberoffamily").style.display = "block";
        document.getElementById("lastyearpaid").style.display = "block";
        document.getElementById("numberofyearunpaid").style.display = "block";
        document.getElementById("Textnumberoffamily").style.display = "block";
        document.getElementById("Textlastyearpaid").style.display = "block";
        document.getElementById("Textnumberofyearunpaid").style.display = "block";
    }
    else if (document.getElementById("buildingtype").value !== 'شقة' && 
        document.getElementById("buildingtype").value !== 'كراج' && 
        document.getElementById("buildingtype").value !== 'قبو' && 
    document.getElementById("Used").value === 'مستعمل') {

        document.getElementById("numberofyearunpaid").style.display = "none";
        document.getElementById("Textnumberoffamily").style.display = "none";
        document.getElementById("lastyearpaid").style.display = "block";
        document.getElementById("numberofyearunpaid").style.display = "block";
        document.getElementById("Textlastyearpaid").style.display = "block";
        document.getElementById("Textnumberofyearunpaid").style.display = "block";
    }
}

function checkTypeBuild(){

    IntialView();

    if (document.getElementById("buildingtype").value === 'شقة')
     {
        document.getElementById("inhabited").style.display = "block";
        document.getElementById("Textinhabited").style.display = "block";
    
    } 
    else if (document.getElementById("buildingtype").value === 'كراج'||
        document.getElementById("buildingtype").value === 'قبو' ){
        document.getElementById("Used").style.display = "block";
        document.getElementById("TextUsed").style.display = "block";
   
        document.getElementById("lastyearpaid").style.display = "none";
        document.getElementById("numberofyearunpaid").style.display = "none";
       
        document.getElementById("Textlastyearpaid").style.display = "none";
        document.getElementById("Textnumberofyearunpaid").style.display = "none";
        
        }
    else  {
       
        document.getElementById("Used").style.display = "block";
        document.getElementById("TextUsed").style.display = "block";
      }

    }

    function IntialView(){

        document.getElementById("inhabited").style.display = "none";
        document.getElementById("Textinhabited").style.display = "none";
        document.getElementById("inhabited").selectedIndex = "0";

        document.getElementById("Used").style.display = "none";
        document.getElementById("TextUsed").style.display = "none";
        document.getElementById("Used").selectedIndex = "0";
        document.getElementById("classification").selectedIndex = "0";
        

        document.getElementById("numberoffamily").style.display = "none";
        document.getElementById("Textnumberoffamily").style.display = "none";

        document.getElementById("lastyearpaid").style.display = "none";
        document.getElementById("numberofyearunpaid").style.display = "none";
        document.getElementById("Textlastyearpaid").style.display = "none";
        document.getElementById("Textnumberofyearunpaid").style.display = "none";

    }


function ViewData(name, familyname, area, numberroom, NumberYearUnpaid, proprtyId
    , Lanename, dividernumber, blocknumber, floornumber, MatherName, fatherName, RecordNumber,
    Job, using, tel03, tel06, lastyearpaid, birthdate, numberoffamily, classification, Used
){

    var Name = name + ' ' + fatherName + ' ' + familyname;
    var Info = ' ومقسم : ' +
        dividernumber + ', ' + '  يسكن في بلوك رقم: ' + blocknumber + ', ' + 'طابق ' + floornumber + ', ' + ' عدد الغرف  ' + numberroom + ', ' + 'نوع البناء:   ' + using + ', '
        + 'عدد السنين الغير مدفوعة: ' + NumberYearUnpaid;
    var data_send = '{"UserData":[{"name":' + '"' + name + '"' + 
        ',"family":' + '"' + familyname + '"' + 
        ',"Lane":' + '"' + Lanename + '"' +
        ',"PropertyID":' + '"' + proprtyId + '"' +
        ',"Divider":' + '"' +  dividernumber + '"' +
        ',"block":' + '"' + blocknumber + '"' +
         ',"floor":' + '"' + floornumber + '"' + 
        ',"NumberYearUnpaid":' + '"' + NumberYearUnpaid + '"' +
        ',"numberroom":' + '"' + numberroom + '"' + 
        ',"area":' + '"' + area + '"' + 
        ',"using":' + '"' + using + '"' + 
        ',"tel03":' + '"' + tel03 + '"' +
        ',"tel06":' + '"' + tel06 + '"' + 
        ',"classification":' + '"' + classification + '"' + 
        ',"Used":' + '"' + Used + '"' + 


        ',"RecordNumber":' + '"' + RecordNumber + '"' + 
        ',"MatherName":' + '"' + MatherName + '"' +
        ',"fatherName":' + '"' + fatherName + '"' +
        ',"Job":' + '"' + Job + '"' +
         ',"birthdate":' + '"' + birthdate + '"' +
        ',"lastyearpaid":' + '"' + lastyearpaid + '"' +
         ',"numberoffamily":' + '"' + numberoffamily + '"' +
        '}]}';

    var data_json = '{"المالك (الأسم الثلاثي)":' + '"' + name + ' ' + fatherName + ' ' + familyname + '"' +
        ',"الأم":' + '"' + MatherName + '"' + ',"رقم سجل":' + '"' + RecordNumber + '"' +
        ',"الحي":' + '"' + Lanename + '"' +
        ',"الوظيفة":' + '"' + Job + '"' + ',"تاريخ الولادة ":' + '"' + birthdate + '"' +
        ',"هاتف الخليوي":' + '"' + tel03 + '"' + ',"هاتف ثابت":' + '"' + tel06 + '"' +
        ',"تصنيف":' + '"' + classification + '"' + ',"مسكون":' + '"' + Used + '"' +
        ',"رقم العقار":' + '"' + proprtyId + '"' + ',"مقسم":' + '"' + dividernumber + '"' +
        ',"بلوك":' + '"' + blocknumber  + '"' + ',"الطابق":' + '"' + floornumber + '"' +//',"عدد سنين":'+'"'+NumberYearUnpaid+'"'+
        ',"عدد الغرف":' + '"' + numberroom + '"' + ',"مساحة":' + '"' + area + '"' + ',"نوع البناء":' + '"' + using + '"' +

        ',"أخر سنة مدفوعة":' + '"' + lastyearpaid + '"' + ',"عدد الأسرة":' + '"' + numberoffamily + '"' +

        '}';
    console.log(data_json)

    SetDataInJsonObject(data_json);


    AddNewCellToTable(Name, Info, Lanename, proprtyId, data_send);
}

function AskToAddfirebase(type){
    if (type==='lane'){
    var lane = prompt("رجاء أدخل أسم الحي", "");
    if (lane != "") {
        lane = lane.replaceAll('/','_');
        lane = lane.replaceAll(' ', '_');
        lane = lane.replaceAll('*', '_');
        lane = lane.replaceAll('-', '_');
        lane = lane.replaceAll('&', '_');

        firebase.database().ref('/AkkarAlAtika' + '/laneList/' + lane)
            .set(lane).then(function () {
                
            });
        
    }
    }
else{
        var familly = prompt("رجاء أدخل أسم العائلة", "");
        if (familly != "") {
            familly = familly.replaceAll('/', '');
            familly = familly.replaceAll(' ', '');

            firebase.database().ref('/AkkarAlAtika' + '/familyList/' + familly)
                .set(familly).then(function () {
                    alert('تم حفظ في قاعدة بيانات')

                });

        }
}

}