import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Send } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  manager: string;
};

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Marc", email: "marc@gmail.com", role: "Manager", manager: "-" },
    { id: "2", name: "Sarah", email: "sarah@company.com", role: "Employee", manager: "Marc" },
  ]);

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
  };

  const handleManagerChange = (userId: string, newManager: string) => {
    setUsers(users.map(user => user.id === userId ? { ...user, manager: newManager } : user));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage your team members and their roles</p>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>View and manage user roles and assignments</CardDescription>
              </div>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="mr-2 h-4 w-4" />
                New User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Manager</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(value) => handleRoleChange(user.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Employee">Employee</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={user.manager}
                          onValueChange={(value) => handleManagerChange(user.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="-">-</SelectItem>
                            {users
                              .filter((u) => u.id !== user.id && u.role === "Manager")
                              .map((manager) => (
                                <SelectItem key={manager.id} value={manager.name}>
                                  {manager.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Send className="h-3 w-3" />
                          Send Password
                        </Button>
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

export default Dashboard;
