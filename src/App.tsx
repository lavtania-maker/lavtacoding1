import React, { useState } from 'react';

// --- Calculation Logic ---
const calculateCosts = (salary: number) => {
  // EPF Calculation (Employer's contribution)
  const epfRate = salary <= 5000 ? 0.13 : 0.12;
  const epf = salary * epfRate;

  // SOCSO & EIS have a salary ceiling of RM 6,000
  const socsoEligibleSalary = Math.min(salary, 6000);

  // SOCSO Calculation (Employer's contribution, assuming Category 1 for employees < 60)
  const socso = socsoEligibleSalary * 0.0175;

  // EIS Calculation (Employer's contribution)
  const eis = socsoEligibleSalary * 0.002;

  const totalMonthlyCost = salary + epf + socso + eis;
  const totalAnnualCost = totalMonthlyCost * 12;

  return {
    epf,
    socso,
    eis,
    totalMonthlyCost,
    totalAnnualCost,
  };
};

// --- Main Application Component ---
function App() {
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [salary, setSalary] = useState<number | '' >('');
  const [costs, setCosts] = useState<ReturnType<typeof calculateCosts> | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted for lead generation:', email); // Placeholder for data storage
      setIsEmailSubmitted(true);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof salary === 'number' && salary > 0) {
      const calculated = calculateCosts(salary);
      setCosts(calculated);
    }
  };

  return (
    <div className="App">
      <header className="header">AJobThing Employee Cost Calculator</header>

      {!isEmailSubmitted ? (
        <div className="email-gate">
          <h1>What's the True Cost of an Employee in Malaysia?</h1>
          <p>Our Employee Cost Calculator helps you budget accurately by breaking down all the hidden costs.</p>
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your work email to start"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">Start Calculating</button>
          </form>
        </div>
      ) : (
        <div className="calculator">
          <h2>Calculate Hiring Budget</h2>
          <p>Enter a basic monthly salary to see the full cost to you as an employer.</p>
          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <input
                type="number"
                placeholder="e.g., 4000"
                value={salary}
                onChange={(e) => setSalary(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>
            <button type="submit" className="btn">Calculate</button>
          </form>

          {costs && (
            <div className="results">
              <h3>Estimated Cost Breakdown</h3>
              <div className="results-grid">
                <div className="result-item"><strong>Basic Monthly Salary:</strong> RM {Number(salary).toFixed(2)}</div>
                <div className="result-item"><strong>Employer EPF:</strong> RM {costs.epf.toFixed(2)}</div>
                <div className="result-item"><strong>Employer SOCSO:</strong> RM {costs.socso.toFixed(2)}</div>
                <div className="result-item"><strong>Employer EIS:</strong> RM {costs.eis.toFixed(2)}</div>
                <div className="result-item"><strong>Total Monthly Cost:</strong> RM {costs.totalMonthlyCost.toFixed(2)}</div>
                <div className="result-item"><strong>Total Annual Cost:</strong> RM {costs.totalAnnualCost.toFixed(2)}</div>
              </div>
              <p className="disclaimer">
                This calculator provides an estimate based on current statutory rates for Malaysian citizens under 60. Actual costs may vary.
              </p>
            </div>
          )}
        </div>
      )}

      {isEmailSubmitted && (
         <div className="cta">
            <h3>Need Help Hiring?</h3>
            <p>Now that you have your budget, let us help you find the right talent.</p>
            <a href="https://ajobthing.com" target="_blank" rel="noopener noreferrer" className="btn">
              Post a Job with AJobThing
            </a>
        </div>
      )}

    </div>
  );
}

export default App;
