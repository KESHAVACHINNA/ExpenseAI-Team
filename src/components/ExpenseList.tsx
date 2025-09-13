import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Expense } from "./ExpenseTracker";

interface ExpenseListProps {
  expenses: Expense[];
}

const categoryColors = {
  Food: "bg-success/10 text-success border-success/20",
  Transportation: "bg-primary/10 text-primary border-primary/20",
  Entertainment: "bg-accent/10 text-accent-foreground border-accent/20",
  Utilities: "bg-warning/10 text-warning border-warning/20",
  Healthcare: "bg-danger/10 text-danger border-danger/20",
  Shopping: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  Travel: "bg-primary/10 text-primary border-primary/20",
  Other: "bg-muted/10 text-muted-foreground border-muted/20",
};

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  // Only define useState inside a component
  const [budget, setBudget] = useState(() => {
    return Number(localStorage.getItem("budget") || "0");
  });

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No expenses yet. Add your first expense to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <Card
          key={expense.id}
          className="p-4 shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-foreground">{expense.description}</h4>
                <Badge
                  variant="secondary"
                  className={
                    categoryColors[expense.category as keyof typeof categoryColors] ||
                    categoryColors.Other
                  }
                >
                  {expense.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(expense.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg text-foreground">
                ${expense.amount.toFixed(2)}
              </p>
              {/* Optional: show % of budget */}
              {budget > 0 && (
                <p className="text-xs text-muted-foreground">
                  {(expense.amount / budget * 100).toFixed(1)}% of budget
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ExpenseList;
