import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

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

  const handleSubmit = async () => {
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
      
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting interest form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    // Only save basic info with marketing consent if given
    if (marketingConsent) {
      onSubmit({
        ...userData,
        marketingConsent,
        productInterest: false
      });
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Interested in RELQ.AI?</DialogTitle>
          <DialogDescription>
            Thanks for trying our demo! Tell us a bit about your needs to see how RELQ.AI can help your business.
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
              I agree to receive product updates and marketing communications from RELQ.AI
            </Label>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleSkip}
            className="sm:order-1"
          >
            Skip for now
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="sm:order-2"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 