import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

function Test() {
  const [formFilled, setFormFilled] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [index, setIndex] = useState(null);

  const test = [
    { t: "test1", a: "success1" },
    { t: "test2", a: "I love you" },
  ];

  const openFAQ = (i) => {
    setIndex(index === i ? null : i); // toggle like Umhloti Sands
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  useEffect(() => {
    setFormFilled(!!email);
  }, [email]);

  return (
    <>
      {!submitted ? (
        <>
          <label>Email:</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <Button
            disabled={!formFilled}
            className={formFilled ? "!bg-green-500" : "!bg-red-500"}
            onClick={handleSubmit}
          >
            Submit Form
          </Button>
        </>
      ) : (
        <>{email}</>
      )}

      <div>
        {test.map((item, i) => (
          <div key={i}>
            <h1 onClick={() => openFAQ(i)}>{item.t}</h1>

            {index === i && (
              <p>{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Test;
