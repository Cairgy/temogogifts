import { useEffect, useState } from "react";
import Gift from "./Gift";

export default function App() {
  const [gifts, setGifts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const getGifts = async () => {
      const res = await fetch("/api/gifts");
      const gifts = await res.json();

      setGifts(gifts);
    };

    getGifts();
  }, []);

  // eslint-disable-next-line
  const createNewGift = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/gifts", {
        method: "POST",
        body: JSON.stringify({ gift: content }),  
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newGift = await res.json();

			setContent("");
      setGifts([...gifts, newGift])
    }
  };

  return (
    <main className="container">
      <h1 className="title">Temogo's Baby Shower Gift Registry</h1>
      {/* <form className="form" onSubmit={createNewGift}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="add a new gift..."
          className="form__input"
          required 
        />
        <button type="submit">Add Gift</button>
      </form> */}
      <div className="gifts">
        {(gifts.length > 0) &&
          gifts.map((gift) => (
            <Gift gift ={gift} setGifts={setGifts} key={gift._id} />
          ))
        }
      </div>
      <div className="footer">
        <p>
          Design: Kago Mmapetla. |   <a href="https://www.kagommapetla.com">www.kagommapetla.com</a> 
        </p>
        <li></li>
      </div>
    </main>
  );
}