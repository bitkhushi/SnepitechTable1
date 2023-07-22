import React, { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as XLSX from "xlsx/xlsx.mjs";
import { CSVLink } from 'react-csv';


const Table1 = () => {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchFilter, setSearchFilter] = useState([]);
    const [colNumber, setcolIndex] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [MenuVisible, setMenuVisible] = useState(false);
    const [ListExportMenuVisible, setListExportMenuVisible] = useState(false);
    const [styleColumnAutoWidth, setStyleColumnAutoWidth] = useState(false);

    const [dragging, setDragging] = useState(false);
    const [draggingColumn, setDraggingColumn] = useState(null);
    const [initialWidth, setInitialWidth] = useState(0);
    const [columnWidths, setColumnWidths] = useState([150, 150, 150, 150, 150]);
    // const [resizingFromHeader, setResizingFromHeader] = useState(false);


    const [columnAutoWidth, setColumnAutoWidth] = useState(false);

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

    }
    const SortIcon = ({ onClick, sortOrder }) => {
        if (sortOrder === 'asc') {
            return (
                <ArrowDropDownIcon onClick={onClick} />
            );
        } else if (sortOrder === 'desc') {
            return (
                <ArrowDropUpIcon onClick={onClick} />
            );
        }
        else {
            return (
                <ArrowDropDownIcon onClick={onClick} />
            );
        }
    };
    const handleSearchFilterFirstName = (e) => {
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
        console.log(e);
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
        

    };
    const click = (event) => {

        setListExportMenuVisible(true)


    }
    const HanadleExExport = () => {
        const sheetData = searchFilter.length > 0 ? searchFilter : data;
        const exportData = sheetData.map((item) => ({
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            maidenName: item.maidenName,
            age: item.age,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');


        const fileName = 'my_exported_data.xlsx';


        XLSX.writeFile(workbook, fileName);
    };
    const headers = [

        { label: "ID", key: "id" },
        { label: "First Name", key: "firstName" },
        { label: "Last Name", key: "lastName" },
        { label: "Maiden Name", key: "maidenName" },
        { label: "Age", key: "age" },

    ];
    const dataAsArray = data.map(item => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        maidenName: item.maidenName,
        age: item.age,
    }));

    const handleColumnResizeStart = (index) => (event) => {
        if (event.button === 2) {
            setDragging(true);
            setDraggingColumn(index);
            setInitialWidth(event.clientX);
            event.preventDefault();
          }
    };
    const handleColumnResize = (event) => {
        // if (dragging ) {
        //     const newWidth = event.clientX - initialWidth;
        //     const newColumnWidths = [...columnWidths];
        //     newColumnWidths[draggingColumn] += newWidth;
        //     setColumnWidths(newColumnWidths);
        //     setInitialWidth(event.clientX);
        // }
        event.preventDefault();
        if (dragging && event.button === 0 && draggingColumn !== 0) {
            const newWidth = event.clientX - initialWidth;
            const newColumnWidths = columnWidths.map((width, index) => {
                console.log(width,index);
              if (index === draggingColumn) {
                const minWidth = 80; // Minimum width for the column
                const updatedWidth = width + newWidth;
                return updatedWidth < minWidth ? minWidth : updatedWidth;
              }
              return width;
            });
        
            setColumnWidths(newColumnWidths);
          }
    };
    const handleColumnResizeEnd = () => {
        setDragging(false);
    };

    const HandleAutoWidthOfColumn = () => {

        const columnsToCalculate = ['id', 'firstName', 'lastName', 'maidenName', 'age'];

        const newColumnWidths = data.reduce((widths, item) => {
            columnsToCalculate.forEach((key, index) => {
                
                
                const cellContent = item[key].toString();
                console.log(cellContent);
                const cellWidth = cellContent.length * 20;
                console.log(cellWidth);
                if (!widths[index] || cellWidth > widths[index]) {
                    widths[index] = cellWidth;
                }
            });

            return widths;
        }, []);

        setColumnWidths(newColumnWidths);
        setStyleColumnAutoWidth(true)
    };


    return (
        <>
            <div className='Menu' onMouseDown={handleMouseDown} >


                <table responsive onMouseMove={handleColumnResize}
                    onMouseUp={handleColumnResizeEnd}
                    // border={1}
                    className="light-border-table"
                >

                    <thead>

                        <tr className='center-alignth'>
                            {/* ${styleColumnAutoWidth?'styleColumn':''}` */}
                            <th className={colNumber === 0 ? 'selected' : ''}
                                onClick={() => handlethselect(0)}
                                style={{ width: columnAutoWidth ? '80px' : columnWidths[0] + 'px' }}
                                // style={{
                                //     width: columnWidths[0], textAlign: 'center'

                                // }}
                                onMouseDown={(event) => handleMouseDown(event, 0)}>
                                <span className='fn'>
                                    {/* id  */}
                                    id
                                    <SortIcon
                                        onClick={() => handleSort('id')}
                                        sortOrder={colNumber === 0 ? sortOrder : ''}
                                    />
                                </span>


                                <MoreVertIcon onMouseDown={handleColumnResizeStart(0)} className='iconstyle' />



                            </th>

                            <th className={colNumber === 1 ? 'selected' : ''}
                                onClick={() => handlethselect(1)}
                                style={{ width: columnWidths[1] }}
                                onMouseDown={(event) => handleMouseDown(event, 1)}>
                                <span className='fn'>

                                    FirstName
                                    <SortIcon
                                        onClick={() => handleSort('firstName')}
                                        sortOrder={colNumber === 1 ? sortOrder : ''}
                                    />
                                </span>
                                {/* FirstName
                                <SortIcon
                                    onClick={() => handleSort('firstName')}
                                    sortOrder={colNumber === 1 ? sortOrder : ''}
                                /> */}
                                
                                <MoreVertIcon onMouseDown={handleColumnResizeStart(1)} className='iconstyle1' />
                            </th>
                            <th className={colNumber === 2 ? 'selected' : ''}
                                onClick={() => handlethselect(2)}
                                style={{ width: columnWidths[2] }} >
                                <span className='fn'>

                                    LastName
                                    <SortIcon
                                        onClick={() => handleSort('lastName')}
                                        sortOrder={colNumber === 2 ? sortOrder : ''}
                                    />
                                </span>
                                {/* LastName
                                <SortIcon
                                    onClick={() => handleSort('lastName')}
                                    sortOrder={colNumber === 2 ? sortOrder : ''}
                                /> */}
                                <MoreVertIcon onMouseDown={handleColumnResizeStart(2)} className='iconstyle2' />

                            </th>
                            <th className={colNumber === 3 ? 'selected' : ''}
                                onClick={() => handlethselect(3)}
                                style={{ width: columnWidths[3] }} >
                                <span className='fn'>

                                    MaidenName
                                    <SortIcon
                                        onClick={() => handleSort('maidenName')}
                                        sortOrder={colNumber === 3 ? sortOrder : ''}
                                    />
                                </span>
                                {/* MaidenName
                                <SortIcon
                                    onClick={() => handleSort('maidenName')}
                                    sortOrder={colNumber === 3 ? sortOrder : ''}
                                /> */}
                                <MoreVertIcon onMouseDown={handleColumnResizeStart(3)} className='iconstyle3' />


                            </th>
                            <th className={colNumber === 4 ? 'selected' : ''}
                                onClick={() => handlethselect(4)}
                                style={{ width: columnWidths[4] }}
                                onMouseDown={(event) => handleMouseDown(event, 4)}>
                                <span className='fn'>

                                    Age
                                    <SortIcon
                                        onClick={() => handleSort('age')}
                                        sortOrder={colNumber === 4 ? sortOrder : ''}
                                    />
                                </span>
                                {/* Age
                                <SortIcon
                                    onClick={() => handleSort('age')}
                                    sortOrder={colNumber === 4 ? sortOrder : ''}
                                /> */}
                                <MoreVertIcon onMouseDown={handleColumnResizeStart(4)} className='iconstyle4' />
                            </th>

                        </tr>
                        <th>
                            <input onChange={handleSearchFilterId}
                                style={{ width: columnAutoWidth ? '84px' : columnWidths[0] + 'px' }}
                            />
                        </th>
                        <th>
                            <input onChange={handleSearchFilterFirstName}
                                style={{ width: columnAutoWidth ? 'auto' : columnWidths[1] + 'px' }} />
                        </th>
                        <th>
                            <input onChange={handleSearchFilterLastName}
                                style={{ width: columnAutoWidth ? 'auto' : columnWidths[2] + 'px' }} />
                        </th>
                        <th>
                            <input onChange={handleSearchFilterMeidenName}
                                style={{ width: columnAutoWidth ? 'auto' : columnWidths[3] + 'px' }} />
                        </th>
                        <th>
                            <input onChange={handleSearchFilterAge}
                                style={{ width: columnAutoWidth ? 'auto' : columnWidths[4] + 'px' }} />
                        </th>
                    </thead>
                    <tbody>
                        {(searchFilter.length > 0 ? searchFilter : data).map((item) => (

                            <tr key={item.id}>

                                <td className={`${colNumber === 0 ? 'selected right-align' : 'right-align'
                                    } `}
                                    onClick={() => handlethselect(0)} >{item.id}</td>

                                <td className={`${colNumber === 1 ? 'selected center-align' : 'center-align'}`}
                                    onClick={() => handlethselect(1)}>{item.firstName}</td>

                                <td className={`${colNumber === 2 ? 'selected left-align' : 'left-align'}`}
                                    onClick={() => handlethselect(2)}>{item.lastName}</td>

                                <td className={`${colNumber === 3 ? 'selected center-align' : 'center-align'}`}
                                    onClick={() => handlethselect(3)}>{item.maidenName}</td>

                                <td className={`${colNumber === 4 ? 'selected right-align' : 'right-align'} `}
                                    onClick={() => handlethselect(4)}>{item.age}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </div>



            {
                MenuVisible && (

                    <div className="wrapper">
                        <div className="content">
                            <ul className="menu">
                                <li className="item" >
                                    <ContentPasteIcon onClick={HandleAutoWidthOfColumn} />
                                    <span>AutoWidth</span>
                                </li>
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
                                    <span>Export To Excel<ArrowDropDownIcon onClick={click} className='iconright' />

                                    </span>
                                </li>

                                {
                                    ListExportMenuVisible && (
                                        <div className='ExcelDropDownList'>
                                            <>
                                                <li className="item" onClick={HanadleExExport}>
                                                    <li className="itemlist" >

                                                        <span >Excel Export</span>

                                                    </li>
                                                </li>
                                            </>
                                            <>
                                                <li className="item">
                                                    <li className="itemlist1">

                                                        <CSVLink data={dataAsArray} headers={headers} style={{ color: 'black', textDecoration: 'none' }}>
                                                            <span>CSV Export</span>
                                                        </CSVLink>

                                                    </li>
                                                </li>


                                            </>
                                        </div>


                                    )
                                }

                            </ul>
                        </div>
                    </div>


                )}
        </>
    );
};

export default Table1;