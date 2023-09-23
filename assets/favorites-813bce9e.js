import{o as k,s as m,h as F,n as h,a as A,f as B,c as $}from"./order-60fcc7f9.js";let l=new Set;const s={cardsFavorites:document.querySelector(".list_cards_favorites"),categoriesFavorites:document.querySelector(".favorites_categories"),allCategories:null};s.cardsFavorites.addEventListener("click",x);function S(t){if(t.length===0){s.categoriesFavorites.innerHTML="";return}const e=t.map(o=>`<li><button class="main-button recipe-item-see category-btn" type="button">${o}</button></li>`),n=l.size===0?"green-button":null;e.unshift(`<li><button id="allcat" class="main-button recipe-item-see category-btn ${n}" type="button">All categories</button></li>`),s.categoriesFavorites.innerHTML=e.join(""),s.categoriesFavorites.addEventListener("click",P),s.allCategories=document.querySelector("#allcat")}function w(t,e,n){const o=(e-1)*n,d=e*n,v=H(t).slice(o,d);v.length?s.cardsFavorites.innerHTML=v.join(""):s.cardsFavorites.innerHTML=`<div class="not_favorites">
						<svg class="favorites_elem_svg" width="68" height="58">
							<use href="${m}#icon-elements"></use>
						</svg>
						<p class="favorites_text">
							It appears that you haven't added any recipes to your favorites yet. To
							get started, you can add recipes that you like to your favorites for
							easier access in the future.
						</p>
					</div>`,F()}function P({target:t}){if(t.classList.contains("main-button")){if(N(1),t===s.allCategories){const e=s.cardsFavorites.children,n=s.categoriesFavorites.children;for(let o=1;o<n.length;o++)n[o].children[0].classList.remove("green-button");for(let o=0;o<e.length;o++);t.classList.add("green-button"),l.clear(),c(1);return}l.has(t.textContent)?(l.delete(t.textContent),t.classList.remove("green-button")):(l.add(t.textContent),t.classList.add("green-button"),s.allCategories.classList.remove("green-button")),l.size||s.allCategories.classList.add("green-button"),c(1),_()}}function _(){const t=s.categoriesFavorites.querySelectorAll(".green-button");if(s.categoriesFavorites.children.length-1===t.length){s.allCategories.classList.add("green-button"),l.clear();for(const n of t)n.classList.remove("green-button")}}function c(t){const e=l.size?p.filter(({category:n})=>l.has(n)):p;w(e,t,f),W(e.length)}function x({target:t}){t.classList.contains("recipe-item-see")&&k(t.dataset.id)}window.addEventListener("resize",j);function j(){window.innerWidth<768&&location.reload()}let r=0,a=0,p=[];const f=window.innerWidth>767?12:9,q=document.querySelector(".list_cards_favorites"),g=document.querySelector(".pagination-buttons");q.addEventListener("click",I);y();function E(){let t=[];try{t=JSON.parse(localStorage.getItem("favorites"))}catch(e){h.Notify.failure("Unable to load favorites. "+e)}return t}async function M(){const t=E();let e=[];if(t.length){const n=t.map(async o=>await B(o));e=await Promise.all(n)}return e}function y(){h.Loading.dots(),M().then(t=>{p=t,a=1;const e=T(t);S(Array.from(e)),C(t.length),w(p,1,f)}).catch(t=>h.Notify.failure("Unable to load favorites. "+t.message)).finally(h.Loading.remove(1e3))}function H(t){let e=[];return t&&t.forEach(n=>{e.push($(n,"in-favorites",`${m}#icon-like-full`))}),e}function T(t){const e=new Set;return t&&t.forEach(n=>{e.add(n.category)}),e}function I(t){t.target.classList.contains("js-like")&&(A(t),y())}function C(t){if(t<f){g.innerHTML="";return}r=Math.ceil(t/f);const e=f===9?3:4,n=r>=e?e:r;let o="";for(let i=1;i<=n;i++)i!==e?o+=`<button class="pagination-btn btn-js btn-pg" data-id="${i}" data-value="${i}">${i}</button>`:o+=`<button class="pagination-btn btn-js btn-pg" data-id="${i}" data-value="${i}">...</button>`;const d=`${m}#icon-small-right`,b=`${m}#icon-small-left`,v=` <div class="back-buttons additional">
      <button class="pagination-btn arrow-btn btn-js" data-id="5">
         <div class="left-arrow-icon double-arrow">
           <svg class="icon-double-arrow-one" width="24" height="24">
          <use href="${b}"></use>
        </svg>
        <svg class="icon-double-arrow-two" width="24" height="24">
          <use href="${b}"></use>
        </svg>
         </div>
        </svg></button
      ><button class="pagination-btn arrow-btn btn-js" data-id="6">
        <svg class="left-arrow-icon" width="24" height="24">
          <use href="${b}"></use>
        </svg>
      </button>
    </div>
    <div class="range-btns cont"></div>
    <div class="forward-buttons">
      <button class="pagination-btn arrow-btn btn-js" data-id="7">
       <svg class="right-arrow-icon" width="24" height="24">
          <use href="${d}"></use>
        </svg>
       </button
      ><button class="pagination-btn arrow-btn btn-js" data-id="8">
        <div class="right-arrow-icon double-arrow">
          <svg class="icon-double-arrow-one" width="24" height="24">
            <use href="${d}"></use></svg
          ><svg class="icon-double-arrow-two" width="24" height="24">
            <use href="${d}"></use>
          </svg>
        </div>
      </button>
    </div>`;g.innerHTML=v;const L=g.querySelector(".range-btns");L.innerHTML=o,g.querySelectorAll(".btn-js").forEach(i=>i.addEventListener("click",z)),a===1&&u(a)}function z({currentTarget:t}){const e=t.dataset.id,n=t.dataset.value;switch(e){case"1":c(n),a=n;break;case"2":c(n),u(n);break;case"3":c(n),u(n);break;case"4":c(n),u(n);break;case"5":a=1,c(1);break;case"6":a>1&&(a=a-=1,c(a),u(a));break;case"7":a<r&&(a=a+=1,c(a),u(a));break;case"8":c(r),u(r);break}}function W(t){r=Math.ceil(t/f),C(t)}function N(t){a=t}function O(t){g.querySelectorAll(".btn-pg").forEach(n=>{n.dataset.value==t?n.classList.add("active"):n.classList.remove("active")})}function u(t){const e=g.querySelectorAll(".btn-pg"),n=window.innerWidth>767?4:3;a=Number(t),console.log(a),e[0].textContent=e[1].dataset.value>2?"...":"1",e[1].textContent=e[1].dataset.value,e[2]&&(e[2].textContent=n===4?e[2].dataset.value:a!==r&&r>3?"...":`${r}`),e[3]&&(e[3].textContent=a!==r&&r>4?"...":`${r}`),O(a)}
