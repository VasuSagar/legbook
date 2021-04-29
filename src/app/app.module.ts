import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/modules/core/core.module';
import { HomeComponent } from './client/components/home/home.component';
import { ChatPanelComponent } from './client/components/chat-panel/chat-panel.component';
import { PostComponent } from './client/components/post/post.component';
import { PostDescriptionComponent } from './client/components/post-description/post-description.component';
import { PostCommentsComponent } from './client/components/post-comments/post-comments.component';
import { HeaderClientComponent } from './client/components/header-client/header-client.component';
import { FormsModule } from '@angular/forms';
import { ChatPopupComponent } from './client/components/chat-popup/chat-popup.component';
import { TestComponent } from './client/components/test/test.component';
import { UserInfoComponent } from './client/components/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ChatPanelComponent,
    PostComponent,
    PostDescriptionComponent,
    PostCommentsComponent,
    HeaderClientComponent,
    ChatPopupComponent,
    TestComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
