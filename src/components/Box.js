function Box(props) {
  return (
    <button className="box-type" {...props}>
      {props.x ? "x" : props.o ? "o" : ""}
    </button>
  );
}

export default Box;
