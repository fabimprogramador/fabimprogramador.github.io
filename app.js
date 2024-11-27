const questions = [
	{
		text: "Eu tenho sido capaz de rir e ver o lado divertido das coisas",
		options: [
			{ label: "Como eu sempre fiz", score: 0 },
			{ label: "Não tanto quanto antes", score: 1 },
			{ label: "Sem dúvida, menos que antes", score: 2 },
			{ label: "De jeito nenhum", score: 3 },
		],
	},
	{
		text: "Eu tenho pensado no futuro com alegria e tenho tido esperança",
		options: [
			{ label: "Sim, como de costume", score: 0 },
			{ label: "Um pouco menos que de costume", score: 1 },
			{ label: "Muito menos que de costume", score: 2 },
			{ label: "Praticamente não", score: 3 },
		],
	},
	{
		text: "Eu tenho me culpado sem necessidade quando as coisas dão errado",
		options: [
			{ label: "Sim, a maioria das vezes", score: 3 },
			{ label: "Sim, algumas vezes", score: 2 },
			{ label: "Raramente", score: 1 },
			{ label: "Não, nunca", score: 0 },
		],
	},
	{
		text: "Eu tenho ficado ansiosa ou preocupada sem motivo",
		options: [
			{ label: "Não, nunca", score: 0 },
			{ label: "De vez em quando", score: 1 },
			{ label: "Sim, às vezes", score: 2 },
			{ label: "Sim, muitas vezes", score: 3 },
		],
	},
	{
		text: "Eu tenho me sentido com medo ou muito assustada, sem motivo",
		options: [
			{ label: "Sim, muitas vezes", score: 3 },
			{ label: "Sim, por vezes", score: 2 },
			{ label: "Raramente", score: 1 },
			{ label: "Não, nunca", score: 0 },
		],
	},
	{
		text: "Eu tenho me sentido sobrecarregada pelas tarefas e acontecimentos do meu dia-a-dia",
		options: [
			{
				label: "Sim, na maioria das vezes eu não consigo lidar bem com eles",
				score: 3,
			},
			{
				label: "Sim, algumas vezes não consigo lidar bem como antes",
				score: 2,
			},
			{
				label: "Não, na maioria das vezes consigo lidar bem com eles",
				score: 1,
			},
			{
				label: "Não, eu consigo lidar com eles tão bem quanto antes",
				score: 0,
			},
		],
	},
	{
		text: "Eu tenho me sentido tão infeliz que eu tenho tido dificuldade de dormir",
		options: [
			{ label: "Sim, quase sempre", score: 3 },
			{ label: "Sim, algumas vezes", score: 2 },
			{ label: "Raramente", score: 1 },
			{ label: "Não, nenhuma vez", score: 0 },
		],
	},
	{
		text: "Tenho me sentido triste ou muito mal",
		options: [
			{ label: "Sim, quase sempre", score: 3 },
			{ label: "Sim, muitas vezes", score: 2 },
			{ label: "Raramente", score: 1 },
			{ label: "Não, nunca", score: 0 },
		],
	},
	{
		text: "Tenho me sentido tão triste que tenho chorado",
		options: [
			{ label: "Sim, a maior parte do tempo", score: 3 },
			{ label: "Sim, muitas vezes", score: 2 },
			{ label: "Só às vezes", score: 1 },
			{ label: "Não, nunca", score: 0 },
		],
	},
	{
		text: "Eu tenho pensado em fazer alguma coisa contra mim mesma",
		options: [
			{ label: "Sim, muitas vezes", score: 3 },
			{ label: "Às vezes", score: 2 },
			{ label: "Raramente", score: 1 },
			{ label: "Nunca", score: 0 },
		],
	},
];

document.getElementById("registerForm").addEventListener("submit", (e) => {
	e.preventDefault();
	const name = document.getElementById("name").value;
	const date = document.getElementById("date").value;
	const babyAge = document.getElementById("babyAge").value;

	localStorage.setItem("userData", JSON.stringify({ name, date, babyAge }));
	document.getElementById("registration").style.display = "none";
	document.getElementById("assessment").style.display = "block";

	createQuestions();
});

function createQuestions() {
	const questionsContainer = document.getElementById("questionsContainer");
	questions.forEach((question, index) => {
		const questionCard = document.createElement("div");
		questionCard.className = "mb-4 highlight";
		questionCard.innerHTML = `<p><strong>${index + 1}. ${
			question.text
		}</strong></p>`;

		question.options.forEach((option, i) => {
			questionCard.innerHTML += `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="q${index}" value="${option.score}" id="q${index}o${i}">
          <label class="form-check-label" for="q${index}o${i}">${option.label}</label>
        </div>`;
		});

		questionsContainer.appendChild(questionCard);
	});
}

document.getElementById("epdsForm").addEventListener("change", () => {
	const totalAnswered = [...document.querySelectorAll("input:checked")].length;
	const progressBar = document.getElementById("progressBar");
	progressBar.style.width = `${(totalAnswered / questions.length) * 100}%`;
	progressBar.setAttribute("aria-valuenow", totalAnswered);
	progressBar.textContent = `${totalAnswered}/10`;
});

document.getElementById("epdsForm").addEventListener("submit", (e) => {
	e.preventDefault();
	let score = 0;
	document.querySelectorAll("input:checked").forEach((input) => {
		score += parseInt(input.value);
	});

	const { name } = JSON.parse(localStorage.getItem("userData"));
	document.getElementById("assessment").style.display = "none";
	document.getElementById("results").style.display = "block";
	document.getElementById("resultName").textContent = name;
	document.getElementById("finalScore").textContent = score;

	const careGuidelines = document.getElementById("careGuidelines");
	careGuidelines.innerHTML = "";

	if (score <= 9) {
		document.getElementById("recommendation").textContent =
			"Baixo risco de depressão.";
		careGuidelines.innerHTML = `
      <li>Realizar acompanhamento em consultas regulares.</li>
      <li>Incentivar hábitos saudáveis como exercício físico e boa alimentação.</li>
      <li>Fomentar o apoio emocional e familiar.</li>
      <li>Encaminhar para grupos de apoio quando necessário.</li>
      <li>Oferecer recursos de apoio psicológico.</li>
    `;
	} else if (score <= 12) {
		document.getElementById("recommendation").textContent =
			"Risco moderado de depressão.";
		careGuidelines.innerHTML = `
      <li>É necessário um avaliação detalhada com psicólogo.</li>
      <li>Monitorar sinais de agravamento no estado emocional.</li>
      <li>O profissional deve fazer o aconlhimento ao paciente e conversar com os familiares.</li>
      <li>Incentivar suporte social e familiar.</li>
      <li>Orientar sobre a importância do autocuidado.</li>
    `;
	} else {
		document.getElementById("recommendation").textContent =
			"Alto risco de depressão.";
		careGuidelines.innerHTML = `
      <li>Comunicar a equipe de Enfermagem para uma avaliação psiquiátrica urgente.</li>
      <li>Garantir de início, o suporte emocional e intensivo.</li>
      <li>Orientar os familiares sobre o acompanhamento contínuo da paciente.</li>
      <li>Fazer uma esculta ativa nesses casos.</li>
      <li>Garantir sempre a segurança da paciente.</li>
    `;
	}
});

document.getElementById("restart").addEventListener("click", () => {
	localStorage.clear();
	location.reload();
});
