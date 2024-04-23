document.getElementById('deposit-type').addEventListener('change', function() {
    const depositType = this.value;
    const investmentPeriodSelect = document.getElementById('investment-period');
    investmentPeriodSelect.innerHTML = '';

    if (depositType === 'popolnyaemy') {
        const options = ['6 месяцев', '1 год', '1,5 года', '2 года'];
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            investmentPeriodSelect.appendChild(optionElement);
        });
    } else if (depositType === 'srochnyy') {
        const options = ['3 месяца', '6 месяцев'];
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            investmentPeriodSelect.appendChild(optionElement);
        });
    }
});

document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const depositType = document.getElementById('deposit-type').value;
    const investmentPeriod = document.getElementById('investment-period').value;
    const initialAmount = parseFloat(document.getElementById('initial-amount').value);

    let interestRate;
    let depositTime;

    if (depositType === 'popolnyaemy') {
        switch (investmentPeriod) {
            case '6 месяцев':
                interestRate = 20;
                depositTime = 1/2;
                break;
            case '1 год':
                interestRate = 22;
                depositTime = 1;
                break;
            case '1,5 года':
                interestRate = 15;
                depositTime = 1.5;
                break;
            case '2 года':
                interestRate = 10;
                depositTime = 2;    
                break;
        }
    } else if (depositType === 'srochnyy') {
        switch (investmentPeriod) {
            case '3 месяца':
                interestRate = 20;
                depositTime = 3/12;
                break;
            case '6 месяцев':
                interestRate = 22;
                depositTime = 1/2;
                break;
        }
    }

    const totalAmount = initialAmount + (interestRate / 100 * initialAmount) * depositTime;

    document.getElementById('result').innerHTML = `
        <p>Через ${investmentPeriod} ваш вклад вырастет до ${totalAmount.toFixed(2)} рублей.</p>
    `;
});