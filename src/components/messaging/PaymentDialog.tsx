
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign, CheckCircle2, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  onPaymentComplete: () => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  isOpen,
  onClose,
  recipientName,
  onPaymentComplete,
}) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("100");
  const [projectName, setProjectName] = useState("Website Design");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const platformFee = Number(amount) * 0.05; // 5% platform fee
  const creatorAmount = Number(amount) - platformFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentComplete(true);

      // Show success message and close dialog after a delay
      setTimeout(() => {
        toast({
          title: "Payment Successful",
          description: `You have successfully paid ${recipientName} $${amount} for their services.`,
        });
        onPaymentComplete();
        onClose();
        setPaymentComplete(false);
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!paymentComplete ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </DialogTitle>
              <DialogDescription>
                Make a payment to {recipientName} for their services.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="account">Your Account</Label>
                <Input id="account" value="Current Account (****6789)" disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input id="recipient" value={recipientName} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Project Name</Label>
                <Input
                  id="project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>

              <div className="rounded-md bg-muted/50 p-3 text-sm">
                <div className="flex justify-between mb-1">
                  <span>Subtotal:</span>
                  <span>${amount}</span>
                </div>
                <div className="flex justify-between mb-1 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    Platform fee (5%)
                    <Info className="h-3 w-3" />
                  </span>
                  <span>-${platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Creator receives:</span>
                  <span>${creatorAmount.toFixed(2)}</span>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={paymentProcessing}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={paymentProcessing}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  {paymentProcessing ? "Processing..." : "Complete Payment"}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-4">
              Your payment of ${amount} to {recipientName} has been processed successfully.
            </p>
            <p className="text-sm text-muted-foreground">
              You'll be redirected back in a moment...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
