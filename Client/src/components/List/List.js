import React from 'react';

const EmptyList = () => (<p className="p-3 text-center">no item found!</p>);

const ListItem = ({ item, onClick, selectedId }) => (<li
  className={`list-group-item ${item._id === selectedId ? 'list-group-item-info' : ''}`}
  onClick={() => onClick(item)}
  >
    {item.name}
</li>
)

class List extends React.Component {
  render () {
    const { items, onNew, onClick, selectedId } = this.props;

    return (
      <div className="main--sidebar">
        <button
          className="btn btn-success btn-wide"
          onClick={() => onNew()}
        > New
        </button>
        {items && items.length 
          ? (
            <ul className="list-group list-group-flush">
              {items.map(item => (<ListItem 
                  selectedId={selectedId}
                  key={item._id}
                  item={item}
                  onClick={onClick}
                />))}
            </ul>
          ) : (<EmptyList />)}
      </div>
    )
  }
}

export default List;
