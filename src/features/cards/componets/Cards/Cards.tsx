import { LinearProgress, Pagination } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import {
  useAddCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
} from "features/cards/service/cards.api";
import { ArgCreateCardType } from "features/cards/service/cards.api.types";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import s from "./styles.module.css";

export const Cards = () => {
  let { packId } = useParams<{ packId: string }>();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(5);

  const { data, error, isError, isLoading } = useGetCardsQuery({
    packId: packId ?? "",
    page,
    pageCount:2,
  });

  const [deleteCard] = useDeleteCardMutation()

  const [addCard, { isLoading: isAddLoading }] = useAddCardMutation();

 

  if (isLoading || isAddLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (isError) {
    const err = error as any;
    return <h1>{err.data.error}</h1>;
  }
  console.log("data: ", data);

  function addCardHandler() {
    if (packId) {
      const newCard: ArgCreateCardType = {
        cardsPack_id: packId,
        question: "1. question " + nanoid(),
        answer: "2. answer " + nanoid(),
      };
      addCard(newCard)
        .unwrap()
        .then((res) => {
          const cardQuestion = res.newCard.question;
          toast.success(`Card ${cardQuestion} was added!`);
        })
        .catch((err) => {
          toast.error(err.data.error);
        });
    }
  }

  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
  setPage(page)
  };

  const deleteCardHandler = (cardId: string) => {
    deleteCard(cardId)
    
  }

  return (
    <div>
      <h1>Cards</h1>
      <button onClick={addCardHandler}>add card</button>

      <div>
        {data &&
          data.cards.map((card) => {
            

            return (
              <div className={s.container} key={card._id}>
                <div>
                  <b>Question: </b>
                  <p>{card.question}</p>{" "}
                </div>
                <div>
                  <b>Answer: </b>
                  <p>{card.answer}</p>{" "}
                </div>
                <button onClick={() => deleteCardHandler(card._id)}>DELETE</button>
              </div>
            );
          })}
      </div>
      <Pagination
        count={data && data.cardsTotalCount}
        onChange={changePageHandler}
        page={page}
      />
    </div>
  );
};
