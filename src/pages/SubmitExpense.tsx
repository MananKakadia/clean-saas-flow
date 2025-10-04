import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["Food", "Transport", "Accommodation", "Equipment", "Other"];
const currencies = ["USD", "EUR", "GBP", "INR", "rs", "AED"];

interface ApprovalHistory {
  approver: string;
  status: "approved" | "pending" | "rejected";
  timestamp?: string;
}

const SubmitExpense = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    expenseDate: "",
    paidBy: "",
    remarks: "",
    amount: "",
    currency: "rs"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [approvalHistory] = useState<ApprovalHistory[]>([
    { approver: "Sarah", status: "approved", timestamp: "12:44 9th Oct, 2025" }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
      toast({
        title: "Receipt uploaded",
        description: "Your receipt has been attached successfully."
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Expense submitted",
      description: "Your expense has been submitted for approval."
    });
    setTimeout(() => navigate("/employee-expenses"), 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/employee-expenses")}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Expenses
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Submit New Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status Tracker */}
              <div className="flex items-center justify-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${!isSubmitted ? 'bg-primary' : 'bg-muted'}`} />
                  <span className={!isSubmitted ? 'font-medium text-foreground' : 'text-muted-foreground'}>Draft</span>
                </div>
                <div className="w-12 h-0.5 bg-border" />
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isSubmitted ? 'bg-amber-500' : 'bg-muted'}`} />
                  <span className={isSubmitted ? 'font-medium text-foreground' : 'text-muted-foreground'}>Waiting Approval</span>
                </div>
                <div className="w-12 h-0.5 bg-border" />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span className="text-muted-foreground">Approved</span>
                </div>
              </div>

              {/* Receipt Upload */}
              <div className="space-y-2">
                <Label htmlFor="receipt">Attach Receipt</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="receipt"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("receipt")?.click()}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {receiptFile ? receiptFile.name : "Upload Receipt"}
                  </Button>
                  {receiptFile && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload a photo of your receipt (OCR enabled)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="e.g., Restaurant bill"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(val) => handleChange("category", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Expense Date */}
                <div className="space-y-2">
                  <Label htmlFor="expenseDate">Expense Date</Label>
                  <Input
                    id="expenseDate"
                    type="date"
                    value={formData.expenseDate}
                    onChange={(e) => handleChange("expenseDate", e.target.value)}
                    required
                  />
                </div>

                {/* Paid By */}
                <div className="space-y-2">
                  <Label htmlFor="paidBy">Paid By</Label>
                  <Input
                    id="paidBy"
                    value={formData.paidBy}
                    onChange={(e) => handleChange("paidBy", e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Amount and Currency */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Total Amount</Label>
                  <div className="flex gap-2">
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => handleChange("amount", e.target.value)}
                      placeholder="0.00"
                      className="flex-1"
                      required
                    />
                    <Select value={formData.currency} onValueChange={(val) => handleChange("currency", val)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(curr => (
                          <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Amount will be auto-converted to base currency upon approval
                  </p>
                </div>

                {/* Remarks */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea
                    id="remarks"
                    value={formData.remarks}
                    onChange={(e) => handleChange("remarks", e.target.value)}
                    placeholder="Additional notes..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Approval History */}
              {isSubmitted && (
                <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold text-foreground">Approval History</h3>
                  <div className="space-y-2">
                    {approvalHistory.map((approval, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="font-medium">{approval.approver}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-emerald-600 dark:text-emerald-400 capitalize">{approval.status}</span>
                          <span className="text-muted-foreground">{approval.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => navigate("/employee-expenses")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitted}>
                  {isSubmitted ? "Submitted" : "Submit Expense"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SubmitExpense;
