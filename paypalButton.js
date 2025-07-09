class PayPalVoteButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const petId = this.getAttribute('pet-id');
    const petName = this.getAttribute('pet-name');
    const businessEmail = "bigdogsdontcryrescue@gmail.com";

    const button = document.createElement("button");
    button.textContent = "Vote $1";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.backgroundColor = "#ffc439";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";

    button.addEventListener("click", () => {
      const url = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_cart&add=1&business=${encodeURIComponent(businessEmail)}&item_name=${encodeURIComponent("Vote for " + petName)}&amount=1.00&currency_code=USD&custom=${encodeURIComponent(petId)}`;
      window.open(url, "_blank");
    });

    this.shadowRoot.appendChild(button);
  }
}

customElements.define("paypal-vote-button", PayPalVoteButton);
