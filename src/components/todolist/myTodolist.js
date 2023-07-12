import React, { useState, useEffect } from "react";
import "./style.css";

const getItemData = () => {
  const list = localStorage.getItem("mytodolist");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputItem, setInputData] = useState("");
  const [items, setUpdateitem] = useState(getItemData());
  const [editTheItem, SetEditItem] = useState("");
  const [toggle, setToggle] = useState(false);

  // add item to the list
  const addItem = () => {
    if (!inputItem) {
      alert("Please fill the text first");
    } else if (inputItem && toggle) {
      setUpdateitem(
        items.map((curEle) => {
          if (curEle.id === editTheItem) {
            return { ...curEle, name: inputItem };
          } else {
            return curEle;
          }
        })
      )

      setInputData([]);
      SetEditItem();
      setToggle(false);
    } else {
      const myNawData = {
        id: new Date().getTime().toString(),
        name: inputItem,
      };
      setUpdateitem([...items, myNawData]);
      setInputData("");
    }
  };

  // delete item
  const deleteItem = (index) => {
    const updateItem = items.filter((curEle) => {
      return curEle.id !== index;
    });
    setUpdateitem(updateItem);
  };

  // edit item
  const editItem = (index) => {
    const item_edit = items.find((curEle) => {
      return curEle.id === index;
    });
    setInputData(item_edit.name);
    SetEditItem(index);
    setToggle(true);
  };

  // remove all items
  const removeAll = () => {
    setUpdateitem([]);
  };

  // storing data at local storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/icon.png" alt="todologo" />
          </figure>
          <figcaption className="addItem">Add Your Item Here</figcaption>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Item"
              className="form-control"
              value={inputItem}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggle ? (
              <i class="far fa-edit add-btn" onClick={addItem}></i>
            ) : ( 
              <i class="fa fa-plus add-btn" onClick={addItem}></i>
            )}
            
          </div>

          {/* show item */}
          <div className="showItems">
            {items.map((curEle, index) => {
              return (
                <div className="eachItem">
                  <h3>{curEle.name}</h3>
                  <div className="todo-btn">
                    <i
                      class="far fa-edit add-btn"
                      onClick={() => editItem(curEle.id)}
                    ></i>
                    <i
                      class="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curEle.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItem">
            <button
              className="btn effect04"
              data-sm-link-text="remove all"
              onClick={removeAll}
            >
              <span>Click Here</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
