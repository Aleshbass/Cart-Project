

console.log(itemcontainer)




//     let item= document.createElement('div')
//     item.classList="item"
    
//     let span= document.createElement('span')
//     let img= document.createElement('img')
//     img.src= product.src

// span.append(img);

// let para= document.createElement('p')
// para.setAttribute('id', 'course')
// para.textContent= product.name

// let math= document.createElement('div');
// math.setAttribute('id', 'course_add')

// let strong1= document.createElement('strong')
// strong1.id= 'substract'
// strong1.innerHTML= '-'


// let quantity= document.createElement('p');
// quantity.id= 'number'

// let strong2= document.createElement('strong')
// strong2.id= 'addition'
// strong2.innerHTML= '+';

// math.append(strong1, quantity, strong2);


// let price= document.createElement('p');
// price.innerHTML= Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD'
// }).format(product.price)

// let remove= document.createElement('p');
// remove.id= 'remove'

// let removeimg= document.createElement('img');
// img.src= '/img/cross-svgrepo-com copy.svg'

// remove.appendChild(removeimg);



// item.append(span, para, math, price, remove)
// itemcontainer.appendChild(item);



//display of cart and removal of cart




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
     console.log('else')
        this.ADDTOSTORAGE();
       }
    },

   async ADDTOSTORAGE (){
        let _cart= JSON.stringify(mydetails);
       localStorage.setItem(this.key, _cart)
    },


    remove(item){
        let products= CART.content;
   products= products.filter(product=>{
    
         return  product.price !== item.classList.value
   })


   console.log(products)
//    CART.ADDTOSTORAGE();

    },
    
    updatetotal(){

        // CART.firstvisit();

        let product= CART.content;
        let number = product.length;
return number;

    },


    updateprice(){

        // CART.firstvisit();
        let allproduct= CART.content.reduce((acc, {price})=>{ 
            return acc + price
        }, 0)

        return allproduct
    }
 
 
 }





// getting user inputs from added courses. 
class create_course {
    constructor({ name, price, src }) {
        this.name = name;
        this.price = price;
        this.src = src;

    }
}




Add_to_cart.forEach((add)=>{

    add.addEventListener("click", ()=>{

        if(add.classList.contains('active')){
          
            add.classList.remove('active')
            add.firstElementChild.innerHTML="Add to cart" 
mydetails= mydetails.filter(det=>{
    if(add.value!==det.price)
    return mydetails

    CART.ADDTOSTORAGE();
    displaycart();
})
           
        }

     
       else{ add.classList.add('active')
      add.firstElementChild.innerHTML="Added to cart"
           
let course_name= add.parentElement.children[1].textContent;

let _price= add.parentElement.previousElementSibling.textContent.trim();

course_price= _price.substr(1, _price.length)

let course_img_src= add.parentElement.parentElement.firstElementChild.firstElementChild.src;

let details = new create_course({name: course_name.trim(), price: parseFloat(course_price, 3), src: course_img_src});


mydetails.push(details)   
CART.ADDTOSTORAGE();
displaycart();
    }  


    })

  

})



// what happens when page loads?

document.addEventListener('DOMContentLoaded', ()=>{

    // get data from either local storage or from cart.content
    CART.firstvisit();
     
    // display whatever data you get on the cart page
    displaycart();


})



function changeprice(){

    let number=  CART.updatetotal();
  let totalprice= CART.updateprice();

  
  
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


function displaycart(){
 

    itemcontainer.innerHTML= " "  ;

    CART.firstvisit();
    changeprice();

    let products= CART.content;

// create each item on cart

products.forEach(product=>{


itemcontainer.insertAdjacentHTML('beforeend', `
<div class="item">
            <span><img src= ${product.src} alt="" srcset=""></span>
            <p id="course">${product.name}</p>
            <div id="course_add"> 
              
                <strong id="substract">-</strong>
                <p id="number">1</p>
                <strong id="substract">+</strong>
            </div>

          
            <p id="price"><strong></strong> $${product.price} </p>
            <p  id="remove" class= "${product.price}" onclick="removeItem()" ><img src="/img/cross-svgrepo-com copy.svg" alt="" srcset=""></p>
        </div>
`)

})

}


continue_shop.addEventListener('click', ()=>{
    awesomecontainer.classList.remove('active')    
cartbody.classList.add('active')          
expertcontainer.classList.remove('active')
popularcontainer.classList.remove('active')
formcontainer.classList.remove('active')
})



viewcart.addEventListener('click', ()=>{

//  itemcontainer.innerHTML=" ";

 displaycart();
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











            
   // remove an item from the cart


//    let Rem=  document.querySelectorAll('#remove');
//    console.log(Rem)
   
   
//        for (r of Rem){
//         r.addEventListener('click', ()=>{
//             console.log(r.classList.value)
//       r.parentElement.remove();
//            CART.remove(r)
   
//            changeprice();
//            CART.updatetotal();
//            console.log('ade')
         
   
//         })   
           
   
//        }