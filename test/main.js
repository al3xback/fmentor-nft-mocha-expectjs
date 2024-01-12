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
		const cardImgConEl = document.querySelector('.card__image');
		const cardImgElsLength = cardImgConEl.querySelectorAll('img').length;

		expect(cardImgElsLength).to.not.be.above(1);
	});

	it('should have at least one card title element', () => {
		const cardTitleElsLength =
			document.querySelectorAll('.card__title').length;

		expect(cardTitleElsLength).to.not.be.below(1);
	});

	it('should have at least one paragraph of card description element', () => {
		const cardDescElsLength =
			document.querySelectorAll('.card__desc').length;

		expect(cardDescElsLength).to.not.be.lessThan(1);
	});

	it('should not have more than one author avatar image element', () => {
		const cardAuthorEl = document.querySelector('.card__author');
		const cardAuthorImgElsLength =
			cardAuthorEl.querySelectorAll('.card__author-img').length;

		expect(cardAuthorImgElsLength).to.not.be.above(1);
	});

	it('should have an author avatar image element with dimensions equal 33 x 33', () => {
		const cardAuthorImgEl = document.querySelector('.card__author-img');
		const cardAuthorImgWidth = parseInt(
			cardAuthorImgEl.getAttribute('width')
		);
		const cardAuthorImgHeight = parseInt(
			cardAuthorImgEl.getAttribute('height')
		);

		expect(cardAuthorImgWidth).to.not.be(30);
		expect(cardAuthorImgHeight).to.be(33);
	});
});
