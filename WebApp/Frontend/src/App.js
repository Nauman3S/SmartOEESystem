/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/layout/Main";
import Loading from "./components/loadingComponent";
import { notification } from "antd";
import { getToken } from "./Redux/localStorage";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
// import io from "socket.io-client";

// const socket = io("http://localhost:3500");
// // const socket = io("https://smart-devices-system-backend.caprover.meetin.co.in");
// socket.on("connect", () => {
//   // console.log(socket.id);
// });

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = getToken();
  if (!isAuthenticated) {
    notification["error"]({
      message: "Please login first",
    });
  }

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function LoggedIn({ children, redirectTo }) {
  let isAuthenticated = getToken();
  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
}

const App = () => {
  const authState = useSelector((state) => state.auth);

  const LazyHome =
    (authState.role === "admin" || authState.role === "superAdmin") &&
    lazy(() => import("./pages/Home"));
  const LazyClientHome = lazy(() => import("./pages/ClientHome"));
  const LazyAllUsers =
    authState.role === "admin" && lazy(() => import("./pages/AllUsers"));
  const LazySignIn = lazy(() => import("./pages/SignIn"));
  const LazySignUp = lazy(() => import("./pages/SignUp"));
  const LazyProfile = lazy(() => import("./pages/Profile"));
  // const LazyProgram = lazy(() => import("./pages/Program"));
  // const LazyControl = lazy(() => import("./pages/Control"));
  const LazyMacAddress = lazy(() => import("./pages/MacAddress"));
  // const LazyMap =
  //   authState.role === "client" && lazy(() => import("./pages/Map"));
  // const LazyClientData =
  //   authState.role === "client" && lazy(() => import("./pages/ClientData"));

  const LazyData =
    (authState.role === "admin" || authState.role === "superAdmin") &&
    lazy(() => import("./pages/Data"));

  return (
    <Suspense fallback={<Loading />}>
      <div className='App'>
        <AnimatePresence exitBeforeEnter>
          <Routes>
            <Route
              path='/sign-up'
              element={
                <LoggedIn redirectTo='/'>
                  <LazySignUp />
                </LoggedIn>
              }
            />
            <Route
              path='/sign-in'
              element={
                <LoggedIn redirectTo='/'>
                  <LazySignIn />
                </LoggedIn>
              }
            />
            <Route
              path='/'
              element={
                <RequireAuth redirectTo='/sign-in'>
                  <Main />
                </RequireAuth>
              }>
              <Route
                index
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    {authState && authState.role === "admin" ? (
                      <LazyHome />
                    ) : (
                      <LazyClientHome />
                    )}
                  </RequireAuth>
                }
              />
              {authState && authState.role === "admin" && (
                <Route
                  exact
                  path='/all-users'
                  element={
                    <RequireAuth redirectTo='/sign-in'>
                      <LazyAllUsers />
                    </RequireAuth>
                  }
                />
              )}

              {/* <Route
                path='/programs'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyProgram />
                  </RequireAuth>
                }
              /> */}
              {/* <Route
                path='/controls'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyControl socket={socket} />
                  </RequireAuth>
                }
              /> */}
              {authState && authState.role === "admin" && (
                <Route
                  path='/data'
                  element={
                    <RequireAuth redirectTo='/sign-in'>
                      <LazyData />
                    </RequireAuth>
                  }
                />
              )}
              <Route
                path='/macaddress'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyMacAddress />
                  </RequireAuth>
                }
              />
              {/* {authState.role === "client" && (
                <Route
                  path='/map'
                  element={
                    <RequireAuth redirectTo='/sign-in'>
                      <LazyMap />
                    </RequireAuth>
                  }
                />
              )} */}
              {/* {authState.role === "client" && (
                <Route
                  path='/client/data'
                  element={
                    <RequireAuth redirectTo='/sign-in'>
                      <LazyClientData />
                    </RequireAuth>
                  }
                />
              )} */}
              <Route
                path='/profile'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyProfile />
                  </RequireAuth>
                }
              />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </Suspense>
  );
};

export default App;
