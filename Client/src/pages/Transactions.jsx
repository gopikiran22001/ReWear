import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/config/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Key, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Transactions() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otpInput, setOtpInput] = useState({});
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.TRANSACTION.BASE, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateOTP = async (transactionId) => {
    setActionLoading(transactionId);
    try {
      const response = await fetch(API_ENDPOINTS.TRANSACTION.BASE, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId }),
      });

      if (!response.ok) throw new Error("Failed to generate OTP");
      const data = await response.json();

      toast({
        title: "OTP Generated",
        description: "OTP has been generated. Share it with the owner.",
      });
      fetchTransactions();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const verifyOTP = async (transactionId) => {
    setActionLoading(transactionId);
    try {
      const otp = otpInput[transactionId];
      if (!otp) {
        toast({
          title: "Error",
          description: "Please enter OTP",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(API_ENDPOINTS.TRANSACTION.BASE, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, onetimePasscode: otp }),
      });

      if (!response.ok) throw new Error("Invalid OTP");

      toast({
        title: "Success",
        description: "Transaction completed successfully!",
      });
      fetchTransactions();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-eco-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 hover:text-eco-600"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Transactions
          </h2>

          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No transactions found
            </p>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <Card key={transaction._id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            Transaction #{transaction._id.slice(-6)}
                          </h3>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Product: {transaction.product}
                        </p>
                      </div>

                      {transaction.status === "pending" && (
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => generateOTP(transaction._id)}
                            disabled={actionLoading === transaction._id}
                            className="bg-eco-600 hover:bg-eco-700"
                          >
                            {actionLoading === transaction._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Key className="h-4 w-4 mr-1" />
                                Generate OTP
                              </>
                            )}
                          </Button>

                          <div className="flex gap-2">
                            <Input
                              type="text"
                              placeholder="Enter OTP"
                              maxLength={6}
                              value={otpInput[transaction._id] || ""}
                              onChange={(e) =>
                                setOtpInput({
                                  ...otpInput,
                                  [transaction._id]: e.target.value,
                                })
                              }
                              className="w-32"
                            />
                            <Button
                              size="sm"
                              onClick={() => verifyOTP(transaction._id)}
                              disabled={actionLoading === transaction._id}
                            >
                              Verify
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
