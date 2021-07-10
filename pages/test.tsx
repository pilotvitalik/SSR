function Test({arr}){
  return(
      <div>Hello {arr[0].name}!</div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.HOSTNAME}${process.env.MAINDATA}`)
  const json = res.body._readableState.buffer.head.data.toString();
  const arr = await JSON.parse(json);
  return { props: {arr} }
}


export default Test;