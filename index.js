const apiConta = document.querySelector(".apiConta");

const box = document.querySelector(".box");

const modal = document.querySelector(".modal");

const modalBox = document.querySelector(".modalBox");

const close = document.querySelector(".close");

const readItem = JSON.parse(localStorage.getItem("readItem"));

const updatedData = JSON.parse(localStorage.getItem("updatedData"));

const uploadBtnAll = document.querySelectorAll(".uploadBtn");



// **************  Read iteemi yaddashda saxlamaq ucun verilen if sherti  ******************//

if (readItem) {
  modal.style.display = "flex";

  modal.innerHTML = `
           
  <div class="modalBox">
 <div class="close">X</div>
  <div class="modalImgBox">
      <img src=${readItem.image} alt="">
  </div>
  <h1>${readItem.category}</h1>
  <span>${readItem.title}</span>
  <p>${readItem.price}</p>

</div>
  
  `;
  const close = document.querySelector(".close");

  close.addEventListener("click", () => {
    modal.style.display = "none";
    localStorage.removeItem("readItem");
  });
}

// *************  Datani getirib ishleden funksiya *************//

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {

    /* LocalStorage hər ikisi data kimi getdiyi üçün 63-64 
    cü sətrlərdə datanı ayrı ayrı dəyişənlərə mənimsətmək olmur,
    ona görə delete funksiyasınıda updatetdata key ile yaddaşa verdim ki
    hər iki funksiyanı bir data dəyişəninə mənimsədə bilim*/




     
      // data = updatedData ? updatedData : data
      
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
                    <button id=${item.id} class='uploadBtn'>Update</button>
                  </div>
                </div>
                  
                  `;

          // id=item.id ona gore edirik ki, hansi buttona klik edeceyikse hemen boxun melumatlarini atsin modala
        });

        // ******** Filter funksiyasini ishletmek ucun ********//

        const input = document.querySelector("input");

        input.addEventListener("input", (e) => {
          e.preventDefault();

          let filter = data.filter((item) =>
            item.category.toLowerCase().includes(e.target.value.toLowerCase())
          );

          myApi(filter);
        });
      }

      // ******************   Detail html sehifesine yonlendiren funksiya ********//

      const Allbox = document.querySelectorAll(".imgBox");

      [...Allbox].map((item) => {
        item.addEventListener("click", function () {
          let newData = data.find((item) => item.id == this.id);

          localStorage.setItem("newData", JSON.stringify(newData));

          location.href = "./detail.html";
        });
      });

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

  
  `;
        const button = document.querySelector("button");

        button.addEventListener("click", () => {
          location.href = "./index.html";
        });
      }

      // ************   Upload button funksionallgi  **********//

      const modalUpdate = document.querySelector(".modalUpdate");
      const closeUpdate = document.querySelector(".closeUpdate");
      const SubmitForm = document.querySelector("form");
      const editFile = document.querySelector(".editFile");
      const editTitle = document.querySelector(".editTitle");
      const editPrice = document.querySelector(".editPrice");
      const modalUpdateImgBox = document.querySelector(".modalUpdateImgBox img");

      const uploadBtn = document.querySelectorAll(".uploadBtn");

      uploadBtn.forEach((item) => {
        item.addEventListener("click", (e) => {
          let getID = Number(e.target.getAttribute("id"));
          modalUpdate.style.display = "flex";
          let editBox = data.find((item) => item.id == getID);

          modalUpdateImgBox.src = `${editBox.image}`;
          editTitle.value = editBox.title;
          editPrice.value = editBox.price;
          SubmitForm.id = editBox.id;

          let updateImg = null;

          editFile.addEventListener("change", () => {
            var reader = new FileReader();
            reader.readAsDataURL(editFile.files[0]);
            reader.onload = function (e) {
              var image = new Image();
              image.src = e.target.result;
              image.onload = function () {
                updateImg = image.src;
              
              };
             
            };
          });

          SubmitForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let getIDSubmit = Number(e.target.getAttribute("id"));
            data = data.map((editBox) => {
              if (editBox.id === getIDSubmit) {
                return {
                  ...editBox,
                  category: editTitle.value,
                  price: editPrice.value,
                  image: updateImg,
                };
              }
             
              return editBox;
            });
            localStorage.setItem('updatedData',JSON.stringify(data))
            myApi(data);
            modalUpdate.style.display = "none";
          });
        });
      });

      closeUpdate.addEventListener("click", (e) => {
        modalUpdate.style.display = "none";
      });


      //  ****** Add Button Funksiyasi   *******  //

      const createBox = document.querySelector(".createBox");
      const addBoxModal = document.querySelector(".addBoxModal");
      const addBoxModalUpdate = document.querySelector(".addBoxModalUpdate");
      const addBoxModalClose = document.querySelector(".addBoxModalClose");
      const addBoxModalImgBox = document.querySelector(".addBoxModalImgBox img");
      const editFileCreate = document.querySelector(".editFileCreate");
      const editTitleCreate = document.querySelector(".editTitleCreate");
      const editPriceCreate = document.querySelector(".editPriceCreate");
      const submitFormCreate = document.querySelector("form");
      const addBoxBtn = document.querySelector(".addBoxBtn");


      addBoxModalClose.addEventListener("click", () => {
        addBoxModal.style.display = "none";
      });
      createBox.addEventListener("click", () => {

        addBoxModal.style.display = "flex";

        let uploadImg = null;

        editFileCreate.addEventListener("change", () => {
          var reader = new FileReader();
          reader.readAsDataURL(editFileCreate.files[0]);
          reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
              uploadImg = image.src;
           
            };
          
          };
        });
        addBoxBtn.addEventListener('click',(e)=>{
          e.preventDefault()
  
      
          const createNewBox = {
            id: Math.floor(Math.random()*1000),
            title:editTitleCreate.value,
            price:editPriceCreate.value,
            image:uploadImg,
            adult:false
          }
         console.log(createNewBox);
          data.unshift(createNewBox)
          myApi(data);
          addBoxModal.style.display = "none";
          localStorage.setItem('updatedData',JSON.stringify(data))
        })
       
      });

    

         // ************   Delete button funksionallgi  **********//



      const deleteBtn = document.querySelectorAll(".deleteBtn");

      deleteBtn.forEach((item) => {
        item.addEventListener("click", (e) => {
          const getID = Number(e.target.getAttribute("id"));

          data = data.filter((item) => item.id !== getID);

          myApi(data);
          localStorage.setItem("updatedData", JSON.stringify(data));
        });
      });



      // ************   Read button funksionallgi  **********//




      const readBtn = document.querySelectorAll(".readBtn");
      const modal = document.querySelector(".modal");

      readBtn.forEach((item) => {
        item.addEventListener("click", (e) => {
          let getID = Number(e.target.getAttribute("id"));

          data.map((item) => {
            if (item.id == getID) {
              localStorage.setItem("readItem", JSON.stringify(item));

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
            
            `;
            }

            // ****** x divine  klik edəndə modalın bağlanılması üçün.******//

            const close = document.querySelector(".close");

            close?.addEventListener("click", () => {
              modal.style.display = "none";
              localStorage.removeItem("readItem");
            });
          });

          modal.style.display = "flex";
        });
      });
    }

    myApi(data);
  });
