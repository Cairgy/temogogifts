


export default function Gift(props) {
    // const { gift, setGifts } = props;

    const updateGift = async (giftId, giftStatus) => {
        const res = await fetch(`/api/gifts/${giftId}`, {
            method: "PUT",
            body: JSON.stringify({ status: giftStatus }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await res.json();

        if (json.acknowledged) {
            props.setGifts(currentGifts => {
                return currentGifts
                    .map((currentGift) => {
                        if (currentGift._id === giftId) {
                            return { ...currentGift, status: !currentGift.status }
                        }
                        return currentGift;
                    });
            });
        }
    };

    return (
        <div className="gift">
            <p className={props.gift.status ? "strikethrough" : ""}>{props.gift.gift}</p>
            <div>
                <button className="gift__status" onClick={() => updateGift(props.gift._id, props.gift.status)}>
                    {(props.gift.status) ? "☑" : "☐"}
                </button>
            </div>
        </div>
    )
}