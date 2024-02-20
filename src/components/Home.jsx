import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Home = () => {
  const { web3, connected, account, connecting, connectToMetaMask } =
    useAppContext();
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState("idle");
  const [number, setNumber] = useState("");
  const getNumber = async (e) => {
    try {
      setIsLoading("fetching");
      const number = await web3.methods.getData().call();
      setIsLoading("idle");
      setNumber(number);
    } catch (error) {
      setIsLoading("idle");
      toast.error("Error fetching data!");
    }
    console.log("get number");
  };
  const handleAddNumber = async (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") {
      return;
    }
    try {
      setIsLoading("adding");
      if (!account) {
        toast.error("please connect  your wallet first");
        setIsLoading("idle");
        return;
      }
      await web3.methods
        .setData(inputRef.current.value)
        .send({ from: account, gas: 3000000 })
        .on("receipt", () => {
          inputRef.current.value = "";
          getNumber();
          
          toast.success("number added successfully");
          setIsLoading("idle");
        })
        .on("error", () => {
          throw new Error("error in adding number in try");
        });
    } catch (err) {
      console.log(err);
      toast.error("error in adding number");
      setIsLoading("idle");
    }
  };
  useEffect(() => {
    if (connected) {
      getNumber();
    }
  }, [connected]);
  return (
    <section>
      <div>
        {!connected && (
          <button onClick={connectToMetaMask}>
            {connecting ? "connecting..." : "connect to metamask"}
          </button>
        )}
      </div>
      <div>
        {isLoading === "fetching" ? (
          <p>fetching data...</p>
        ) : (
          <p>Number is ..{number.toString()}</p>
        )}
      </div>
      <div>
        <form action="" onSubmit={handleAddNumber}>
          <input
            type="number"
            ref={inputRef}
            placeholder="enter number"
            disabled={!connected}
          />
          <button type="submit" disabled={!connected || isLoading === "adding"}>
            {isLoading !== "adding" ? "Adding" : "Add number"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Home;
