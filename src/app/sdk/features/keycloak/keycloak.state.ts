import { State, Action, StateContext, Selector } from "@ngxs/store";
import { map, catchError } from "rxjs/operators";
import { KeycloakService } from "./keycloak.service";
import {
  Login,
  LoginSuccess,
  UpdateToken,
  LoginFail,
  ResetToken,
  Logout
} from "./keycloak.actions";
import { HttpErrorResponse } from "@angular/common/http";

export class KeycloakStateModel {
  loggedIn: boolean;
  token: string;
  keycloakEmail: string;
  keycloakUid: string;
  keycloakName: string;
  loggingOut: boolean;
}

const defaultToken = "";

@State<KeycloakStateModel>({
  name: "keycloak",
  defaults: {
    loggedIn: false,
    keycloakEmail: null,
    keycloakUid: null,
    keycloakName: null,
    token: defaultToken,
    loggingOut: false
  }
})
export class KeycloakState {
  constructor(private keycloakService: KeycloakService) {}
  @Selector()
  static token(state: KeycloakStateModel) {
    return state.token;
  }
  @Selector()
  static loggedIn(state: KeycloakStateModel) {
    return state.loggedIn;
  }
  @Selector()
  static loggingOut(state: KeycloakStateModel) {
    return state.loggingOut;
  }
  @Selector()
  static username(state:KeycloakStateModel) {
    return state.keycloakName;
  }

  @Selector()
  static useremail(state:KeycloakStateModel) {
    return state.keycloakEmail;
  }

  @Action(Login)
  login({ getState }: StateContext<KeycloakStateModel>) {
    let state = getState();
    this.keycloakService.init();
  }
  @Action(LoginSuccess)
  loginSuccess(
    { patchState }: StateContext<KeycloakStateModel>,
    { token, email, keycloakUid, name }: LoginSuccess
  ) {
    patchState({
      loggedIn: true,
      token: token,
      keycloakEmail: email,
      keycloakUid: keycloakUid,
      keycloakName: name
    });
  }
  @Action(UpdateToken)
  updateToken(
    { getState, patchState }: StateContext<KeycloakStateModel>,
    { token }: UpdateToken
  ) {
    patchState({ token: token });
  }
  @Action(LoginFail)
  loginFail({ patchState }: StateContext<KeycloakStateModel>) {
    patchState({ loggedIn: false });
  }
  @Action(ResetToken)
  resetToken({ patchState }: StateContext<KeycloakStateModel>) {
    patchState({ token: defaultToken });
  }

  @Action(Logout)
  loggingOut({ patchState }: StateContext<KeycloakStateModel>) {
    patchState({
      loggedIn: false,
      keycloakEmail: null,
      keycloakUid: null,
      keycloakName: null,
      token: defaultToken,
      loggingOut: true
    });
    this.keycloakService.logOut();
  }
}
