import { Component } from '@angular/core';

import { AboutPage, UserPage, HomePage } from '../main';


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = UserPage;

  constructor() {

  }
}
