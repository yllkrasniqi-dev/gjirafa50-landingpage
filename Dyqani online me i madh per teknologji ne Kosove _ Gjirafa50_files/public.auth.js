var Auth = {
  loadWaiting: false,
  usepopupnotifications: false,
  loginpopupselector: "#sso-login-form",
  localized_data: false,
  init: function (localized_data) {
    this.loadWaiting = false;
    this.usepopupnotifications = false;
    this.loginpopupselector = "#sso-login-form";
    this.localized_data = localized_data;
  },
  login: function (url, formselector) {
    if (this.loadWaiting !== false) {
      return;
    }
    this.setLoadWaiting(true);
    $.ajax({
      cache: false,
      url: url,
      data: $(formselector).serialize(),
      type: "POST",
      success: this.success_process,
      error: this.resetLoadWaiting,
      complete: this.resetLoadWaiting,
    });
  },
  setLoadWaiting: function (display) {
    displayAjaxLoading(display);
    this.loadWaiting = display;
  },
  success_process: function (response) {
    if (response.updateloginpopuphtml) {
      $(Auth.loginpopupselector).replaceWith(response.updateloginpopuphtml);
      Auth.setLoadWaiting(false);
    }
    if (response.redirect) {
      location.reload();
    }
    return false;
  },
  resetLoadWaiting: function () {
    Auth.setLoadWaiting(false);
  },
  ajaxFailure: function () {
    alert(this.localized_data.AjaxFailure);
  },
};
