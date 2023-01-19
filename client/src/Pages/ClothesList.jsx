import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import ClothesTable from "../Components/ClothesTable/ClothesTable";

const fetchClothes = (signal) => {
  return fetch("/api/clothes", { signal }).then((res) => res.json());
};

const deleteClothes = (id) => {
  return fetch(`/api/clothes/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const Clotheslist = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete1 = (id) => {
    deleteClothes(id).catch((err) => {
      console.log(err);
    });

    setData((clothes) => {
      return clothes.filter((clothes) => clothes._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchClothes(controller.signal)
      .then((clothes) => {
        setLoading(false);
        setData(clothes);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <ClothesTable clothes={data} onDelete1={handleDelete1} />;
};

export default Clotheslist;
