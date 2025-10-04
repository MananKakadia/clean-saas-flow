import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Upload } from "lucide-react";

type ExpenseStatus = "draft" | "submitted" | "waiting_approval" | "approved";

interface Expense {
  id: string;
  employee: string;
  description: string;
  date: string;
  category: string;
  paidBy: string;
  remarks: string;
  amount: number;
  currency: string;
  status: ExpenseStatus;
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    employee: "Sarah",
    description: "Restaurant bill",
    date: "Oct 9th, 2025",
    category: "Food",
    paidBy: "Sarah",
    remarks: "Wine",
    amount: 5000,
    currency: "rs",
    status: "draft"
  },
  {
    id: "2",
    employee: "Sarah",
    description: "Client dinner",
    date: "Oct 5th, 2025",
    category: "Food",
    paidBy: "Sarah",
    remarks: "Team meeting",
    amount: 3567,
    currency: "rs",
    status: "waiting_approval"
  },
  {
    id: "3",
    employee: "Sarah",
    description: "Taxi fare",
    date: "Oct 1st, 2025",
    category: "Transport",
    paidBy: "Sarah",
    remarks: "Airport",
    amount: 500,
    currency: "rs",
    status: "approved"
  }
];

const statusConfig = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground" },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  waiting_approval: { label: "Waiting Approval", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" }
};

const EmployeeExpenses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upload" | "new">("upload");

  const calculateTotalByStatus = (status: ExpenseStatus) => {
    return mockExpenses
      .filter(exp => exp.status === status)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  const toSubmitTotal = calculateTotalByStatus("draft");
  const waitingApprovalTotal = calculateTotalByStatus("waiting_approval");
  const approvedTotal = calculateTotalByStatus("approved");

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Expenses</h1>
          <Button onClick={() => navigate("/submit-expense")} className="gap-2">
            <Plus className="w-4 h-4" />
            Submit New Expense
          </Button>
        </div>

        {/* Summary Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-1">To Submit</div>
              <div className="text-2xl font-bold text-foreground">{toSubmitTotal} rs</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-1">Waiting Approval</div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{waitingApprovalTotal} rs</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-1">Approved</div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{approvedTotal} rs</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "upload"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "new"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            New
          </button>
        </div>

        {/* Expenses Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Paid By</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockExpenses.map((expense) => (
                    <TableRow 
                      key={expense.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/expense/${expense.id}`)}
                    >
                      <TableCell className="font-medium">{expense.employee}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.paidBy}</TableCell>
                      <TableCell className="text-muted-foreground">{expense.remarks}</TableCell>
                      <TableCell className="text-right font-medium">
                        {expense.amount} {expense.currency}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusConfig[expense.status].color}>
                          {statusConfig[expense.status].label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployeeExpenses;
