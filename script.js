document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
      this.querySelector('.card-inner').classList.toggle('is-flipped');
    });
  });