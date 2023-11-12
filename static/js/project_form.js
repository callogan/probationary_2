console.log("Inside JS code");
document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('[name="project_blocks"]');
  console.log("Inside function");

  checkboxes.forEach(checkbox => {
    const blockId = checkbox.value; // Получаем значение чекбокса
    console.log('Checkbox value:', checkbox.value);

    const select = document.getElementById(`block_${blockId}_select`);
    console.log("After const select");

    if (select) {
      console.log("In first if block");
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
        console.log("In second if block");
          select.style.display = 'block';
        } else {
          console.log("In else");
          select.style.display = 'none';
        }
      });
    }
  });
});