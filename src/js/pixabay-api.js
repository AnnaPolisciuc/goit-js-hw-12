import axios from 'axios';

const API_KEY = "51798478-5201f32441bd2af0c91072e2d";
axios.defaults.baseURL = 'https://pixabay.com/api/';
let page = 1;
export const per_page = 15;

export async function getImagesByQuery(query, page) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page: page
    };
    const response = await axios.get("", { params });
    return response.data; 
}