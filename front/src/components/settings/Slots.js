import React from "react";

export default function Slots({ slot, setSlot , checkout, noLabel}) {
  return (
    <div className="flex space-x-3">
      <div className="space-x-2">
        {[1, 2, 3].map((number) => {
          return (
            <button key={number} onClick={() => setSlot(number - 1)}>
              <div className="px-2 border bg-gray-100">{number}</div>
            </button>
          );
        })}
      </div>
      <div>{checkout && (<div>Доставка</div>)}</div>
    </div>
  );
}
