function changeColor() {
    var btn = document.querySelector('.color-change-btn');
    var currentColor = btn.style.backgroundColor;

    if (currentColor === 'red') {
      btn.style.backgroundColor = 'blue';
    } else {
      btn.style.backgroundColor = 'red';
    }
  }