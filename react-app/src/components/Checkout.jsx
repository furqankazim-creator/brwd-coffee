import React, { useEffect, useMemo, useState } from 'react';
import { TAX_RATE, DELIVERY_FEE, FREE_DELIVERY_OVER, money } from './CartDrawer';

const STEPS = ['Details', 'Payment', 'Done'];

/* ---------- small helpers ---------- */
const onlyDigits = (s) => s.replace(/\D/g, '');
const formatCard = (s) => onlyDigits(s).slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
const formatExpiry = (s) => {
  const d = onlyDigits(s).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};
const luhn = (num) => {
  const d = onlyDigits(num);
  if (d.length < 13) return false;
  let sum = 0, dbl = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = +d[i];
    if (dbl) { n *= 2; if (n > 9) n -= 9; }
    sum += n; dbl = !dbl;
  }
  return sum % 10 === 0;
};
const cardBrand = (num) => {
  const d = onlyDigits(num);
  if (/^4/.test(d)) return 'Visa';
  if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return 'Mastercard';
  if (/^3[47]/.test(d)) return 'Amex';
  if (/^6(011|5)/.test(d)) return 'Discover';
  return '';
};
const expiryValid = (s) => {
  const m = s.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const mm = +m[1], yy = 2000 + +m[2];
  if (mm < 1 || mm > 12) return false;
  const now = new Date();
  return yy > now.getFullYear() || (yy === now.getFullYear() && mm >= now.getMonth() + 1);
};
const makeOrderId = () => 'BRWD-' + Math.random().toString(36).slice(2, 8).toUpperCase();

export default function Checkout({ cart, onClose, onComplete }) {
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState({
    method: 'pickup', name: '', email: '', phone: '', address: '', city: '', zip: '', note: '', tip: 15,
  });
  const [pay, setPay] = useState({ method: 'card', number: '', name: '', expiry: '', cvc: '' });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState(null);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * TAX_RATE;
  const delivery = details.method === 'delivery' && subtotal < FREE_DELIVERY_OVER ? DELIVERY_FEE : 0;
  const tip = subtotal * (details.tip / 100);
  const total = subtotal + tax + delivery + tip;
  const brand = useMemo(() => cardBrand(pay.number), [pay.number]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && !processing && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose, processing]);

  const setD = (k) => (e) => setDetails((d) => ({ ...d, [k]: e.target.value }));

  const validateDetails = () => {
    const er = {};
    if (details.name.trim().length < 2) er.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(details.email)) er.email = 'Enter a valid email';
    if (onlyDigits(details.phone).length < 7) er.phone = 'Enter a valid phone number';
    if (details.method === 'delivery') {
      if (details.address.trim().length < 5) er.address = 'Enter a street address';
      if (!details.city.trim()) er.city = 'Required';
      if (onlyDigits(details.zip).length < 4) er.zip = 'Invalid';
    }
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const validatePayment = () => {
    if (pay.method !== 'card') return true;
    const er = {};
    if (!luhn(pay.number)) er.number = 'Enter a valid card number';
    if (pay.name.trim().length < 2) er.cardName = 'Name on card';
    if (!expiryValid(pay.expiry)) er.expiry = 'Invalid';
    if (onlyDigits(pay.cvc).length < (brand === 'Amex' ? 4 : 3)) er.cvc = 'Invalid';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const placeOrder = async () => {
    if (!validatePayment()) return;
    setProcessing(true);
    // Simulated payment gateway round-trip. Swap this for a real
    // Stripe / Square / PayPal call when the backend is ready.
    await new Promise((r) => setTimeout(r, 1800));
    const o = {
      id: makeOrderId(),
      items: cart, subtotal, tax, delivery, tip, total,
      details, payMethod: pay.method,
      last4: pay.method === 'card' ? onlyDigits(pay.number).slice(-4) : null,
      placedAt: new Date(),
    };
    setOrder(o);
    setProcessing(false);
    setStep(2);
    onComplete(o);
  };

  const eta = details.method === 'pickup' ? '10–15 min' : '30–40 min';

  return (
    <div className="checkout" role="dialog" aria-modal="true" aria-labelledby="coTitle">
      <div className="checkout-panel">
        {/* ---------- left: form ---------- */}
        <div className="co-main">
          <div className="co-head">
            <img src="/assets/logo.png" alt="" className="co-logo" />
            <h2 className="display" id="coTitle">Checkout</h2>
            {!processing && step < 2 && <button className="modal-close" onClick={onClose} aria-label="Close checkout">×</button>}
          </div>

          <ol className="co-steps" aria-label="Progress">
            {STEPS.map((s, i) => (
              <li key={s} className={i === step ? 'current' : i < step ? 'done' : ''}>
                <span className="co-step-num">{i < step ? '✓' : i + 1}</span>{s}
              </li>
            ))}
          </ol>

          {/* ===== STEP 1: DETAILS ===== */}
          {step === 0 && (
            <form className="co-form" onSubmit={(e) => { e.preventDefault(); if (validateDetails()) { setErrors({}); setStep(1); } }} noValidate>
              <fieldset className="co-methods">
                <legend>How would you like it?</legend>
                <label className={details.method === 'pickup' ? 'on' : ''}>
                  <input type="radio" name="method" value="pickup" checked={details.method === 'pickup'} onChange={setD('method')} />
                  <span className="ico">🛍️</span>
                  <span><strong>Pickup</strong><small>Ready in 10–15 min · Free</small></span>
                </label>
                <label className={details.method === 'delivery' ? 'on' : ''}>
                  <input type="radio" name="method" value="delivery" checked={details.method === 'delivery'} onChange={setD('method')} />
                  <span className="ico">🚴</span>
                  <span><strong>Delivery</strong><small>30–40 min · {subtotal >= FREE_DELIVERY_OVER ? 'Free' : money(DELIVERY_FEE)}</small></span>
                </label>
              </fieldset>

              <div className="co-grid">
                <Field label="Full name" error={errors.name} span>
                  <input value={details.name} onChange={setD('name')} autoComplete="name" placeholder="Jordan Reyes" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" value={details.email} onChange={setD('email')} autoComplete="email" placeholder="you@email.com" />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input type="tel" value={details.phone} onChange={setD('phone')} autoComplete="tel" placeholder="+1 555 010 2030" />
                </Field>

                {details.method === 'delivery' && (
                  <>
                    <Field label="Street address" error={errors.address} span>
                      <input value={details.address} onChange={setD('address')} autoComplete="street-address" placeholder="12 Groove St, Apt 4" />
                    </Field>
                    <Field label="City" error={errors.city}>
                      <input value={details.city} onChange={setD('city')} autoComplete="address-level2" />
                    </Field>
                    <Field label="ZIP / Postal" error={errors.zip}>
                      <input value={details.zip} onChange={setD('zip')} autoComplete="postal-code" inputMode="numeric" />
                    </Field>
                  </>
                )}

                <Field label="Order note (optional)" span>
                  <textarea rows={2} value={details.note} onChange={setD('note')} placeholder="Oat milk, extra hot, no lid…" />
                </Field>
              </div>

              <div className="co-tip">
                <span className="co-label">Add a tip for the team</span>
                <div className="tip-opts">
                  {[0, 10, 15, 20].map((t) => (
                    <button type="button" key={t} className={details.tip === t ? 'on' : ''} onClick={() => setDetails((d) => ({ ...d, tip: t }))}>
                      {t === 0 ? 'None' : `${t}%`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="co-actions">
                <button type="button" className="link-btn" onClick={onClose}>← Back to cart</button>
                <button type="submit" className="btn btn-gold btn-lg">Continue to payment <span className="arrow">→</span></button>
              </div>
            </form>
          )}

          {/* ===== STEP 2: PAYMENT ===== */}
          {step === 1 && (
            <form className="co-form" onSubmit={(e) => { e.preventDefault(); placeOrder(); }} noValidate>
              <fieldset className="co-methods co-methods-3">
                <legend>Payment method</legend>
                {[
                  { v: 'card', ico: '💳', t: 'Card', s: 'Visa · MC · Amex' },
                  { v: 'wallet', ico: '📱', t: 'Apple / Google Pay', s: 'Pay with your device' },
                  { v: 'cash', ico: '💵', t: details.method === 'pickup' ? 'Pay at counter' : 'Cash on delivery', s: 'Pay when you get it' },
                ].map((m) => (
                  <label key={m.v} className={pay.method === m.v ? 'on' : ''}>
                    <input type="radio" name="pay" value={m.v} checked={pay.method === m.v} onChange={() => { setPay((p) => ({ ...p, method: m.v })); setErrors({}); }} />
                    <span className="ico">{m.ico}</span>
                    <span><strong>{m.t}</strong><small>{m.s}</small></span>
                  </label>
                ))}
              </fieldset>

              {pay.method === 'card' && (
                <div className="co-card">
                  <div className="card-preview" data-brand={brand.toLowerCase()}>
                    <div className="card-preview-top">
                      <span className="card-chip" />
                      <span className="card-brand">{brand || 'Card'}</span>
                    </div>
                    <div className="card-num">{pay.number || '•••• •••• •••• ••••'}</div>
                    <div className="card-preview-bot">
                      <span>{pay.name || 'NAME ON CARD'}</span>
                      <span>{pay.expiry || 'MM/YY'}</span>
                    </div>
                  </div>
                  <div className="co-grid">
                    <Field label="Card number" error={errors.number} span>
                      <input inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" value={pay.number}
                        onChange={(e) => setPay((p) => ({ ...p, number: formatCard(e.target.value) }))} />
                    </Field>
                    <Field label="Name on card" error={errors.cardName} span>
                      <input autoComplete="cc-name" value={pay.name} onChange={(e) => setPay((p) => ({ ...p, name: e.target.value.toUpperCase() }))} />
                    </Field>
                    <Field label="Expiry" error={errors.expiry}>
                      <input inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" value={pay.expiry}
                        onChange={(e) => setPay((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))} />
                    </Field>
                    <Field label="CVC" error={errors.cvc}>
                      <input inputMode="numeric" autoComplete="cc-csc" placeholder={brand === 'Amex' ? '1234' : '123'} maxLength={4} value={pay.cvc}
                        onChange={(e) => setPay((p) => ({ ...p, cvc: onlyDigits(e.target.value) }))} />
                    </Field>
                  </div>
                  <p className="co-fine">🔒 Encrypted &amp; secure. Test with 4242 4242 4242 4242 · any future date · any CVC.</p>
                </div>
              )}
              {pay.method === 'wallet' && (
                <div className="co-wallet">
                  <p>You'll confirm the payment on your device after placing the order.</p>
                </div>
              )}
              {pay.method === 'cash' && (
                <div className="co-wallet">
                  <p>No payment now — pay <strong>{money(total)}</strong> {details.method === 'pickup' ? 'at the counter when you collect' : 'to the rider on delivery'}.</p>
                </div>
              )}

              <div className="co-actions">
                <button type="button" className="link-btn" onClick={() => { setErrors({}); setStep(0); }} disabled={processing}>← Back</button>
                <button type="submit" className={`btn btn-gold btn-lg ${processing ? 'is-loading' : ''}`} disabled={processing}>
                  {processing ? <><span className="spinner" /> Processing…</> : <>Pay {money(total)} <span className="arrow">→</span></>}
                </button>
              </div>
            </form>
          )}

          {/* ===== STEP 3: CONFIRMATION ===== */}
          {step === 2 && order && (
            <div className="co-done">
              <div className="co-done-badge">✓</div>
              <h3 className="display">Order placed!</h3>
              <p className="co-done-sub">Thanks, {order.details.name.split(' ')[0]}. We're on it.</p>
              <div className="co-done-card">
                <div><span>Order number</span><strong>{order.id}</strong></div>
                <div><span>{order.details.method === 'pickup' ? 'Ready for pickup in' : 'Arriving in'}</span><strong>{eta}</strong></div>
                <div><span>Paid</span><strong>{order.payMethod === 'card' ? `Card •••• ${order.last4}` : order.payMethod === 'wallet' ? 'Wallet' : 'Pay on arrival'}</strong></div>
                <div><span>Total</span><strong>{money(order.total)}</strong></div>
              </div>
              <p className="co-fine">A receipt has been sent to <strong>{order.details.email}</strong>.{order.details.method === 'pickup' && ' Show your order number at the counter.'}</p>
              <button className="btn btn-navy btn-lg" onClick={onClose}>Back to BRWD</button>
            </div>
          )}
        </div>

        {/* ---------- right: order summary ---------- */}
        {step < 2 && (
          <aside className="co-summary">
            <h4>Order summary</h4>
            <ul className="co-items">
              {cart.map((i) => (
                <li key={i.name}>
                  <div className="co-item-img">{i.img ? <img src={i.img} alt="" /> : '☕'}<span>{i.qty}</span></div>
                  <div className="co-item-info"><strong>{i.name}</strong><span>{money(i.price)} × {i.qty}</span></div>
                  <span className="co-item-line">{money(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="co-lines">
              <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
              <div><span>Tax (8%)</span><span>{money(tax)}</span></div>
              <div><span>{details.method === 'pickup' ? 'Pickup' : 'Delivery'}</span><span>{delivery === 0 ? 'Free' : money(delivery)}</span></div>
              {tip > 0 && <div><span>Tip ({details.tip}%)</span><span>{money(tip)}</span></div>}
            </div>
            <div className="co-total"><span>Total</span><strong>{money(total)}</strong></div>
            <p className="co-fine">{details.method === 'pickup' ? '📍 Flagship · 12 Groove St, Downtown' : '🚴 Delivered to your door'}</p>
          </aside>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, span, children }) {
  return (
    <label className={`co-field ${span ? 'span' : ''} ${error ? 'has-error' : ''}`}>
      <span className="co-label">{label}</span>
      {children}
      {error && <span className="co-error">{error}</span>}
    </label>
  );
}
