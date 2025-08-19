import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery'); 

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function renderPhotos(photos) {
    
    const markup = photos.map(photo => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = photo;
        const tagsText = tags.split(', ').join(', ');
        const photoMarkup = 
    `<li class="photo-card">
    <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" />
    </a>
    <div class="photo-info">
        <p>Tags: ${tagsText}</p>
        <p>Likes: ${likes}</p>
        <p>Views: ${views}</p>
        <p>Comments: ${comments}</p>
        <p>Downloads: ${downloads}</p>
    </div>
</li>
`;
return photoMarkup;
   }).join('');

    galleryContainer.innerHTML = markup;
    lightbox.refresh();
} 

export function clearGallery() {
    galleryContainer.innerHTML = '';
}

export function showLoader() {
    document.querySelector('.loader').classList.remove('hidden');
}

export function hideLoader() {
    document.querySelector('.loader').classList.add('hidden');
}