import { Question, Unit } from "@/types";

export const units: Unit[] = [
  {
    id: "unit-5",
    code: "Unit 5",
    title: "Linear Algebra",
    description: "Inequalities, systems, optimization, inverse functions, exponential and logarithmic functions.",
    lesson_count: 8
  },
  {
    id: "unit-6",
    code: "Unit 6",
    title: "Trigonometry",
    description: "Identities, equations, laws of sines and cosines, triangle solving and angle formulas.",
    lesson_count: 8
  }
];

export const demoQuestions: Question[] = [
  { id:"u5-1-1", unit:"unit-5", lesson:"Linear inequalities", difficulty:"Easy", prompt:"Solve: 3x + 5 > 14.", options:["x > 3","x < 3","x > 9/2","x < 9/2"], answer:0, explanation:"Subtract 5 and divide by 3: x > 3." },
  { id:"u5-1-2", unit:"unit-5", lesson:"Linear inequalities", difficulty:"Medium", prompt:"Solve: -2x + 7 ≤ 15.", options:["x ≤ -4","x ≥ -4","x ≤ 4","x ≥ 4"], answer:1, explanation:"-2x ≤ 8. Dividing by -2 reverses the inequality: x ≥ -4." },
  { id:"u5-2-1", unit:"unit-5", lesson:"Solving systems of linear inequalities graphically", difficulty:"Medium", prompt:"Which point satisfies x + y ≤ 6 and x ≥ 2?", options:["(1,4)","(2,4)","(3,5)","(0,0)"], answer:1, explanation:"(2,4) gives 6 ≤ 6 and 2 ≥ 2." },
  { id:"u5-2-2", unit:"unit-5", lesson:"Solving systems of linear inequalities graphically", difficulty:"Easy", prompt:"For y > 2x - 1, the boundary line is drawn as:", options:["A solid line","A dashed line","A vertical line","A horizontal line"], answer:1, explanation:"A strict inequality uses a dashed boundary." },
  { id:"u5-3-1", unit:"unit-5", lesson:"Linear programming and optimization", difficulty:"Medium", prompt:"In linear programming, the maximum or minimum of a linear objective over a bounded polygonal feasible region occurs at:", options:["Any point on the x-axis","A corner (vertex) of the feasible region","Only the origin","The midpoint of the region"], answer:1, explanation:"For a bounded polygonal feasible region, an optimum occurs at a vertex." },
  { id:"u5-3-2", unit:"unit-5", lesson:"Linear programming and optimization", difficulty:"Hard", prompt:"Maximize P = 3x + 2y subject to x ≥ 0, y ≥ 0, x + y ≤ 4. What is the maximum P?", options:["8","10","12","16"], answer:2, explanation:"Check vertices (0,0), (4,0), (0,4): P = 0, 12, 8." },
  { id:"u5-4-1", unit:"unit-5", lesson:"Inverse function", difficulty:"Easy", prompt:"If f(x) = 2x + 3, then f⁻¹(x) is:", options:["(x + 3)/2","(x - 3)/2","2x - 3","3 - 2x"], answer:1, explanation:"Let y=2x+3, swap x and y, then solve: y=(x-3)/2." },
  { id:"u5-4-2", unit:"unit-5", lesson:"Inverse function", difficulty:"Medium", prompt:"If f(5) = 12, then f⁻¹(12) =", options:["5","7","12","60"], answer:0, explanation:"Inverse functions reverse the input-output pair." },
  { id:"u5-5-1", unit:"unit-5", lesson:"Solving exponential equations", difficulty:"Easy", prompt:"Solve 2^x = 16.", options:["2","3","4","8"], answer:2, explanation:"16 = 2^4, so x = 4." },
  { id:"u5-5-2", unit:"unit-5", lesson:"Solving exponential equations", difficulty:"Medium", prompt:"Solve 3^(x+1) = 27.", options:["1","2","3","4"], answer:1, explanation:"27 = 3^3, so x + 1 = 3 and x = 2." },
  { id:"u5-6-1", unit:"unit-5", lesson:"The logarithmic function", difficulty:"Easy", prompt:"Evaluate log₁₀(1000).", options:["1","2","3","10"], answer:2, explanation:"10³ = 1000." },
  { id:"u5-6-2", unit:"unit-5", lesson:"The logarithmic function", difficulty:"Medium", prompt:"If log₂(x) = 5, then x =", options:["10","16","25","32"], answer:3, explanation:"The logarithmic equation is equivalent to x = 2⁵ = 32." },
  { id:"u5-7-1", unit:"unit-5", lesson:"Some Properties of logarithms", difficulty:"Medium", prompt:"Simplify: log(a) + log(b), for positive a and b.", options:["log(a+b)","log(ab)","log(a/b)","log(a-b)"], answer:1, explanation:"The product rule gives log a + log b = log(ab)." },
  { id:"u5-7-2", unit:"unit-5", lesson:"Some Properties of logarithms", difficulty:"Medium", prompt:"Simplify: log(a) - log(b), for positive a and b.", options:["log(ab)","log(a+b)","log(a/b)","log(b/a)"], answer:2, explanation:"The quotient rule gives log a - log b = log(a/b)." },
  { id:"u5-8-1", unit:"unit-5", lesson:"Revision and unit test", difficulty:"Medium", prompt:"Which statement is true for every positive x and base b > 0, b ≠ 1?", options:["log_b(x)=b^x","log_b(b^x)=x","log_b(x)=x^b","log_b(1)=1"], answer:1, explanation:"Logarithms and exponentials are inverse operations." },
  { id:"u5-8-2", unit:"unit-5", lesson:"Revision and unit test", difficulty:"Hard", prompt:"Solve: log₂(x - 1) = 3.", options:["7","8","9","10"], answer:2, explanation:"x - 1 = 2³ = 8, so x = 9." },

  { id:"u6-1-1", unit:"unit-6", lesson:"Trigonometric identities", difficulty:"Easy", prompt:"Which identity is always true?", options:["sin²θ + cos²θ = 1","sinθ + cosθ = 1","tanθ = sinθ·cosθ","sin²θ - cos²θ = 1"], answer:0, explanation:"This is the fundamental Pythagorean identity." },
  { id:"u6-1-2", unit:"unit-6", lesson:"Trigonometric identities", difficulty:"Medium", prompt:"tanθ can be written as:", options:["cosθ/sinθ","sinθ/cosθ","1/sinθ","1/cosθ"], answer:1, explanation:"tanθ = sinθ/cosθ when cosθ ≠ 0." },
  { id:"u6-2-1", unit:"unit-6", lesson:"Solving Trigonometric equations", difficulty:"Medium", prompt:"For 0° ≤ θ ≤ 360°, solve sinθ = 0.", options:["0° only","180° only","0° and 180°","0°, 180°, and 360°"], answer:3, explanation:"Sine is zero at multiples of 180° in the interval." },
  { id:"u6-2-2", unit:"unit-6", lesson:"Solving Trigonometric equations", difficulty:"Easy", prompt:"For 0° ≤ θ ≤ 360°, cosθ = 1 at:", options:["0° and 360°","90°","180°","270°"], answer:0, explanation:"Cosine equals 1 at 0° and 360° in the closed interval." },
  { id:"u6-3-1", unit:"unit-6", lesson:"The sine law and the cosine law", difficulty:"Medium", prompt:"The sine law relates sides and their opposite angles. Which form is correct?", options:["a/sin A = b/sin B = c/sin C","a cos A = b cos B","a/sin B = b/sin A","a+b=c"], answer:0, explanation:"The sine law states a/sin A = b/sin B = c/sin C." },
  { id:"u6-3-2", unit:"unit-6", lesson:"The sine law and the cosine law", difficulty:"Medium", prompt:"Which is the cosine law?", options:["a²=b²+c²-2bc cos A","a=b+c","a²=b²+c²+2bc sin A","a/sin A=b/sin B"], answer:0, explanation:"The cosine law generalizes Pythagoras for any triangle." },
  { id:"u6-4-1", unit:"unit-6", lesson:"Solving triangle", difficulty:"Easy", prompt:"The sum of the interior angles of any triangle is:", options:["90°","180°","270°","360°"], answer:1, explanation:"All triangle angles add to 180°." },
  { id:"u6-4-2", unit:"unit-6", lesson:"Solving triangle", difficulty:"Medium", prompt:"If A = 50° and B = 60° in a triangle, C =", options:["60°","70°","80°","90°"], answer:1, explanation:"C = 180° - 50° - 60° = 70°." },
  { id:"u6-5-1", unit:"unit-6", lesson:"Applications on solving triangle", difficulty:"Medium", prompt:"A 10 m ladder makes a 60° angle with the ground. Approximately how high does it reach?", options:["5 m","8.66 m","10 m","17.32 m"], answer:1, explanation:"Height = 10 sin60° ≈ 8.66 m." },
  { id:"u6-5-2", unit:"unit-6", lesson:"Applications on solving triangle", difficulty:"Hard", prompt:"Two sides of a triangle are 5 m and 7 m with included angle 60°. The third side is approximately:", options:["3.46 m","6.24 m","8.49 m","12 m"], answer:1, explanation:"c²=5²+7²−2(5)(7)cos60°=39, so c≈6.24." },
  { id:"u6-6-1", unit:"unit-6", lesson:"Trigonometric functions of the Sum and the difference of two angles", difficulty:"Medium", prompt:"sin(A+B) equals:", options:["sinA cosB + cosA sinB","sinA sinB + cosA cosB","sinA cosB - cosA sinB","cosA cosB - sinA sinB"], answer:0, explanation:"This is the sine addition formula." },
  { id:"u6-6-2", unit:"unit-6", lesson:"Trigonometric functions of the Sum and the difference of two angles", difficulty:"Medium", prompt:"cos(A-B) equals:", options:["cosA cosB + sinA sinB","cosA cosB - sinA sinB","sinA cosB + cosA sinB","sinA sinB - cosA cosB"], answer:0, explanation:"This is the cosine difference formula." },
  { id:"u6-7-1", unit:"unit-6", lesson:"Trigonometric functions of double an angle", difficulty:"Medium", prompt:"sin(2A) equals:", options:["sin²A","2sinA cosA","2cos²A","sinA + cosA"], answer:1, explanation:"The double-angle identity is sin2A = 2sinA cosA." },
  { id:"u6-7-2", unit:"unit-6", lesson:"Trigonometric functions of double an angle", difficulty:"Medium", prompt:"cos(2A) can be written as:", options:["2sinA cosA","cos²A - sin²A","sin²A + cos²A","2sin²A - 1"], answer:1, explanation:"One standard form is cos2A = cos²A - sin²A." },
  { id:"u6-8-1", unit:"unit-6", lesson:"Revision and unit test", difficulty:"Hard", prompt:"If sinθ = 3/5 and θ is acute, cosθ =", options:["3/5","4/5","5/4","1/5"], answer:1, explanation:"Using sin²θ+cos²θ=1 gives cosθ=4/5 for an acute angle." },
  { id:"u6-8-2", unit:"unit-6", lesson:"Revision and unit test", difficulty:"Hard", prompt:"If A=30°, B=45°, then sin(A+B) =", options:["√2/2","√3/2","(√6+√2)/4","1/2"], answer:2, explanation:"sin75° = (√6+√2)/4." }
];
