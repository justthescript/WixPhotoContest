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

    // Add a style block
    const style = document.createElement("style");
    style.textContent = `
      .button-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
      }
      a {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #ffc439;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        color: #000;
        font-weight: bold;
      }
    `;

    const container = document.createElement("div");
    container.className = "button-container";

    const button = document.createElement("a");
    button.textContent = "Vote $1";
    button.href = voteUrl;
    button.target = "_blank";

    container.appendChild(button);

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
  }
}

customElements.define("paypal-vote-button", PayPalVoteButton);
