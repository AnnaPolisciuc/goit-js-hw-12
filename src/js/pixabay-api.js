import axios from 'axios';

const API_KEY = "51798478-5201f32441bd2af0c91072e2d";
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
    const response = await axios.get("", {params: {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    },
});
return response.data;
}

