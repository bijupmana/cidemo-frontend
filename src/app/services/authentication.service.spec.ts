/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';
import { SessionService } from './session.service';

import { Http, HttpModule, Response, XHRBackend, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
// import { EventBroker, Md5 } from './../../utils';
// import { RouterStub } from './../../testing/stubs';
// import {httpFactory} from '@angular/http/src/http_module';
// import {SessionServiceStub} from '../../testing/stubs/session.service.stub';



// TODO: this is temporary. Remove if request response with websockets is gone ask Alex K. for more clarification
// window.location.reload = () => {};

// class MockError extends Response implements Error {
//   name: any;
//   message: any;
// }
// tslint:disable
import {Subject} from 'rxjs/Subject';
import {NavigationEnd} from '@angular/router';

class MockError extends Response implements Error {
  name: any;
  message: any;
}


class RouterStub {
  navigate(url: string[]) {
    return url;
  }

  // eventsSubject = new Subject();
  // events = this.eventsSubject.asObservable();
  // simulateNavigation(path: string) {
  //   const event = new NavigationEnd(0, path, path);
  //   this.eventsSubject.next(event);
  // }
}

class SessionServiceStub {
  // user = new User('0', 'Uwe', 'Underwriter');
  // getUser(): User {
  //   return this.user;
  // }

  // getToken(): string {
  //   return 'Token';
  // }

  // resetUser() {
  //   this.user = new User('1', 'Johannes', 'Schlauberger');
  // }

  clear() {}
  create () { return true; }
  hasSession () { return; }
}



describe('Service: AuthService', () => {
  let authService, router, sessionService, eventBroker, http;
  const validUserDto = {
    status: 200,
    body: {
      'user': {
        'id': 'uw1',
        'firstname': 'Uwe',
        'lastname': 'Underwriter'
      },
      'stsToken': 'auth-token-12345abcdef-xyz-67890-lmnop'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        AuthenticationService,
        { provide: Router, useClass: RouterStub },
        // { provide: SessionService, useClass: SessionServiceStub },
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    authService = TestBed.get(AuthenticationService);
    router = TestBed.get(Router);
    // sessionService = TestBed.get(SessionService);
    http = TestBed.get(Http);
  });

  describe('login:', () => {
    let backend, response;

    beforeEach(inject([Http, XHRBackend], (ht: Http, be: MockBackend) => {
      backend = be;
      // http = ht;
      // default value is valid login data
      const options = new ResponseOptions(validUserDto);
      response = new Response(options);
    }));

    // it('should check credentials against backend', () => {
    //   backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
    //   const result = authService.login('user', 'pass').toPromise();

    //   // verifies that onLogin gets called.
    //   result.then(value => {
    //     expect(value).toBe(true);
    //   });
    // });

    describe('when - with valid credentials', () => {
      let routerSpy, sessionSpy, loginPromise, stateSpy;

      beforeEach(() => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        routerSpy = spyOn(router, 'navigate');
        // sessionSpy = spyOn(sessionService, 'create');
        stateSpy = spyOn(authService.loggedIn$, 'next');
        loginPromise = authService.login('user', 'pass').toPromise();
      });

      // it('sets a user session', () => {
      //   expect(sessionService.create).toHaveBeenCalled();
      // });

      // it('navigates to home', () => {
      //   const navArgs = routerSpy.calls.first().args[0][0];
      //   expect(navArgs).toBe('/home');
      // });

      it('should toggle isLoggedIn$ to true', () => {
        expect(authService.loggedIn$.next).toHaveBeenCalledWith(true);
      });
    });

    describe('when - with invalid credentials', () => {
      let doLogin, spy;

      beforeEach(() => {
        const errorResponse = new ResponseOptions({
          status: 401,
          body: { message: 'Unauthorized' },
          type: ResponseType.Error
        });
        const mock = new MockError(errorResponse);
        backend.connections.subscribe((c: MockConnection) => c.mockError(mock));
        spy = spyOn(router, 'navigate');
        doLogin = authService.login('user', 'pass');
      });

      it('returns an error message', () => {
        doLogin.subscribe(
          () => {},
          error => {
            expect(error.json().message).toBe('Unauthorized');
          }
        );
      });

      it('stays on login page', () => {
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });
  });

  describe('isLoggedIn$() helper', () => {
    it('should be an observable', () => {
      expect(authService.isLoggedIn$() instanceof Observable).toBe(true);
    });

    // describe('defaults to hasSession()', () => {
    //   it('is true if hasSession() is true', () => {
    //     spyOn(sessionService, 'hasSession').and.returnValue(true);
    //     authService.isLoggedIn$().subscribe(res => {
    //       expect(res).toBe(true);
    //     });
    //   });

    //   it('is false if hasSession() is false', () => {
    //     spyOn(sessionService, 'hasSession').and.returnValue(false);
    //     authService.isLoggedIn$().subscribe(res => {
    //       expect(res).toBe(false);
    //     });
    //   });
    // });
  });

  // xdescribe('logout:', () => {
  //   let routerSpy, sessionSpy, stateSpy, postSpy;

  //   beforeEach(() => {
  //     routerSpy = spyOn(router, 'navigate');
  //     // sessionSpy = spyOn(sessionService, 'clear');
  //     stateSpy = spyOn(authService.loggedIn$, 'next');
  //     postSpy = spyOn(http, 'post').and.callThrough();
  //     authService.logout();
  //   });

  //   // it('should clear the session', () => {
  //   //   expect(sessionService.clear).toHaveBeenCalled();
  //   // });

  //   it('should navigate to login page', () => {
  //     const navArgs = routerSpy.calls.first().args[0][0];
  //     expect(navArgs).toBe('/login');
  //   });

  //   it('should toggle isLoggedIn$ to false', () => {
  //     expect(authService.loggedIn$.next).toHaveBeenCalledWith(false);
  //   });

  //   // it('should logout from boot', () => {
  //   //   const logoutArgs = postSpy.calls.mostRecent().args;
  //   //   expect(logoutArgs[0]).toBe('/mw/logout');
  //   //   expect(logoutArgs[1]).toEqual({clientToken: 'Token', bensl: '0'});
  //   // });

  // });
});
