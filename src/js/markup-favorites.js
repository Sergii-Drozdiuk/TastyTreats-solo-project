import { onOpenWindow } from './recipe';
import { allCard, changeCurrentPage, cardInHtml, perPage, changeCountPage } from './favorites';
import { handleScroll } from './loading';
import sprite from '../img/icon/icon.svg';

let activeCategories = new Set();

const ref = {
	cardsFavorites: document.querySelector('.list_cards_favorites'),
	categoriesFavorites: document.querySelector('.favorites_categories'),
	allCategories: null,
};

ref.cardsFavorites.addEventListener('click', onOpenModalWindow);

function markupButtons(cards) {
	if (!cards.length) {
		ref.categoriesFavorites.innerHTML = '';
		return;
	}

	ref.categoriesFavorites.replaceWith(ref.categoriesFavorites.cloneNode(false));
	ref.categoriesFavorites = document.querySelector('.favorites_categories');

	const allBtnClass = activeCategories.size === 0 ? 'green-button' : '';
	const buttonsHTML = [
		`<li><button id="allcat" class="main-button recipe-item-see category-btn ${allBtnClass}" type="button">All categories</button></li>`,
		...cards.map(card =>
			`<li><button class="main-button recipe-item-see category-btn ${activeCategories.has(card) ? 'green-button' : ''}" type="button">${card}</button></li>`
		)
	];

	ref.categoriesFavorites.innerHTML = buttonsHTML.join('');
	ref.categoriesFavorites.addEventListener('click', addFilter);
	ref.allCategories = document.querySelector('#allcat');
}


function markupCards(cards, page, perPage) {
	const start = (page - 1) * perPage;
	const end = page * perPage;
	const markupCardsArray = cardInHtml(cards);
	const pageCardArray = markupCardsArray.slice(start, end);
	pageCardArray.length ? (ref.cardsFavorites.innerHTML = pageCardArray.join('')) : (ref.cardsFavorites.innerHTML = `<div class="not_favorites">
						<svg class="favorites_elem_svg" width="68" height="58">
							<use href="${sprite}#icon-elements"></use>
						</svg>
						<p class="favorites_text">
							It appears that you haven't added any recipes to your favorites yet. To
							get started, you can add recipes that you like to your favorites for
							easier access in the future.
						</p>
					</div>`);
	handleScroll();
}

function addFilter({ target }) {
	if (!target.classList.contains('main-button')) return;
	changeCurrentPage(1);
	const isAllCategories = target === ref.allCategories;
	const categoryButtons = ref.categoriesFavorites.querySelectorAll('.main-button:not(#allcat)');

	if (isAllCategories) {
		ref.allCategories.classList.add('green-button');
		categoryButtons.forEach(btn => btn.classList.remove('green-button'));
		activeCategories.clear();
		cardFilterCategories(1);
		return;
	}

	if (target.classList.contains('green-button')) {
		target.classList.remove('green-button');
		ref.allCategories.classList.add('green-button');
		activeCategories.clear();
		cardFilterCategories(1);
		markupButtons([...new Set(allCard.map(card => card.category))]);
		return;
	}

	categoryButtons.forEach(btn => btn.classList.remove('green-button'));
	target.classList.add('green-button');
	ref.allCategories.classList.remove('green-button');
	activeCategories.clear();
	activeCategories.add(target.textContent);
	cardFilterCategories(1);
}

function cardFilterCategories(page) {
	const filteredCard = activeCategories.size ? allCard.filter(({ category }) => activeCategories.has(category)) : allCard;
	markupCards(filteredCard, page, perPage);
	changeCountPage(filteredCard.length);
}

function onOpenModalWindow({ target }) {
	if (!target.classList.contains('recipe-item-see')) {
		return;
	}
	onOpenWindow(target.dataset.id);
}

export { markupButtons, markupCards, cardFilterCategories }