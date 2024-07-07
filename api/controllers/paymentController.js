import stripePackage from 'stripe';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export const handlePayment = async (req, res) => {
  try {
    const { amount, paymentMethodId, deliveryInfo } = req.body;

    // Log incoming request data for debugging
    console.log('deliveryInfo  data:', deliveryInfo);

    // Create a PaymentIntent with proper configuration
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd', // Change to your currency
      payment_method: paymentMethodId,
      confirm: true, // Confirm the PaymentIntent immediately
      setup_future_usage: 'off_session', // If applicable
      confirmation_method: 'automatic',
      return_url: 'http://localhost:5173/', // Set your return URL
      metadata: {
        deliveryInfo: JSON.stringify(deliveryInfo), // Store deliveryInfo in metadata
      },
    });

    // Log the created PaymentIntent for debugging
    console.log('Created PaymentIntent:', paymentIntent);

    // Send client_secret back to the frontend
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).json({ error: error.message });
  }
};
