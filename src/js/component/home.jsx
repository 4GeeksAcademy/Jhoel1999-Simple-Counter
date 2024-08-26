import React, { useState, useEffect, useRef } from "react";

// Create your first component
const Home = () => {
	const [inputHours, setInputHours] = useState(0);
	const [inputMinutes, setInputMinutes] = useState(0);
	const [inputSeconds, setInputSeconds] = useState(0);
	const [elapsedTime, setElapsedTime] = useState(0); 
	const [isRunning, setIsRunning] = useState(false);
	const [targetTime, setTargetTime] = useState(null);
	const [textBtn, setTextBtn]= useState("Start")
	const intervalRef = useRef(null);
  
	useEffect(() => {
	  if (isRunning) {
		intervalRef.current = setInterval(() => {
		  setElapsedTime((prev) => {
			if (targetTime !== null && prev >= targetTime) {
			  clearInterval(intervalRef.current);
			  setIsRunning(false);
			  alert("Tiempo concluido");
			  return prev;
			}
			return prev + 1;
		  });
		}, 1000);
	  }
	  return () => clearInterval(intervalRef.current);
	}, [isRunning, targetTime]);
  
	const handleInputChange = (e, setter) => {
	  const value = e.target.value;
	  if (!isNaN(value) && value >= 0) {
		setter(value);
	  }
	};
  
	const handleSetTime = () => {
	  const totalSeconds =
		parseInt(inputHours) * 3600 +
		parseInt(inputMinutes) * 60 +
		parseInt(inputSeconds);
	  setTargetTime(totalSeconds);
	  setElapsedTime(0); 
	  setIsRunning(false); 
	  alert("Alerta en: "+inputHours+" H : "+inputMinutes+"M : "+inputSeconds+" S")
	  handleStart();
	  clearInterval(intervalRef.current); 
	};
  
	const handleStart = () => {
	  if (!isRunning) {
		setIsRunning(true);
	  }
	};
  
	const handleStop = () => {
	  setIsRunning(false);
	  clearInterval(intervalRef.current);
	  setTextBtn("Resume")
	};
  
  
	const handleRestart = () => {
	  setElapsedTime(0); // Reiniciar a 0 segundos
	  setIsRunning(true);
	};
  

	return (
		<div className="d-flex text-center flex-column">
		  <div className="d-flex bg-dark text-white p-4 rounded m-4 justify-content-center mt-2">
			<div className="fs-1 mx-2">
			  <i className="fa fa-clock"></i>
			</div>
			<div className="fs-1 mx-2" style={{ fontSize: "3rem", fontWeight: "bold" }}>
			  {Math.floor(elapsedTime / 3600).toString().padStart(2, "0")}:
			</div>
			<div className="fs-1 mx-2" style={{ fontSize: "3rem", fontWeight: "bold" }}>
			  {Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, "0")}:
			</div>
			<div className="fs-1 mx-2" style={{ fontSize: "3rem", fontWeight: "bold" }}>
			  {(elapsedTime % 60).toString().padStart(2, "0")}
			</div>
		  </div>
	  
		  <div className="mt-4 d-flex justify-content-center mb-4">
			<button className="btn btn-success mx-2 px-4 py-2" onClick={handleStart}>
			  {textBtn}
			</button>
			<button className="btn btn-danger mx-2 px-4 py-2" onClick={handleStop}>
			  Stop
			</button>
			<button className="btn btn-warning mx-2 px-4 py-2" onClick={handleRestart}>
			  Restart
			</button>
		  </div>
	  
		  <div className="d-flex justify-content-center align-items-center mb-4 mt-5">
			<div className="mx-3">
			  <h3 className="text-black">Alerta:</h3>
			</div>
			<div className="input-group mx-3">
			  <div className="input-group-prepend">
				<label className="input-group-text">H(23)</label>
			  </div>
			  <input
				type="number"
				className="form-control"
				value={inputHours}
				onChange={(e) => handleInputChange(e, setInputHours)}
				placeholder="Hours"
			  />
			</div>
			<div className="input-group mx-3">
			  <div className="input-group-prepend">
				<label className="input-group-text">M(59)</label>
			  </div>
			  <input
				type="number"
				className="form-control"
				value={inputMinutes}
				onChange={(e) => handleInputChange(e, setInputMinutes)}
				placeholder="Minutes"
			  />
			</div>
			<div className="input-group mx-3">
			  <div className="input-group-prepend">
				<label className="input-group-text">S(59)</label>
			  </div>
			  <input
				type="number"
				className="form-control"
				value={inputSeconds}
				onChange={(e) => handleInputChange(e, setInputSeconds)}
				placeholder="Seconds"
			  />
			</div>
			<div className="mx-3">
			  <button className="btn btn-primary" onClick={handleSetTime}>
				Set Time
			  </button>
			</div>
		  </div>
		</div>
	  );
	  
};

export default Home;