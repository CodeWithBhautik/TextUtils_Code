// import { clear } from "@testing-library/user-event/dist/clear";
import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
// import "./App.css";
export default function Textform(props) {
  const heandelOnChange = (event) => {
    console.log("On Change");
    setText(event.target.value);
  };

  const heandleUpClick = () => {
    console.log("UpperCase Was Clicked" + Text);
    let newtext = Text.toUpperCase();
    setText(newtext);
    props.showAlert("Converted To Upper Case!", "success");
  };

  const heandleLoClick = () => {
    let newtext = Text.toLowerCase();
    setText(newtext);
    props.showAlert("Converted To LowerCase!", "success");
  };

  const heandleReClick = () => {
    let newtext;
    let a = document.getElementById("in1").value;
    let b = document.getElementById("in2").value;
    newtext = Text.replaceAll(a, b);
    setText(newtext);
    document.getElementById("in1").value = null;
    document.getElementById("in2").value = null;
    props.showAlert("World Replace completed!", "success");
  };

  const heandleclearClick = () => {
    let newtext = "";
    setText(newtext);
    props.showAlert("Text Cleared completed!", "success");
  };

  const heandlecopyClick = () => {
    navigator.clipboard.writeText(Text);
    props.showAlert("Copied to clipboard!", "success");
  };

  const heandleremovClick = () => {
    let newtext = Text.split(/[ ]+/);
    setText(newtext.join(" "));
    props.showAlert(" Extra Spaces Removed!", "success");
  };

  const capitalize = () => {
    const arr = Text.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    setText(str2);
    props.showAlert(" Convert All First Letter UpperCase!", "success");
  };
  // const voice = () => {
  //   var speech = document.getElementById("myBox"),
  //    convert = document.getElementById("Convert"),
  //   //  voiceIco = document.getElementById(""),
  //    count = 1,
  //     speechText;
  //    convert.addEventListener('click',()=>{
  //     if(speechSynthesis.speaking || speechSynthesis.pause()){
  //       speechText = speech.value;
  //       var speechVoice = new SpeechSynthesisUtterance();
  //       var voices = speechSynthesis.getVoices();
  //       speechVoice.voice = voices[2];
  //       speechVoice.text = speechText;
  //       speechVoice.lang = 'en_US';
  //       speechSynthesis.speak (speechVoice)

  //     }
  //   })
  // }

  // const [text, setText] = useState('');
  const {speak} = useSpeechSynthesis();
    const handleOnClick = ()=>{
    
      speak({text:Text})
    }
  
  const [Text, setText] = useState("");

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2 className="mb-2 rounded">{props.heading} </h2>
        <div className="mb-3">
          <textarea
            style={{
              backgroundColor: props.mode === "dark" ? "black" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            className="form-control"
            onChange={(e)=>{setText(e.target.value)}}
            placeholder="Enter Text Here ?"
            value={Text}
            id="myBox"
            rows="8"
          ></textarea>
        </div>

        <div className=" container input-group   my-3">
          <input
            style={{
              backgroundColor: props.mode === "dark" ? "black" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            type="text"
            placeholder="Enter Any Word "
            className="h-25 form-control w-25 p-3"
            id="in1"
          />

          <input
            style={{
              backgroundColor: props.mode === "dark" ? "black" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            type="text"
            placeholder="Enter New Word "
            className="h-25 form-control w-25 p-3"
            id="in2"
          />
        </div>
      </div>
      <div className=" container input-group ">
     
        <button
          disabled={Text.length === 0}
          className=" btn btn-primary mx-3 my-2 rounded"
          onClick={capitalize}
        >
          1<sup>th </sup>Word Upper
        </button>

        <button
          disabled={Text.length === 0}
          className="  btn btn-primary mx-1 my-2 rounded"
          onClick={heandleUpClick}
        >
          To UpperCase
        </button>

        <button
          disabled={Text.length === 0}
          className="  btn btn-primary mx-3 my-2 rounded"
          onClick={heandleLoClick}
        >
          To LowerCase
        </button>

        <button
          disabled={Text.length === 0}
          className="  btn btn-primary mx-3 my-2 rounded"
          onClick={heandleReClick}
        >
          Replace Word
        </button>

        <button
          disabled={Text.length === 0}
          className=" btn btn-primary mx-3 my-2 rounded"
          onClick={heandleremovClick}
        >
          Remove Spaces
        </button>
        <button
          disabled={Text.length === 0}
          className=" btn btn-primary mx-3 my-2 rounded"
          onClick={handleOnClick}
          id="Convert"
        >
          Read Textarea
        </button>
        <button
          disabled={Text.length === 0}
          className=" btn btn-primary mx-2 rounded my-2 rounded"
          onClick={heandlecopyClick}
        >
          Copy Textarea
        </button>


        <button
          disabled={Text.length === 0}
          className=" btn btn-primary mx-3 my-2 rounded"
          onClick={heandleclearClick}
        >
          Clear Textarea
        </button>
        
      </div>
      {/* </div> */}

      <div
        className="container my-2 rounded"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2>Your Text Summary</h2>

        <p>
          <b>
            {
              Text.split(/\s+/).filter((element) => {
                return element.length !== 0;
              }).length
            }
          </b>{" "}Word
          and<b> {Text.length}</b> characters
        </p>

        <p>
          <b>
            {0.008 *
              Text.split(" ").filter((element) => {
                return element.length !== 0;
              }).length}
          </b>{" "}
          Minutes Read
        </p>

        <h2>Preview</h2>
        <div className="box container">
          <p>{Text.length > 0 ? Text : "Nothing To Preview!"}</p>
        </div>
      </div>
    </>
  );
}
