import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './add_point.module.css';
import {Link} from 'react-router-dom'

function Add_point(){
	const [title, setTitle] = useState('');
	const [distance, setDistance] = useState('');
	const [duration, setDuration] = useState('');
	const [statusReq, setStatusReq] = useState('');
	const [passwd, setPasswd] = useState('');


	function addPoint(e){
		const coefTime = 60;
		const coefDistance = 1000;
		const coefSpeed = 3.6;
		const speed = (Number(distance) * coefDistance) / (Number(duration) * coefTime) * coefSpeed;
		const obj = {};
		obj.title = title;
		obj.distance = distance;
		obj.duration = duration;
		obj.password = passwd;
		if (isNaN(distance) && isNaN(duration)){
			obj.speed = '-';
		} else {
			obj.speed = String(Math.round(speed * 0.85));
		}
		sendData(JSON.stringify(obj));
		setTitle('');
		setDistance('');
		setDuration('');
		setStatusReq('');
		setPasswd('');
	}

	function sendData(data){
		axios.post(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_ADD}`, data)
		  .then(function (response) {
		    if(response.status === 200){
		    	setStatusReq(response.data);
		    }
		  })
		  .catch(function (error) {
		  	setStatusReq('Возникла внутренняя ошибка сервера');
		  	setTimeout(() => {
		  		setStatusReq('');
		  	}, 2000)
		  });
	}

	useEffect(() => {
		let hiddenAlert;
		if (statusReq){
			hiddenAlert = setTimeout(() => {setStatusReq('');}, 2000);
		}
		return () => {clearTimeout(hiddenAlert);}
	})

	return (
		<div>
			<form className={styles.addForm}>
				<label>
					Название:
					<input type='text'
						name='title'
						value={title}
						onChange={(event) => setTitle(event.target.value)}/>
				</label>
				<label>
					Расстояние:
					<input type='text'
						name='distance'
						value={distance}
						onChange={(event) => setDistance(event.target.value)}/>
				</label>
				<label>
					Время:
					<input type='text'
						name='duration'
						value={duration}
						onChange={(event) => setDuration(event.target.value)}/>
				</label>
				{/*TODO убрать пароль после добавления нормальной авторизации*/}
				<label>
					Пароль:
					<input type='text'
						name='password'
						value={passwd}
						onChange={(event) => setPasswd(event.target.value)}/>
				</label>
				<button type='button' onClick={addPoint}>
					Добавить
				</button>
			</form>
			<br/>
			<Link to="/">К списку</Link>
			<p className={statusReq ? '' : styles.hideInfoMes}>
				{statusReq}
			</p>
		</div>
	)
}

export default Add_point;