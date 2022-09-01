const userChecks = document.querySelectorAll('.user--check');

userChecks.forEach((item) => {
	item.addEventListener('click', (e) => {
		console.log(1);
		e.target.classList.toggle('user--check__active');
	});
});
