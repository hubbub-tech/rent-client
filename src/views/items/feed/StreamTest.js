import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export const StreamTest = () => {

  let [searchParams, setSearchParams] = useSearchParams();

  const defaultMessages = [];
  const [messages, setMessages] = useState(defaultMessages);
  const [isConnectionOpen, setIsConnectionOpen] = useState(false);

  const paramsString = searchParams.toString();

  const url = process.env.REACT_APP_SERVER + `/items/stream?${paramsString}`;
  const eventSource = new EventSource(url, { withCredentials: true })

  const handleConnectionOpen = () => {
    setIsConnectionOpen(true);
  }

  const handleStreamedData = (e) => {
    const message = e.data;

    (messages.length < 10)
      ? setMessages([...messages, message])
      : eventSource.close();
  }

  const handleConnectionClose = () => {
    setIsConnectionOpen(false);
  }

  eventSource.onopen = handleConnectionOpen;
  eventSource.onmessage = handleStreamedData;
  eventSource.onclose = handleConnectionClose;

  useEffect(() => {

  }, [messages]);

  return (
    <div className="row">
      <p>this is a test</p>
    {messages.map((message, index) => (
      <div className="col-12" key={message}>{ message }</div>
    ))}
    </div>
  );
}
