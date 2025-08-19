import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"; 
import { getImagesByQuery } from "./js/pixabay-api";
import { clearGallery, renderPhotos, hideLoader, showLoader } from "./js/render-functions";

const form = document.querySelector('.form');
const input = form.elements['search-text'];

form.addEventListener('submit', async event => {
    event.preventDefault();

    const query = input.value.trim();
 
    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'The search box is empty. Try again!',
        })
    return;
    }
    try {
        clearGallery();
        showLoader();
        const data = await getImagesByQuery(query);

        if (data.hits.length === 0) {
            iziToast.warning({
                title: 'Oops',
                message: 'No images found. Try another query!'
            });
            return;
        }
        console.log(data.hits);
        renderPhotos(data.hits);
    } catch (error) {
        iziToast.error ({
            title: 'Error',
            message: 'Samething went wrong. Please try again later.'
        });
    } finally {
        hideLoader();
    }
});

