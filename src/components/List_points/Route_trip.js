import React, {useState, useEffect} from 'react';
import style from './route_trip.module.css';
import axios from 'axios';  
import {Link} from 'react-router-dom'

function Route_trip(){
  const [arr, setArr] = useState([]);

  function firstRequest(){
    axios.get(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_MAINDATA}`)
      .then(function (response) {
        setArr(response.data);
      })
      .catch(function (error) {
        alert(error);
      })
  }

  const list = arr.map((item) => 
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
  )

  useEffect(() => {
    firstRequest();
  }, [])

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
        list
      }
      </div>
      <Link className={style.link} to="/add_point">Добавить точку</Link>
    </div>
  )
}

export default Route_trip;