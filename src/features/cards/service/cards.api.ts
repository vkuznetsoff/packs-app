import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from 'common/api/common.api';
import { AddCardResponseType, ArgCreateCardType, ArgDeleteCardType, ArgGetCardsType, CardType, DeleteCardResponseType, FetchCardsResponseType } from './cards.api.types';

export const cardsApi = createApi({
	reducerPath: "cardsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		credentials: 'include'
	}),
	tagTypes: ["Card"],
	keepUnusedDataFor: 5,
	endpoints: (build) => {
		return {
			getCards: build.query<FetchCardsResponseType, ArgGetCardsType>({
				query: ({packId, page, pageCount}) => {
					return {
						method: "GET",
						url: "cards/card",
						params: {
							cardsPack_id: packId,
							page,
							pageCount
						}
					}
				},
				providesTags: ['Card']
			}),

			addCard: build.mutation<AddCardResponseType,ArgCreateCardType>({
				query: (card) => {
					return {
						method: "POST",
						url: "cards/card",
						body: {
							card
						}

					}
				},
				invalidatesTags: ['Card']
			}),

			deleteCard: build.mutation<DeleteCardResponseType,string>({
				query: (id) => {
					return {
						method: "DELETE",
						url: "cards/card",
						params: {
						id
						}

					}
				},
				invalidatesTags: ['Card']
			})
		}
	}
})

export const {useGetCardsQuery, useAddCardMutation, useDeleteCardMutation} = cardsApi