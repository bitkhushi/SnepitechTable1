import React, { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';

const Table1 = () => {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchFilter, setSearchFilter] = useState([]);
    const [colNumber, setcolIndex] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [MenuVisible, setMenuVisible] = useState(false);
    const [ListExportMenuVisible, setListExportMenuVisible] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch("https://dummyjson.com/users");
            const jsonData = await response.json();
            setData(jsonData.users);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlethselect = (colindex) => {
        setcolIndex(colindex);
        console.log(colindex);

    }
    const SortIcon = ({ onClick, sortOrder }) => {
        if (sortOrder === 'asc') {
            return (
                <ArrowDropDownIcon onClick={onClick} />
            );
        } else if (sortOrder === 'desc') {
            return (
                <ArrowDropUpIcon onClick={onClick} className='changeicon' />
            );
        }
        else {
            return (
                <ArrowDropUpIcon onClick={onClick} className='changeicon' />
            );
        }
    };
    const handleSearchFilter = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue !== '') {
            const filteredData = data.filter((item) => {
                return item.firstName.toLowerCase().includes(searchValue);
            });
            setSearchFilter(filteredData);
        } else {
            setSearchFilter(data);
        }
        setSearch(searchValue);
    };
    const handleSearchFilterLastName = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue !== '') {
            const filteredData = data.filter((item) => {
                return item.lastName.toLowerCase().includes(searchValue);
            });
            setSearchFilter(filteredData);
        } else {
            setSearchFilter(data);
        }
        setSearch(searchValue);
    };
    const handleSearchFilterMeidenName = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue !== '') {
            const filteredData = data.filter((item) => {
                return item.maidenName.toLowerCase().includes(searchValue);
            });
            setSearchFilter(filteredData);
        } else {
            setSearchFilter(data);
        }
        setSearch(searchValue);
    };
    const handleSearchFilterAge = (e) => {
        const searchValue = e.target.value;
        if (searchValue !== '') {
            const filteredData = data.filter((item) => {
                return item.age.toString().includes(searchValue);
            });
            setSearchFilter(filteredData);
        } else {
            setSearchFilter(data);
        }
        setSearch(searchValue);
    };
    const handleSearchFilterId = (e) => {
        const searchValue = e.target.value;
        if (searchValue !== '') {
            const filteredData = data.filter((item) => {
                return item.id.toString().includes(searchValue);
            });
            setSearchFilter(filteredData);
        } else {
            setSearchFilter(data);
        }
        setSearch(searchValue);
    };
    const handleSortAscending = (a, b, column) => {
        if (column === 'age' || column === 'id') {
            return a[column] - b[column];


        } else {
            return a[column].localeCompare(b[column]);


        }

    };
    const handleSortDescending = (a, b, column) => {

        if (column === 'age' || column === 'id') {
            return b[column] - a[column];
        } else {
            return b[column].localeCompare(a[column]);
        }
    };
    const handleSort = (column) => {
        const isAsc = sortOrder === 'asc';

        const sortFunction = isAsc ? handleSortAscending : handleSortDescending;

        const sortedData = [...data].sort((a, b) => {
            return sortFunction(a, b, column);
        });

        setData(sortedData);

        const newSortOrder = isAsc ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

    };
    const handleMouseDown = (event) => {

        if (event.button === 2) {
            setMenuVisible(true)
            console.log(event.button);
        } else if (event.button === 0) {
            setMenuVisible(false)
        }
        // setMenuVisible(true)


        event.preventDefault();
    };

    const click = (event) => {
        console.log("okiiiess");
        setListExportMenuVisible(true)
    }


    return (
        <>

            {/* <style>
                {`
                
              .selected {
                     background-color: lightblue;
                 }
               
                
                 td.right-align {
                     text-align: right;
                 }

                 td.center-align {
                     text-align: center;
                 }

                 td.left-align{
                     text-align:left;
                 }`




                }
            </style> */}
            <div className='Menu' onMouseDown={handleMouseDown}>


                <table responsive border={1} style={{ width: 'auto' }}  >
                    <thead>

                        <tr>

                            <th
                                className={colNumber === 0 ? 'selected' : ''}
                                onClick={() => handlethselect(0)}>
                                id
                                <SortIcon
                                    onClick={() => handleSort('id')}
                                    sortOrder={colNumber === 0 ? sortOrder : ''}
                                />


                            </th>

                            <th className={colNumber === 1 ? 'selected' : ''}
                                onClick={() => handlethselect(1)}>
                                FirstName
                                <SortIcon
                                    onClick={() => handleSort('firstName')}
                                    sortOrder={colNumber === 1 ? sortOrder : ''}
                                />


                            </th>
                            <th className={colNumber === 2 ? 'selected' : ''}
                                onClick={() => handlethselect(2)}>
                                LastName
                                <SortIcon
                                    onClick={() => handleSort('lastName')}
                                    sortOrder={colNumber === 2 ? sortOrder : ''}
                                />


                            </th>
                            <th className={colNumber === 3 ? 'selected' : ''}
                                onClick={() => handlethselect(3)}>
                                MaidenName
                                <SortIcon
                                    onClick={() => handleSort('maidenName')}
                                    sortOrder={colNumber === 3 ? sortOrder : ''}
                                />


                            </th>
                            <th className={colNumber === 4 ? 'selected' : ''}
                                onClick={() => handlethselect(4)}>
                                Age
                                <SortIcon
                                    onClick={() => handleSort('age')}
                                    sortOrder={colNumber === 4 ? sortOrder : ''}
                                />
                            </th>

                        </tr>
                        <th>
                            <input onChange={handleSearchFilterId} />
                        </th>
                        <th>
                            <input onChange={handleSearchFilter} />
                        </th>
                        <th>
                            <input onChange={handleSearchFilterLastName} />
                        </th>
                        <th>
                            <input onChange={handleSearchFilterMeidenName} />
                        </th>
                        <th>
                            <input onChange={handleSearchFilterAge} />
                        </th>
                    </thead>
                    <tbody>
                        {(searchFilter.length > 0 ? searchFilter : data).map((item) => (

                            <tr key={item.id}>

                                <td className={`${colNumber === 0 ? 'selected' : ''
                                    } right-align`}
                                    onClick={() => handlethselect(0)}>{item.id}</td>

                                <td className={`${colNumber === 1 ? 'selected center-align' : 'center-align'}`}
                                    onClick={() => handlethselect(1)}>{item.firstName}</td>

                                <td className={`${colNumber === 2 ? 'selected left-align' : 'left-align'}`}
                                    onClick={() => handlethselect(2)}>{item.lastName}</td>

                                <td className={`${colNumber === 3 ? 'selected center-align' : 'center-align'}`}
                                    onClick={() => handlethselect(3)}>{item.maidenName}</td>

                                <td className={`${colNumber === 4 ? 'selected' : ''
                                    } right-align`}
                                    onClick={() => handlethselect(4)}>{item.age}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

            {/* {
                ListExportMenuVisible && (

                    <div class="wrapperListOfExport">
                        <div class="content">


                            <li class="item share">


                                <ul class="share-menu">
                                    <li class="item">
                                        <i class="uil uil-twitter-alt"></i>
                                        <span>Twitter</span>
                                    </li>
                                    <li class="item">
                                        <i class="uil uil-instagram"></i>
                                        <span>Instagram</span>
                                    </li>

                                </ul>
                            </li>
                        </div>
                    </div>

                )
            } */}

            {
                MenuVisible && (

                    <div className="wrapper">
                        <div className="content">
                            <ul className="menu">
                                <li className="item">
                                    <ContentCopyIcon />
                                    <span>Copy</span>
                                </li>
                                <li className="item">
                                    <ContentCopyIcon />
                                    <span>Copy With Headers</span>
                                </li>
                                <li className="item">
                                    <ContentPasteIcon />
                                    <span>Get Link</span>
                                </li>
                                <li className="item">
                                    <FileDownloadOutlinedIcon />
                                    <span>Export To Excel<ArrowRightIcon  onClick={click} className='iconright'/>
                                       
                                    </span>
                                </li>
                                <li className="item">
                                {
                                            ListExportMenuVisible && (
                                               <>
                                                <>
                                                    <li className="itemlist">

                                                        <span>CSV Export</span>

                                                    </li>
                                                    </>
                                                    <>
                                                         <li className="itemlist1">

                                                        <span>Excel Export</span>

                                                    </li>
                                                    
                                                   
                                                </>
                                               </>

                                            )
                                        }
                                </li>
                            </ul>
                        </div>
                    </div>


                )}
        </>
    );
};

export default Table1;