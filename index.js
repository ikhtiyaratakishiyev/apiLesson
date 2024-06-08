const apiConta = document.querySelector(".apiConta");

const box = document.querySelector(".box");

const input = document.querySelector("input");

const modal = document.querySelector('.modal');

const modalBox = document.querySelector('.modalBox');

const close = document.querySelector('.close');




fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    function myApi(getdata) {
      if (apiConta) {
        apiConta.innerHTML = "";

        getdata.map((item) => {
          apiConta.innerHTML += `
                    <div  class="box">
                    <div id=${item.id} class="imgBox">
                        <img  src=${item.image} alt="">
                    </div>
                 
                    <h4>${item.category}</h4>
                    <span>${item.price}</span>
                    <div class="btnBox">
                    <button id=${item.id} class='readBtn'>Read</button>  
                    <button id=${item.id} class='deleteBtn'>Delete</button>
                    <button id=${item.id} clas='uploadBtn'>Upload</button>
                  </div>
                </div>
                  
                  `;
                  // id=item.id ona gore edirik ki, hansi buttona klik edeceyikse hemen boxun melumatlarini atsin modala
        });
        input.addEventListener("input", (e) => {
          e.preventDefault();

          let filter = data.filter((item) =>
            item.category.toLowerCase().includes(e.target.value.toLowerCase())
          );

          myApi(filter);
        });
      }


      const Allbox = document.querySelectorAll(".imgBox");
   
 
      [...Allbox].map((item) => {
  
        item.addEventListener("click", function () {
  
         
  
          let newData = data.find((item) => item.id == this.id);
       
          localStorage.setItem("newData", JSON.stringify(newData));
  
          location.href = "./detail.html";
        });
      })

      let localData = JSON.parse(localStorage.getItem("newData"));

const productBox = document.querySelector(".productBox");


if (productBox) {
  productBox.innerHTML = `

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
     
    location.href = "./index.html"
  })
}


       // delete button funksionallgi


    const deleteBtn = document.querySelectorAll('.deleteBtn');

    deleteBtn.forEach((item)=>{
     item.addEventListener('click',((e)=>{
       const  getID = Number (e.target.getAttribute('id'));
      
 
          data = data.filter((item)=> item.id !== getID)
              
          myApi(data)
      }))
      
    })
        // read butonuna klik edəndə modalın açılması üçün.

    const readBtn = document.querySelectorAll('.readBtn');
    const modal = document.querySelector('.modal');

    // let readData = JSON.parse(localStorage.getItem("data"));

    // console.log(readData);

    readBtn.forEach((item)=>{
      item.addEventListener('click',(e)=>{
        let  getID = Number (e.target.getAttribute('id'));
     
       

        data.map((item)=> {
         
          if (item.id == getID) {

           
            modal.innerHTML = `
           
            <div class="modalBox">
           <div class="close">X</div>
            <div class="modalImgBox">
                <img src=${item.image} alt="">
            </div>
            <h1>${item.category}</h1>
            <span>${item.title}</span>
            <p>${item.price}</p>

        </div>
            
            `
            // let newData = data.find((item) => item.id == this.id);
            localStorage.setItem("readData", JSON.stringify(data));
           
          
          }

           // x divine  klik edəndə modalın bağlanılması üçün.

          const close = document.querySelector('.close');

          close.addEventListener('click',()=>{
            modal.style.display='none'
          })
      

        })
        

        modal.style.display='flex';
      })
 

    });


    
   
   
    }
    myApi(data);

  });


    
      
 

    // const Allbox = document.querySelectorAll(".imgBox");
   
 
    // [...Allbox].map((item) => {

    //   item.addEventListener("click", function () {

       

    //     let newData = data.find((item) => item.id == this.id);
     
    //     localStorage.setItem("newData", JSON.stringify(newData));

    //     location.href = "./detail.html";
    //   });
    // })
    
 

// let localData = JSON.parse(localStorage.getItem("newData"));

// const productBox = document.querySelector(".productBox");


// if (productBox) {
//   productBox.innerHTML = `

//   <div class="detailImgBox">
//   <img src=${localData.image} alt="">
//   </div>
//   <div class="titleBox">
//   <h4>${localData.category}</h4>
//   <span>${localData.title}</span>
//   <p>Price: ${localData.price} $ </p>
//   <button>Home Page</button>
//   </div>

  
//   `
//   const button = document.querySelector("button");

//   button.addEventListener('click',()=>{
     
//     location.href = "./index.html"
//   })
// }

  