const urlParams = new URLSearchParams(window.location.search);
const petId = urlParams.get("petId") || "Unknown";
const petName = urlParams.get("petName") || "Pet";

paypal.Buttons({
  createOrder: (data, actions) => {
    const qtyInput = document.getElementById("voteQty");
    const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

    return actions.order.create({
      purchase_units: [{
        amount: {
          value: (quantity * 1.00).toFixed(2)
        },
        custom_id: petId,
        description: `Vote for ${petName}`,
        quantity: quantity
      }]
    });
  },
  onApprove: (data, actions) => {
    return actions.order.capture().then((details) => {
      window.parent.postMessage("vote-complete", "*");
    });
  }
}).render("#paypal-button-container");
