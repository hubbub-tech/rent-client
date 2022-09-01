import React, { useState, useCallback, useRef, useEffect } from 'react';

const ReceiptDownload = ({ order, setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }

  const [receipt, setReceipt] = useState();

  const generateDownload = () => {
    fetch(process.env.REACT_APP_SERVER + `/orders/receipt?order_id=${order.id}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) setReceipt(data.receipt);
      else setFlashMessages(data.messages);
    });
    console.log({receipt})
    if (!receipt) return;

    const receiptFile = new Blob([receipt], { type: 'text/plain', endings: 'native' })
    const receiptUrl = window.URL.createObjectURL(receiptFile);
    const anchor = document.createElement('a');
    anchor.download = 'hubbub-receipt.txt';
    anchor.href = URL.createObjectURL(receiptFile);
    anchor.click();

    window.URL.revokeObjectURL(receiptUrl);
  }

  return (
    <button
      type="button"
      className="btn btn-dark mx-1 my-1"
      onClick={() => generateDownload()}
    >
      Download Receipt
    </button>
  );
}

export default ReceiptDownload;
