import { useState, useMemo, useEffect } from "react";
import "./App.scss";
import Quiz from "./components/quiz/Quiz";
import Timer from "./components/Timer";
// import axios from "axios";
import UserInfo from "./components/userInfo/UserInfo";

const App = () => {
	const [questionNumber, setQuestionNumber] = useState(0);
	const [stop, setStop] = useState(false);
	// const [questions, setQuestions] = useState([]);
	const [username, setUsername] = useState("");
	const [earned, setEarned] = useState("$ 0");

	// useEffect(() => {
	// 	const fetchQuestions = async () => {
	// 		const res = await axios.get(
	// 			"https://the-trivia-api.com/api/questions?limit=10"
	// 		);

	// 		setQuestions(res.data);
	// 	};

	// 	fetchQuestions();
	// }, []);

	const data = [
		{
			id: 1,
			question: "Rolex is a company that specializes in what type of product?",
			answers: [
				{
					text: "Phone",
					correct: false,
				},
				{
					text: "Watches",
					correct: true,
				},
				{
					text: "Food",
					correct: false,
				},
				{
					text: "Cosmetic",
					correct: false,
				},
			],
		},
		{
			id: 2,
			question: "When did the website `Facebook` launch?",
			answers: [
				{
					text: "2004",
					correct: true,
				},
				{
					text: "2005",
					correct: false,
				},
				{
					text: "2006",
					correct: false,
				},
				{
					text: "2007",
					correct: false,
				},
			],
		},
		{
			id: 3,
			question: "Who played the character of harry potter in movie?",
			answers: [
				{
					text: "Johnny Deep",
					correct: false,
				},
				{
					text: "Leonardo Di Caprio",
					correct: false,
				},
				{
					text: "Denzel Washington",
					correct: false,
				},
				{
					text: "Daniel Red Cliff",
					correct: true,
				},
			],
		},
	];

	const moneyPyramid = useMemo(
		() => [
			{ id: 0, amount: "$ 100" },
			{ id: 1, amount: "$ 200" },
			{ id: 2, amount: "$ 300" },
			{ id: 3, amount: "$ 500" },
			{ id: 4, amount: "$ 1,000" },
			{ id: 5, amount: "$ 2,000" },
			{ id: 6, amount: "$ 4,000" },
			{ id: 7, amount: "$ 8,000" },
			{ id: 8, amount: "$ 16,000" },
			{ id: 9, amount: "$ 32,000" },
			{ id: 10, amount: "$ 64,000" },
			{ id: 11, amount: "$ 125,000" },
			{ id: 12, amount: "$ 250,000" },
			{ id: 13, amount: "$ 500,000" },
			{ id: 14, amount: "$ 1,000,000" },
		],
		[]
	);

	useEffect(() => {
		questionNumber > 1 &&
			setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
	}, [questionNumber, moneyPyramid]);

	return (
		<div className="app">
			{!username ? (
				<UserInfo setUsername={setUsername} />
			) : (
				<>
					<div className="main">
						{stop ? (
							<h1 className="endText">You earned: {earned}</h1>
						) : (
							<>
								<div className="top">
									<div className="timer">
										<Timer setStop={setStop} questionNumber={questionNumber} />
									</div>
								</div>
								<div className="bottom">
									<Quiz
										data={data}
										questionNumber={questionNumber}
										setQuestionNumber={setQuestionNumber}
										setStop={setStop}
									/>
								</div>
							</>
						)}
					</div>
					<div className="moneyPyramid">
						<ul>
							{moneyPyramid.map((money) => (
								<li
									className={
										questionNumber === money.id ? "item active" : "item"
									}
									key={money.id}
								>
									<span className="key">{money.id}</span>
									<span className="value">{money.amount}</span>
								</li>
							))}
						</ul>
					</div>
				</>
			)}
		</div>
	);
};

export default App;
