let total_counter = document.querySelector(".total_counter");
const price_total = document.querySelector(".price-total");
// console.log(price_total);


window.addEventListener("load", function () {
  let loading = this.document.querySelector(".loader");
  loading.classList += " hidden";
});
const intro = document.querySelector(".intro");
const text = document.querySelectorAll(".logo");
const img_intro = document.querySelector(".img-intro");

window.addEventListener("load", () => {
  setTimeout(() => {
    text.forEach((logo, ind) => {
      setTimeout(() => {
        logo.classList.add("active");
      }, (ind + 1) * 400);
    });
  });

  setTimeout(() => {
    text.forEach((logo) => {
      setTimeout(() => {
        logo.classList.remove("active");
        logo.classList.add("fade");
        img_intro.classList.add("fade");
      }, 1500);
    });
  }, 3000);

  this.setTimeout(() => {
    intro.style.top = "-100vh";
  }, 4000);
});

const tab_menu = document.querySelector(".tab-menu").children;
const list_ul = document.querySelector(".list-ul").children;

for (let i = 0; i < list_ul.length; i++) {
  list_ul[i].style.display = "none";
  if (list_ul[i].getAttribute("data-category") == "cake") {
    list_ul[i].style.display = "block";
  }
}

for (let i = 0; i < tab_menu.length; i++) {
  tab_menu[i].addEventListener("click", function () {
    for (let j = 0; j < tab_menu.length; j++) {
      let link = tab_menu[j].children[0];
      link.classList.remove("active");
    }
    let link = tab_menu[i].children[0];
    link.classList.add("active");
    const atter = tab_menu[i].getAttribute("data-filter");

    for (let y = 0; y < list_ul.length; y++) {
      list_ul[y].style.display = "none";
    }

    for (let x = 0; x < list_ul.length; x++) {
      if (atter == list_ul[x].getAttribute("data-category")) {
        list_ul[x].style.display = "block";
      }
    }
  });
}

const shop_cart = document.querySelector(".shop");
const shop_items = document.querySelector(".shopping-items");
// console.log(shop_cart);
shop_cart.addEventListener("click", () => {
  shop_items.classList.toggle("active");
});

let cartitems = (JSON.parse(localStorage.getItem("cart_items"))|| []);
document.addEventListener("DOMContentLoaded",loadData());
const btn_list = document.querySelectorAll(".btn-list");
// console.log(btn_list);

btn_list.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.parentElement;

    const products = {
      id: parent.querySelector("input").value,
      img_pro: parent.querySelector(".img-list").src,
      title_pro: parent.querySelector(".title").innerText,
      price_pro: parent.querySelector(".price").innerText,
      quantity: 1,
    };
    let IsInCart =
      cartitems.filter((item) => item.id === products.id).length > 0;
    if (!IsInCart) {
      AddItemToTheDom(products);
      iziToast.success({
  title: `محصول  ${products.title_pro}  با موفقیت به سبد خرید اضافه شد`,

  timeout: 3000,
  rtl: true,
  position: 'topRight'
});

    } else {
 iziToast.error({
  title: 'این محصول قبلا در سبد خرید شما موجود است',
  message: 'درصورتی که قصد افزایش تعداد را دارید در سبد خریدتان از دکمه + استفاده کنید',
  position: 'topRight',
  
  timeout: 5000,       // مدت نمایش
  close: true,         // دکمه بستن
  rtl: true            // چون متن فارسیه
});  return;
    }

    let shopping_oneitem = document.querySelectorAll(".shopping-oneitem");

    shopping_oneitem.forEach((initem) => {
      if (initem.querySelector("#product-id").value === products.id) {
        increaseitem(initem, products);
        decreaseitem(initem, products);
        delitem(initem, products);
      }
    });

    cartitems.push(products);
savetolocal();
    CalculateTotal();

  });
});

function savetolocal(){
  localStorage.setItem("cart_items",JSON.stringify(cartitems));
}


function AddItemToTheDom(product) {
  shop_items.insertAdjacentHTML(
    "afterbegin",
    `      
    <div class="shopping-oneitem">
  <div class="detail-shop">
  <input type="hidden" id="product-id" value=${product.id}>
    <img src=${product.img_pro} alt="" class="shopping-img" />
    <div class="name-item"><span class="name">${product.title_pro}</span></div>
  </div>

  <div class="item-control">
    <span class="icon-plus icon-sh "
      ><i class="fa-solid fa-plus fs-5 " action="increase"></i
    ></span>
    <span class="number-item">${product.quantity}</span>
    <span class="icon-minus icon-sh "
      ><i class="fa-solid fa-minus fs-5"></i
    ></span>
    <span class="number-price">${product.price_pro} تومان</span>

    <span class="icon-trash" ><i class="fa-solid fa-trash-can icon-sh fs-5 "></i></span>
  </div>
</div>
`
  );
}

function CalculateTotal() {
  let counttotal = 0;
  cartitems.forEach((item) => {
    counttotal += item.quantity * item.price_pro;
  });

  price_total.innerText = counttotal + ".000" + " تومان ";
  total_counter.innerText = cartitems.length;
}

function increaseitem(initem, products) {
  initem.querySelector(".icon-plus").addEventListener("click", () => {
    cartitems.forEach((cart) => {
      if (cart.id === products.id) {
        initem.querySelector(".number-item").innerText = ++cart.quantity;
        CalculateTotal();
        savetolocal();
      }
    });
  });
}

function decreaseitem(initem, products) {
  initem.querySelector(".icon-minus").addEventListener("click", () => {
    cartitems.forEach((cart) => {
      if (cart.id === products.id) {
        initem.querySelector(".number-item").innerText = --cart.quantity;
        if (cart.quantity === 0) {
          initem.style.display = "none";

          for (let i = 0; i < cartitems.length; i++) {
            if (cartitems[i] === cart) {
              cartitems.splice(i, 1);
            }
          }
        }
        CalculateTotal();
        savetolocal();
      }
    });
  });
}

function delitem(initem, products) {
  initem.querySelector(".icon-trash").addEventListener("click", () => {
    let id = initem.querySelector("#product-id").value;

    initem.style.display = "none";
    for (let i = 0; i < cartitems.length; i++) {
      if (cartitems[i].id === id) {
        cartitems.splice(i, 1);
      }
    }
    CalculateTotal();
    savetolocal();
  });
}


function loadData(){
if(cartitems.length>0){
  cartitems.forEach(products=>{
    AddItemToTheDom(products);
    let shopping_oneitem = document.querySelectorAll(".shopping-oneitem");

    shopping_oneitem.forEach((initem) => {
      if (initem.querySelector("#product-id").value === products.id) {
        increaseitem(initem, products);
        decreaseitem(initem, products);
        delitem(initem, products);
      }
    });
  })
  CalculateTotal();
  savetolocal();
}
}


function cleardata(){
  localStorage.clear();
  cartitems=[];
  document.querySelectorAll(".shopping-oneitem").forEach(item=>{
    item.remove();
  })
  CalculateTotal();
}

document.querySelector(".shopping-btn").addEventListener("click",()=>{
  cleardata();
})
