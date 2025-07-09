// PayPal Button inside Wix Custom Element

class PayPalVoteButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const petId = this.getAttribute('pet-id');
    const petName = this.getAttribute('pet-name');

    const businessEmail = "bigdogsdontcryrescue@gmail.com";

    const paypalScript = document.createElement("script");
    paypalScript.src = "https://www.paypal.com/sdk/js?client-id=AWpv7_8RZvClbiJ7TAdo_TVWCal_j0Nd7Fx4LIH90zAEPjvyD-Wrm4cw11TPjYAPomdeGCsRQt-fTVAU&currency=USD"; // Replace `sb client ID` with live client ID when ready
    paypalScript.addEventListener("load", () => this.renderPayPalButton(petId, petName, businessEmail));
    this.shadowRoot.appendChild(paypalScript);
  }

  renderPayPalButton(petId, petName, businessEmail) {
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "paypal-button-container";
    this.shadowRoot.appendChild(buttonContainer);

    if (typeof paypal === 'undefined') {
      console.error("PayPal SDK failed to load.");
      return;
    }

    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: { value: '1.00' },
            custom_id: petId,
            description: `Vote for ${petName}`,
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          console.log("Payment completed by", details.payer.name.given_name);
        });
      }
    }).render("#paypal-button-container");
  }
}

customElements.define("paypal-vote-button", PayPalVoteButton);
