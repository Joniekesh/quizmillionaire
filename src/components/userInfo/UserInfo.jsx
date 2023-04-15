import { useRef } from "react";
import "./userInfo.scss";

const UserInfo = ({ setUsername }) => {
	const inputRef = useRef();

	const handleClick = () => {
		inputRef.current.value && setUsername(inputRef.current.value);
	};

	return (
		<div className="userInfo">
			<h2>QUIZMILLIONAIRE</h2>
			<p>Sign In to play</p>
			<input placeholder="Enter username" ref={inputRef} />
			<button onClick={handleClick}>Start</button>
		</div>
	);
};

export default UserInfo;
