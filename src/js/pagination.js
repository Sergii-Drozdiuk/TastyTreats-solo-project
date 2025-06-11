import sprite from '../img/icon/icon.svg';
import { renderMain } from './recipe-list';
import { renderCardsOptions } from './recipe-list';

function setPaginationButtons(div, page, total, option) {
		if (total === 1) {
		div.innerHTML = "";
		return
	}
	const iconRightPath = `${sprite}#icon-small-right`;
	const iconLeftPath = `${sprite}#icon-small-left`;
	let arrowButtons = ` <div class="back-btns">
      <button class="pagination-btn arrow-btn back-arrow-btn-js">
         <div class="left-arrow-icon double-arrow">
           <svg class="icon-double-arrow-one" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
        <svg class="icon-double-arrow-two" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
         </div>
        </svg></button
      ><button class="pagination-btn arrow-btn back-arrow-btn-js">
        <svg class="left-arrow-icon" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
      </button>
    </div>
    <div class="range-btns"></div>
    <div class="forward-btns">
      <button class="pagination-btn arrow-btn forward-arrow-btn-js">
       <svg class="right-arrow-icon" width="24" height="24">
          <use href="${iconRightPath}"></use>
        </svg>
       </button
      ><button class="pagination-btn arrow-btn forward-arrow-btn-js">
        <div class="right-arrow-icon double-arrow">
          <svg class="icon-double-arrow-one" width="24" height="24">
            <use href="${iconRightPath}"></use></svg
          ><svg class="icon-double-arrow-two" width="24" height="24">
            <use href="${iconRightPath}"></use>
          </svg>
        </div>
      </button>
    </div>`;
	div.innerHTML = arrowButtons;
	let rangeButtons = '';
	const forwardButtons = document.querySelectorAll('.forward-arrow-btn-js');
	const backButtons = document.querySelectorAll('.back-arrow-btn-js');
	const rangeButtonsElm = document.querySelector('.range-btns');
	if (page === 1) {
		backButtons.forEach(elm => (elm.disabled = true));
		rangeButtons += `<button class="pagination-btn current-number-btn">1</button>`;
	} else if (page === 2) {
		if (window.screen.width < 768) {
			rangeButtons += `<button class="pagination-btn current-number-btn">2</button>`;
		} else {
			rangeButtons += `<button class="pagination-btn number-btn">1</button><button class="pagination-btn current-number-btn">2</button>`;
		}
	} else if (page >= 3) {
		if (window.screen.width < 768) {
			rangeButtons += `<button class="pagination-btn dot-btn number-btn" disabled>...</button><button class="pagination-btn current-number-btn">${page}</button>`;
		} else {
			rangeButtons += `<button class="pagination-btn dot-btn number-btn" disabled>...</button><button class="pagination-btn number-btn">${
				page - 1
			}</button><button class="pagination-btn current-number-btn">${page}</button>`;
		}
	}
	if (total - page === 0) {
		forwardButtons.forEach(elm => (elm.disabled = true));
	} else if (total - page === 1) {
		if (window.screen.width < 768) {
		} else {
			rangeButtons += `<button class="pagination-btn number-btn">${page + 1}</button>`;
		}
	} else if (total - page >= 2) {
		if (window.screen.width < 768) {
			rangeButtons += `<button class="pagination-btn dot-btn number-btn" disabled>...</button>`;
		} else {
			rangeButtons += `<button class="pagination-btn number-btn">${
				page + 1
			}</button><button class="pagination-btn dot-btn number-btn" disabled>...</button>`;
		}
	}

	rangeButtonsElm.innerHTML = rangeButtons;
	const pagButtons = document.querySelectorAll('.pagination-btn');
	pagButtons.forEach(elm => {
		elm.addEventListener('click', evn => {
			if (
				elm.classList.contains('number-btn') ||
				elm.classList.contains('current-number-btn')
			) {
				option.params.page = Number(elm.textContent);
			} else if (
				elm.firstElementChild.classList.contains('left-arrow-icon') &&
				elm.firstElementChild.classList.contains('double-arrow')
			) {
				option.params.page = 1;
			} else if (elm.firstElementChild.classList.contains('left-arrow-icon')) {
				option.params.page -= 1;
			} else if (
				elm.firstElementChild.classList.contains('right-arrow-icon') &&
				elm.firstElementChild.classList.contains('double-arrow')
			) {
				option.params.page = total;
			} else if (elm.firstElementChild.classList.contains('right-arrow-icon')) {
				option.params.page += 1;
			} else {
			}
			renderMain(renderCardsOptions);
		});
	});
}

export { setPaginationButtons }
