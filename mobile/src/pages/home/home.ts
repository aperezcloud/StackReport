import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { TopFundsPage } from '../topfunds/topfunds';
import { MainDashboardPage } from '../mainDashboard/mainDashboard';
import { RegionalfundsPage } from '../regionalfunds/regionalfunds';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { FollowingService } from '../../services/following.service';
import { FundService } from '../../services/fund.service';
import { Security } from '../../models/security';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  fundList: Security[];
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
              public followService: FollowingService, public fundService: FundService, public authService: AuthService) {
    this.fundList = [];
    this.user = authService.getLoggedInUser();
  }

  ngOnInit() {
      this.followService.getAllFollowing()
      .then(fund_meta_list => {
        var promiseList = [];
        fund_meta_list.forEach(fund=>{
          promiseList.push(
            new Promise((resolve, reject)=>{
              this.fundService.getFund(fund)
              .then(currentFund=>{
                return resolve(currentFund);
              })
              .catch(err=> reject(err));
            }
          ))
        })
        return Promise.all(promiseList);
      })
      .then(fund_list=>{
        this.fundList = fund_list;
      })
      .catch(err => {
        console.log(err);
      });  
  }

  openMenu() {
    this.menuCtrl.open();
  }
 
  closeMenu() {
    this.menuCtrl.close();
  }
 
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  navToTopFunds(){
    this.navCtrl.push(TopFundsPage);
  }

  navToByRegionPage(){
    this.navCtrl.push(RegionalfundsPage);
  }

  navUserInfo(){
    this.navCtrl.push(UserPage);
  }

  logout() {
    this.authService.logout();
    this.navCtrl.push(LoginPage);
  }

  navPortfolioPage() {
    this.menuCtrl.toggle();
  }



}
