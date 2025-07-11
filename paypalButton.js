const urlParams = new URLSearchParams(window.location.search);
const petId = urlParams.get("petId") || "Unknown";
const petName = urlParams.get("petName") || "Pet";

paypal.Buttons({
  createOrder: (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: { value: "1.00" },
        custom_id: petId,
        description: `Vote for ${petName}`
      }]
    });
  },
  onApprove: (data, actions) => {
    return actions.order.capture().then((details) => {
      window.parent.postMessage("vote-complete", "*");
    });
  }
}).render("#paypal-button-container");
