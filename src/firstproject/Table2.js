// import React, { useEffect, useState } from 'react';
// import { TfiSplitH } from "react-icons/tfi";
// // import SortIcon from '@mui/icons-material/SortIcon';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// const Table2 = () => {
//     const [dataOfKey, setDataOfKey] = useState([]);
//     const [dataOfValue, setDataOfValue] = useState([]);

//     const [colNumber, setColNumber] = useState(null);
//     const [sortOrder, setSortOrder] = useState("asc");
//     const [sorting, setSorting] = useState({ column: null, order: "asc" });


//     const fetchData = async () => {
//         try {
//             const res = await fetch("https://dummyjson.com/users", {
//                 method: 'GET',
//                 headers: { 'Content-Type': 'application/json', }
//             });
//             const data1 = await res.json();
//             const data2 = data1.users;

//             const keys = Object.keys(data2[0]);
//             setDataOfKey(keys);

//             setDataOfValue(data2);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);


//     // const handleSortAscending = (a, b, column) => {
//     //     const aValue = a[dataOfKey[column]];
//     //     const bValue = b[dataOfKey[column]];
//     //     console.log(aValue)
//     //     return aValue - bValue;
//     // };
//     // const handleSortDescending = (a, b, column) => {


//     //     return b[column] - (a[column]);

//     // };

//     // const handleSort = (column) => {
//     //     console.log(column);
//     //     const isAsc = sortOrder === 'asc';
//     //     console.log(isAsc);
//     //     const sortFunction = isAsc ? handleSortAscending : handleSortDescending;

//     //     const sortedData = [...dataOfValue].sort((a, b) => {
//     //         // console.log(column);

//     //         return sortFunction(a, b, column);
//     //     });
//     //     console.log(sortFunction);
//     //     // console.log(sortedData);

//     //     setDataOfValue(sortedData);

//     //     const newSortOrder = isAsc ? 'desc' : 'asc';
//     //     setSortOrder(newSortOrder);

//     // };

//     // const SortIcon = ({ onClick, sortOrder }) => {

//     //     if (sortOrder === 'asc') {
//     //         return (
//     //             <ArrowDropDownIcon onClick={onClick} />
//     //         );
//     //     } else if (sortOrder === 'desc') {
//     //         return (
//     //             <ArrowDropUpIcon onClick={onClick} />
//     //         );
//     //     }
//     //     else {
//     //         return (
//     //             <ArrowDropDownIcon onClick={onClick} />
//     //         );
//     //     }
//     // };

    

//     return (
//         <>
//             <table
//                 className="light-border-table">
//                 <thead>
//                     <tr>
//                         {
//                             dataOfKey.map((v, index) => (

//                                 <>
//                                     <th key={index} style={{ border: '1px solid black', position: 'relative' }}>
//                                         <div>
//                                             <span className='fn'>
//                                                 <span className='alignmentText' onClick={() => handleSort(index)} />


//                                                 {v}
                                                

//                                                 {/* <SortIcon
//                                                     onClick={() => handleSort(index)}
//                                                     column={index}
//                                                     sortOrder={colNumber === index ? sortOrder : ''}
//                                                 /> */}
//                                                 {/* <SortIcon
//                                             onClick={() => handleSort(index)}
//                                             column={index} /> */}

//                                             </span>


//                                             <TfiSplitH className='iconstyle' />
//                                         </div>
//                                         <div>
//                                             <input type="text" />
//                                         </div>
//                                     </th >
//                                 </>

//                             ))}
//                     </tr>

//                 </thead>
//                 {/* <tr >
//                     {
//                         dataOfKey.map((v, index) => {
//                             return(
//                             <td><input type="text" /></td>
//                             )
//                         })
//                     }
                

//                 </tr> */}
//                 <tbody>
//                     {dataOfValue.map((row, index) => (
//                         <tr key={index}>
//                             {dataOfKey.map((key, innerIndex) => (
//                                 <>

//                                     <td key={innerIndex} style={{ border: '1px solid black', width: '220px !important' }}>
//                                         {row[key].toString()}
//                                     </td>

//                                 </>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table >


//         </>
//     );

// }
// export default Table2;