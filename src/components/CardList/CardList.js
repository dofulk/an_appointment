import { Card } from "../Card/Card"

export const CardList = ({listOfCards })=> {

    let cards = listOfCards.map((card) => 
    <li key={card.id} style={{
      listStyle: "none",
    }}>
      <Card id={card.id} title={card.title} description={card.description} isBig={true} key={card.id}></Card>
    </li>
  )
    return (
        <div 
        style={{display: "flex",
        flexDirection: "row"}}>
            {cards}
        </div>
    )
}