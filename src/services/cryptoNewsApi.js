import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '357c38e107msh1b7e8bb9d7698c0p1ef42bjsnabf0f8a8dbe3',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
}

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com'

const createRequest = (url) => ({ url: `${baseUrl}${url}`, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({set}) => createRequest(`/v1/${set}`)
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;