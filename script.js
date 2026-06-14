document.addEventListener('DOMContentLoaded', () => {
	// Page entrance
	requestAnimationFrame(() => document.body.classList.add('loaded'));

	// Header animation
	const header = document.querySelector('header');
	if (header) header.classList.add('header-animate');

	// Reveal-on-scroll for main sections
	const revealEls = document.querySelectorAll('.aboutUs, .contactUs, .content h1');
	const io = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				// once visible, unobserve
				io.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	revealEls.forEach(el => {
		el.classList.add('reveal');
		io.observe(el);
	});

	// Smooth scrolling for internal anchors
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', (e) => {
			const href = a.getAttribute('href');
			if (href.length > 1) {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// Form submit visual feedback (non-blocking)
	const form = document.getElementById('contact');
	if (form) {
		form.addEventListener('submit', () => {
			form.classList.add('submitting');
			setTimeout(() => form.classList.remove('submitting'), 1500);
			// After a short timeout mark submitted for pleasant visual feedback (doesn't prevent real submission)
			setTimeout(() => form.classList.add('submitted'), 1200);
		});
	}
});
