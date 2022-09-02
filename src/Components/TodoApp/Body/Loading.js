import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div style={{ padding: "3rem" }}>
      <ClipLoader color="#0816db" size={50} />
      <p style={{ fontSize: "3rem", marginTop: "1rem", color: "#0816db" }}>
        Loading...
      </p>
    </div>
  );
};

export default Loading;
