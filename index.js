showtask();


let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
let savetaskbtn = document.getElementById("savetaskbtn");


addtaskbtn.addEventListener("click", function () {
    addtaskinputval = addtaskinput.value;

    if(addtaskinputval.trim()!=0){


    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskobj = [];
    }
    else {
        taskobj = JSON.parse(webtask);
    }
    taskobj.push(addtaskinputval);
    localStorage.setItem("localtask", JSON.stringify(taskobj));
     
    addtaskinput.value = "";
}
    showtask();
})






function showtask() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskobj = [];
    }
    else {
        taskobj = JSON.parse(webtask);
    }

    let html = "";
    let addedtasklist = document.getElementById("addedtasklist");
    taskobj.forEach((item, index) => {

        html += `<tr>
                    <th scope="row">${index+1}</th>
                    <td>${item}</td>
                    <td style="width:50px"><button type="button" onclick="edittask(${index})" class="btn btn-primary btn-sm"><i class="fa fa-edit"></i>Edit</button></td>
                    <td style="width:50px"><button type="button" onclick="deleteitem(${index})" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    });

    addedtasklist.innerHTML = html; 
}






/**---------------------------Edit ----------------------------------- */


function edittask(index){
    let saveindex = document.getElementById("saveindex");
    
    saveindex.value = index;

    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    addtaskinput.value = taskobj[index];

    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
}







/**------------------ save ---------------------------------- */



savetaskbtn.addEventListener("click",function(){


    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;

    taskobj[saveindex] = addtaskinput.value;

    savetaskbtn.style.display="none";
    addtaskbtn.style.display = "block";
    

    localStorage.setItem("localtask",JSON.stringify(taskobj));

    addtaskinput.value = "";

    showtask();

})










/**-------------------------delete------------------- */



function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);

    taskobj.splice(index, 1);
    localStorage.setItem("localtask",JSON.stringify(taskobj));
    showtask();
}













/**------------------ delete all---------------- */

let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click",function(){

    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    
    
    if (webtask == null) {
        taskobj = [];
    }
    else {
        taskobj = JSON.parse(webtask);
        taskobj = [];
    }


    savetaskbtn.style.display = "none";
    addtaskbtn.style.display = "block";

    localStorage.setItem("localtask",JSON.stringify(taskobj));
    showtask();

})










/**------------ search-------------- */

let searchtextbox = document.getElementById("searchtextbox");

searchtextbox.addEventListener("input",function(){

    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){

        let searchedtext = item.getElementsByTagName("td")[0].innerText;

        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval,'gi');

        if(searchedtext.match(re)){
            item.style.display = "table-row";
        }
        else{
            item.style.display = "none";
        }
    })
})


