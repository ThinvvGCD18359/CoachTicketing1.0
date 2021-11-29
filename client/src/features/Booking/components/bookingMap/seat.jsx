import React, { useState } from "react";
import PropTypes from 'prop-types';

Seat.propTypes = {
  id: PropTypes.string,
  onClickSeat: PropTypes.func,
};

export default function Seat(props) {
  const { id, onClickSeat, reservationSeat } = props
  const [select, setSelect] = useState(false);

  const handleClick = (id) => {
    setSelect(!select);
    onClickSeat(id);
  };

  return (
    <div>
      <button
        disabled={reservationSeat?.some(i => i === id)}
        name={id}
        className={
          select ? "deck-seats-each deck-seats-each-select" : "deck-seats-each"
        }
        onClick={() => handleClick(id)}
      >
        {id}
      </button>
    </div>
  );
}
