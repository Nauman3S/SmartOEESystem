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
    authState?.role &&
    authState?.role === "admin" &&
    lazy(() => import("./pages/Home"));
  const LazyClientHome = lazy(() => import("./pages/ClientHome"));

  const LazySignIn = lazy(() => import("./pages/SignIn"));
  const LazySignUp = lazy(() => import("./pages/SignUp"));
  const LazyProfile = lazy(() => import("./pages/Profile"));

  const LazyMacAddress = lazy(() => import("./pages/MacAddress"));

  const LazyData =
    authState?.role &&
    authState?.role === "admin" &&
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
                    {authState?.role && authState?.role === "admin" ? (
                      <LazyHome />
                    ) : authState?.role && authState?.role === "client" ? (
                      <LazyClientHome />
                    ) : (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}>
                        <Loading />
                      </div>
                    )}
                  </RequireAuth>
                }
              />

              {authState?.role && authState?.role === "admin" && (
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
