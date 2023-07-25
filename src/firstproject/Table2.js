import React, { useEffect, useState } from 'react';
import { TfiSplitH } from "react-icons/tfi";
// import SortIcon from '@mui/icons-material/SortIcon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const Table2 = () => {
    const [dataOfKey, setDataOfKey] = useState([]);
    const [dataOfValue, setDataOfValue] = useState([]);

    const [colNumber, setColNumber] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const fetchData = async () => {
        try {
            const res = await fetch("https://dummyjson.com/users", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', }
            });
            const data1 = await res.json();
            const data2 = data1.users;

            const keys = Object.keys(data2[0]);
            setDataOfKey(keys);

            setDataOfValue(data2);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
   
  const handleSortAscending = (a, b, column) => {
    if (a[column] < b[column]) return -1;
    if (a[column] > b[column]) return 1;
    return 0;
  };

  const handleSortDescending = (a, b, column) => {
    if (a[column] < b[column]) return 1;
    if (a[column] > b[column]) return -1;
    return 0;
  };

  const handleSort = (column) => {
    const isAsc = colNumber === column && sortOrder === 'asc';

    const sortFunction = isAsc ? handleSortAscending : handleSortDescending;

    const sortedData = [...dataOfValue].sort((a, b) => {
      return sortFunction(a, b, column);
    });

    setDataOfValue(sortedData);

    
    const newSortOrder = isAsc ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setColNumber(column);
  };

  const SortIcon = ({ sortOrder }) => {
    if (sortOrder === 'asc') {
      return <ArrowDropDownIcon />;
    } else if (sortOrder === 'desc') {
      return <ArrowDropUpIcon />;
    } else {
      return <ArrowDropDownIcon />
    }
  };

    // const SortIcon = ({ onClick, sortOrder }) => {
    //     if (sortOrder === 'asc') {
    //         return (
    //             <ArrowDropDownIcon onClick={onClick} />
    //         );
    //     } else if (sortOrder === 'desc') {
    //         return (
    //             <ArrowDropUpIcon onClick={onClick} />
    //         );
    //     }
    //     else {
    //         return (
    //             <ArrowDropDownIcon onClick={onClick} />
    //         );
    //     }
    // };
    // const handleSortAscending = (a, b, column) => {
        
    //         return a[column]-(b[column]);
    // };
    // const handleSortDescending = (a, b, column) => {

        
    //         return b[column]-(a[column]);
        
    // };
    // const handleSort = (column) => {
    //     console.log(column);
    //     const isAsc = sortOrder === 'asc';

    //     const sortFunction = isAsc ? handleSortAscending : handleSortDescending;

    //     const sortedData = [...dataOfValue].sort((a, b) => {
    //         return sortFunction(a, b, column);
    //     });
       

    //     setDataOfValue(sortedData);

    //     const newSortOrder = isAsc ? 'desc' : 'asc';
    //     setSortOrder(newSortOrder);

    // };

    return (
        <>
            <table

            >
                <thead>
                    <tr>
                        {dataOfKey.map((v, index) => (

                            <>


                                <th style={{ border: '1px solid black', position: 'relative' }}>
                                    <span className='fn'>
                                        <span className='alignmentText'>
                                            {v}
                                           <SortIcon sortOrder={colNumber === index ? sortOrder : ''} />
                                            {/* <SortIcon
                                                onClick={() => handleSort(index)}
                                                sortOrder={colNumber === index ? sortOrder : ''}
                                            /> */}
                                        </span>
                                    </span>

                                    <TfiSplitH className='iconstyle' />

                                </th>

                            </>

                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataOfValue.map((row, index) => (
                        <tr key={index}>
                            {dataOfKey.map((key, innerIndex) => (
                                <>

                                    <td key={innerIndex} style={{ border: '1px solid black', width: '220px !important' }}>
                                        {row[key].toString()}
                                    </td>

                                </>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>


        </>
    );

}
export default Table2;







