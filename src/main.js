import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"; 
import { clearGallery, renderPhotos, hideLoader, showLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";
import { getImagesByQuery, per_page } from "./js/pixabay-api";

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const fetchPhotosBtn = document.querySelector('.btn');

let query = "";
let page = 1;

form.addEventListener('submit', async event => {
    event.preventDefault();
    hideLoadMoreButton();
    clearGallery();
    query = input.value.trim();
    page = 1;

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'The search box is empty. Try again!',
        });
        return;
    }

    try {
        showLoader();
        const data = await getImagesByQuery(query, page);

        if (data.hits.length === 0) {
            iziToast.warning({
                title: 'Oops',
                message: 'No images found. Try another query!'
            });
            return;
        }

        renderPhotos(data.hits);

        if (data.totalHits > per_page) {
            showLoadMoreButton();
        }

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.'
        });
    } finally {
        hideLoader();
    }
});

fetchPhotosBtn.addEventListener("click", async () => {
    page++;
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);

        if (data.hits.length > 0) {
            const startIndex = (page - 1) * per_page;
            renderPhotos(data.hits);
            
            const galleryItems = document.querySelectorAll('.gallery li');
            const firstNewCard = galleryItems[startIndex];
            if (firstNewCard) {
                const cardHeight = firstNewCard.getBoundingClientRect().height;
                window.scrollBy({
                    top: cardHeight * 2,
                    behavior: 'smooth'
                });
            }
        }

        if (page * per_page >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                title: 'End',
                message: "We're sorry, but you've reached the end of search results."
            });
        } else {
            showLoadMoreButton();
        }

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.'
        });
    } finally {
        hideLoader();
    }
});
