import React, { useState, useContext } from 'react';
import MasterProvider from '../context';

export default function Filters() {
  const master = useContext(MasterProvider);
  const { filterTransactions, user } = master;

  const [cashIn, setCashIn] = useState(false);
  const [cashOut, setCashOut] = useState(false);
  const [date, setDate] = useState('');

  const handleCheckbox = ({ target }) => {
    const { name, checked } = target;

    if (name === 'cashIn') {
      setCashIn(checked);
      filterTransactions(user.id, { date, cashIn: checked, cashOut });
    }

    if (name === 'cashOut') {
      setCashOut(checked);
      filterTransactions(user.id, { date, cashIn, cashOut: checked });
    }
  };

  const handleDate = ({ target }) => {
    const { value } = target;

    setDate(value);
    filterTransactions(user.id, { date: value, cashIn, cashOut });
  };

  return (
    <div className="filter-container">
      <label
        htmlFor="cashIn"
      >
        <span>Cash In</span>
        <input
          id="cashIn"
          type="checkbox"
          name="cashIn"
          checked={cashIn}
          onChange={handleCheckbox}
        />
      </label>

      <label
        htmlFor="cashOut"
      >
        <span>Cash Out</span>
        <input
          id="cashOut"
          type="checkbox"
          name="cashOut"
          checked={cashOut}
          onChange={handleCheckbox}
        />
      </label>

      <label
        htmlFor="date"
      >
        <span>Data</span>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={handleDate}
        />
      </label>
    </div>
  );
}
