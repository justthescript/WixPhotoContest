class PayPalVoteButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const petId = this.getAttribute('pet-id');
    const petName = this.getAttribute('pet-name');
    const businessEmail = "bigdogsdontcryrescue@gmail.com";

    const voteUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_cart&add=1&business=${encodeURIComponent(businessEmail)}&item_name=${encodeURIComponent("Vote for " + petName)}&amount=1.00&currency_code=USD&custom=${encodeURIComponent(petId)}`;

    const button = document.createElement("a");
    button.textContent = "Vote $1";
    button.href = voteUrl;
    button.target = "_blank";
    button.style.display = "inline-block";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.backgroundColor = "#ffc439";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.textAlign = "center";
    button.style.textDecoration = "none";
    button.style.color = "#000";
    button.style.fontWeight = "bold";

    this.shadowRoot.appendChild(button);
  }
}

customElements.define("paypal-vote-button", PayPalVoteButton);
