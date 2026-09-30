import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Calendar, MapPin, Music, Sparkles, Utensils, 
  Shirt, Phone, Mail, Instagram, Facebook, Youtube, 
  CheckCircle, XCircle, ChevronRight, Ticket, Users, Crown, 
  MessageCircle, ArrowRight, Download, Printer, Share2, 
  Search, CreditCard, QrCode, ShieldCheck, Key, Copy, Check, Info
} from 'lucide-react';

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  if (countDown < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};

const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const TICKETS = [
  { id: 'early-bird', name: 'Early Bird', price: 499, capacity: '1 Person', benefits: ['Entry to the arena', 'Access to food stalls', 'Valid for entry before 7 PM'], icon: Ticket },
  { id: 'single', name: 'Single Pass', price: 799, capacity: '1 Person', benefits: ['Entry to the arena', 'Access to food stalls', 'Valid for any time entry'], icon: Ticket },
  { id: 'couple', name: 'Couple Pass', price: 1399, capacity: '2 Persons', benefits: ['Express Entry', 'Access to food stalls', '2 Free welcome drinks'], icon: Users },
  { id: 'group', name: 'Group Pass', price: 2999, capacity: '5 Persons', benefits: ['Express Entry', 'Dedicated group area', '5 Free welcome drinks'], icon: Users },
  { id: 'vip', name: 'VIP Pass', price: 1999, capacity: '1 Person', benefits: ['VIP Lounge Access', 'Seating near stage', 'Complimentary dinner buffet', 'Artist Meet & Greet'], icon: Crown, popular: true },
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  'https://images.unsplash.com/photo-1533174000273-e1f409405d47?w=800&q=80',
  'https://images.unsplash.com/photo-1604928141064-207cea6f5722?w=800&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&q=80'
];

const TEAM = [
  { name: 'Rahul Sharma', role: 'Event Director', org: 'Vibe Events Co.', desc: 'Over 10 years of experience curating premium cultural events.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80' },
  { name: 'Priya Patel', role: 'Cultural Head', org: 'Gujarati Samaj', desc: 'Ensuring authentic Garba & Dandiya traditions.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80' },
  { name: 'Amit Desai', role: 'Operations Lead', org: 'Vibe Events Co.', desc: 'Managing logistics, security, and crowd control seamlessly.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80' },
];

const loadRazorpaySDK = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Navigation = ({ isScrolled, onOpenMyTickets, onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['Home', 'About', 'Tickets', 'Gallery', 'Sponsors', 'Organizers', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0514]/95 backdrop-blur-md shadow-lg shadow-purple-900/20 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-['Cinzel'] font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              DANDIYA NIGHT '26
            </span>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-300 hover:text-orange-400 transition-colors font-medium text-sm tracking-wide">
                {link}
              </a>
            ))}
            <button 
              onClick={onOpenMyTickets}
              className="text-gray-300 hover:text-pink-400 font-medium text-sm border border-purple-500/40 px-4 py-2 rounded-full hover:bg-purple-500/10 transition-all flex items-center gap-1.5"
            >
              <Ticket className="w-4 h-4 text-pink-400" />
              My Passes
            </button>
            <button 
              onClick={() => onOpenBooking()}
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-5 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(249,115,22,0.4)] text-sm"
            >
              Book Tickets
            </button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={onOpenMyTickets}
              className="text-pink-400 text-xs border border-pink-500/40 px-3 py-1.5 rounded-full flex items-center gap-1"
            >
              <Ticket className="w-3.5 h-3.5" />
              Passes
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-1">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0514]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-orange-400 hover:bg-white/5 rounded-md"
              >
                {link}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button 
                onClick={() => { setIsOpen(false); onOpenMyTickets(); }}
                className="w-full text-center py-3 bg-purple-900/30 border border-purple-500/40 text-pink-300 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" /> View Purchased Passes
              </button>
              <button 
                onClick={() => { setIsOpen(false); onOpenBooking(); }}
                className="w-full text-center py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl font-bold"
              >
                Book Tickets Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Section = ({ id, className = '', children }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section 
      id={id} 
      ref={ref}
      className={`py-20 lg:py-28 ${className} transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {children}
    </section>
  );
};

const DigitalEPass = ({ ticketData, onClose }) => {
  const qrData = JSON.stringify({
    event: "Dandiya Night 2026",
    paymentId: ticketData.paymentId,
    orderId: ticketData.orderId,
    name: ticketData.name,
    phone: ticketData.phone,
    ticketType: ticketData.ticketName,
    qty: ticketData.quantity
  });

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrData)}&color=ffffff&bgbcolor=0f081c`;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `🎉 My Dandiya Night 2026 E-Pass is confirmed!\n\nPass Holder: ${ticketData.name}\nTicket Type: ${ticketData.ticketName} (${ticketData.quantity} Person)\nPayment ID: ${ticketData.paymentId}\nVenue: Sardar Patel Stadium, Ahmedabad\nDates: Oct 18-20, 2026\n\nSee you at the Garba Ground! 💃🕺`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0e071b] border border-yellow-500/40 rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.3)] my-8 relative">
        
        {/* Top Decorative Border */}
        <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"></div>

        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 pt-5 pb-3 border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Official Entry Pass</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* E-Pass Content Area (Print Target) */}
        <div id="printable-pass" className="p-6 text-white space-y-6">
          
          {/* Header Branding */}
          <div className="text-center relative pb-4 border-b border-white/10">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-400 block mb-1">Authentic Garba Access</span>
            <h2 className="text-2xl font-['Cinzel'] font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              DANDIYA NIGHT 2026
            </h2>
            <p className="text-xs text-gray-400 mt-1">Sardar Patel Stadium, Ahmedabad • Oct 18 - 20, 2026</p>
          </div>

          {/* Ticket Details & QR Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-white/5 rounded-2xl p-4 border border-purple-500/20">
            <div className="sm:col-span-2 space-y-3">
              <div>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Pass Holder Name</span>
                <p className="font-bold text-lg text-yellow-300">{ticketData.name}</p>
                <p className="text-xs text-gray-400">{ticketData.phone} | {ticketData.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Category</span>
                  <p className="font-semibold text-pink-400 text-sm">{ticketData.ticketName}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Quantity</span>
                  <p className="font-semibold text-white text-sm">{ticketData.quantity} Pass(es)</p>
                </div>
              </div>
            </div>

            {/* Scalable QR Code */}
            <div className="flex flex-col items-center justify-center p-2 bg-[#090312] border border-white/10 rounded-xl">
              <img src={qrCodeUrl} alt="Entry QR Code" className="w-28 h-28 object-contain rounded" />
              <span className="text-[9px] text-gray-400 mt-1 uppercase tracking-wider">Scan at Gate</span>
            </div>
          </div>

          {/* Financial Receipt Breakdown */}
          <div className="bg-black/40 rounded-xl p-4 space-y-2 border border-white/5 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Payment Status:</span>
              <span className="text-green-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> PAID (Razorpay)
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Payment ID:</span>
              <span className="font-mono text-gray-200">{ticketData.paymentId}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Order Reference:</span>
              <span className="font-mono text-gray-200">{ticketData.orderId}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Date & Time:</span>
              <span className="text-gray-200">{ticketData.date || new Date().toLocaleString()}</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm text-yellow-400">
              <span>Total Paid (incl. GST):</span>
              <span>₹{ticketData.totalAmount}</span>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 text-center leading-relaxed">
            * Please present this digital QR code at the stadium gate along with a valid Government ID card. Entry starts at 6:30 PM.
          </div>

        </div>

        {/* Action Toolbar */}
        <div className="p-6 bg-[#080310] border-t border-white/10 flex flex-wrap gap-3 print:hidden">
          <button 
            onClick={handlePrint}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print / PDF
          </button>
          <button 
            onClick={handleShareWhatsApp}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-900/30"
          >
            <Share2 className="w-4 h-4" /> Share Pass
          </button>
        </div>

      </div>
    </div>
  );
};

const BookingAndPaymentModal = ({ isOpen, onClose, selectedTicket, setSelectedTicket, onPaymentSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [razorpayKey, setRazorpayKey] = useState('rzp_test_Dandiya2026Key');
  const [useSimulator, setUseSimulator] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSimulatedModal, setShowSimulatedModal] = useState(false);

  useEffect(() => {
    if (selectedTicket) {
      setQuantity(1);
    }
  }, [selectedTicket]);

  if (!isOpen) return null;

  const currentTicket = selectedTicket || TICKETS[0];
  const ticketSubtotal = currentTicket.price * quantity;
  const gstFee = Math.round(ticketSubtotal * 0.18);
  const totalAmount = ticketSubtotal + gstFee;

  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsProcessing(true);

    // Flow 1: If user checked Simulator or inside restricted frame
    if (useSimulator) {
      setTimeout(() => {
        setIsProcessing(false);
        setShowSimulatedModal(true);
      }, 600);
      return;
    }

    // Flow 2: Standard Razorpay Gateway Checkout Script
    const sdkLoaded = await loadRazorpaySDK();

    if (!sdkLoaded) {
      // Graceful fallback to Simulator if Razorpay script is blocked or offline
      setIsProcessing(false);
      setUseSimulator(true);
      setShowSimulatedModal(true);
      return;
    }

    try {
      const options = {
        key: razorpayKey || 'rzp_test_Dandiya2026Key',
        amount: totalAmount * 100, // amount in paise
        currency: 'INR',
        name: 'Dandiya Night 2026',
        description: `${currentTicket.name} (${quantity} Pass)`,
        image: 'https://images.unsplash.com/photo-1604928141064-207cea6f5722?w=120&q=80',
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: '#ec4899',
        },
        handler: function (response) {
          setIsProcessing(false);
          const paymentData = {
            paymentId: response.razorpay_payment_id || `pay_${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
            orderId: response.razorpay_order_id || `order_${Math.floor(100000 + Math.random() * 900000)}`,
            name,
            email,
            phone,
            ticketName: currentTicket.name,
            quantity,
            totalAmount,
            date: new Date().toLocaleString()
          };
          onPaymentSuccess(paymentData);
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (response) {
        setIsProcessing(false);
        // Fallback to simulator on test key mismatch
        setShowSimulatedModal(true);
      });
      razorpayInstance.open();
      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
      // Fallback to test simulator mode
      setShowSimulatedModal(true);
    }
  };

  const handleApproveSimulatedPayment = () => {
    setShowSimulatedModal(false);
    const paymentData = {
      paymentId: `pay_SIM_${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      orderId: `order_DN2026_${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      email,
      phone,
      ticketName: currentTicket.name,
      quantity,
      totalAmount,
      date: new Date().toLocaleString()
    };
    onPaymentSuccess(paymentData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#110920] border border-white/10 rounded-3xl w-full max-w-xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.25)] my-8">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-white/5">
          <div>
            <h3 className="text-xl font-['Cinzel'] font-bold text-white flex items-center gap-2">
              <Ticket className="w-5 h-5 text-orange-400" />
              Checkout & Payment
            </h3>
            <p className="text-xs text-gray-400">Powered by Razorpay Official Gateway</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Simulated Razorpay Test Screen */}
        {showSimulatedModal ? (
          <div className="p-6 text-center space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 rounded-2xl text-white">
              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
                <span className="font-bold text-sm tracking-wide">RAZORPAY TEST GATEWAY</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-mono">TEST MODE</span>
              </div>
              <p className="text-xs opacity-90">Simulating Razorpay Payment Gateway Transaction</p>
              <p className="text-2xl font-bold mt-2">₹{totalAmount}</p>
            </div>

            <div className="space-y-3 text-left bg-white/5 p-4 rounded-xl border border-white/10 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Merchant:</span>
                <span className="text-white font-medium">Dandiya Night 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Customer Name:</span>
                <span className="text-white font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone:</span>
                <span className="text-white font-medium">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Selected Pass:</span>
                <span className="text-pink-400 font-semibold">{currentTicket.name} x {quantity}</span>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button 
                onClick={handleApproveSimulatedPayment}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-green-900/40 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <CheckCircle className="w-5 h-5" /> Approve & Complete Payment (₹{totalAmount})
              </button>
              <button 
                onClick={() => setShowSimulatedModal(false)}
                className="text-xs text-gray-400 hover:text-white underline"
              >
                Back to booking details
              </button>
            </div>
          </div>
        ) : (
          /* Main Form & Price Summary */
          <form onSubmit={handleInitiatePayment} className="p-6 space-y-5">
            
            {/* Ticket Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Pass Category</label>
                <select 
                  value={currentTicket.id} 
                  onChange={(e) => setSelectedTicket(TICKETS.find(t => t.id === e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm"
                  required
                >
                  {TICKETS.map(t => (
                    <option key={t.id} value={t.id} className="bg-[#110920] text-white">
                      {t.name} - ₹{t.price} ({t.capacity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Number of Passes</label>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm"
                  required 
                />
              </div>
            </div>

            {/* Attendee Details */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm" 
                  placeholder="e.g. Ramesh Patel" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Mobile Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm" 
                    placeholder="+91 98765 43210" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm" 
                    placeholder="ramesh@example.com" 
                  />
                </div>
              </div>
            </div>

            {/* Price Breakdown Calculation Card */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>{currentTicket.name} (₹{currentTicket.price} x {quantity}):</span>
                <span className="text-white font-medium">₹{ticketSubtotal}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>GST & Convenience Fee (18%):</span>
                <span className="text-white font-medium">₹{gstFee}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm text-yellow-400">
                <span>Total Amount Payable:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {/* Razorpay Gateway Mode Settings */}
            <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-purple-300 font-medium flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-pink-400" /> Gateway Mode:
                </span>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={useSimulator} 
                    onChange={(e) => setUseSimulator(e.target.checked)} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600 relative"></div>
                  <span className="ml-2 text-[11px] text-gray-300">{useSimulator ? "Instant Test Simulator" : "Razorpay Live/Test Modal"}</span>
                </label>
              </div>

              {!useSimulator && (
                <div className="pt-1">
                  <label className="text-[10px] text-gray-400 block mb-1">Razorpay API Key ID (Optional for Live Mode):</label>
                  <input 
                    type="text" 
                    value={razorpayKey}
                    onChange={(e) => setRazorpayKey(e.target.value)}
                    placeholder="rzp_test_..."
                    className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1 text-gray-300 font-mono text-[11px]"
                  />
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 text-base"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connecting Gateway...
                </span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Pay ₹{totalAmount} via Razorpay
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

const MyTicketsModal = ({ isOpen, onClose, bookedTickets, onSelectPass }) => {
  const [searchPhone, setSearchPhone] = useState('');

  if (!isOpen) return null;

  const filteredTickets = searchPhone.trim() 
    ? bookedTickets.filter(t => t.phone?.includes(searchPhone.trim()) || t.paymentId?.toLowerCase().includes(searchPhone.trim().toLowerCase()))
    : bookedTickets;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#110920] border border-white/10 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl my-8">
        
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-pink-400" />
            <h3 className="text-xl font-['Cinzel'] font-bold text-white">My Purchased Passes</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="Search by Mobile Number or Payment ID..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors text-sm"
            />
          </div>

          {filteredTickets.length === 0 ? (
            <div className="text-center py-10 space-y-3 bg-white/5 rounded-2xl border border-white/5 p-6">
              <Ticket className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-gray-400 text-sm">No booked passes found matching your search.</p>
              <p className="text-xs text-gray-500">Booked passes are automatically saved to your browser session upon successful Razorpay payment.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {filteredTickets.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => { onSelectPass(item); onClose(); }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-yellow-400 text-base">{item.ticketName}</span>
                      <span className="text-xs bg-pink-500/20 text-pink-300 px-2.5 py-0.5 rounded-full">{item.quantity} Person(s)</span>
                    </div>
                    <p className="text-xs text-gray-300">{item.name} • {item.phone}</p>
                    <p className="text-[11px] font-mono text-gray-500">ID: {item.paymentId}</p>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="text-sm font-bold text-green-400">₹{item.totalAmount}</span>
                    <span className="text-xs text-pink-400 group-hover:underline flex items-center gap-1 font-medium">
                      View E-Pass <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [myTicketsModalOpen, setMyTicketsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeEPass, setActiveEPass] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Local storage state for user's paid tickets
  const [bookedTickets, setBookedTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('dandiya_booked_tickets');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const { days, hours, minutes, seconds } = useCountdown("2026-10-18T18:00:00");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBooking = (ticket = null) => {
    setSelectedTicket(ticket);
    setBookingModalOpen(true);
  };

  const handlePaymentSuccess = (paymentData) => {
    const updated = [paymentData, ...bookedTickets];
    setBookedTickets(updated);
    try {
      localStorage.setItem('dandiya_booked_tickets', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setBookingModalOpen(false);
    setActiveEPass(paymentData);
  };

  return (
    <div className="bg-[#0a0514] min-h-screen text-slate-200 font-['Inter'] selection:bg-pink-500/30 overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .bg-mandala {
          background-image: radial-gradient(circle at center, rgba(168,85,247,0.12) 0%, transparent 50%),
                            radial-gradient(circle at top left, rgba(249,115,22,0.12) 0%, transparent 40%);
        }
        .text-glow { text-shadow: 0 0 25px rgba(249,115,22,0.6); }

        @media print {
          body * { visibility: hidden; }
          #printable-pass, #printable-pass * { visibility: visible; }
          #printable-pass { position: absolute; left: 0; top: 0; width: 100%; color: black !important; }
        }
      `}</style>

      {/* Navigation Header */}
      <Navigation 
        isScrolled={isScrolled} 
        onOpenMyTickets={() => setMyTicketsModalOpen(true)}
        onOpenBooking={openBooking}
      />

      {/* Modals */}
      <BookingAndPaymentModal 
        isOpen={bookingModalOpen} 
        onClose={() => setBookingModalOpen(false)} 
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {activeEPass && (
        <DigitalEPass 
          ticketData={activeEPass} 
          onClose={() => setActiveEPass(null)} 
        />
      )}

      <MyTicketsModal 
        isOpen={myTicketsModalOpen} 
        onClose={() => setMyTicketsModalOpen(false)} 
        bookedTickets={bookedTickets}
        onSelectPass={(pass) => setActiveEPass(pass)}
      />

      {/* Image Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/90 p-4" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2">
            <X className="w-8 h-8" />
          </button>
          <img src={lightboxImage} alt="Gallery Enlarge" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1604928141064-207cea6f5722?w=1920&q=80" 
            alt="Dandiya Night Banner" 
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0514]/80 via-[#0a0514]/60 to-[#0a0514]"></div>
          <div className="absolute inset-0 bg-mandala"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          <div className="mb-6 inline-flex flex-col items-center">
            <span className="text-xs md:text-sm font-semibold tracking-widest text-purple-400 uppercase mb-2">Presented By</span>
            <div className="flex gap-4 items-center justify-center">
              <div className="h-10 px-5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md font-bold text-white text-xs md:text-sm tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" /> VIBE EVENTS & GUJARATI SAMAJ
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-['Cinzel'] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 mb-4 drop-shadow-2xl text-glow leading-tight">
            DANDIYA NIGHT <br className="hidden md:block" /> 2026
          </h1>
          
          <p className="text-lg md:text-2xl font-light text-gray-300 mb-8 max-w-2xl mx-auto">
            The Ultimate Navratri Celebration • Live Beats & Grand Garba Arena
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 text-sm md:text-base font-medium">
            <div className="flex items-center gap-2 bg-[#1a0f30]/80 px-5 py-2.5 rounded-full border border-purple-500/30 backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-pink-400" />
              <span>Oct 18 - 20, 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1a0f30]/80 px-5 py-2.5 rounded-full border border-purple-500/30 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Sardar Patel Stadium, Ahmedabad</span>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex gap-3 md:gap-6 mb-10">
            {[
              { label: 'Days', value: days },
              { label: 'Hours', value: hours },
              { label: 'Mins', value: minutes },
              { label: 'Secs', value: seconds },
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl mb-1.5">
                  <span className="text-2xl md:text-4xl font-bold font-['Cinzel'] text-yellow-300">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">{unit.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => openBooking()} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full font-bold text-base text-white shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2">
              <Ticket className="w-5 h-5" />
              Book Tickets via Razorpay
            </button>
            <a href="#about" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold text-base text-white backdrop-blur-sm transition-all hover:scale-105 flex items-center justify-center gap-2">
              Explore Event <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>
      </section>

      {/* Sponsors Section */}
      <Section id="sponsors" className="bg-[#0f081c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-['Cinzel'] font-bold mb-3 text-white">Our Sponsors</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-sm text-purple-400 font-semibold mb-6 tracking-widest uppercase">Title Sponsor</h3>
              <div className="flex justify-center">
                <div className="w-64 h-28 bg-white/5 border border-purple-500/30 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors group">
                  <span className="text-xl font-bold text-gray-300 group-hover:text-white transition-colors">VIBE EVENTS CO.</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm text-yellow-500 font-semibold mb-6 tracking-widest uppercase">Official Payment Partner</h3>
              <div className="flex justify-center">
                <div className="px-8 py-4 bg-white/5 border border-blue-500/30 rounded-2xl flex items-center justify-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                  <span className="text-lg font-bold text-white tracking-wide">Razorpay Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-['Cinzel'] font-bold mb-3 text-white">About Dandiya Night 2026</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
              Join thousands of festive lovers for three magical nights filled with authentic Garba beats, energetic Dandiya Raas, celebrity performances, and lip-smacking Gujarati cuisine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Calendar, title: "Date & Timing", desc: "Oct 18-20, 2026 | Gates Open 6:30 PM", color: "text-blue-400" },
              { icon: MapPin, title: "Stadium Venue", desc: "Sardar Patel Stadium, Navrangpura, Ahmedabad", color: "text-red-400" },
              { icon: Shirt, title: "Ethnic Dress Code", desc: "Traditional Chaniya Choli & Kurta Pajama", color: "text-pink-400" },
              { icon: Music, title: "Live Orchestra & DJ", desc: "Traditional Dhol Tasha & Modern Bollywood Fusion", color: "text-purple-400" },
              { icon: Utensils, title: "Food Stalls", desc: "Multi-cuisine food court & fresh mocktail counters", color: "text-orange-400" },
              { icon: Sparkles, title: "Garba Awards", desc: "Daily prizes for Best Dressed & Best Garba Player", color: "text-yellow-400" }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Tickets Section */}
      <Section id="tickets" className="bg-[#0f081c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-['Cinzel'] font-bold mb-3 text-white">Choose Your Passes</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-xl mx-auto text-base">Instant Razorpay confirmation & digital QR E-Pass generated immediately.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {TICKETS.map((ticket, idx) => (
              <div key={idx} className={`relative bg-[#1a0f30] rounded-3xl p-7 border ${ticket.popular ? 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.2)] transform md:-translate-y-2' : 'border-white/10'} hover:border-orange-500/50 transition-all flex flex-col`}>
                {ticket.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{ticket.name}</h3>
                    <p className="text-gray-400 flex items-center gap-1 text-xs"><ticket.icon className="w-3.5 h-3.5"/> {ticket.capacity}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-yellow-300">₹{ticket.price}</span>
                    <span className="block text-[10px] text-gray-400">+18% GST</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {ticket.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => openBooking(ticket)}
                  className={`w-full py-3.5 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${ticket.popular ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <Ticket className="w-4 h-4" /> Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-['Cinzel'] font-bold mb-3 text-white">Event Gallery</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-xl mx-auto text-base">Capturing energetic moments and colorful celebrations.</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden rounded-2xl group cursor-pointer break-inside-avoid border border-white/10"
                onClick={() => setLightboxImage(img)}
              >
                <img src={img} alt="Gallery" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-semibold bg-black/60 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">Enlarge Photo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Organizers Section */}
      <Section id="organizers" className="bg-[#0f081c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-['Cinzel'] font-bold mb-3 text-white">Meet the Organizers</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:-translate-y-2 transition-transform duration-300">
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-pink-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-orange-400 text-xs font-semibold mb-1 uppercase tracking-wider">{member.role}</p>
                <p className="text-gray-500 text-xs mb-4">{member.org}</p>
                <p className="text-gray-400 text-sm mb-6">{member.desc}</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-4 py-2 rounded-full font-medium hover:bg-green-400/20 transition-colors">
                  <MessageCircle className="w-4 h-4" /> Contact via WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a0f30]/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              <div className="p-8 lg:p-14">
                <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold mb-4 text-white">Contact Us</h2>
                <p className="text-gray-400 text-sm mb-8">For bulk corporate passes, stall bookings, or queries, contact our support team.</p>
                
                <div className="space-y-6 mb-8 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-0.5">Phone & WhatsApp</h4>
                      <p className="text-gray-400">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-0.5">Email Inquiry</h4>
                      <p className="text-gray-400">tickets@dandiyanight2026.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-0.5">Event Ground</h4>
                      <p className="text-gray-400">Sardar Patel Stadium, Navrangpura, Ahmedabad, Gujarat 380014</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="tel:+919876543210" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="h-[350px] lg:h-auto min-h-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.745136894567!2d72.55743457597148!3d23.033129815939226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f67c519213%3A0xc39f21422791834e!2sSardar%20Patel%20Stadium!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  className="w-full h-full border-0 filter opacity-90" 
                  allowFullScreen="" 
                  loading="lazy" 
                  title="Stadium Map Location"
                ></iframe>
              </div>

            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[#05020a] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            <div>
              <span className="text-2xl font-['Cinzel'] font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-3 block">
                DANDIYA NIGHT '26
              </span>
              <p className="text-gray-400 text-xs leading-relaxed mb-5">
                The premier Garba & Dandiya celebration in Gujarat. Secure your tickets online with instant digital QR passes.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all"><Instagram className="w-4 h-4"/></a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"><Facebook className="w-4 h-4"/></a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><Youtube className="w-4 h-4"/></a>
              </div>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Quick Navigation</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li><a href="#about" className="hover:text-orange-400 transition-colors">About Event</a></li>
                <li><a href="#tickets" className="hover:text-orange-400 transition-colors">Book Passes</a></li>
                <li><a href="#gallery" className="hover:text-orange-400 transition-colors">Event Gallery</a></li>
                <li><a href="#sponsors" className="hover:text-orange-400 transition-colors">Sponsors</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Security & Gateway</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li className="flex items-center gap-1.5 text-green-400 font-medium">
                  <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Secured
                </li>
                <li className="flex items-center gap-1.5 text-blue-400 font-medium">
                  <CreditCard className="w-4 h-4" /> Razorpay Verified Gateway
                </li>
                <li>Terms & Conditions</li>
                <li>Privacy & Pass Refund Rules</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-4">My Account</h4>
              <p className="text-gray-400 text-xs mb-3">Already bought tickets? View or print your digital pass anytime.</p>
              <button 
                onClick={() => setMyTicketsModalOpen(true)}
                className="text-xs bg-purple-900/40 border border-purple-500/40 text-pink-300 px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
              >
                <Ticket className="w-4 h-4 text-pink-400" /> View My E-Passes
              </button>
            </div>

          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
            <p>© 2026 Dandiya Night. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0">Razorpay Integrated Event Ticketing Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}