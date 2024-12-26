function loadStripeScript(callback) {
  const script = document.createElement("script");
  script.src = "https://js.stripe.com/v3/";
  script.onload = () => callback();
  document.body.appendChild(script);
}

export default loadStripeScript;
