import sprite from '../img/icon/icon.svg';

function ratingRecipe(rating) {
	let markupRating = ``;
	for (let i = 1; i <= 5; i += 1) {
		if (i <= Math.round(rating)) {
			markupRating += `<li class="recipe-item-rating-star">
						<svg class="stars-full">
							<use href="${sprite}#icon-star"></use>
						</svg>
					</li>`;
		} else {
			markupRating += `<li class="recipe-item-rating-star">
						<svg class="stars">
							<use href="${sprite}#icon-star"></use>
						</svg>
					</li>`;
		}
	}
	return markupRating;
}

export { ratingRecipe }