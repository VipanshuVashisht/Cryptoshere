import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '357c38e107msh1b7e8bb9d7698c0p1ef42bjsnabf0f8a8dbe3',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({ 
            query: (count) => createRequest(`/coins?limit=${count}`) 
        }),

        getCryptoDetails: builder.query({
            // query: (coinId) => createRequest(`/coin/${coinId}`),
               query: () => createRequest(`/coin/Qwsogvtv82FCd`),
        }),

        getCryptoHistory: builder.query({
        // query: ({ coinId, timeperiod }) => createRequest(`coin/Qwsogvtv82FC/history?timeperiod=${timeperiod}`),
           query: ({ timeperiod }) => createRequest(`coin/Qwsogvtv82FCd/history?timeperiod=${timeperiod}`),
        }),
    })
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;