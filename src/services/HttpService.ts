import axios from "axios";

export const HttpService = axios.create({
    baseURL: `https://api.unsplash.com/`,
    headers: {
        Authorization: `Client-ID 5-5CuVAtDiB_VCGKLTtlT_IYkkb7MmHK1AMoNAKqbDc`,
    },
});
