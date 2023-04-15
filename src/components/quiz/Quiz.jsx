import "./quiz.scss";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../../sounds/play.mp3";
import correct from "../../sounds/correct.mp3";
import wrong from "../../sounds/wrong.mp3";

const Quiz = ({ data, questionNumber, setQuestionNumber, setStop }) => {
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [className, setClassName] = useState("answer");

	const [letsPlay] = useSound(play);
	const [correctAnswer] = useSound(correct);
	const [wrongAnswer] = useSound(wrong);

	const delay = (duration, callback) => {
		setTimeout(() => {
			callback();
		}, duration);
	};

	useEffect(() => {
		letsPlay();
	}, [letsPlay]);

	useEffect(() => {
		setCurrentQuestion(data[questionNumber]);
	}, [data, questionNumber]);

	// const allAnswers = [
	// 	currentQuestion?.correctAnswer,
	// 	...currentQuestion?.incorrectAnswers,
	// ].sort((a, b) => (a < b ? -1 : 1));

	const handleClick = (answer) => {
		setSelectedAnswer(answer);
		setClassName("answer active");

		delay(3000, () => {
			setClassName(answer.correct ? "answer correct" : "answer wrong");
		});

		delay(5000, () => {
			if (answer.correct) {
				correctAnswer();
				setQuestionNumber((prev) => prev + 1);
				setSelectedAnswer(null);
			} else {
				wrongAnswer();
				delay(1000, () => {
					setStop(true);
				});
			}
		});
	};
	return (
		<div className="quiz">
			<div className="question">{currentQuestion?.question}</div>
			<div className="answers">
				{currentQuestion?.answers.map((answer, i) => (
					<span
						key={i}
						className={selectedAnswer === answer ? className : "answer"}
						onClick={() => !selectedAnswer && handleClick(answer)}
					>
						{answer.text}
					</span>
				))}
			</div>
		</div>
	);
};

export default Quiz;
