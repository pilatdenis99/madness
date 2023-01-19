const ClothesForm = ({ onSave, disabled, clothes, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {clothes && <input type="hidden" name="_id" defaultValue={clothes._id} />}

      <div className="control">
        <label htmlFor="type">type:</label>
        <input name="type" id="type" />
      </div>

      <div className="control">
        <label htmlFor="price">Price:</label>
        <input name="price" id="price" />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {clothes ? "Update Clothes" : "Create Clothes"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ClothesForm;
