import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const countries = [
  { name: "United States", currency: "USD" },
  { name: "United Kingdom", currency: "GBP" },
  { name: "European Union", currency: "EUR" },
  { name: "Canada", currency: "CAD" },
  { name: "Australia", currency: "AUD" },
  { name: "Japan", currency: "JPY" },
  { name: "Switzerland", currency: "CHF" },
  { name: "Singapore", currency: "SGD" },
];

const SignUp = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("");

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    const selected = countries.find((c) => c.name === country);
    if (selected) {
      setBaseCurrency(selected.currency);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <Link to="/" className="text-2xl font-bold text-primary inline-block mb-2">
            ApprovalFlow
          </Link>
          <CardTitle className="text-2xl">Company Sign Up</CardTitle>
          <CardDescription>Create your admin account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input id="name" placeholder="Acme Corporation" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@company.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={handleCountryChange}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {baseCurrency && (
              <div className="bg-secondary/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Base Currency: <span className="font-semibold text-foreground">{baseCurrency}</span>
                </p>
              </div>
            )}

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Sign Up
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
