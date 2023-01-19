import { useState } from "react";
import { Link } from "react-router-dom";

const ClothesTable = ({ clothes, onDelete1 }) => {
  const [search, setSearch] = useState(clothes);
  const [clicked, isClicked] = useState(false);

  const handleClick = (e) => {
    const colName = e.target.innerHTML.toLowerCase();
    const copySearch = [...search];
    isClicked(!clicked);
    const sortData = copySearch.sort((a, b) => {
      return (
        (a[colName] < b[colName] ? -1 : a[colName] > b[colName] ? 1 : 0) *
        (clicked ? -1 : 1)
      );
    });

    setSearch(sortData);
  };

  const handleSearch = (e) => {
    const getSerach = clothes.filter((el) => {
      if (el.type.toLowerCase().includes(e.target.value)) {
        return el;
      } else if (el.price === Number(e.target.value)) {
        console.log(typeof el);
        return el;
      }
    });
    setSearch(getSerach);
  };

  return (
    <div className="EmployeeTable">
      <form>
        <label>
          Price:
          <input type="text" onInput={handleSearch} name="name" />
        </label>
      </form>
      <table>
        <thead>
          <tr>
            <th onClick={handleClick}>price</th>
            <th>type</th>

            <th />
          </tr>
        </thead>
        <tbody>
          {search.map((clothes) => (
            <tr key={clothes._id}>
              <td>{clothes.price}</td>
              <td>{clothes.type}</td>
              <td>
                <input type="checkbox"  />
              </td>
              <td>
                <Link to={`/update/${clothes._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete1(clothes._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClothesTable;
