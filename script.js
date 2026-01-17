document.addEventListener("DOMContentLoaded", () => {
  const tl = anime.timeline({
    easing: 'easeOutQuart',
  });

  tl.add({
    targets: 'header',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: 300
  })
  .add({
    targets: '.avatar-box',
    scale: [0.5, 1],
    opacity: [0, 1],
    duration: 800
  }, '-=800')
  .add({
    targets: '.bento-item, .cert-card',
    translateY: [20, 0],
    opacity: [0, 1],
    delay: anime.stagger(120),
    duration: 800
  }, '-=600')
  .add({
    targets: '.stack-icon',
    scale: [0.7, 1],
    opacity: [0, 1],
    delay: anime.stagger(50, {from: 'center'}),
    duration: 600
  }, '-=500');

  const statusText = document.querySelector('footer p');
  if (statusText) {
    const content = statusText.innerHTML;
    statusText.innerHTML = '';
    statusText.style.opacity = '1';
    let charIndex = 0;
    
    setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (content.charAt(charIndex) === '<') {
          charIndex = content.indexOf('>', charIndex) + 1;
        } else {
          charIndex++;
        }
        statusText.innerHTML = content.substring(0, charIndex);
        if (charIndex >= content.length) clearInterval(typeInterval);
      }, 30);
    }, 2000);
  }
});