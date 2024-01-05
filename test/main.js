import expect from 'expect.js';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-nft-mocha-expectjs/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should not have more than one card image element', () => {
		const cardEl = document.querySelector('.card');
		const cardImageConEl = cardEl.querySelector('.card__image');
		const cardImageElLength = cardImageConEl.querySelectorAll('img').length;

		expect(cardImageElLength).to.not.be.above(1);
	});

	it('should have at least one card title element', () => {
		const cardEl = document.querySelector('.card');
		const cardTitleElLength = cardEl.querySelectorAll('.card__title').length;

		expect(cardTitleElLength).to.not.be.below(1);
	});

	it('should have at least one paragraph of card description element', () => {
		const cardEl = document.querySelector('.card');
		const cardDescElLength = cardEl.querySelectorAll('.card__desc').length;

		expect(cardDescElLength).to.not.be.lessThan(1);
	});

	it('should not have more than one author avatar image element', () => {
		const cardEl = document.querySelector('.card');

		const cardAuthorEl = cardEl.querySelector('.card__author');
		const cardAuthorImageElLength = cardAuthorEl.querySelectorAll('.card__author-img').length;

		expect(cardAuthorImageElLength).to.not.be.above(1);
	});

	it('should have an author avatar image element with dimensions equal 33 x 33', () => {
		const cardEl = document.querySelector('.card');

		const cardAuthorImageEl = cardEl.querySelector('.card__author-img');
		const cardAuthorImageWidth = +cardAuthorImageEl.getAttribute('width');
		const cardAuthorImageHeight = +cardAuthorImageEl.getAttribute('height');

		expect(cardAuthorImageWidth).to.not.be(30);
		expect(cardAuthorImageHeight).to.be(33);
	});
});
