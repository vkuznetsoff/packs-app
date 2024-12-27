import { useGetCardsQuery } from "features/cards/service/cards.api";
import { useParams } from "react-router-dom";



export const Cards = () => {
	 let {packId} =useParams<{packId: string}>()

	 const {data, error, isLoading} = useGetCardsQuery(packId ?? "")
	if (isLoading) return <div>Loading..</div>

	return (
		<div>
			<h1>Cards</h1>
			<div>{JSON.stringify(data)}</div>
			
		</div>
	);
};
