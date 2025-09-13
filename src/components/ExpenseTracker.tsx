import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, DollarSign, Calendar } from "lucide-react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";
import StatsCard from "./StatsCard";

// Mock data for demonstration
const mockExpenses = [
  { id: 1, description: "Groceries", amount: 85.50, category: "Food", date: "2024-01-10" },
  { id: 2, description: "Gas Station", amount: 45.00, category: "Transportation", date: "2024-01-09" },
  { id: 3, description: "Netflix Subscription", amount: 15.99, category: "Entertainment", date: "2024-01-08" },
  { id: 4, description: "Coffee Shop", amount: 12.50, category: "Food", date: "2024-01-08" },
  { id: 5, description: "Electric Bill", amount: 120.75, category: "Utilities", date: "2024-01-07" },
];

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}
<div className="mb-6 flex items-center gap-4 max-w-md">
  <input
    type="number"
    placeholder="Set your budget"
    value={budget}
    onChange={(e) => setBudget(Number(e.target.value))}
    className="p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary flex-1"
  />
  <button
    onClick={() => localStorage.setItem("budget", JSON.stringify(budget))}
    className="px-4 py-2 rounded-md text-white font-semibold shadow-button gradient-success"
  >
    Set Budget
  </button>
</div>

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [showForm, setShowForm] = useState(false);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyBudget = 2000;
  const remainingBudget = monthlyBudget - totalExpenses;

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: Math.max(...expenses.map(e => e.id)) + 1
    };
    setExpenses([newExpense, ...expenses]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Expense Tracker</h1>
          <p className="text-muted-foreground">AI-powered personal finance management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Spent"
            value={`$${totalExpenses.toFixed(2)}`}
            icon={DollarSign}
            color="primary"
          />
          <StatsCard
            title="Remaining Budget"
            value={`$${remainingBudget.toFixed(2)}`}
            icon={TrendingUp}
            color={remainingBudget > 0 ? "success" : "danger"}
          />
          <StatsCard
            title="This Month"
            value={`${expenses.length} transactions`}
            icon={Calendar}
            color="accent"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expenses List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Recent Expenses</h2>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="gradient-primary shadow-button"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </div>
              <ExpenseList expenses={expenses} />
            </Card>
          </div>

          {/* Charts & Analytics */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Spending by Category</h3>
              <ExpenseChart expenses={expenses} />
            </Card>
          </div>
        </div>

        {/* Expense Form Modal */}
        {showForm && (
          <ExpenseForm
            onSubmit={addExpense}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
