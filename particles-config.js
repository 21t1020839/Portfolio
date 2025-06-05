// particles.js config for a techy animated background
particlesJS('particles-js', {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: ['#00c6fb', '#43e97b', '#38f9d7', '#485563'] },
    shape: { type: 'circle' },
    opacity: { value: 0.3, random: true },
    size: { value: 4, random: true },
    line_linked: { enable: true, distance: 120, color: '#38f9d7', opacity: 0.2, width: 1 },
    move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
