class PayPalVoteButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const petId = this.getAttribute('pet-id') || "Unknown";
    const petName = this.getAttribute('pet-name') || "Pet";
    const businessEmail = "bigdogsdontcryrescue@gmail.com";

    const voteUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_cart&add=1&business=${encodeURIComponent(businessEmail)}&item_name=${encodeURIComponent("Vote for " + petName)}&amount=1.00&currency_code=USD&custom=${encodeURIComponent(petId)}`;

    // Create a container to center the button
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.height = "100%";

    // Create the button
    const button = document.createElement("a");
    button.textContent = "Vote $1";
    button.href = voteUrl;
    button.target = "_blank";
    button.setAttribute("aria-label", `Vote for ${petName}`);
    
    Object.assign(button.style, {
      display: "inline-block",
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#ffc439",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      textAlign: "center",
      textDecoration: "none",
      color: "#000",
      fontWeight: "bold"
    });

    container.appendChild(button);
    this.shadowRoot.appendChild(container);
  }
}

customElements.define("paypal-vote-button", PayPalVoteButton);
