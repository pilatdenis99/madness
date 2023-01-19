import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClothesForm from "../Components/ClothesForm/ClothesForm";

const createClothes = (clothes) => {
  return fetch("/api/clothes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clothes),
  }).then((res) => res.json());
};

const ClothesCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEmployee = (clothes) => {
    setLoading(true);

    createClothes(clothes)
      .then(() => {
        navigate("/clothes");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ClothesForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
    />
  );
};

export default ClothesCreator;
