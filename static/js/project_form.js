document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('[name="project_blocks"]');

  checkboxes.forEach(checkbox => {
    const blockId = checkbox.value; // Получаем значение чекбокса

    const select = document.getElementById(block_${blockId}_select);

    if (select) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          select.style.display = 'block';
        } else {
          select.style.display = 'none';
        }
      });
    }
  });
});