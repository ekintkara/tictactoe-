function Box(props) {
    return (
      <div className="box-type" {...props}>{props.x ? 'x' : (props.o ? 'o' : '')}</div>
    );
  }
  
  export default Box;