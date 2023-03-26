import React from "react";

// TODO ask CG for advice.
/*
react_devtools_backend.js:2655 The above error occurred in the <Route.Provider> component:

    at RenderedRoute (http://localhost:3000/static/js/bundle.js:39033:5)
    at Routes (http://localhost:3000/static/js/bundle.js:39498:5)
    at Router (http://localhost:3000/static/js/bundle.js:39436:15)
    at BrowserRouter (http://localhost:3000/static/js/bundle.js:37633:5)
    at App

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
overrideMethod @ react_devtools_backend.js:2655
logCapturedError @ react-dom.development.js:18687
update.callback @ react-dom.development.js:18720
callCallback @ react-dom.development.js:13923
commitUpdateQueue @ react-dom.development.js:13944
commitLayoutEffectOnFiber @ react-dom.development.js:23391
commitLayoutMountEffects_complete @ react-dom.development.js:24688
commitLayoutEffects_begin @ react-dom.development.js:24674
commitLayoutEffects @ react-dom.development.js:24612
commitRootImpl @ react-dom.development.js:26823
commitRoot @ react-dom.development.js:26682
performSyncWorkOnRoot @ react-dom.development.js:26117
flushSyncCallbacks @ react-dom.development.js:12042
(anonymous) @ react-dom.development.js:25651
react-dom.development.js:19055 Uncaught Error: A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.
    at throwException (react-dom.development.js:19055:1)
    at handleError (react-dom.development.js:26311:1)
    at renderRootSync (react-dom.development.js:26437:1)
    at recoverFromConcurrentError (react-dom.development.js:25850:1)
    at performSyncWorkOnRoot (react-dom.development.js:26096:1)
    at flushSyncCallbacks (react-dom.development.js:12042:1)
    at react-dom.development.js:25651:1
*/
export default function HomePage() {
  return (
    <div className="centred">
      <h1>Dance-Pair</h1>
      <p>This app is for events such as dance parties where it's important to have equal numbers of boys and girls.</p>
      <p>The event organiser creates an event, which gives them a URL to share with invitees.</p>
      <p>The system maintains a waitlist. When you register, if someone of the opposite sex is already waitlisted, you and the person at the front of the waitlist will be invited.</p>
    </div>
  );
}