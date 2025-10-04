import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export type LicenseType = 'basic' | 'premium' | 'exclusive';

export interface License {
  type: LicenseType;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

interface Beat {
  id: number;
  title: string;
  producer: string;
}

interface LicenseSelectorProps {
  beat: Beat;
  licenses: License[];
  onAddToCart: (license: License) => void;
}

const LicenseSelector = ({ beat, licenses, onAddToCart }: LicenseSelectorProps) => {
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);

  const getLicenseIcon = (type: LicenseType) => {
    switch (type) {
      case 'basic':
        return 'FileAudio';
      case 'premium':
        return 'Award';
      case 'exclusive':
        return 'Crown';
      default:
        return 'FileAudio';
    }
  };

  const getLicenseColor = (type: LicenseType) => {
    switch (type) {
      case 'basic':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'premium':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'exclusive':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Icon name="ShoppingCart" size={18} className="mr-2" />
          Выбрать лицензию
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Выберите лицензию для "{beat.title}"
          </DialogTitle>
          <p className="text-muted-foreground">by {beat.producer}</p>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {licenses.map((license) => (
            <Card
              key={license.type}
              className={`p-6 relative cursor-pointer transition-all border-2 ${
                selectedLicense?.type === license.type
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border hover:border-primary/50'
              } ${license.popular ? 'ring-2 ring-primary/20' : ''}`}
              onClick={() => setSelectedLicense(license)}
            >
              {license.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  Популярная
                </Badge>
              )}

              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 border ${getLicenseColor(
                  license.type
                )}`}
              >
                <Icon name={getLicenseIcon(license.type)} size={24} />
              </div>

              <h3 className="text-xl font-bold mb-2">{license.name}</h3>
              <div className="text-3xl font-bold text-primary mb-4">
                ${license.price}
              </div>

              <ul className="space-y-3 mb-6">
                {license.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Icon
                      name="Check"
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={selectedLicense?.type === license.type ? 'default' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(license);
                }}
              >
                {selectedLicense?.type === license.type ? 'Добавить в корзину' : 'Выбрать'}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">О лицензиях:</p>
              <ul className="space-y-1">
                <li>
                  • <strong>Basic</strong> - для некоммерческого использования и демо
                </li>
                <li>
                  • <strong>Premium</strong> - для коммерческого релиза с ограничениями
                </li>
                <li>
                  • <strong>Exclusive</strong> - полные права, бит снимается с продажи
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseSelector;
