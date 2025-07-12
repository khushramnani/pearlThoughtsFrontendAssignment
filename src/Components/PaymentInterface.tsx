'use client'
import React, { useState, useEffect } from 'react';
import { 
  CreditCardIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  XMarkIcon,
  LockClosedIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { gsap } from 'gsap';

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  email: string;
  amount: string;
  paymentMethod: 'credit' | 'debit' | 'paypal';
}

interface ValidationErrors {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
  email?: string;
  amount?: string;
}

export const PaymentInterface = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    amount: '99.99',
    paymentMethod: 'credit'
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      gsap.fromTo('.payment-card', 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'cardNumber':
        const cleanCard = value.replace(/\s/g, '');
        if (!cleanCard) return 'Card number is required';
        if (cleanCard.length < 13 || cleanCard.length > 19) return 'Invalid card number length';
        if (!/^\d+$/.test(cleanCard)) return 'Card number must contain only digits';
        break;
        
      case 'expiryDate':
        if (!value) return 'Expiry date is required';
        if (!/^\d{2}\/\d{2}$/.test(value)) return 'Format: MM/YY';
        const [month, year] = value.split('/').map(Number);
        if (month < 1 || month > 12) return 'Invalid month';
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          return 'Card has expired';
        }
        break;
        
      case 'cvv':
        if (!value) return 'CVV is required';
        if (!/^\d{3,4}$/.test(value)) return 'CVV must be 3-4 digits';
        break;
        
      case 'cardholderName':
        if (!value.trim()) return 'Cardholder name is required';
        if (value.trim().length < 2) return 'Name too short';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name contains invalid characters';
        break;
        
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        break;
        
      case 'amount':
        if (!value) return 'Amount is required';
        const amount = parseFloat(value);
        if (isNaN(amount) || amount <= 0) return 'Amount must be greater than 0';
        if (amount > 10000) return 'Amount too large';
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    }

    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    }

    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    const error = validateField(name, formattedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'paymentMethod') {
        const error = validateField(key, formData[key as keyof PaymentFormData]);
        if (error) newErrors[key as keyof ValidationErrors] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      gsap.to('.payment-form', { x: -10, duration: 0.1, yoyo: true, repeat: 5 });
      return;
    }

    setIsLoading(true);
    setPaymentStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (Math.random() > 0.1) {
        setPaymentStatus('success');
        gsap.fromTo('.success-animation', 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      } else {
        setPaymentStatus('error');
        gsap.fromTo('.error-animation', 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      }
    } catch (error) {
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      email: '',
      amount: '99.99',
      paymentMethod: 'credit'
    });
    setErrors({});
    setPaymentStatus('idle');
  };

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'generic';
  };

  const cardType = getCardType(formData.cardNumber);

  if (paymentStatus === 'success') {
    return (
      <div className="payment-card bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8 shadow-xl max-w-md mx-auto">
        <div className="success-animation text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircleIcon className="w-20 h-20 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h3>
            <p className="text-green-700">Your payment of ${formData.amount} has been processed successfully.</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-green-600">Transaction ID: TXN{Date.now()}</p>
            <p className="text-sm text-green-600">Method: {cardType.toUpperCase()} ending in {formData.cardNumber.slice(-4)}</p>
          </div>
          <button
            onClick={resetForm}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Make Another Payment
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="payment-card bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border-2 border-red-200 p-8 shadow-xl max-w-md mx-auto">
        <div className="error-animation text-center space-y-6">
          <div className="flex justify-center">
            <ExclamationTriangleIcon className="w-20 h-20 text-red-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-800 mb-2">Payment Failed</h3>
            <p className="text-red-700">We couldn't process your payment. Please try again or use a different payment method.</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-red-600">Error Code: ERR{Date.now()}</p>
            <p className="text-sm text-red-600">Please contact support if the problem persists.</p>
          </div>
          <button
            onClick={() => setPaymentStatus('idle')}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-card bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CreditCardIcon className="w-8 h-8" />
            <div>
              <h2 className="text-xl font-bold">Secure Payment</h2>
              <p className="text-blue-100 text-sm">SSL Encrypted</p>
            </div>
          </div>
          <ShieldCheckIcon className="w-8 h-8 text-green-300" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="payment-form p-6 space-y-6">
        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            {(['credit', 'debit', 'paypal'] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  formData.paymentMethod === method
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xs font-medium capitalize">{method}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg font-semibold text-lg transition-all duration-200 ${
                errors.amount ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="0.00"
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
              {errors.amount}
            </p>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 ${
                errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="1234 5678 9012 3456"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {cardType === 'visa' && <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>}
              {cardType === 'mastercard' && <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>}
              {cardType === 'amex' && <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>}
            </div>
          </div>
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 ${
                errors.expiryDate ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="MM/YY"
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {errors.expiryDate}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
            <div className="relative">
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 ${
                  errors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                }`}
                placeholder="123"
              />
              <LockClosedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
          <input
            type="text"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 ${
              errors.cardholderName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="John Doe"
          />
          {errors.cardholderName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
              {errors.cardholderName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 transform ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-95 shadow-lg hover:shadow-xl'
          } text-white`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <LockClosedIcon className="w-5 h-5" />
              <span>Pay ${formData.amount}</span>
            </div>
          )}
        </button>

        {/* Security Notice */}
        <div className="text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
            <ShieldCheckIcon className="w-4 h-4" />
            <span>Your payment information is encrypted and secure</span>
          </p>
        </div>
      </form>
    </div>
  );
};
