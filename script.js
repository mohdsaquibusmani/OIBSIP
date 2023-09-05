const calculationDisplay = $('.calculation');
  const resultDisplay = $('.result');
  const buttons = $('.button');

  let calculation = '';
          $(document).keydown(function(event){
     const value = event.originalEvent.key;
  
    if (value === 'Backspace') {
      calculation = calculation.slice(0, -1);
      resultDisplay.text(calculation);
    }else if (value === 'Delete') {
      calculation = '';
      resultDisplay.text('0');
      calculationDisplay.text('0');
    } else if (value === 'Enter') {
      calculation = resultDisplay.text();
      calculationDisplay.text(calculation);
      const ans = eval(calculation);
      resultDisplay.text(ans);
      calculation = ans;
    }  else {
      calculation += value;
      resultDisplay.text(calculation);
    }
  });
  

  $("button").click(function() {
    const value = $(this).text();
  
    if (value === 'ENTER') {
      try {
        const result = eval(calculation);
        calculationDisplay.text(calculation);
        resultDisplay.text(result);
      } catch (error) {
        resultDisplay.text('Error');
      }
      calculation = '';
    } else if (value === 'clear') {
      calculation = '';
      resultDisplay.text('0');
      calculationDisplay.text('0');
    } else if (value === 'del') {
      calculation = calculation.slice(0, -1);
      resultDisplay.text(calculation);
    } else if (value === 'ans') {
      calculation = resultDisplay.text();
      console.log(calculation);
      calculationDisplay.text(calculation);
      const ans = eval(calculation);
      resultDisplay.text(ans);
      calculation = ans;
    } else {
      calculation += value;
      resultDisplay.text(calculation);
    }
  });

