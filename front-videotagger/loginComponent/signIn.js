function signIn() {
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  const form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", oauth2Endpoint);

  const url = window.location.href;
  const urlWithoutHtml = url.substring(0, url.lastIndexOf("/"));

  const params = {
    client_id:
      "601367704101-0h4nc876bgfve25ar3khur78e5ggespp.apps.googleusercontent.com",
    redirect_uri: `${urlWithoutHtml}/profile.html`,
    response_type: "token",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.email",
    include_granted_scopes: "true",
    state: "pass-through value",
  };

  for (let p in params) {
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}
