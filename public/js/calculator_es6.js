/*
A script to calculate monthly payments based on loan and interest
*/
const calcBtn = document.getElementById('getBtn');
calcBtn.addEventListener('click', calcAmt, false);
const errorArticle = document.getElementById('error');
const answerArticle = document.getElementById('answer');
const interestErr = document.getElementById('interestErr');
const MonthErr = document.getElementById('monthsErr');
const loanErr = document.getElementById('loanErr');
function calcAmt() {
    let errorDetector = false;
    loanErr.style.display = 'none';
    interestErr.style.display = 'none';
    MonthErr.style.display = 'none';
    const P = document.getElementById('amount').value;

    //divide by 1 you should get a whole number.. unless its a fraction
    const numTest = P / 1;    
    const strunNum = `${numTest}`;
    const boolValue = /(\d[.]\d)/.test(strunNum);//detects
    const nonDigit = /[\D]/.test(strunNum);//detects
    const interest = document.getElementById('interest').value;
    const numInter = interest * 1;
    const nonDigitint = /[\D]/.test(numInter);//detects
    const numberOfMonths = document.getElementById('months').value;
    const numTest2 = numberOfMonths / 1;
    const strunNum2 = `${numTest2}`;
    const boolValue2 = /(\d[.]\d)/.test(strunNum2);//detects
    const nonDigit2 = /[\D]/.test(strunNum2);//detects
    function error() {
        errorArticle.style.display = 'block';
        answerArticle.style.display = 'none';
    }
    function errorLoan() {
        errorArticle.style.display = 'block';
        loanErr.style.display = 'block';
        answerArticle.style.display = 'none';
        errorDetector = true;
    }
    function errorInterest() {
        errorArticle.style.display = 'block';

        interestErr.style.display = 'block';
        answerArticle.style.display = 'none';
        errorDetector = true;
    }
    function errorPayment() {
        errorArticle.style.display = 'block';

        MonthErr.style.display = 'block';
        answerArticle.style.display = 'none';
        errorDetector = true;
    }
    if ((boolValue2) || (nonDigit2) || (numTest2 <= 0)) {
        console.log(" errorloan function  test triggered!!!");
        errorArticle.style.display = 'block';
        errorPayment();
    }
    if ((boolValue) || (nonDigit) || (numTest <= 0)) {
        errorArticle.style.display = 'block';
        errorLoan();
        console.log("errorLoan(); test triggered!!!");
    }
    if ((numInter < 0.1) || (numInter.toString() == "NaN")) {
        errorArticle.style.display = 'block';
        console.log("errorInterest(); test");
        errorInterest();
    }
    if (!errorDetector) {
        const R = interest / (100 * 12);
        const exp = (1 + R) ** numberOfMonths;
        const answer = P * R * exp / (exp - 1);
        const roundAns = answer.toFixed(2);
        function answer1(roundAns) {
            errorArticle.style.display = 'none';

            answerArticle.style.display = 'block';
            answerArticle.getElementsByTagName('p')[0].innerHTML = `your monthly payment is ${roundAns}`;
        }
        answer1(roundAns);
    }
} 