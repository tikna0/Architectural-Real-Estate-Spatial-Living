import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, PieChart } from 'lucide-react';
import { sound } from '../utils/audio';

export const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState<number>(14850000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(5.85);
  const [hoaMonthly, setHoaMonthly] = useState<number>(3200);
  const [isInvestorMode, setIsInvestorMode] = useState<boolean>(false);
  const [estimatedMonthlyRent, setEstimatedMonthlyRent] = useState<number>(45000);

  // Financial calculations
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, homePrice - downPaymentAmount);

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  // Monthly Principal & Interest: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const monthlyPrincipalAndInterest =
    loanAmount > 0 && monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const monthlyPropertyTax = (homePrice * 0.0115) / 12; // ~1.15% avg property tax
  const monthlyInsurance = (homePrice * 0.0035) / 12; // ~0.35% insurance
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + hoaMonthly;

  // Investor Cap Rate & Cash on Cash
  const annualGrossRent = estimatedMonthlyRent * 12;
  const annualOperatingExpenses = (monthlyPropertyTax + monthlyInsurance + hoaMonthly) * 12;
  const netOperatingIncome = annualGrossRent - annualOperatingExpenses;
  const capRate = homePrice > 0 ? (netOperatingIncome / homePrice) * 100 : 0;
  const annualDebtService = monthlyPrincipalAndInterest * 12;
  const annualCashFlow = netOperatingIncome - annualDebtService;
  const cashOnCashReturn = downPaymentAmount > 0 ? (annualCashFlow / downPaymentAmount) * 100 : 0;

  // Percentage breakdown for visual track
  const piPct = (monthlyPrincipalAndInterest / totalMonthlyPayment) * 100 || 60;
  const taxPct = (monthlyPropertyTax / totalMonthlyPayment) * 100 || 20;
  const insPct = (monthlyInsurance / totalMonthlyPayment) * 100 || 10;
  const hoaPct = (hoaMonthly / totalMonthlyPayment) * 100 || 10;

  return (
    <section id="mortgage-lab" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Title & Proposition */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-2 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Modeling & Amortization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
            Mortgage & Capital Simulator
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6E6E73] max-w-xl">
            Simulate capital outlays, monthly debt service, tax obligations, and capitalization returns for high-value architectural acquisitions.
          </p>
        </div>

        {/* Homeowner vs Investor toggle */}
        <div className="apple-glass p-1 rounded-2xl flex items-center gap-1 self-start md:self-auto">
          <button
            type="button"
            onClick={() => {
              sound.playSnap();
              setIsInvestorMode(false);
            }}
            className={`apple-press px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              !isInvestorMode ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            Residential Acquisition
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playSnap();
              setIsInvestorMode(true);
            }}
            className={`apple-press px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              isInvestorMode ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            Investor Cap Rate / ROI
          </button>
        </div>
      </div>

      {/* Simulator Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders & Inputs (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm space-y-6">
          {/* Home Price Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-[#1D1D1F]">
                Acquisition Valuation
              </label>
              <span className="text-sm font-bold text-[#1D1D1F] tabular-nums">
                ${homePrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={2000000}
              max={25000000}
              step={250000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-[#0071E3] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#86868B] mt-1">
              <span>$2.0M</span>
              <span>$14.8M</span>
              <span>$25.0M</span>
            </div>
          </div>

          {/* Down Payment % Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-[#1D1D1F]">
                Down Payment Equity ({downPaymentPercent}%)
              </label>
              <span className="text-sm font-bold text-[#1D1D1F] tabular-nums">
                ${Math.round(downPaymentAmount).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#0071E3] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#86868B] mt-1">
              <span>10% ($1.4M)</span>
              <span>25% ($3.7M)</span>
              <span>50% ($7.4M)</span>
            </div>
          </div>

          {/* Loan Term & Interest Rate Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-[#1D1D1F] mb-2">
                Loan Term Duration
              </label>
              <div className="apple-glass p-1 rounded-xl flex items-center gap-1">
                {[15, 30].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      sound.playSnap();
                      setLoanTermYears(term);
                    }}
                    className={`apple-press flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      loanTermYears === term
                        ? 'bg-white text-[#1D1D1F] shadow-sm'
                        : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {term} Years Fixed
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-[#1D1D1F]">
                  Interest Rate (APR)
                </label>
                <span className="text-xs font-bold text-[#1D1D1F] tabular-nums">
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min={4.0}
                max={8.5}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#0071E3] cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* HOA Monthly Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-[#1D1D1F]">
                Estimated Monthly HOA & Building Services
              </label>
              <span className="text-xs font-bold text-[#1D1D1F] tabular-nums">
                ${hoaMonthly.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={8000}
              step={100}
              value={hoaMonthly}
              onChange={(e) => setHoaMonthly(Number(e.target.value))}
              className="w-full accent-[#0071E3] cursor-pointer"
            />
          </div>

          {/* Investor Mode Fields */}
          {isInvestorMode && (
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-black/5 space-y-3 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-[#1D1D1F]">
                  Estimated Monthly Lease Income
                </label>
                <span className="text-xs font-bold text-[#1D1D1F] tabular-nums">
                  ${estimatedMonthlyRent.toLocaleString()} / mo
                </span>
              </div>
              <input
                type="range"
                min={15000}
                max={90000}
                step={1000}
                value={estimatedMonthlyRent}
                onChange={(e) => setEstimatedMonthlyRent(Number(e.target.value))}
                className="w-full accent-[#0071E3] cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Results Card (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm space-y-6">
          <div>
            <div className="text-xs text-[#86868B] uppercase tracking-wider">
              {isInvestorMode ? 'Monthly Capital Requirements' : 'Estimated Total Monthly Outlay'}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1F] tabular-nums mt-1">
              ${Math.round(totalMonthlyPayment).toLocaleString()}
              <span className="text-sm font-normal text-[#86868B] ml-1">/ month</span>
            </div>
            <div className="text-xs text-[#86868B] mt-1">
              Loan Principal: ${Math.round(loanAmount).toLocaleString()}
            </div>
          </div>

          {/* Proportional visual segmented bar */}
          <div className="space-y-1.5">
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-neutral-100">
              <div style={{ width: `${piPct}%` }} className="bg-[#0071E3] transition-all" title="Principal & Interest" />
              <div style={{ width: `${taxPct}%` }} className="bg-[#34C759] transition-all" title="Property Tax" />
              <div style={{ width: `${insPct}%` }} className="bg-[#FF9500] transition-all" title="Insurance" />
              <div style={{ width: `${hoaPct}%` }} className="bg-[#AF52DE] transition-all" title="HOA" />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3]" />
                <span className="text-[#6E6E73]">Principal & Interest</span>
              </div>
              <div className="text-right font-medium text-[#1D1D1F] tabular-nums">
                ${Math.round(monthlyPrincipalAndInterest).toLocaleString()}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" />
                <span className="text-[#6E6E73]">Property Tax (~1.15%)</span>
              </div>
              <div className="text-right font-medium text-[#1D1D1F] tabular-nums">
                ${Math.round(monthlyPropertyTax).toLocaleString()}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9500]" />
                <span className="text-[#6E6E73]">Home Insurance</span>
              </div>
              <div className="text-right font-medium text-[#1D1D1F] tabular-nums">
                ${Math.round(monthlyInsurance).toLocaleString()}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#AF52DE]" />
                <span className="text-[#6E6E73]">HOA & Amenities</span>
              </div>
              <div className="text-right font-medium text-[#1D1D1F] tabular-nums">
                ${Math.round(hoaMonthly).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Investor Specific Metrics */}
          {isInvestorMode ? (
            <div className="pt-4 border-t border-[#F2F2F7] space-y-3">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#0071E3]">
                Asset Yield & Returns
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-[#F8F9FA]">
                  <div className="text-[11px] text-[#86868B]">Cap Rate</div>
                  <div className="text-lg font-bold text-[#1D1D1F] tabular-nums mt-0.5">
                    {capRate.toFixed(2)}%
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-[#F8F9FA]">
                  <div className="text-[11px] text-[#86868B]">Cash-on-Cash ROI</div>
                  <div className="text-lg font-bold text-[#1D1D1F] tabular-nums mt-0.5">
                    {cashOnCashReturn.toFixed(2)}%
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-[#86868B] text-center">
                Annual Net Operating Income: ${Math.round(netOperatingIncome).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t border-[#F2F2F7] text-xs text-[#86868B] leading-relaxed">
              * Calculations are estimations based on prevailing jumbo mortgage standards and typical luxury condominium underwriting in major metropolitan jurisdictions.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
