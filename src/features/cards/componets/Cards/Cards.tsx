import { LinearProgress } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import {
  useAddCardMutation,
  useGetCardsQuery,
} from "features/cards/service/cards.api";
import { ArgCreateCardType } from "features/cards/service/cards.api.types";
import { MouseEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const Cards = () => {
  let { packId } = useParams<{ packId: string }>();

  const { data, error, isError, isLoading } = useGetCardsQuery(packId ?? "");

  const [addCard, { isLoading: isAddLoading }] = useAddCardMutation();

  if (isLoading || isAddLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (isError) {
    const err = error as any;
    return <h1>{err.data.error}</h1>;
  }
  console.log("data: ", data);

  function addCardsHandler() {
    if (packId) {
      const newCard: ArgCreateCardType = {
        cardsPack_id: packId,
        question: "1. question + " + nanoid(),
        answer: "2. answer + " + nanoid(),
      };
      addCard(newCard).unwrap().then( (res) => {
		const cardQuestion = res.newCard.question
		toast.success(`Card ${cardQuestion} was added!`)
	  }).catch(err => {
		toast.error(err.data.error)
	  })
    }
  }

  return (
    <div>
      <h1>Cards</h1>
      <button onClick={addCardsHandler}>Add</button>
      {data?.cards.map((c) => {
        return <div>{c.question}</div>;
      })}
    </div>
  );
};
