import React from "react";
import { useParams } from "react-router";
import steering from "../../../../images/steering-wheel.svg";
import Seat from "./seat";

export default function SeatMap({ data, type, handleSaveSeatRecord, reservationSeat }) {

  const seatOddNumber = [1, 3, 5, 7, 9];
  const seatEvenNumber = [2, 4, 6 , 8, 10];

  const { coachId } = useParams();

  const handleSelectId = (id) => {
    handleSaveSeatRecord(id)
  };


  return (
    <div className="deck">
      <div className="deck-steering">
        {type === "Lower" ? (
          <img src={steering} alt="" className="deck-steering-logo" />
        ) : (
          <div className="deck-steering-logo"></div>
        )}
      </div>
      <div className="deck-seats">
        <div className="deck-seats-row">
          {type === "Lower"
            ? seatOddNumber.map((num) => {
                return (
                  <Seat
                    data={data}
                    key={num}
                    id={`${num}A`}
                    coachId={coachId}
                    reservationSeat={reservationSeat}
                    onClickSeat={handleSelectId}
                  />
                );
              })
            : seatEvenNumber.map((num) => {
                return (
                  <Seat
                    data={data}
                    key={num}
                    id={`${num}A`}
                    coachId={coachId}
                    reservationSeat={reservationSeat}
                    onClickSeat={handleSelectId}
                  />
                );
              })}
        </div>
        <div className="deck-seats-row">
          {type === "Lower"
            ? seatOddNumber.map((num) => {
                return (
                  <Seat
                    data={data}
                    key={num}
                    id={`${num}B`}
                    coachId={coachId}
                    reservationSeat={reservationSeat}
                    onClickSeat={handleSelectId}
                  />
                );
              })
            : seatEvenNumber.map((num) => {
                return (
                  <Seat
                    data={data}
                    key={num}
                    id={`${num}B`}
                    coachId={coachId}
                    reservationSeat={reservationSeat}
                    onClickSeat={handleSelectId}
                  />
                );
              })}
        </div>

        <div className="deck-seats-row">
          {type === "Lower"
            ? seatOddNumber.map((num) => {
                return (
                  <Seat
                    data={data}
                    key={num}
                    id={`${num}C`}
                    coachId={coachId}
                    reservationSeat={reservationSeat}
                    onClickSeat={handleSelectId}
                  />
                );
              })
            : seatEvenNumber.map((num) => {
                return (
                  <Seat
                    data={data}
                    key={num}
                    id={`${num}C`}
                    coachId={coachId}
                    reservationSeat={reservationSeat}
                    onClickSeat={handleSelectId}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}
