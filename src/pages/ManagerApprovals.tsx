import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExpenseApproval {
  id: string;
  subject: string;
  requestOwner: string;
  category: string;
  status: "Pending" | "Approved" | "Rejected";
  originalAmount: string;
  originalCurrency: string;
  convertedAmount: string;
  companyCurrency: string;
}

const ManagerApprovals = () => {
  const [expenses, setExpenses] = useState<ExpenseApproval[]>([
    {
      id: "1",
      subject: "Client Lunch Meeting",
      requestOwner: "Sarah Johnson",
      category: "Food",
      status: "Pending",
      originalAmount: "150.00",
      originalCurrency: "USD",
      convertedAmount: "49,946",
      companyCurrency: "KRW",
    },
    {
      id: "2",
      subject: "Travel Expense - Conference",
      requestOwner: "Mike Chen",
      category: "Travel",
      status: "Pending",
      originalAmount: "850.00",
      originalCurrency: "EUR",
      convertedAmount: "1,200,000",
      companyCurrency: "KRW",
    },
    {
      id: "3",
      subject: "Office Supplies",
      requestOwner: "Emma Wilson",
      category: "Office",
      status: "Pending",
      originalAmount: "75.50",
      originalCurrency: "GBP",
      convertedAmount: "125,000",
      companyCurrency: "KRW",
    },
  ]);

  const handleApprove = (id: string) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, status: "Approved" as const } : exp
    ));
    toast({
      title: "Expense Approved",
      description: "The expense has been approved successfully.",
    });
  };

  const handleReject = (id: string) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, status: "Rejected" as const } : exp
    ));
    toast({
      title: "Expense Rejected",
      description: "The expense has been rejected.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 hover:bg-green-500/20">Approved</Badge>;
      case "Rejected":
        return <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20 hover:bg-red-500/20">Rejected</Badge>;
      case "Pending":
        return <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/20">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Manager's View</h1>
            <p className="text-muted-foreground">Review and approve employee expense requests</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Approvals to Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Approval Subject</TableHead>
                      <TableHead>Request Owner</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Request Status</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow 
                        key={expense.id}
                        className={expense.status !== "Pending" ? "opacity-60" : ""}
                      >
                        <TableCell className="font-medium">{expense.subject}</TableCell>
                        <TableCell>{expense.requestOwner}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{getStatusBadge(expense.status)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {expense.originalCurrency} {expense.originalAmount}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ≈ {expense.companyCurrency} {expense.convertedAmount}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {expense.status === "Pending" ? (
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() => handleApprove(expense.id)}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(expense.id)}
                                className="border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">No actions available</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ManagerApprovals;
