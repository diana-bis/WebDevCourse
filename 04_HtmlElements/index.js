document.addEventListener("DOMContentLoaded", () => {
    pageLoaded();
});

let txt1;
let txt2;
let btnCalc;
let lblRes;
let op;

function pageLoaded() {
    txt1 = document.getElementById("txt1");
    txt2 = document.querySelector('#txt2');
    btn = document.getElementById("btnCalc");
    lblRes = document.getElementById("lblRes");
    op = document.getElementById("op");
    btn.addEventListener('click', () => {
        calculate();
    });

}

function calculate() {
    let txt1Text = txt1.value;
    let num1 = parseInt(txt1Text); // convert to num

    let txt2Text = txt2.value;
    let num2 = parseInt(txt2Text);

    let operator = op.value;

    let res;
    switch (operator) {
        case "+":
            res = num1 + num2;
            break;
        case "-":
            res = num1 - num2;
            break;
        case "*":
            res = num1 * num2;
            break;
        case "/":
            res = num2 != 0 ? num1 / num2 : "Error /0";
            break;
    }

    // Show result on screen
    lblRes.innerText = res; // converts back to string

    // Also write a log entry in the textarea
    print(`${num1} ${operator} ${num2} = ${res}`, true);
}


const btn2 = document.getElementById("btn2");
btn2.addEventListener("click", () => {
    print("btn2 clicked: " + btn2.id + "|" + btn2.innerText);
});


//btn2.addEventListener("click", func1);
//function func1(){

//}





// =============================================
// HELPER: PRINT TO TEXTAREA
// =============================================
function print(msg, append) {
    //--Get test area element refrence
    const ta = document.getElementById("output");
    //--write msg to textArea text

    if (!ta) {
        console.log(msg);
        return;
    }
    if (append) {   //true
        ta.value += msg + "\n";
    } else {    //false
        ta.value = msg;
    }
    /*if (ta) ta.value = msg;
    else console.log(msg); prints to console if no text area*/
}

// =============================================
// STEP 1: JS NATIVE TYPES, USEFUL TYPES & OPERATIONS
// =============================================
function demoNative() {
    let out = "=== STEP 1: NATIVE TYPES ===\n";

    // String
    const s = "Hello World";
    out += "\n[String] s = " + s;
    out += "\nLength: " + s.length;
    out += "\nUpper: " + s.toUpperCase();

    // Number
    const n = 42;
    out += "\n\n[Number] n = " + n;

    // Boolean
    const b = true;
    out += "\n\n[Boolean] b = " + b;

    // Date
    const d = new Date();
    out += "\n\n[Date] now = " + d.toISOString();

    // Array
    const arr = [1, 2, 3, 4];
    out += "\n\n[Array] arr = [" + arr.join(", ") + "]";
    out += "\nPush 5 → " + (arr.push(5), arr.join(", "));
    out += "\nMap x2 → " + arr.map(x => x * 2).join(", ");  //lambda

    // Functions as variables
    const add = function (a, b) { return a + b; };
    out += "\n\n[Function as variable] add(3,4) = " + add(3, 4);

    // Callback
    function calc(a, b, fn) {
        return fn(a, b);
    }
    const result = calc(10, 20, (x, y) => x + y);
    out += "\n[Callback] calc(10,20, x+y ) = " + result;

    print(out);
}