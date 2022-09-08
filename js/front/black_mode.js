// elementos
const blackMode = document.getElementById('blackMode');
const root = document.firstElementChild;

// valid variable (true default for open black mode)
let validMode;

if (localStorage.getItem('validMode') === 'true') validMode = true;
else validMode = false;

const dinamicMode = () => {
	if (validMode) {
		root.style.setProperty('--LetBgDoc', 'hsl(0, 0%, 10%)');
		root.style.setProperty('--LetColorPrimaryTwo', 'hsl(0, 0%, 95%)');
		localStorage.setItem('validMode', validMode);
		validMode = false;
	} else {
		root.style.setProperty('--LetBgDoc', 'hsl(0, 0%, 95%)');
		root.style.setProperty('--LetColorPrimaryTwo', 'hsl(223, 49%, 23%)');
		localStorage.setItem('validMode', validMode);
		validMode = true;
	}
};

dinamicMode();

blackMode.addEventListener('click', () => {
	dinamicMode();
});
