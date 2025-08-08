import Calculation from "../models/calculator.schema.js";

export const getCalculatorPage = (req, res) => {
  res.render("index", { result: null, username: null });
};

// export const calculate = async (req, res) => {
//   const { num1, operator, num2 } = req.body;
  
//   let result;
//   const n1 = parseFloat(num1);
//   const n2 = parseFloat(num2);

//   switch (operator) {
//     case "+":
//       result = n1 + n2;
//       break;
//     case "-":
//       result = n1 - n2;
//       break;
//     case "*":
//       result = n1 * n2;
//       break;
//     case "/":
//       result = n2 !== 0 ? n1 / n2 : "Error";
//       break;
//     default:
//       result = "Invalid Operator";
//   }

//   const expression = `${n1} ${operator} ${n2}`;

//   if (result !== "Error" && result !== "Invalid Operator") {
//     await Calculation.create({ expression, result });
//   }

//   res.render("index", { result });
// };

export const calculateAndSave = async (req, res) => {
  try {
    const { username, num1, num2, operation } = req.body;

    if (!username || num1 === undefined || num2 === undefined || !operation) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let result;
    switch (operation) {
      case '+':
        result = Number(num1) + Number(num2);
        break;
      case '-':
        result = Number(num1) - Number(num2);
        break;
      case '*':
        result = Number(num1) * Number(num2);
        break;
      case '/':
        result = Number(num2) !== 0 ? Number(num1) / Number(num2) : 'Error: Division by zero';
        break;
      default:
        return res.status(400).json({ message: 'Invalid operation' });
    }


    const newCalculation = new Calculation({
      username,
      expression: `${num1} ${operation} ${num2}`,
      result
    });
    await newCalculation.save();


    res.render("index", { result, username});

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getHistory = async (req, res) => {
  const { username } = req.params;
  const history = await Calculation.find(username ? { username } : {}).sort({ createdAt: -1 });
  res.render("history", { history, username });
};
