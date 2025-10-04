import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Approver = {
  id: string;
  name: string;
  required: boolean;
};

const ApprovalRules = () => {
  const [ruleName, setRuleName] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [minApprovalPercentage, setMinApprovalPercentage] = useState("");
  const [sequenceEnabled, setSequenceEnabled] = useState(false);
  const [approvers, setApprovers] = useState<Approver[]>([
    { id: "1", name: "John", required: true },
    { id: "2", name: "Mitchell", required: false },
    { id: "3", name: "Andreas", required: false },
  ]);

  const handleRequiredChange = (id: string, checked: boolean) => {
    setApprovers(
      approvers.map((approver) =>
        approver.id === id ? { ...approver, required: checked } : approver
      )
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Approval Rules</h1>
          <p className="text-muted-foreground">
            Configure approval workflows and sequences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Rule Configuration */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Rule Configuration</CardTitle>
              <CardDescription>Define approval rule parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ruleName">Rule Name</Label>
                <Input
                  id="ruleName"
                  placeholder="e.g., Approval rule for miscellaneous expenses"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Provide a clear description of this rule
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager">Manager</Label>
                <Select value={selectedManager} onValueChange={setSelectedManager}>
                  <SelectTrigger id="manager">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah</SelectItem>
                    <SelectItem value="marc">Marc</SelectItem>
                    <SelectItem value="john">John</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Initially the manager is set, when an expense record is submitted, user can
                  choose manager for approval if required
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="percentage">Minimum Approval Percentage</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="percentage"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={minApprovalPercentage}
                    onChange={(e) => setMinApprovalPercentage(e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Specify the number or percentage of approvers required to approve the request
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sequence"
                  checked={sequenceEnabled}
                  onCheckedChange={(checked) => setSequenceEnabled(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="sequence"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Is manager an approver?
                  </label>
                  <p className="text-xs text-muted-foreground">
                    If this field is checked, then by default the approval request should go to
                    higher level, before going to other approvers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Approvers List */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Approvers</CardTitle>
              <CardDescription>Select required approvers for this rule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-border">
                  <div className="grid grid-cols-[1fr,auto,auto] gap-4 p-3 bg-muted/50 font-semibold text-sm">
                    <div>User</div>
                    <div>Required</div>
                    <div className="w-8"></div>
                  </div>
                  <Separator />
                  {approvers.map((approver, index) => (
                    <div key={approver.id}>
                      <div className="grid grid-cols-[1fr,auto,auto] gap-4 p-4 items-center hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                            {index + 1}
                          </span>
                          <span className="font-medium">{approver.name}</span>
                        </div>
                        <div className="flex justify-center">
                          <Checkbox
                            checked={approver.required}
                            onCheckedChange={(checked) =>
                              handleRequiredChange(approver.id, checked as boolean)
                            }
                          />
                        </div>
                        <div className="w-8"></div>
                      </div>
                      {index < approvers.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>

                {sequenceEnabled && (
                  <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                    <p className="text-sm font-medium">Approval Sequence:</p>
                    <p className="text-xs text-muted-foreground">
                      If this field is ticked, then the above mentioned sequence of approvers
                      matters. That is, first the request goes to {approvers[0]?.name || "the first approver"}, if they approve/reject, then only the request goes to{" "}
                      {approvers[1]?.name || "the next approver"} and so on.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      If the required approver rejects the request, then the expense request is
                      auto-rejected. If not ticked, then send the approval request to all
                      approvers at the same time.
                    </p>
                  </div>
                )}

                <Button className="w-full bg-accent hover:bg-accent/90">Save Rule</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ApprovalRules;
