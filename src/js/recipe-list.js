import { Notify, Loading } from 'notiflix';
import { handleLikeBtn } from './add_favorites';
import { createCard } from './recipe-card';
import { onOpenWindow } from './recipe';
import { fetchRecipeCards } from './fetch-api';
import { handleScroll } from './loading';
import { setPaginationButtons } from './pagination';
import sprite from '../img/icon/icon.svg';

const pagination = document.querySelector('.pagination-btns');
const recipeCards = document.querySelector('.recipe-cards');
const recipesApi = 'https://tasty-treats-backend.p.goit.global/api/recipes';
const cardsContainer = document.querySelector('.recipe-cards');

cardsContainer.addEventListener('click', onOpenModalWindow);

function renderCards(results, div, cardStyle) {
	let htmlCards = '';
	let likeIconUrl = `${sprite}#icon-like`;
	const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];

	results.forEach(elm => {
		if (favorites.indexOf(elm._id) === -1) {
			likeIconUrl = `${sprite}#icon-like`;
		} else {
			likeIconUrl = `${sprite}#icon-like-full`;
		}
		htmlCards += createCard(elm, cardStyle, likeIconUrl);
	});
	div.innerHTML = htmlCards;
	handleScroll();
}

const selectors = {
	list: document.querySelector('.recipe-cards'),
};

selectors.list.addEventListener('click', handleLikeBtn);

async function renderMain(options) {
	Loading.dots();
	let responseData;
	await fetchRecipeCards(recipesApi, options)
	.then(data => {
	responseData = data;
	})
	.catch(() => Notify.failure('Oops! Something went wrong! Try reloading the page!'))
	.finally(Loading.remove(1000));
	renderCards(responseData.results, recipeCards, 'mainblock');
	setPaginationButtons(
		pagination,
		Number(responseData.currentPage),
		Number(responseData.totalPages),
		options
	);
}

let renderCardsOptions = {
	params: {
		page: 1,
		limit: 8,
	},
};

function onOpenModalWindow({ target }) {
	if (!target.classList.contains('recipe-item-see')) {
		return;
	}
	onOpenWindow(target.dataset.id);
}

window.addEventListener('resize', () => {
	if (window.screen.width <= 768) {
		renderCardsOptions.params.limit = 6;
	} else if (window.screen.width > 768 && window.screen.width < 1280) {
		renderCardsOptions.params.limit = 8;
	} else if (window.screen.width >= 1280) {
		renderCardsOptions.params.limit = 9;
	}
	renderMain(renderCardsOptions);
});

export { renderMain, recipesApi, renderCardsOptions }