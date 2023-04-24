class Profile extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Perfil</title>
        <link rel="stylesheet" href="./css/style.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp"
          crossorigin="anonymous" />
        <script src="https://kit.fontawesome.com/533f790df8.js" crossorigin="anonymous"></script>
      </head>
      <body>
        <div class="text-center pt-5">
          <div class="d-flex justify-content-center">
            <img id="image" class="rounded-5 img-thumbnail" alt="Imagen no encontrada" />
            <h1 id="name"></h1>
            <a class="m-lg-3" onclick="logout()" style="cursor: pointer">Cerrar Sesión</a>
          </div>
          <button class="btn btn-outline-primary" id="videos">Obtener videos de Drive</button>
          <button class="btn btn-outline-success" id="video-db">Videos etiquetados</button>
          <div id="app" class="mx-auto w-75 p-3"></div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N"
          crossorigin="anonymous"></script>
      </body>
    `;
  }
}
window.customElements.define("profile-component", Profile);
