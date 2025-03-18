import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductInterestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    callId?: string;
    callDuration?: number;
    callSummary?: string;
  };
  onSubmit: (data: any) => void;
}

export function ProductInterestDialog({ 
  open, 
  onOpenChange, 
  userData, 
  onSubmit 
}: ProductInterestDialogProps) {
  const [companySize, setCompanySize] = useState<string>("");
  const [leadVolume, setLeadVolume] = useState<string>("");
  const [currentCRM, setCurrentCRM] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showEarlyAccessDialog, setShowEarlyAccessDialog] = useState<boolean>(false);
  const [earlyAccessConsent, setEarlyAccessConsent] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!userData.email) {
      toast.error("Email is required to submit your interest");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        ...userData,
        marketingConsent,
        productInterest: true,
        interestDetails: {
          companySize,
          leadVolume,
          currentCRM,
          additionalInfo
        }
      });
      
      toast.success("Thank you for your interest! We'll be in touch soon.");
      onOpenChange(false);
      
      // Reset form state
      resetFormState();
    } catch (error) {
      console.error("Error submitting interest form:", error);
      toast.error("There was an error submitting your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setCompanySize("");
    setLeadVolume("");
    setCurrentCRM("");
    setAdditionalInfo("");
    setMarketingConsent(false);
    setEarlyAccessConsent(false);
  };

  const handleSkip = () => {
    // Only save basic info with marketing consent if given
    if (marketingConsent) {
      try {
        onSubmit({
          ...userData,
          marketingConsent,
          productInterest: false
        });
        
        if (marketingConsent) {
          toast.success("You've been added to our mailing list.");
        }
      } catch (error) {
        console.error("Error saving marketing consent:", error);
        toast.error("There was an error saving your preferences.");
      }
      
      onOpenChange(false);
      resetFormState();
    } else {
      // Show early access dialog if they didn't check marketing consent
      onOpenChange(false);
      setShowEarlyAccessDialog(true);
    }
  };

  const handleEarlyAccessSubmit = async () => {
    if (!userData.email) {
      toast.error("Email is required to receive updates");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        ...userData,
        marketingConsent: earlyAccessConsent,
        earlyAccessInterest: true,
        productInterest: false
      });
      
      toast.success("Thank you! You'll be among the first to know when we launch with special early pricing.");
      setShowEarlyAccessDialog(false);
      resetFormState();
    } catch (error) {
      console.error("Error submitting early access interest:", error);
      toast.error("There was an error saving your preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEarlyAccessSkip = () => {
    setShowEarlyAccessDialog(false);
    resetFormState();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Interested in QAULI?</DialogTitle>
            <DialogDescription>
              Thanks for trying our demo! Tell us a bit about your needs to see how QAULI can help your business.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">How many agents are in your company?</h4>
              <RadioGroup value={companySize} onValueChange={setCompanySize}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-5" id="size-1" />
                  <Label htmlFor="size-1">1-5 agents</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6-20" id="size-2" />
                  <Label htmlFor="size-2">6-20 agents</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="21-50" id="size-3" />
                  <Label htmlFor="size-3">21-50 agents</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="50+" id="size-4" />
                  <Label htmlFor="size-4">50+ agents</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">How many leads do you process monthly?</h4>
              <RadioGroup value={leadVolume} onValueChange={setLeadVolume}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-50" id="leads-1" />
                  <Label htmlFor="leads-1">1-50 leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="51-200" id="leads-2" />
                  <Label htmlFor="leads-2">51-200 leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="201-500" id="leads-3" />
                  <Label htmlFor="leads-3">201-500 leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="500+" id="leads-4" />
                  <Label htmlFor="leads-4">500+ leads</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">What CRM do you currently use?</h4>
              <RadioGroup value={currentCRM} onValueChange={setCurrentCRM}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Salesforce" id="crm-1" />
                  <Label htmlFor="crm-1">Salesforce</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="HubSpot" id="crm-2" />
                  <Label htmlFor="crm-2">HubSpot</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Zoho" id="crm-3" />
                  <Label htmlFor="crm-3">Zoho</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="crm-4" />
                  <Label htmlFor="crm-4">Other</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additional-info">Anything else you'd like to share?</Label>
              <Textarea 
                id="additional-info" 
                placeholder="Tell us about your specific needs or challenges..." 
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
              <Checkbox 
                id="marketing-consent" 
                checked={marketingConsent}
                onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
              />
              <Label htmlFor="marketing-consent" className="text-sm">
                I would like to know when QAULI is launched and get updates on the product
              </Label>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="sm:order-1"
              disabled={isSubmitting}
            >
              Skip for now
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="sm:order-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Early Access Dialog */}
      <Dialog open={showEarlyAccessDialog} onOpenChange={setShowEarlyAccessDialog}>
        <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Get Early Access to QAULI</DialogTitle>
            <DialogDescription>
              Would you like to be notified when QAULI launches? Early subscribers get exclusive access to discounted pricing.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="early-access-consent" 
                checked={earlyAccessConsent}
                onCheckedChange={(checked) => setEarlyAccessConsent(checked as boolean)}
              />
              <Label htmlFor="early-access-consent" className="text-sm">
                Yes, I'd like to be among the first to know when QAULI launches with special early pricing
              </Label>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={handleEarlyAccessSkip}
              className="sm:order-1"
              disabled={isSubmitting}
            >
              No thanks
            </Button>
            <Button 
              onClick={handleEarlyAccessSubmit} 
              disabled={isSubmitting || !earlyAccessConsent}
              className="sm:order-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : "Get Early Access"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 