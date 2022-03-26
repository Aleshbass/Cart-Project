document.addEventListener('DOMContentLoaded', ()=>{

    // get data from either local storage or from cart.content
    CART.firstvisit();
     
    // display whatever data you get on the cart page
    displaycart();


})


let mymenubar= document.querySelector('#openbutton');
const closetheButton= document.querySelector('.closebar');
const menu= document.querySelector('.menu');
const toggler= document.querySelector('#togg');
const header= document.querySelector('.header-content');
const formcontainer= document.querySelector('.form-container')
const popularcontainer= document.querySelector('.popular-courses')
const awesomecontainer= document.querySelector('.awesome-features')
const expertcontainer= document.querySelector('.expert-container')
const cartbody= document.querySelector('.body')
const viewcart= document.querySelector('.join-button button')
let itemcontainer= document.querySelector('#cart')

let continue_shop= document.querySelector('#continue')

let total_one= document.querySelector('.title p')
let total_two= document.querySelector('.title h4')

let total_price= document.querySelector('.title p#totalprice')
let final_price= document.querySelector('.title p#finalprice')

let price_one = document.querySelectorAll('.image-price')
const viewcart_after= document.querySelector('#cart-display #after')


const Add_to_cart= document.querySelectorAll('.image-title button')

let mydetails=[];


let CART = {
    key: 'ademola',
    content: [],
    firstvisit(){
      let stored= localStorage.getItem(CART.key);
      if(stored){
          this.content= JSON.parse(stored);
       
     }

      else{
          this.content= mydetails
       }
    },

    ADDTOSTORAGE (){
        let _cart= JSON.stringify(mydetails);
       localStorage.setItem(this.key, _cart)
    
    },


    remove(item){
        let products= CART.content;
   products= products.filter(product=>{
    
         return  product.price !== item.classList.value
   })

    },
    
    updatetotal(){

 
        let product= CART.content;
        let number = product.length;
return number;

    },


    updateprice(){

        let allproduct= CART.content.reduce((acc, {price})=>{ 
            return acc + price
        }, 0)

        return allproduct
    },
    

    increaseprice(id, num){
       
  
        CART.content = CART.content.map(item=>{
        if(item.price === id)
        {
         
           return {
               name: item.name,
               price: Number((item.price + item.price/num ).toFixed(2)),
               src: item.src, 
               qty: Number(item.qty)
      
        }
     
     
       
    }
    num= num+1
   
    return item
      })

      mydetails= CART.content;
      displaycart();
     
     
    },
    

    increaseamout(id){
       
        CART.content = CART.content.map(item=>{
         if(item.price === id)
         {
            return {
                name: item.name,
                price: item.price ,
                src: item.src, 
                qty: item.qty + 1
         }
     }
   
        
     return item
       })
    
       mydetails= CART.content;
       displaycart();
      
      
     },

     
    decreaseamout(id){
       
        CART.content = CART.content.map(item=>{
         if(item.price === id)
         {
            return {
                name: item.name,
                price: item.price ,
                src: item.src, 
                qty: item.qty - 1
            }
        }
  
     return item
       })

   
       mydetails= CART.content;
       displaycart();
 
      
     },
     
     decreaseprice(id){
        displaycart();
      
        CART.content = CART.content.map(item=>{
         if(item.price === id)
         {
            return {
                name: item.name,
                price: Number((item.price / item.qty).toFixed(2)),
                src: item.src, 
                qty: item.qty
       
 
          
         }
     }
   
        
     return item
       })
    
       mydetails= CART.content;
       displaycart();
      
      
     }



 
 }


 function number(num){
     return num +1
 }

 function removeCart(cart){


    mydetails= mydetails.filter(item=>{
if (cart !== item.price)
return true
    })

    console.log(mydetails)
 }

// getting user inputs from added courses. 
class create_course {
    constructor({ name, price, src, qty }) {
        this.name = name;
        this.price = price;
        this.src = src;
        this.qty= qty

    }
}

Add_to_cart.forEach((add)=>{

    add.addEventListener("click", (ev)=>{

        let btn_value = Number(add.value);

        ev.preventDefault();


        if(add.classList.contains('active')){
          
            add.classList.remove('active')
            add.firstElementChild.innerHTML="Add to cart" 
            removeCart(btn_value);
            CART.content= mydetails;

CART.ADDTOSTORAGE();
displaycart();

        }


     
       else{ 
           add.classList.add('active')

      add.firstElementChild.innerHTML="Added to cart"
           
let course_name= add.parentElement.children[1].textContent;

let _price= add.parentElement.previousElementSibling.textContent.trim();

course_price= _price.substr(1, _price.length)

let course_img_src= add.parentElement.parentElement.firstElementChild.firstElementChild.src;

let details = new create_course({name: course_name.trim(), price: parseFloat(course_price, 3), src: course_img_src, qty: 1});


mydetails.push(details) 

CART.content= mydetails;

CART.ADDTOSTORAGE();
displaycart();
    
       }
   
    })


  

})


function displaycart(){
 

    itemcontainer.innerHTML= " "  ;
  
    changeprice();

    let products= CART.content;

    // console.log(products)

// create each item on cart

products.forEach(product=>{


itemcontainer.insertAdjacentHTML('beforeend', `
<div class="item">
            <span><img src= ${product.src} alt="" srcset=""></span>
            <p id="course">${product.name}</p>
            <div id="course_add"> 
              
                <strong id="substract" onclick= "decreaseqty(event)" data-id="${product.price}">-</strong>
                <p id="number">${product.qty}</p>
                <strong id="substract" onclick= "increaseqty(event)" data-id="${product.price}" >+</strong>
            </div>

          
            <p id="price"><strong></strong> $${product.price} </p>
            <p  id="remove" >
            <img  onclick="removeItem(event)" src="/img/cross-svgrepo-com copy.svg" data-id="${product.price}" alt="" srcset=""></p>
        </div>
`)

})

}

function changeprice(){

    let number=  CART.updatetotal();
    viewcart_after.innerHTML= number;
        
    
  let totalprice= (CART.updateprice()).toFixed(2);
  
  // calculate total price of product
  
  
  total_price.innerHTML= `$${totalprice}`
  final_price.innerHTML= `$${totalprice}`
  
  
  // update total number on display
  
  
  
  if(number > 1){
      total_one.textContent= `${number} items`
      total_two.textContent= `items: ${number}`
  }
  else{
      total_one.textContent= `${number} item`;
      total_two.textContent= `item:  ${number}`;
  }
  
}

continue_shop.addEventListener('click', ()=>{
    awesomecontainer.classList.remove('active')    
cartbody.classList.add('active')          
expertcontainer.classList.remove('active')
popularcontainer.classList.remove('active')
formcontainer.classList.remove('active')
})

viewcart.addEventListener('click', ()=>{

    awesomecontainer.classList.add('active')    
    cartbody.classList.remove('active')          
    expertcontainer.classList.add('active')
    popularcontainer.classList.add('active')
    formcontainer.classList.add('active')

})
     
//menu bar

mymenubar.addEventListener('click', ()=>{
    mymenubar.classList.toggle('active');
    menu.classList.toggle('active');



})


  function removeItem(event){

//   event.stopPropagation();
      let id = Number(event.target.getAttribute('data-id'))

    //   console.log(mydetails)
      console.log(id)

     CART.content= CART.content.filter(item=>{
          if (id !== item.price){
              console.log('left')
          return true
          }
      })

     mydetails = CART.content
      CART.ADDTOSTORAGE();
      displaycart();

  }



  function increaseqty(event){
  
let id = Number(event.target.getAttribute('data-id'))

CART.increaseamout(id);

    CART.increaseprice(id, number(0));
  
      console.log(mydetails)
   
  }


  function decreaseqty(event){
    let id = Number(event.target.getAttribute('data-id'))

    CART.decreaseamout(id);

    CART.decreaseprice(id);
  


  }
