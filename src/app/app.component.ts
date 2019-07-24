import { Component, HostListener, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Router, NavigationEnd } from "@angular/router";
import { ConstantState } from "./state/constants/constants.state";
import { FetchConstants } from "./state/constants/constants.actions";
import { Login } from "./sdk/features/keycloak/keycloak.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Isha Sample App";
  appLoaded = false;
  @Select(ConstantState.constantsLoaded)
  constantsLoaded$: Observable<boolean>;
  constantsLoaded: boolean = false;
  @Select(ConstantState.isFetchingConstants)
  isFetchingConstants$: Observable<boolean>;
  isFetchingConstants: boolean = false;
  currentPath: string;
  showSidebar: boolean = true;
  appLoadingText: string;
  authenticate = () => {
    this.store.dispatch(new Login());
  };
  fetchConstants = () => {
    this.store.dispatch(new FetchConstants());
  };
  /**
   * This will evaluate whether all conditions necessary to
   * let user into the app are fulfilled.
   */
  evaluateAppLoaded = () => {
      if (this.constantsLoaded) {
        this.appLoaded = true;
      } else this.appLoaded = false;
    this.evaluateLoadingText();
  };
  /**
   * This will evaluate the appropriate loading text
   * to show the user as the app is loading.
   */
  evaluateLoadingText = () => {
    if (!this.constantsLoaded) {
      this.appLoadingText = "Fetching Constants...";
    }
  };
  constructor(private store: Store, private router: Router) {
    // Capturing the currentPath
    router.events.subscribe((_: NavigationEnd) => {
      if (_.url !== undefined) {
        // Getting current path from window.location.pathname for more accuracy
        this.currentPath = window.location.pathname;
      }
    });
    this.isFetchingConstants$.subscribe(value => {
      this.isFetchingConstants = value;
      this.evaluateAppLoaded();
    });
    this.constantsLoaded$.subscribe(value => {
      this.constantsLoaded = value;
      this.evaluateAppLoaded();
    });
  }
  ngOnInit() {
    this.authenticate();
    this.fetchConstants();
  }
}
