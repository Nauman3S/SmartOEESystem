// /*!
//   =========================================================
//   * Muse Ant Design Dashboard - v1.0.0
//   =========================================================
//   * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
//   * Copyright 2021 Creative Tim (https://www.creative-tim.com)
//   * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
//   * Coded by Creative Tim
//   =========================================================
//   * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// import ReactApexChart from "react-apexcharts";
// import { Typography } from "antd";
// import { MinusOutlined } from "@ant-design/icons";
// // import lineChart from "./configs/lineChart";
// import { useQuery } from "react-query";
// import {
//   getAdminUserAllMacAddress,
//   getAdminUsers,
// } from "../../Axios/apiFunctions";

// function LineChart() {
//   const { data: macAddress } = useQuery(
//     "getAdminUserAllMacAddress",
//     getAdminUserAllMacAddress
//   );
//   // const { data: macAddress } = useQuery("getAdminUsers", getAdminUsers);
//   // console.log(macAddress?.data?.users?.users[0].createdAt);
//   console.log(macAddress);
//   let adminUserMacAddressess = [];
//   macAddress?.data?.Macaddressess[0]?.users.map((data, index) => {
//     return data.macAddress.map((mac) => {
//       return adminUserMacAddressess.push(mac.macAddress);
//     });
//   });
//   console.log(adminUserMacAddressess);
//   const lineChart = {
//     series: [
//       {
//         name: "Macaddress",
//         data: [10, 40, 60, 80, 100, 200, 300, 400, 500],
//         offsetY: 0,
//       },
//     ],

//     options: {
//       chart: {
//         width: "100%",
//         height: 350,
//         type: "area",
//         toolbar: {
//           show: false,
//         },
//       },

//       legend: {
//         show: true,
//       },

//       dataLabels: {
//         enabled: true,
//       },
//       stroke: {
//         curve: "smooth",
//       },

//       yaxis: {
//         labels: {
//           style: {
//             fontSize: "14px",
//             fontWeight: 600,
//             colors: ["#8c8c8c"],
//           },
//         },
//       },

//       xaxis: {
//         labels: {
//           style: {
//             fontSize: "14px",
//             fontWeight: 600,
//             colors: [
//               "#8c8c8c",
//               "#8c8c8c",
//               "#8c8c8c",
//               "#8c8c8c",
//               "#8c8c8c",
//               "#8c8c8c",
//               "#8c8c8c",
//               "#8c8c8c",
//               "#8c8c8c",
//             ],
//           },
//         },
//         categories: [
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//         ],
//       },

//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return val;
//           },
//         },
//       },
//     },
//   };

//   const { Title, Paragraph } = Typography;

//   return (
//     <>
//       <div className='linechart'>
//         <div>
//           <Title level={5}>Macaddress</Title>
//           {/* <Paragraph className="lastweek">
//             than last week <span className="bnb2">+30%</span>
//           </Paragraph> */}
//         </div>
//         <div className='sales'>
//           <ul>
//             <li>{<MinusOutlined />} Macaddress</li>
//             {/* <li>{<MinusOutlined />} Sales</li> */}
//           </ul>
//         </div>
//       </div>

//       <ReactApexChart
//         className='full-width'
//         options={lineChart.options}
//         series={lineChart.series}
//         type='area'
//         height={350}
//         width={"100%"}
//       />
//     </>
//   );
// }

// export default LineChart;
