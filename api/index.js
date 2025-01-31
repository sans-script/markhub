require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

const apiKey = process.env.GEMINI_API_KEY;
if (apiKey) {
  console.log("API key found.");
} else {
  console.error("API key not found. Check the .env file.");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

console.log("Model Parameters: \n", generationConfig);

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] New request: ${req.method} ${req.url}`
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message:", message);
    const instructions = `Instructions for Formatting Responses:   

1. LaTeX Equations:

Always use LaTeX syntax for mathematical equations.
For equations on a new line and centered, use:

The quadratic formula is:

/[
ax^2 + bx + c = 0
/]

This equation will be centered and displayed on its own line.
    
For inline equations, use:

The quadratic formula is: /( x = /frac{-b /pm /sqrt{b^2 - 4ac}}{2a} /).

This equation will be displayed inline with the text.


4. Inline LaTeX in Bullet Points:

When writing equations in bullet points, always use inline LaTeX and ensure correct syntax. 
    
2. Mermaid Diagrams:

For charts or diagrams, use the Mermaid syntax. 
       
Example:

\`\`\`mermaid
pie
  title Sales Distribution
  "Product A" : 30
  "Product B" : 45
  "Product C" : 25
\`\`\`
    
Example of Correct LaTeX Usage:
   
The quadratic formula, also known as Bhaskara's formula in Brazil, is used to solve quadratic equations, which are equations of the form:

/[
ax^2 + bx + c = 0
/]

Where /(a/), /(b/), and /(c/) are constants, and /(x/) represents the unknown variable.

### Bhaskara's Formula

The formula to solve for /(x/) is given by:

/[
x = /frac{-b /pm /sqrt{b^2 - 4ac}}{2a}
/]

Where:
- /(a/) is the coefficient of /(x^2/),
- /(b/) is the coefficient of /(x/),
- /(c/) is the constant term,
- The discriminant, /(/Delta = b^2 - 4ac/), determines the nature of the solutions.

### Steps for Solving a Quadratic Equation:
1. **Identify the coefficients**: First, identify /(a/), /(b/), and /(c/) from the quadratic equation.
2. **Calculate the discriminant**: Find the value of /(b^2 - 4ac/). The discriminant determines the number and type of roots:
   - If /(/Delta > 0/), there are two real and distinct solutions.
   - If /(/Delta = 0/), there is one real solution (a repeated root).
   - If /(/Delta < 0/), there are no real solutions (the solutions are complex/imaginary).
3. **Substitute into the formula**: Plug /(a/), /(b/), and /(c/) into the quadratic formula and simplify to find the values of /(x/).

### Example 1: Two Real Solutions

Solve the equation:  
/[
2x^2 - 4x - 6 = 0
/]

Here, /(a = 2/), /(b = -4/), and /(c = -6/).

1. Calculate the discriminant:  
/[
/Delta = (-4)^2 - 4(2)(-6) = 16 + 48 = 64
/]

Since /(/Delta > 0/), there are two real solutions.

2. Apply the quadratic formula:  
/[
x = /frac{-(-4) /pm /sqrt{64}}{2(2)} = /frac{4 /pm 8}{4}
/]

This gives two solutions:
/[
x_1 = /frac{4 + 8}{4} = 3 /quad /text{and} /quad x_2 = /frac{4 - 8}{4} = -1
/]

### Example 2: One Real Solution

Solve the equation:  
/[
x^2 + 6x + 9 = 0
/]

Here, /(a = 1/), /(b = 6/), and /(c = 9/).

1. Calculate the discriminant:  
/[
/Delta = 6^2 - 4(1)(9) = 36 - 36 = 0
/]

Since /(/Delta = 0/), there is one real solution.

2. Apply the quadratic formula:  
/[
x = /frac{-6 /pm /sqrt{0}}{2(1)} = /frac{-6}{2} = -3
/]

Thus, the equation has a repeated root, /(x = -3/).

### Example 3: No Real Solutions

Solve the equation:  
/[
x^2 + 4x + 5 = 0
/]

Here, /(a = 1/), /(b = 4/), and /(c = 5/).

1. Calculate the discriminant:  
/[
/Delta = 4^2 - 4(1)(5) = 16 - 20 = -4
/]

Since /(/Delta < 0/), there are no real solutions. The solutions are complex.

2. Apply the quadratic formula:  
/[
x = /frac{-4 /pm /sqrt{-4}}{2(1)} = /frac{-4 /pm 2i}{2}
/]

This gives two complex solutions:  
/[
x_1 = -2 + i /quad /text{and} /quad x_2 = -2 - i
/]


### Conclusion

Bhaskara's formula is a powerful tool for solving quadratic equations. The key to using it effectively is understanding how the discriminant (/(/Delta/)) affects the nature of the solutions, whether they are real or complex.
    
Remember:

Always use /[ and /] for new line equations.
Use /( and /) for inline equations.
Be cautious with indentation in Markdown code, as it can cause errors in rendering LaTeX formulas, especially for new line equations.
Please respond to the user message without mentioning the instructions provided.
Please ensure that Mermaid diagrams are kept simple to avoid rendering errors. Avoid using complex Mermaid code like:
Only use mermaid to express basic diagrams and charts, not for equations. Complex diagrams may not render correctly.
Incorrect LaTex with indentation:
    
    /[
    /lim_{x /to /infty} (f(x) + g(x)) = /lim_{x /to /infty} f(x) + /lim_{x /to /infty} g(x)
    /]
    /[
    /lim_{x /to /infty} (c f(x)) = c /lim_{x /to /infty} f(x)
    /]

Correct LaTex without indentation:
/[
/lim_{x /to /infty} (f(x) + g(x)) = /lim_{x /to/infty} f(x) + /lim_{x /to /infty} g(x)
/]
/[
/lim_{x /to /infty} (c f(x)) = c /lim_{x /to /infty} f(x)
/]

Diga ao modelo par jamais colocar espaço identação em blocos de código latex de nova linha

\`\`\`mermaid
graph LR
    A[Função f(x)] --> B(Ponto);
    B --> C[Reta Tangente];
    C --> D[Inclinação = f'(x)];
\`\`\`

Use them only for pie charts and basic diagrams.

Always ensure that LaTeX syntax is correct to prevent rendering errors. Double-check for proper use of brackets and commands.
Example of a simple Mermaid diagram:

\`\`\`mermaid
graph TD
  A[Start] --> B{Is it simple?}
  B -->|Yes| C[Keep it simple]
  B -->|No| D[Too complex]
\`\`\`

3. README Files:

When asked to write a README or README.md file, do not enclose the content within a markdown code block.
`;

    const fullMessage = `${instructions}\n\nUser: ${message}`;
    const chatSession = model.startChat({ generationConfig, history: [] });
    const result = await chatSession.sendMessage(fullMessage);
    res.json({ response: result.response.text() });
    console.log("Model Response:\n", result.response.text());
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
