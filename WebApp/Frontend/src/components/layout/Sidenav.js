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

// import { useState } from "react";
import { Menu } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/smartoee.png";
import { useDispatch } from "react-redux";
import { signOut } from "../../Redux/actions/auth.actions";
import { BsPinMapFill } from "react-icons/bs";
import { AiOutlineDatabase } from "react-icons/ai";

import {
  ProjectFilled,
  ControlFilled,
  UserOutlined,
  ContainerFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Sidenav = ({ color }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const page = pathname.replace("/", "");

  const dashboard = [
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      key={"0"}>
      <path
        key={"100"}
        d='M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z'
        fill={color}></path>
      <path
        key={"101"}
        d='M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z'
        fill={color}></path>
      <path
        key={"102"}
        d='M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z'
        fill={color}></path>
    </svg>,
  ];

  const logout = [
    <svg
      height='20'
      width='20'
      viewBox='0 0 64 64'
      enableBackground='new 0 0 64 64'
      fill='none'>
      <path
        key={"104"}
        d='M52.4501991,28.7678509l-5-4.9990005c-0.3768997-0.3770008-0.9902-0.3770008-1.3671989,0
		c-0.3778992,0.3778992-0.3778992,0.9902,0,1.3671989l3.3171997,3.3164005H35.2666016v2h14.1320992l-3.3157005,3.3163986
		c-0.3778992,0.377903-0.3778992,0.9902,0,1.3672028c0.1884995,0.1884995,0.4365997,0.2831993,0.6835976,0.2831993
		c0.2471008,0,0.4951019-0.0946999,0.6836014-0.2831993l5-5.0010014c0.1817017-0.1816006,0.2831993-0.4277,0.2831993-0.6835995
		C52.7333984,29.1946507,52.6319008,28.9495506,52.4501991,28.7678509z'
        fill={color}
      />
      <path
        key={"105"}
        d='M40.2666016,39.4524498c-0.5527,0-1,0.4473-1,1v10.7900009c0,1.0429993-0.8310013,2.2099991-1.9433022,2.2099991
		h-6.0566998V11.2394505V9.8677502L30.0191994,9.33395L14.0765009,2.56445l-0.2606955-0.112h23.507494
		c1.2168007,0,1.9433022,0.9921999,1.9433022,1.9511998v15.0487995c0,0.5527,0.4473,1,1,1c0.5527992,0,1-0.4473,1-1V4.4036498
		c0-2.1786997-1.7685013-3.9511998-3.9433022-3.9511998H12.2666006c-0.5215998,0-0.9358997,0.4029-0.9822998,0.9124
		L11.2666006,1.35725V1.45245V55.03405l17.1855011,7.3064003l2.8144989,1.2070999v-3.0951004v-5h6.0566998
		c2.3584023,0,3.9433022-2.1767998,3.9433022-4.2099991V40.4524498
		C41.2666016,39.8997498,40.8194008,39.4524498,40.2666016,39.4524498z M29.2665997,11.2394505v49.2129974l-15.999999-6.7766991
		V4.4524498l15.9906988,6.7728004l0.0093002,0.0038996V11.2394505z'
        fill={color}
      />
    </svg>,
  ];

  const profile = [
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      key={"20"}>
      <path
        key={"200"}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z'
        fill={color}></path>
    </svg>,
  ];

  return (
    <>
      <div className='brand'>
        <img src={logo} alt='' />
        <span>Smart OEE System</span>
      </div>
      <hr />
      <Menu theme='light' mode='inline'>
        <Menu.Item key={"1"}>
          <NavLink to='/' end>
            <span
              className='icon'
              style={{
                background: page === "dashboard" ? color : "",
              }}>
              {dashboard}
            </span>
            <span className='label'>Dashboard</span>
          </NavLink>
        </Menu.Item>
        {authState && authState.role === "admin" && (
          <Menu.Item key={"2"}>
            <NavLink to='/all-users'>
              <span
                className='icon'
                style={{
                  background: page === "all-users" ? color : "",
                }}>
                {<UserOutlined />}
              </span>
              <span className='label'>All Users</span>
            </NavLink>
          </Menu.Item>
        )}
        {/* <Menu.Item key={"3"}>
          <NavLink to='/programs'>
            <span
              className='icon'
              style={{
                background: page === "programs" ? color : "",
              }}>
              {<ProjectFilled />}
            </span>
            <span className='label'>
              {authState &&
              (authState.role === "superAdmin" || authState.role === "admin")
                ? "All Programs"
                : "Programs"}
            </span>
          </NavLink>
        </Menu.Item> */}
        {/* <Menu.Item key={"4"}>
          <NavLink to='/controls'>
            <span
              className='icon'
              style={{
                background: page === "controls" ? color : "",
              }}>
              {<ControlFilled />}
            </span>
            <span className='label'>
              {" "}
              {authState &&
              (authState.role === "superAdmin" || authState.role === "admin")
                ? "All Controls"
                : "Controls"}
            </span>
          </NavLink>
        </Menu.Item> */}
        {/* {authState.role === "client" && (
          <Menu.Item key={"5"}>
            <NavLink to='/map'>
              <span
                className='icon'
                style={{
                  background: page === "map" ? color : "",
                }}>
                {<BsPinMapFill />}
              </span>
              <span className='label'>Map</span>
            </NavLink>
          </Menu.Item>
        )} */}
        {/* {authState.role === "client" && (
          <Menu.Item key={"6"}>
            <NavLink to='/client/data'>
              <span
                className='icon'
                style={{
                  background: page === "client" ? color : "",
                }}>
                {<AiOutlineDatabase />}
              </span>
              <span className='label'>Data</span>
            </NavLink>
          </Menu.Item>
        )} */}
        {/* {(authState.role === "admin" || authState.role === "superAdmin") && (
          <Menu.Item key={"7"}>
            <NavLink to='/data'>
              <span
                className='icon'
                style={{
                  background: page === "data" ? color : "",
                }}>
                {<AiOutlineDatabase />}
              </span>
              <span className='label'>Data</span>
            </NavLink>
          </Menu.Item>
        )} */}
        <Menu.Item key={"8"}>
          <NavLink to='/macaddress'>
            <span
              className='icon'
              style={{
                background: page === "macaddress" ? color : "",
              }}>
              {<ContainerFilled />}
            </span>
            <span className='label'>MacAddress</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item className='menu-item-header' key={"9"}>
          Account
        </Menu.Item>
        <Menu.Item key={"10"}>
          <NavLink to='/profile'>
            <span
              className='icon'
              style={{
                background: page === "profile" ? color : "",
              }}>
              {profile}
            </span>
            <span className='label'>Profile</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key={"11"}>
          <div
            style={{ marginLeft: 16, marginTop: 5 }}
            onClick={async () => {
              await dispatch(signOut());
              navigate("/sign-in");
            }}>
            <span className='icon'>{logout}</span>
            <span className='label'>Logout</span>
          </div>
        </Menu.Item>
      </Menu>
      {/* <div className='aside-footer'>
        <div
          className='footer-box'
          style={{
            background: color,
          }}>
          <span className='icon' style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type='primary' className='ant-btn-sm ant-btn-block'>
            DOCUMENTATION
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default Sidenav;
