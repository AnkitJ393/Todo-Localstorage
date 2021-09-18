const input=document.querySelector('#input');
const addbtn=document.querySelector('.addbtn');
// let listarr=[]
const list=document.querySelector('.todolist');
const footer=document.querySelector('footer p') ;
const clearAll=document.querySelector('.clearAll');


input.onkeyup=()=>{
    let data=input.value;
    if(data.trim()!=0){
        addbtn.classList.add('active');
    }
    else{
        addbtn.classList.remove('active');
    }
    // console.log(data.trim().length);
};

function showTask(){
    let getfromlocalstorage=localStorage.getItem('newitem');
    if(getfromlocalstorage==null){
        listarr=[];
    }
    else{
        listarr=JSON.parse(getfromlocalstorage);

    }
    listarr.length>0? clearAll.classList.add('begin'): clearAll.classList.remove('begin');
    footer.textContent=`You have ${listarr.length} pending tasks `
    let newstr='';
    listarr.forEach((e,idx)=>{
        newstr += `<li>${e} <span onclick=deleteTask(${idx})><i class=" fas fa-trash"></i></span></li>`
    });
    
    list.innerHTML =newstr;



}

function deleteTask(index){
    let getfromlocalstorage=localStorage.getItem('newitem');
    listarr=JSON.parse(getfromlocalstorage);
    listarr.splice(index,1);

    localStorage.setItem('newitem',JSON.stringify(listarr));

    showTask();
}

function addtask(){
    let data=input.value;
    if(data){
    let getfromlocalstorage=localStorage.getItem('newitem');
    if(getfromlocalstorage==null){
        listarr=[];
    }
    else{
        listarr=JSON.parse(getfromlocalstorage);
    }
    listarr.push(data);
    localStorage.setItem('newitem',JSON.stringify(listarr));
    footer.textContent=`You have ${listarr.length} tasks left`
    showTask();
    input.value="";
    }

}


addbtn.onclick=()=>{
    // console.log(e.key);
    addtask();

}
input.addEventListener('keyup',function(event){
    // console.log(event)
    // event.preventDefault(); 
    if(event.keyCode === 13){
        addtask();  
    }
});

clearAll.addEventListener('click',()=>{
    // let getfromlocalstorage=localStorage.getitem('newitem');
    listarr=[];
    localStorage.setItem('newitem',JSON.stringify(listarr));
    // footer.textContent=`You have ${listarr.length} tasks left`
    showTask();
})

