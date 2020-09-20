export Interface IQuizApiResponse {
	id: number,
	quesion: string,
	description: string?,
	answers: 
	correct_answers: {answer_a_correct: boolean, answer_b_correct: boolean,answer_c_correct: boolean, answer_d_correct:boolean, answer_e_correct:boolean, answer_f_correct:boolean },
	multiple_correct_answers: string,
	tags: [{name: string?}]
}