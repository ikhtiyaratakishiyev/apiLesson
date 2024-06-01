const apiConta = document.querySelector(".apiConta");

const box = document.querySelector(".box");

const input = document.querySelector("input");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {

    function myApi(getdata) {


if(apiConta){
  
  apiConta.innerHTML=''

  getdata.map((item) => {
    apiConta.innerHTML  += `
                    <div id=${item.id} class="box">
                    <div class="imgBox">
                        <img src=${item.image} alt="">
                    </div>
                 
                    <h4>${item.category}</h4>
                    <span>${item.price}</span>
                </div>
                  
                  `
  });
  input.addEventListener("input", (e) => {
    e.preventDefault();
  
    let filter = data.filter((item) =>
      item.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
   
    myApi(filter)
  });

}

    }
    myApi(data);


      
      const Allbox = document.querySelectorAll(".box");
    

      [...Allbox].map((box)=>{
             box.addEventListener('click',function (){
      
let newData = data.find((item)=>item.id==this.id);

localStorage.setItem('newData',JSON.stringify(newData));

      
        location.href='./detail.html'

      })
      })

   
     
  });


let localData = JSON.parse(localStorage.getItem("newData"));


const productBox = document.querySelector('.productBox')

if(productBox){

  productBox.innerHTML=`

  <div class="detailImgBox">
  <img src=${localData.image} alt="">
  </div>
  <div class="titleBox">
  <h4>${localData.category}</h4>
  <span>${localData.title}</span>
  <p>Price: ${localData.price} $ </p>
  <button>Home Page</button>
  </div>
  
  
  `
  const button = document.querySelector("button");

button.addEventListener('click',()=>{
  location.href='./index.html'
})
}



