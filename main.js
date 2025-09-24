let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let  top=0;category = document.getElementById('category');
let total = document.getElementById('total');
let submit = document.getElementById('submit');

let mood ='create';
let tmp;


//get total
function getTotal(){
    if(price.value !=''){
        let result= (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML= result;
        total.style.background='green';
    } else{
       total.innerHTML= ''; 
       total.style.background='rgb(183, 22, 10)';
    }
}

//create product

let dataPro;
if(localStorage.product!=null){
    dataPro=JSON.parse(localStorage.product)
}else 
    dataPro=[];
submit.onclick=function(){
    let newPro= {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value,
        total:total.innerHTML,

    }
     if (mood === 'create'){
       if(newPro.count > 1){
        for(let i = 0 ; i< newPro.count; i++){
         dataPro.push(newPro);   
        }
    } else {
        dataPro.push(newPro); 
    }
    
    }else {
        dataPro [tmp ]=newPro;
        mood ='create';
        submit.innerHTML='Create';
        count.style.display='block';
    }

  
    localStorage.setItem('product',   JSON.stringify(dataPro));

    clearData();
    showData();
}



//clear inputs

function clearData (){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='';

}


//read
function showData(){
    getTotal()
    let table = '';
    for(let i=0; i<dataPro.length ; i++){
        table += ` <tr>
        <td> ${dataPro[i].title}</td>
         <td> ${dataPro[i].price}</td>
          <td> ${dataPro[i].taxes}</td>
           <td> ${dataPro[i].ads}</td>
            <td> ${dataPro[i].discount}</td>
             <td> ${dataPro[i].count}</td>
             <td> ${dataPro[i].total}</td>
              <td> ${dataPro[i].category}</td>
              <td> <button onclick="updateData(${i})" id="update" >update </button></td>
              <td> <button onclick="deleteData(${i})" id="delete" >delete </button></td>
              </tr>
        `


    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
      
        btnDelete.innerHTML = ` 
        <button onclick="deleteAll()"> delete All (${dataPro.length})</button>
         ` 
    }else {
        btnDelete.innerHTML= '';
    }
}

showData();


//delete

function deleteData(i){

    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}


//deleteAll

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData();
}


//count

function updateData(i){
    title.value= dataPro[i].title;
    price.value= dataPro[i].price;
    taxes.value= dataPro[i].taxes;
    ads.value= dataPro[i].ads;
    discount.value= dataPro[i].discount;
    getTotal()
    
    count.style.display='none';
    category.value= dataPro[i].category;
    submit.innerHTML='update';
    mood='update';
    tmp=i;
    scroll({
         top: 0,
         behavior :'smooth',

    })

}



