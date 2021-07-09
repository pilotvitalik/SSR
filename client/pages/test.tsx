function Test({stars}) {
    return <div>Next stars: {stars}</div>
}

Test.getInitialProps = async (ctx) => {
    const res = await fetch('http://80.78.244.252/api_route')
    console.log(res)
    //const json = await res.json()
    return { stars: 5 }
}

export default Test