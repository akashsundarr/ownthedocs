import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface ClientFormProps {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  onBusinessNameChange: (value: string) => void;
  onBusinessEmailChange: (value: string) => void;
  onBusinessPhoneChange: (value: string) => void;
  onBusinessAddressChange: (value: string) => void;
  onClientNameChange: (value: string) => void;
  onClientEmailChange: (value: string) => void;
  onClientPhoneChange: (value: string) => void;
  onClientCompanyChange: (value: string) => void;
}

export function ClientForm({
  businessName,
  businessEmail,
  businessPhone,
  businessAddress,
  clientName,
  clientEmail,
  clientPhone,
  clientCompany,
  onBusinessNameChange,
  onBusinessEmailChange,
  onBusinessPhoneChange,
  onBusinessAddressChange,
  onClientNameChange,
  onClientEmailChange,
  onClientPhoneChange,
  onClientCompanyChange,
}: ClientFormProps) {
  return (
    <div className="space-y-8 border-b border-gray-200 py-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Your Business</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="business-name" className="text-xs text-gray-600 mb-2 block">
              Business Name
            </Label>
            <Input
              id="business-name"
              value={businessName}
              onChange={(e) => onBusinessNameChange(e.target.value)}
              placeholder="OwnTheSite"
              className="border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="business-email" className="text-xs text-gray-600 mb-2 block">
              Email
            </Label>
            <Input
              id="business-email"
              type="email"
              value={businessEmail}
              onChange={(e) => onBusinessEmailChange(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="business-phone" className="text-xs text-gray-600 mb-2 block">
              Phone
            </Label>
            <Input
              id="business-phone"
              value={businessPhone}
              onChange={(e) => onBusinessPhoneChange(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="business-address" className="text-xs text-gray-600 mb-2 block">
              Address (Optional)
            </Label>
            <Textarea
              id="business-address"
              value={businessAddress}
              onChange={(e) => onBusinessAddressChange(e.target.value)}
              rows={2}
              className="border-gray-300"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Client Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client-name" className="text-xs text-gray-600 mb-2 block">
              Client Name *
            </Label>
            <Input
              id="client-name"
              value={clientName}
              onChange={(e) => onClientNameChange(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="client-company" className="text-xs text-gray-600 mb-2 block">
              Company (Optional)
            </Label>
            <Input
              id="client-company"
              value={clientCompany}
              onChange={(e) => onClientCompanyChange(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="client-email" className="text-xs text-gray-600 mb-2 block">
              Email
            </Label>
            <Input
              id="client-email"
              type="email"
              value={clientEmail}
              onChange={(e) => onClientEmailChange(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="client-phone" className="text-xs text-gray-600 mb-2 block">
              Phone
            </Label>
            <Input
              id="client-phone"
              value={clientPhone}
              onChange={(e) => onClientPhoneChange(e.target.value)}
              className="border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
