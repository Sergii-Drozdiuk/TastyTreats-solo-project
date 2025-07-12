import{o as $,s as m,h as A,n as p,a as B,f as F,c as S}from"./order-3badd72e.js";let l=new Set;const s={cardsFavorites:document.querySelector(".list_cards_favorites"),categoriesFavorites:document.querySelector(".favorites_categories"),allCategories:null};s.cardsFavorites.addEventListener("click",_);function w(t){if(!t.length){s.categoriesFavorites.innerHTML="";return}s.categoriesFavorites.replaceWith(s.categoriesFavorites.cloneNode(!1)),s.categoriesFavorites=document.querySelector(".favorites_categories");const a=[`<li><button id="allcat" class="main-button recipe-item-see category-btn ${l.size===0?"green-button":""}" type="button">All categories</button></li>`,...t.map(o=>`<li><button class="main-button recipe-item-see category-btn ${l.has(o)?"green-button":""}" type="button">${o}</button></li>`)];s.categoriesFavorites.innerHTML=a.join(""),s.categoriesFavorites.addEventListener("click",P),s.allCategories=document.querySelector("#allcat")}function y(t,e,a){const o=(e-1)*a,d=e*a,h=T(t).slice(o,d);h.length?s.cardsFavorites.innerHTML=h.join(""):s.cardsFavorites.innerHTML=`<div class="not_favorites">
						<svg class="favorites_elem_svg" width="68" height="58">
							<use href="${m}#icon-elements"></use>
						</svg>
						<p class="favorites_text">
							It appears that you haven't added any recipes to your favorites yet. To
							get started, you can add recipes that you like to your favorites for
							easier access in the future.
						</p>
					</div>`,A()}function P({target:t}){if(!t.classList.contains("main-button"))return;N(1);const e=t===s.allCategories,a=s.categoriesFavorites.querySelectorAll(".main-button:not(#allcat)");if(e){s.allCategories.classList.add("green-button"),a.forEach(o=>o.classList.remove("green-button")),l.clear(),i(1);return}if(t.classList.contains("green-button")){t.classList.remove("green-button"),s.allCategories.classList.add("green-button"),l.clear(),i(1),w([...new Set(f.map(o=>o.category))]);return}a.forEach(o=>o.classList.remove("green-button")),t.classList.add("green-button"),s.allCategories.classList.remove("green-button"),l.clear(),l.add(t.textContent),i(1)}function i(t){const e=l.size?f.filter(({category:a})=>l.has(a)):f;y(e,t,b),W(e.length)}function _({target:t}){t.classList.contains("recipe-item-see")&&$(t.dataset.id)}window.addEventListener("resize",j);function j(){window.innerWidth<768&&location.reload()}let r=0,n=0,f=[];const b=window.innerWidth>767?12:9,E=document.querySelector(".list_cards_favorites"),g=document.querySelector(".pagination-buttons");E.addEventListener("click",x);C();function q(){let t=[];try{t=JSON.parse(localStorage.getItem("favorites"))}catch{p.Notify.info("There are no recipes added to favorites.")}return t}async function M(){const t=q();let e=[];if(t.length){const a=t.map(async o=>await F(o));e=await Promise.all(a)}return e}function C(){p.Loading.dots(),M().then(t=>{f=t,n=1;const e=H(t);w(Array.from(e)),L(t.length),y(f,1,b)}).catch(()=>p.Notify.info("There are no recipes added to favorites.")).finally(p.Loading.remove(1e3))}function T(t){let e=[];return t&&t.forEach(a=>{e.push(S(a,"in-favorites",`${m}#icon-like-full`))}),e}function H(t){const e=new Set;return t&&t.forEach(a=>{e.add(a.category)}),e}function x(t){t.target.classList.contains("js-like")&&(B(t),C())}function L(t){if(t<b){g.innerHTML="";return}r=Math.ceil(t/b);const e=b===9?3:4,a=r>=e?e:r;let o="";for(let c=1;c<=a;c+=1)c!==e?o+=`<button class="pagination-btn btn-js btn-pg" data-id="${c}" data-value="${c}">${c}</button>`:o+=`<button class="pagination-btn btn-js btn-pg" data-id="${c}" data-value="${c}">...</button>`;const d=`${m}#icon-small-right`,v=`${m}#icon-small-left`;let h=` <div class="back-buttons additional">
      <button class="pagination-btn arrow-btn back-arrow-btn-js btn-js" data-id="5">
         <div class="left-arrow-icon double-arrow">
           <svg class="icon-double-arrow-one" width="24" height="24">
          <use href="${v}"></use>
        </svg>
        <svg class="icon-double-arrow-two" width="24" height="24">
          <use href="${v}"></use>
        </svg>
         </div>
        </svg></button
      ><button class="pagination-btn arrow-btn back-arrow-btn-js btn-js" data-id="6">
        <svg class="left-arrow-icon" width="24" height="24">
          <use href="${v}"></use>
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
    </div>`;g.innerHTML=h;const k=g.querySelector(".range-btns");k.innerHTML=o,g.querySelectorAll(".btn-js").forEach(c=>c.addEventListener("click",I)),n===1&&u(n)}function I({currentTarget:t}){const e=t.dataset.id,a=t.dataset.value;switch(e){case"1":i(a),n=a;break;case"2":i(a),u(a);break;case"3":i(a),u(a);break;case"4":i(a),u(a);break;case"5":n=1,i(1);break;case"6":n>1&&(n=n-=1,i(n),u(n));break;case"7":n<r&&(n=n+=1,i(n),u(n));break;case"8":i(r),u(r);break}}function W(t){r=Math.ceil(t/b),L(t)}function N(t){n=t}function z(t){g.querySelectorAll(".btn-pg").forEach(a=>{a.dataset.value==t?a.classList.add("active"):a.classList.remove("active")})}function u(t){const e=g.querySelectorAll(".btn-pg"),a=window.innerWidth>767?4:3;n=Number(t),e[0].textContent=e[1].dataset.value>2?"...":"1",e[1].textContent=e[1].dataset.value,e[2]&&(e[2].textContent=a===4?e[2].dataset.value:n!==r&&r>3?"...":`${r}`),e[3]&&(e[3].textContent=n!==r&&r>4?"...":`${r}`),z(n)}
