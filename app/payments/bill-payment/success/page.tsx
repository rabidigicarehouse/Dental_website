import { redirect } from 'next/navigation';

export default function BillPaymentSuccessPage() {
  redirect('/payments');
}
