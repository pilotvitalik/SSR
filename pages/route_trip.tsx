import Link from 'next/link';
import {GetServerSideProps} from 'next';
import style from '../styles/Route_trip.module.css';

function Route_trip({arr}:AppProps){
  return(
    <div className={style.wrapper}>
      <div className={style.tableTitle}>
        <p>
          № п/п
        </p>
        <p>
          Точка
        </p>
        <p>
          Время
        </p>
        <p>
          Скорость
        </p>
        <p>
          Расстояние
        </p>
      </div>
      <div className={style.tableBody}>
      {
        arr.map((item) => (
          <div key={item.id}>
            <p>
              {item.id}
            </p>
            <p>
              {item.point}
            </p>
            <p>
              {item.time}
            </p>
            <p>
              {item.speed}
            </p>
            <p>
              {item.distance}
            </p>
          </div>
        ))
      }
      </div>
      <Link href="/add_point">
          <a>Добавить точку</a>
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.HOSTNAME}${process.env.MAINDATA}`)
  const json = res.body._readableState.buffer.head.data.toString();
  const arr = await JSON.parse(json);
  return { props: {arr} }
}


export default Route_trip;