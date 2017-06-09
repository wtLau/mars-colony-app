import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('slideInOutAnimation', [
    // end state styles for route container (host)
    state('*', style({
      // the view covers the whole screen with a semi tranparent background
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    })),

    // route 'enter' transition
    transition(':enter', [
      // styles at start of transition
      style({
        right: '-500%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        background: 'none'
      }),
      // animation and styles at end of transition
      animate('1s ease-in', style({
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }))
    ]),

    // route 'leave' transition
    transition(':leave', [
      // animation and styles at end of transition
      animate('1s ease-in-out', style({
        // transition the right position to -400% which slides the content out of view
        left: '-500%',
        // transition the background opacity to 0 to fade it out
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }))
    ])
]);
