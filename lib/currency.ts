export type Currency = 'INR' | 'USD' | 'AED';

// Exchange rates relative to INR
const EXCHANGE_RATES: Record<Currency, number> = {
  INR: 1,
  USD: 83, // 1 USD = 83 INR
  AED: 22.5, // 1 AED = 22.5 INR
};

// Currency symbols
const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  AED: 'د.إ',
};

// Get the currency symbol
export function getSymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency];
}

// Convert amount from INR to target currency
export function convertFromINR(amount: number, targetCurrency: Currency): number {
  if (targetCurrency === 'INR') return amount;
  const rate = EXCHANGE_RATES[targetCurrency];
  return parseFloat((amount / rate).toFixed(2));
}

// Convert amount from source currency to INR
export function convertToINR(amount: number, sourceCurrency: Currency): number {
  if (sourceCurrency === 'INR') return amount;
  const rate = EXCHANGE_RATES[sourceCurrency];
  return parseFloat((amount * rate).toFixed(2));
}

// Format currency with proper formatting rules
export function formatCurrency(amount: number, currency: Currency): string {
  const symbol = getSymbol(currency);
  
  if (currency === 'INR') {
    // Indian number format: ₹1,00,000
    const integerPart = Math.floor(amount);
    const decimalPart = amount - integerPart;
    
    // Format integer part with Indian commas
    const integerStr = integerPart.toString();
    let formatted = '';
    
    if (integerStr.length <= 3) {
      formatted = integerStr;
    } else {
      const lastThree = integerStr.slice(-3);
      const remaining = integerStr.slice(0, -3);
      const withCommas = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      formatted = withCommas + ',' + lastThree;
    }
    
    if (decimalPart > 0) {
      formatted += decimalPart.toFixed(2).slice(1);
    }
    
    return `${symbol}${formatted}`;
  } else if (currency === 'USD') {
    // US format: $1,000.00
    return `${symbol}${amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  } else if (currency === 'AED') {
    // AED format: د.إ 1,000.00
    return `${symbol} ${amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  }
  
  return `${symbol}${amount.toFixed(2)}`;
}
