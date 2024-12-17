import axios from 'axios';

const API_KEY = 'A14eL2ShhwhhuuGsZYed5rk34K24O2OU';
const LIMIT = 6; // Total number of cards

const getGifs = async () => {
    try {
        const response = await axios.get(
            `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${LIMIT}`
        );
        return response.data.data.map((gif) => ({
            id: gif.id,
            url: gif.images.fixed_height.url,
        }));
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        return [];
    }
};

export default getGifs;
