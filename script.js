document.addEventListener('DOMContentLoaded', function() {
    const impactList = document.getElementById('impact-list');
    const quizContainer = document.getElementById('quiz-container');
    const questionEl = document.getElementById('question');
    const choicesEl = document.getElementById('choices');
    const submitBtn = document.getElementById('submit');
    const resultEl = document.getElementById('result');

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add click event to impact list items
    impactList.addEventListener('click', function(e) {
        const impactItem = e.target.closest('.impact-item');
        if (impactItem) {
            const title = impactItem.querySelector('h3').textContent;
            const description = impactItem.querySelector('p').textContent;
            alert(`${title}: ${description}`);
        }
    });

    // Quiz questions
    const questions = [
        {
            question: "Which of the following is NOT a primary function of smart grids?",
            choices: ["Automated meter reading", "Real-time energy pricing", "Social media integration", "Demand response management"],
            correctAnswer: 2
        },
        {
            question: "How does IoT contribute to energy conservation?",
            choices: ["By increasing energy consumption", "By monitoring and optimizing energy usage", "By replacing all manual processes", "IoT doesn't contribute to energy conservation"],
            correctAnswer: 1
        },
        {
            question: "What is the main advantage of using data analytics in energy conservation?",
            choices: ["It makes energy more expensive", "It reduces the need for electricity", "It helps identify patterns and optimize energy usage", "It completely eliminates the need for human oversight"],
            correctAnswer: 2
        }
    ];

    let currentQuestion = 0;

    function loadQuestion() {
        const question = questions[currentQuestion];
        questionEl.textContent = question.question;
        choicesEl.innerHTML = '';
        question.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', () => selectChoice(index));
            choicesEl.appendChild(button);
        });
        resultEl.textContent = '';
    }

    function selectChoice(index) {
        const buttons = choicesEl.getElementsByTagName('button');
        for (let button of buttons) {
            button.classList.remove('selected');
        }
        buttons[index].classList.add('selected');
    }

    submitBtn.addEventListener('click', function() {
        const selected = choicesEl.querySelector('.selected');
        if (selected) {
            const selectedIndex = Array.from(choicesEl.children).indexOf(selected);
            if (selectedIndex === questions[currentQuestion].correctAnswer) {
                resultEl.textContent = "Correct!";
                resultEl.style.color = "green";
            } else {
                resultEl.textContent = "Incorrect. Try again!";
                resultEl.style.color = "red";
            }
            currentQuestion++;
            if (currentQuestion < questions.length) {
                setTimeout(loadQuestion, 1500);
            } else {
                setTimeout(() => {
                    quizContainer.innerHTML = "<h3>Quiz completed! Thanks for participating!</h3>";
                }, 1500);
            }
        } else {
            alert("Please select an answer!");
        }
    });

    loadQuestion();

    // Parallax effect
    window.addEventListener('scroll', function() {
        const parallaxSections = document.querySelectorAll('.parallax');
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionSpeed = 0.5;
            section.style.backgroundPositionY = `${scrollPosition * sectionSpeed}px`;
        });
    });
});