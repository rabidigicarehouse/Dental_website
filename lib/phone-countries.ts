export type PhoneCountry = {
  code: string;
  dialCode: string;
  flagUrl: string;
  name: string;
  mask: string;
  regex: RegExp;
};

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: 'US', dialCode: '+1', flagUrl: 'https://flagcdn.com/w40/us.png', name: 'United States', mask: '(999) 999-9999', regex: /^\(\d{3}\)\s\d{3}-\d{4}$/ },
  { code: 'CA', dialCode: '+1', flagUrl: 'https://flagcdn.com/w40/ca.png', name: 'Canada', mask: '(999) 999-9999', regex: /^\(\d{3}\)\s\d{3}-\d{4}$/ },
  { code: 'GB', dialCode: '+44', flagUrl: 'https://flagcdn.com/w40/gb.png', name: 'United Kingdom', mask: '99999 999999', regex: /^\d{5}\s\d{6}$/ },
  { code: 'AU', dialCode: '+61', flagUrl: 'https://flagcdn.com/w40/au.png', name: 'Australia', mask: '9999 999 999', regex: /^\d{4}\s\d{3}\s\d{3}$/ },
  { code: 'IN', dialCode: '+91', flagUrl: 'https://flagcdn.com/w40/in.png', name: 'India', mask: '99999-99999', regex: /^\d{5}-\d{5}$/ },
  { code: 'DE', dialCode: '+49', flagUrl: 'https://flagcdn.com/w40/de.png', name: 'Germany', mask: '9999 9999999', regex: /^\d{4}\s\d{7,8}$/ },
  { code: 'FR', dialCode: '+33', flagUrl: 'https://flagcdn.com/w40/fr.png', name: 'France', mask: '99 99 99 99 99', regex: /^\d{2}\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/ },
  { code: 'MX', dialCode: '+52', flagUrl: 'https://flagcdn.com/w40/mx.png', name: 'Mexico', mask: '999 999 9999', regex: /^\d{3}\s\d{3}\s\d{4}$/ },
  { code: 'BR', dialCode: '+55', flagUrl: 'https://flagcdn.com/w40/br.png', name: 'Brazil', mask: '(99) 99999-9999', regex: /^\(\d{2}\)\s\d{5}-\d{4}$/ },
  { code: 'JP', dialCode: '+81', flagUrl: 'https://flagcdn.com/w40/jp.png', name: 'Japan', mask: '999-9999-9999', regex: /^\d{3}-\d{4}-\d{4}$/ },
  { code: 'KR', dialCode: '+82', flagUrl: 'https://flagcdn.com/w40/kr.png', name: 'South Korea', mask: '999-9999-9999', regex: /^\d{3}-\d{4}-\d{4}$/ },
  { code: 'CN', dialCode: '+86', flagUrl: 'https://flagcdn.com/w40/cn.png', name: 'China', mask: '999 9999 9999', regex: /^\d{3}\s\d{4}\s\d{4}$/ },
  { code: 'IT', dialCode: '+39', flagUrl: 'https://flagcdn.com/w40/it.png', name: 'Italy', mask: '999 999 9999', regex: /^\d{3}\s\d{3}\s\d{4}$/ },
  { code: 'ES', dialCode: '+34', flagUrl: 'https://flagcdn.com/w40/es.png', name: 'Spain', mask: '999 999 999', regex: /^\d{3}\s\d{3}\s\d{3}$/ },
  { code: 'AE', dialCode: '+971', flagUrl: 'https://flagcdn.com/w40/ae.png', name: 'UAE', mask: '99 999 9999', regex: /^\d{2}\s\d{3}\s\d{4}$/ },
  { code: 'SA', dialCode: '+966', flagUrl: 'https://flagcdn.com/w40/sa.png', name: 'Saudi Arabia', mask: '99 999 9999', regex: /^\d{2}\s\d{3}\s\d{4}$/ },
  { code: 'PK', dialCode: '+92', flagUrl: 'https://flagcdn.com/w40/pk.png', name: 'Pakistan', mask: '999 9999999', regex: /^\d{3}\s\d{7}$/ },
  { code: 'PH', dialCode: '+63', flagUrl: 'https://flagcdn.com/w40/ph.png', name: 'Philippines', mask: '999 999 9999', regex: /^\d{3}\s\d{3}\s\d{4}$/ },
  { code: 'NG', dialCode: '+234', flagUrl: 'https://flagcdn.com/w40/ng.png', name: 'Nigeria', mask: '999 999 9999', regex: /^\d{3}\s\d{3}\s\d{4}$/ },
  { code: 'IL', dialCode: '+972', flagUrl: 'https://flagcdn.com/w40/il.png', name: 'Israel', mask: '99-999-9999', regex: /^\d{2}-\d{3}-\d{4}$/ },
];

export function getPhoneCountry(code: string) {
  return PHONE_COUNTRIES.find((country) => country.code === code) || PHONE_COUNTRIES[0];
}

export function formatPhoneForMask(value: string, mask: string) {
  const digits = value.replace(/\D/g, '');
  const maxDigits = (mask.match(/9/g) || []).length;
  const limitedDigits = digits.slice(0, maxDigits);
  let formatted = '';
  let digitIndex = 0;

  for (let i = 0; i < mask.length && digitIndex < limitedDigits.length; i++) {
    if (mask[i] === '9') {
      formatted += limitedDigits[digitIndex++];
    } else {
      formatted += mask[i];
    }
  }

  return formatted;
}

export function getPhoneMaskPlaceholder(mask: string) {
  return mask.replace(/9/g, 'X');
}

export function isPhoneValidForCountry(countryCode: string, value: string) {
  return getPhoneCountry(countryCode).regex.test(value.trim());
}

export function toInternationalPhone(countryCode: string, value: string) {
  const country = getPhoneCountry(countryCode);
  return `${country.dialCode} ${value.trim()}`.trim();
}
