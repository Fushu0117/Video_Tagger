class Login extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body text-center">
            <h3>Inicio de sesión</h3>
            <hr />
            <button class="btn btn-primary" onclick="signIn()">
              Iniciar sesión con <b>GOOGLE</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}
window.customElements.define("login-component", Login);
